import os
import json
import uuid
import datetime
from werkzeug.security import generate_password_hash, check_password_hash

# Try importing pymongo for MongoDB support
MONGO_SUPPORT = False
mongo_client = None
db = None

try:
    import pymongo
    mongo_uri = os.environ.get("MONGO_URI", "mongodb://localhost:27017/ecosort_ai")
    # Set a short connection timeout so it fails fast if MongoDB is not running
    mongo_client = pymongo.MongoClient(mongo_uri, serverSelectionTimeoutMS=2000)
    # Trigger a call to check if connection works
    mongo_client.server_info()
    db = mongo_client.get_database()
    MONGO_SUPPORT = True
    print("MongoDB successfully connected!")
except Exception as e:
    print(f"MongoDB not connected (using local JSON fallback): {e}")

# JSON database config
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
JSON_DB_PATH = os.path.join(DATA_DIR, "db.json")

def init_json_db():
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
    
    if not os.path.exists(JSON_DB_PATH):
        default_data = {
            "users": [],
            "logs": [],
            "badges": [
                {"id": "first_scan", "title": "Eco Novice", "description": "Scan your first waste item", "icon": "🌱", "points": 10},
                {"id": "recycle_5", "title": "Sort Master", "description": "Correctly classify 5 recyclable items", "icon": "♻️", "points": 50},
                {"id": "hazardous_safe", "title": "Safety First", "description": "Properly dispose of a hazardous item", "icon": "⚠️", "points": 30},
                {"id": "points_100", "title": "Green Warrior", "description": "Accumulate 100 green points", "icon": "🛡️", "points": 100},
                {"id": "points_500", "title": "Eco Champion", "description": "Accumulate 500 green points", "icon": "👑", "points": 500}
            ]
        }
        with open(JSON_DB_PATH, "w") as f:
            json.dump(default_data, f, indent=4)

if not MONGO_SUPPORT:
    init_json_db()

# DB Helpers
def load_json_db():
    with open(JSON_DB_PATH, "r") as f:
        return json.load(f)

def save_json_db(data):
    with open(JSON_DB_PATH, "w") as f:
        json.dump(data, f, indent=4)

# User Functions
def register_user(username, email, password, language="en"):
    password_hash = generate_password_hash(password)
    user_data = {
        "username": username,
        "email": email,
        "password_hash": password_hash,
        "points": 0,
        "level": 1,
        "badges": [],
        "language": language,
        "created_at": datetime.datetime.utcnow().isoformat()
    }
    
    if MONGO_SUPPORT:
        if db.users.find_one({"$or": [{"username": username}, {"email": email}]}):
            return None, "Username or Email already exists"
        user_data["_id"] = str(uuid.uuid4())
        db.users.insert_one(user_data)
        return user_data, None
    else:
        db_data = load_json_db()
        for u in db_data["users"]:
            if u["username"] == username or u["email"] == email:
                return None, "Username or Email already exists"
        
        user_data["id"] = str(uuid.uuid4())
        db_data["users"].append(user_data)
        save_json_db(db_data)
        return user_data, None

def login_user(username_or_email, password):
    if MONGO_SUPPORT:
        user = db.users.find_one({
            "$or": [{"username": username_or_email}, {"email": username_or_email}]
        })
        if user and check_password_hash(user["password_hash"], password):
            user["id"] = user["_id"]
            return user, None
        return None, "Invalid credentials"
    else:
        db_data = load_json_db()
        for u in db_data["users"]:
            if u["username"] == username_or_email or u["email"] == username_or_email:
                if check_password_hash(u["password_hash"], password):
                    return u, None
        return None, "Invalid credentials"

def get_user_by_id(user_id):
    if MONGO_SUPPORT:
        user = db.users.find_one({"_id": user_id})
        if user:
            user["id"] = user["_id"]
            return user
        return None
    else:
        db_data = load_json_db()
        for u in db_data["users"]:
            if u["id"] == user_id:
                return u
        return None

def update_user_preferences(user_id, language):
    if MONGO_SUPPORT:
        db.users.update_one({"_id": user_id}, {"$set": {"language": language}})
        return True
    else:
        db_data = load_json_db()
        for u in db_data["users"]:
            if u["id"] == user_id:
                u["language"] = language
                save_json_db(db_data)
                return True
        return False

# Waste Logs
def add_waste_log(user_id, item_name, category, confidence, carbon_saved, points_earned):
    log_entry = {
        "id": str(uuid.uuid4()),
        "user_id": user_id,
        "item_name": item_name,
        "category": category,
        "confidence": confidence,
        "carbon_saved": float(carbon_saved),
        "points_earned": int(points_earned),
        "timestamp": datetime.datetime.utcnow().isoformat()
    }
    
    if MONGO_SUPPORT:
        db.logs.insert_one(log_entry)
    else:
        db_data = load_json_db()
        db_data["logs"].append(log_entry)
        save_json_db(db_data)
    
    # Award points to user and check achievements
    award_user_points(user_id, points_earned)
    return log_entry

def get_user_logs(user_id):
    if MONGO_SUPPORT:
        logs = list(db.logs.find({"user_id": user_id}).sort("timestamp", pymongo.DESCENDING))
        for log in logs:
            log["id"] = str(log["_id"])
        return logs
    else:
        db_data = load_json_db()
        logs = [log for log in db_data["logs"] if log["user_id"] == user_id]
        logs.reverse() # Show newest first
        return logs

# Gamification Logic
def award_user_points(user_id, points):
    if MONGO_SUPPORT:
        user = db.users.find_one({"_id": user_id})
        if not user:
            return
        new_points = user["points"] + points
        new_level = 1 + (new_points // 100) # 100 points per level
        db.users.update_one(
            {"_id": user_id},
            {"$set": {"points": new_points, "level": new_level}}
        )
        check_and_award_badges(user_id, new_points, new_level)
    else:
        db_data = load_json_db()
        for u in db_data["users"]:
            if u["id"] == user_id:
                u["points"] += points
                u["level"] = 1 + (u["points"] // 100)
                save_json_db(db_data)
                check_and_award_badges(user_id, u["points"], u["level"])
                break

def check_and_award_badges(user_id, points, level):
    new_badges = []
    
    if MONGO_SUPPORT:
        user = db.users.find_one({"_id": user_id})
        if not user:
            return
        user_badges = user.get("badges", [])
        
        # Check first scan
        if "first_scan" not in user_badges:
            log_count = db.logs.count_documents({"user_id": user_id})
            if log_count >= 1:
                new_badges.append("first_scan")
        
        # Check 5 recyclables
        if "recycle_5" not in user_badges:
            recycle_count = db.logs.count_documents({"user_id": user_id, "category": "Recyclable Waste"})
            if recycle_count >= 5:
                new_badges.append("recycle_5")
                
        # Check 1 hazardous
        if "hazardous_safe" not in user_badges:
            haz_count = db.logs.count_documents({"user_id": user_id, "category": "Hazardous Waste"})
            if haz_count >= 1:
                new_badges.append("hazardous_safe")
                
        # Check points milestones
        if "points_100" not in user_badges and points >= 100:
            new_badges.append("points_100")
        if "points_500" not in user_badges and points >= 500:
            new_badges.append("points_500")
            
        if new_badges:
            db.users.update_one(
                {"_id": user_id},
                {"$push": {"badges": {"$each": new_badges}}}
            )
    else:
        db_data = load_json_db()
        for u in db_data["users"]:
            if u["id"] == user_id:
                user_badges = u.get("badges", [])
                user_logs = [log for log in db_data["logs"] if log["user_id"] == user_id]
                
                if "first_scan" not in user_badges and len(user_logs) >= 1:
                    new_badges.append("first_scan")
                
                recycle_count = sum(1 for log in user_logs if log["category"] == "Recyclable Waste")
                if "recycle_5" not in user_badges and recycle_count >= 5:
                    new_badges.append("recycle_5")
                    
                haz_count = sum(1 for log in user_logs if log["category"] == "Hazardous Waste")
                if "hazardous_safe" not in user_badges and haz_count >= 1:
                    new_badges.append("hazardous_safe")
                    
                if "points_100" not in user_badges and points >= 100:
                    new_badges.append("points_100")
                if "points_500" not in user_badges and points >= 500:
                    new_badges.append("points_500")
                    
                if new_badges:
                    u["badges"].extend(new_badges)
                    save_json_db(db_data)
                break

def get_leaderboard():
    if MONGO_SUPPORT:
        users = list(db.users.find({}, {"username": 1, "points": 1, "level": 1}).sort("points", pymongo.DESCENDING).limit(10))
        for idx, u in enumerate(users):
            u["id"] = str(u["_id"])
            u["rank"] = idx + 1
        return users
    else:
        db_data = load_json_db()
        sorted_users = sorted(db_data["users"], key=lambda x: x["points"], reverse=True)[:10]
        leaderboard = []
        for idx, u in enumerate(sorted_users):
            leaderboard.append({
                "id": u["id"],
                "username": u["username"],
                "points": u["points"],
                "level": u["level"],
                "rank": idx + 1
            })
        return leaderboard

def get_all_badges():
    if MONGO_SUPPORT:
        # Default badges
        return [
            {"id": "first_scan", "title": "Eco Novice", "description": "Scan your first waste item", "icon": "🌱", "points": 10},
            {"id": "recycle_5", "title": "Sort Master", "description": "Correctly classify 5 recyclable items", "icon": "♻️", "points": 50},
            {"id": "hazardous_safe", "title": "Safety First", "description": "Properly dispose of a hazardous item", "icon": "⚠️", "points": 30},
            {"id": "points_100", "title": "Green Warrior", "description": "Accumulate 100 green points", "icon": "🛡️", "points": 100},
            {"id": "points_500", "title": "Eco Champion", "description": "Accumulate 500 green points", "icon": "👑", "points": 500}
        ]
    else:
        db_data = load_json_db()
        return db_data["badges"]
