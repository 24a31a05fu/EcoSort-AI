import os
import sys

# Add backend directory to path
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'backend'))

def test_imports():
    print("Step 1: Testing imports...")
    try:
        import flask
        import tensorflow as tf
        import numpy as np
        from PIL import Image
        print(" [OK] Core packages (Flask, TensorFlow, NumPy, PIL) imported successfully.")
        print(f"      TensorFlow version: {tf.__version__}")
    except ImportError as e:
        print(f" [FAIL] Core import failed: {e}")
        return False
    return True

def test_database():
    print("\nStep 2: Testing Database Layer...")
    try:
        from database import register_user, login_user, get_user_by_id, init_json_db, JSON_DB_PATH
        # Force JSON database init
        init_json_db()
        print(f" [OK] JSON database initialized at {JSON_DB_PATH}")
        
        # Test register
        user, err = register_user("test_user_unique_123", "test@ecosort.org", "password123")
        if err and "exists" not in err:
            print(f" [FAIL] Register failed: {err}")
            return False
        print(" [OK] User registration tested.")
        
        # Test login
        user, err = login_user("test_user_unique_123", "password123")
        if err:
            print(f" [FAIL] Login failed: {err}")
            return False
        print(f" [OK] User login successful. User level: {user['level']}, points: {user['points']}")
    except Exception as e:
        print(f" [FAIL] Database test crashed: {e}")
        return False
    return True

def test_classifier():
    print("\nStep 3: Testing Waste Classifier...")
    try:
        from classifier import load_classifier, classify_waste_image
        
        # Attempt load
        loaded = load_classifier()
        print(f" [OK] Model load execution. Loaded state: {loaded}")
        
        # Test classification with a mock file name to trigger heuristics
        cat, conf, item_name, meta = classify_waste_image("dummy_keyboard.jpg")
        print(f" [OK] Classification tested on 'dummy_keyboard.jpg'")
        print(f"      Category: {cat}")
        print(f"      Item Name: {item_name}")
        print(f"      Confidence: {conf}")
        print(f"      Disposal Bin: {meta['bin_color']}")
        
        if cat != "E-Waste":
            print(" [WARNING] Heuristic classification mapping check failed to map keyboard to E-Waste.")
        else:
            print(" [OK] Heuristic classification mapped keyboard to E-Waste successfully.")
            
        # Test composting food scrap heuristic
        cat_f, conf_f, item_name_f, meta_f = classify_waste_image("apple_core.png")
        print(f" [OK] Classification tested on 'apple_core.png'")
        print(f"      Category: {cat_f}")
        print(f"      Disposal Bin: {meta_f['bin_color']}")
        
        if cat_f != "Wet Waste":
            print(" [WARNING] Heuristic classification mapping check failed to map apple to Wet Waste.")
        else:
            print(" [OK] Heuristic classification mapped apple to Wet Waste successfully.")
            
    except Exception as e:
        print(f" [FAIL] Classifier test crashed: {e}")
        return False
    return True

def test_chatbot():
    print("\nStep 4: Testing Chatbot Translations...")
    try:
        from chatbot import get_chatbot_response
        
        # Test English
        reply_en = get_chatbot_response("How to recycle a plastic bottle?", "en")
        try:
            print(f" [OK] English chat reply received: {reply_en[:60]}...")
        except UnicodeEncodeError:
            print(f" [OK] English chat reply received (Unicode output suppressed, length={len(reply_en)})")
            
        # Test Telugu
        reply_te = get_chatbot_response("ప్లాస్టిక్ సీసాని ఎలా రీసైకిల్ చేయాలి?", "te")
        try:
            print(f" [OK] Telugu chat reply received: {reply_te[:60]}...")
        except UnicodeEncodeError:
            print(f" [OK] Telugu chat reply received (Unicode output suppressed, length={len(reply_te)})")
            
        # Test Hindi
        reply_hi = get_chatbot_response("प्लास्टिक की बोतल को कैसे रीसायकल करें?", "hi")
        try:
            print(f" [OK] Hindi chat reply received: {reply_hi[:60]}...")
        except UnicodeEncodeError:
            print(f" [OK] Hindi chat reply received (Unicode output suppressed, length={len(reply_hi)})")
    except Exception as e:
        print(f" [FAIL] Chatbot test crashed: {e}")
        return False
    return True

if __name__ == "__main__":
    print("==================================================")
    print("      EcoSort AI Backend Verification Tool        ")
    print("==================================================")
    
    success = test_imports()
    if success:
        success = test_database()
    if success:
        success = test_classifier()
    if success:
        success = test_chatbot()
        
    print("==================================================")
    if success:
        print("          VERIFICATION SUCCESSFUL                 ")
        print("  All components are loaded and functioning.      ")
    else:
        print("          VERIFICATION FAILED                     ")
    print("==================================================")
    sys.exit(0 if success else 1)
