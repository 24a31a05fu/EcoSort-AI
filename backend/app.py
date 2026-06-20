import os
import datetime
from flask import Flask, request, jsonify, render_template, send_from_directory, make_response
from itsdangerous import URLSafeSerializer

from database import (
    register_user, login_user, get_user_by_id, 
    add_waste_log, get_user_logs, get_leaderboard, get_all_badges,
    update_user_preferences, MONGO_SUPPORT, db, load_json_db, save_json_db
)
from classifier import classify_waste_image, load_classifier
from chatbot import get_chatbot_response
from reports import generate_report

app = Flask(__name__, template_folder='templates', static_folder='static')
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'ecosort_ai_super_secret_key_12345')
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

serializer = URLSafeSerializer(app.config['SECRET_KEY'])

# Custom CORS implementation
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# Helper for authentication
def get_current_user():
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return None
    token = auth_header.split(' ')[1]
    try:
        data = serializer.loads(token)
        return get_user_by_id(data["user_id"])
    except Exception:
        return None

# Auto-populate mock leaderboard data if database is empty
def seed_mock_data():
    try:
        leaderboard = get_leaderboard()
        if len(leaderboard) <= 1: # Only contains at most 1 user (or none)
            print("Seeding mock leaderboard users for gamification...")
            mocks = [
                ("green_guru", "guru@ecosort.org", "Pass123!", 780, 8, ["first_scan", "recycle_5", "points_100", "points_500"]),
                ("earth_saver", "saver@eco.net", "Pass123!", 450, 5, ["first_scan", "recycle_5", "points_100"]),
                ("recycle_queen", "queen@sort.com", "Pass123!", 320, 4, ["first_scan", "points_100"]),
                ("eco_warrior", "warrior@nature.org", "Pass123!", 150, 2, ["first_scan", "points_100"]),
                ("carbon_cutter", "cutter@green.co", "Pass123!", 90, 1, ["first_scan"])
            ]
            for username, email, pwd, points, level, badges in mocks:
                user, err = register_user(username, email, pwd)
                if user:
                    # Update their seeded stats directly
                    user_id = user["id"]
                    if MONGO_SUPPORT:
                        db.users.update_one(
                            {"_id": user_id},
                            {"$set": {"points": points, "level": level, "badges": badges}}
                        )
                    else:
                        db_data = load_json_db()
                        for u in db_data["users"]:
                            if u["id"] == user_id:
                                u["points"] = points
                                u["level"] = level
                                u["badges"] = badges
                                break
                        save_json_db(db_data)
            print("Leaderboard seeding completed!")
    except Exception as e:
        print(f"Error seeding mock data: {e}")

# Call seed data on start
seed_mock_data()

# ----------------- API Endpoints -----------------

@app.route('/api/auth/register', methods=['POST'])
def api_register():
    data = request.json or {}
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    language = data.get('language', 'en')
    
    if not username or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400
        
    user, err = register_user(username, email, password, language)
    if err:
        return jsonify({"error": err}), 400
        
    token = serializer.dumps({"user_id": user["id"]})
    return jsonify({
        "token": token,
        "user": {
            "id": user["id"],
            "username": user["username"],
            "email": user["email"],
            "points": user["points"],
            "level": user["level"],
            "badges": user["badges"],
            "language": user["language"]
        }
    }), 201

@app.route('/api/auth/login', methods=['POST'])
def api_login():
    data = request.json or {}
    username_or_email = data.get('usernameOrEmail') or data.get('username') or data.get('email')
    password = data.get('password')
    
    if not username_or_email or not password:
        return jsonify({"error": "Missing credentials"}), 400
        
    user, err = login_user(username_or_email, password)
    if err:
        return jsonify({"error": err}), 401
        
    token = serializer.dumps({"user_id": user["id"]})
    return jsonify({
        "token": token,
        "user": {
            "id": user["id"],
            "username": user["username"],
            "email": user["email"],
            "points": user["points"],
            "level": user["level"],
            "badges": user["badges"],
            "language": user["language"]
        }
    })

@app.route('/api/profile', methods=['GET'])
def api_profile():
    user = get_current_user()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401
    return jsonify({
        "id": user["id"],
        "username": user["username"],
        "email": user["email"],
        "points": user["points"],
        "level": user["level"],
        "badges": user["badges"],
        "language": user["language"]
    })

@app.route('/api/profile/language', methods=['POST'])
def api_language():
    user = get_current_user()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401
    data = request.json or {}
    language = data.get('language', 'en')
    if language not in ['en', 'te', 'hi']:
        return jsonify({"error": "Unsupported language"}), 400
    update_user_preferences(user["id"], language)
    return jsonify({"success": True, "language": language})

@app.route('/api/classify', methods=['POST', 'OPTIONS'])
def api_classify():
    if request.method == 'OPTIONS':
        return jsonify({"success": True})
        
    # Check if image file exists in request
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
        
    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "Empty filename"}), 400
        
    # Save file
    filename = secure_filename_fallback(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], f"{datetime.datetime.utcnow().timestamp()}_{filename}")
    file.save(filepath)
    
    # Classify waste image
    category, confidence, item_name, metadata = classify_waste_image(filepath, filename)
    
    # Check if authenticated user
    user = get_current_user()
    points_earned = metadata["points"]
    carbon_saved = metadata["carbon_saved"]
    
    logged_in = False
    new_user_stats = None
    
    if user:
        logged_in = True
        log = add_waste_log(
            user_id=user["id"],
            item_name=item_name,
            category=category,
            confidence=confidence,
            carbon_saved=carbon_saved,
            points_earned=points_earned
        )
        # Fetch updated user profile
        updated_user = get_user_by_id(user["id"])
        new_user_stats = {
            "points": updated_user["points"],
            "level": updated_user["level"],
            "badges": updated_user["badges"]
        }
        
    return jsonify({
        "itemName": item_name,
        "category": category,
        "confidence": confidence,
        "pointsEarned": points_earned,
        "carbonSaved": carbon_saved,
        "binColor": metadata["bin_color"],
        "instructions": metadata["instructions"],
        "suggestions": metadata["suggestions"],
        "environmentalImpact": metadata["environmental_impact"],
        "savedToHistory": logged_in,
        "userStats": new_user_stats
    })

def secure_filename_fallback(filename):
    import re
    # Strip directory paths and replace special characters
    filename = os.path.basename(filename)
    filename = re.sub(r'[^a-zA-Z0-9_.-]', '_', filename)
    return filename

@app.route('/api/dashboard', methods=['GET'])
def api_dashboard():
    user = get_current_user()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401
        
    logs = get_user_logs(user["id"])
    
    # Calculations
    total_waste = len(logs)
    recyclable_count = sum(1 for log in logs if log["category"] == "Recyclable Waste")
    hazardous_count = sum(1 for log in logs if log["category"] == "Hazardous Waste")
    ewaste_count = sum(1 for log in logs if log["category"] == "E-Waste")
    wet_count = sum(1 for log in logs if log["category"] == "Wet Waste")
    dry_count = sum(1 for log in logs if log["category"] == "Dry Waste")
    
    carbon_saved = sum(log["carbon_saved"] for log in logs)
    
    # Sustainability Score (0-100)
    # Simple algorithm: percentage of correctly segregated items (recyclable + wet + e-waste + hazardous)
    # vs dry waste/total waste. If they log more, they get higher score. Max 100.
    base_score = 50 # start at 50
    if total_waste > 0:
        sorting_accuracy = (recyclable_count + wet_count + ewaste_count + hazardous_count) / total_waste
        bonus = min(50, total_waste * 2) # up to 50 points for quantity
        sustainability_score = min(100, int(base_score * sorting_accuracy + bonus))
    else:
        sustainability_score = 0
        
    # Chart Data (group by category)
    category_chart_data = [
        {"name": "Wet Waste", "value": wet_count, "color": "#2e7d32"},
        {"name": "Dry Waste", "value": dry_count, "color": "#78909c"},
        {"name": "Recyclable", "value": recyclable_count, "color": "#1e88e5"},
        {"name": "Hazardous", "value": hazardous_count, "color": "#e53935"},
        {"name": "E-Waste", "value": ewaste_count, "color": "#fb8c00"}
    ]
    
    # Monthly / Weekly chart data (group by last 7 days)
    timeline_chart_data = []
    today = datetime.datetime.utcnow().date()
    for i in range(6, -1, -1):
        day = today - datetime.timedelta(days=i)
        day_str = day.strftime("%a")
        day_logs = [log for log in logs if datetime.datetime.fromisoformat(log["timestamp"]).date() == day]
        timeline_chart_data.append({
            "day": day_str,
            "scans": len(day_logs),
            "carbon": round(sum(log["carbon_saved"] for log in day_logs), 2)
        })
        
    return jsonify({
        "stats": {
            "totalScans": total_waste,
            "recyclableCount": recyclable_count,
            "hazardousCount": hazardous_count,
            "carbonSaved": round(carbon_saved, 2),
            "sustainabilityScore": sustainability_score
        },
        "categoryChartData": category_chart_data,
        "timelineChartData": timeline_chart_data,
        "recentHistory": logs[:10] # Top 10 recent scans
    })

@app.route('/api/chatbot', methods=['POST'])
def api_chatbot():
    data = request.json or {}
    message = data.get('message')
    language = data.get('language', 'en')
    
    if not message:
        return jsonify({"error": "Empty message"}), 400
        
    reply = get_chatbot_response(message, language)
    return jsonify({"reply": reply})

@app.route('/api/rewards', methods=['GET'])
def api_rewards():
    user = get_current_user()
    user_badges = user["badges"] if user else []
    
    all_badges = get_all_badges()
    
    # Format badges with user status
    badges_response = []
    for badge in all_badges:
        badges_response.append({
            "id": badge["id"],
            "title": badge["title"],
            "description": badge["description"],
            "icon": badge["icon"],
            "points": badge["points"],
            "unlocked": badge["id"] in user_badges
        })
        
    leaderboard = get_leaderboard()
    
    # Next level progress
    next_level_progress = 0
    points_needed = 100
    if user:
        current_level_points = user["points"] % 100
        next_level_progress = current_level_points
        
    return jsonify({
        "badges": badges_response,
        "leaderboard": leaderboard,
        "levelProgress": {
            "currentPoints": user["points"] if user else 0,
            "level": user["level"] if user else 1,
            "progress": next_level_progress,
            "needed": points_needed
        }
    })

@app.route('/api/report/export', methods=['GET'])
def api_export_report():
    user = get_current_user()
    if not user:
        # Create a mock anonymous user report if requested
        user = {
            "username": "Anonymous Eco-User",
            "email": "anonymous@ecosort.org",
            "points": 0,
            "level": 1,
            "badges": [],
            "language": "en"
        }
        logs = []
    else:
        logs = get_user_logs(user["id"])
        
    report_bytes, mime_type, filename = generate_report(user, logs)
    
    response = make_response(report_bytes)
    response.headers.set('Content-Type', mime_type)
    response.headers.set('Content-Disposition', 'attachment', filename=filename)
    return response

# Serve static/templates for the single-page application
@app.route('/')
def serve_index():
    return render_template('index.html')

# Catch-all to serve index.html for React routing or direct refresh in sub-pages
@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html')

if __name__ == '__main__':
    # Make sure classifier loads weights
    load_classifier()
    print("EcoSort AI server starting on http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
