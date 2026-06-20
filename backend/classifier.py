import os
import numpy as np
from PIL import Image

# Global model variable
model = None
model_loaded = False
imagenet_index = {}

# Waste Categories
CATEGORIES = {
    "wet": "Wet Waste",
    "dry": "Dry Waste",
    "recyclable": "Recyclable Waste",
    "hazardous": "Hazardous Waste",
    "ewaste": "E-Waste"
}

# Environmental impact info (Points, Carbon Saved in kg, Bin color, Disposal Guidance)
WASTE_METADATA = {
    "Wet Waste": {
        "bin_color": "Green",
        "points": 10,
        "carbon_saved": 0.2, # kg CO2 saved per item composted
        "instructions": "Place in the Green Bin. Composting is the best disposal method.",
        "suggestions": "Set up a kitchen compost bin or community organic waste collection.",
        "environmental_impact": "Composting wet waste reduces methane emissions from landfills and produces rich organic fertilizer."
    },
    "Dry Waste": {
        "bin_color": "Yellow/Grey",
        "points": 5,
        "carbon_saved": 0.1,
        "instructions": "Place in the Yellow or Grey Bin. Ensure items are not contaminated with liquids.",
        "suggestions": "Donate clean dry waste like clothes, or bundle for bulk waste collection.",
        "environmental_impact": "Proper segregation of dry waste prevents it from clogging drainage systems and contaminating recyclable materials."
    },
    "Recyclable Waste": {
        "bin_color": "Blue",
        "points": 15,
        "carbon_saved": 0.8, # Significant CO2 savings
        "instructions": "Wash and dry items before placing in the Blue Bin to avoid contamination.",
        "suggestions": "Crush plastic bottles and aluminum cans to save space. Bundle paper and cardboard.",
        "environmental_impact": "Recycling saves raw materials, reduces energy consumption by up to 90%, and prevents ocean plastic pollution."
    },
    "Hazardous Waste": {
        "bin_color": "Red",
        "points": 20,
        "carbon_saved": 0.5,
        "instructions": "Place in the Red Bin. Handle with care. Never mix with regular household waste.",
        "suggestions": "Store in a secure, dry place and take to a designated hazardous waste drop-off point.",
        "environmental_impact": "Safe disposal of toxins like batteries, chemicals, and medical waste prevents heavy metals from leaching into soil and water supplies."
    },
    "E-Waste": {
        "bin_color": "Orange",
        "points": 25,
        "carbon_saved": 1.2, # High value materials
        "instructions": "Place in the Orange Bin or drop off at local e-waste collection centers.",
        "suggestions": "Remove batteries and memory cards. Look for manufacture buy-back programs.",
        "environmental_impact": "Electronic waste contains precious metals (gold, silver, copper) as well as toxic substances (lead, mercury). Recycling recovers value safely."
    }
}

# ImageNet waste mapping keyword lists
MAPPING_KEYWORDS = {
    "ewaste": [
        "keyboard", "computer", "monitor", "mouse", "laptop", "notebook", "screen", "television", "tv", 
        "cellular", "telephone", "phone", "mobile", "ipod", "printer", "modem", "joystick", "disk", "electronics"
    ],
    "hazardous": [
        "battery", "syringe", "needle", "aerosol", "spray", "canister", "chemical", "medicine", "pill", 
        "toxic", "poison", "thermometer", "lighter", "fireworks", "paint", "solvent", "acid", "cleaner"
    ],
    "recyclable": [
        "bottle", "bag", "envelope", "cardboard", "box", "carton", "newspaper", "paper", "book", "magazine", 
        "can", "tin", "aluminum", "foil", "glass", "cup", "mug", "goblet", "jar", "plate", "tub", "tray", "wrapper"
    ],
    "wet": [
        "banana", "apple", "orange", "lemon", "strawberry", "grape", "pineapple", "mango", "fruit", "vegetable", 
        "cabbage", "broccoli", "cauliflower", "mushroom", "onion", "potato", "carrot", "tomato", "salad", 
        "food", "bread", "meat", "fish", "egg", "chicken", "rice", "cheese", "sandwich", "pizza", "pastry", "compost"
    ],
    "dry": [
        "shoe", "boot", "slipper", "sock", "clothing", "shirt", "pants", "coat", "hat", "glove", "towel", 
        "leather", "wallet", "backpack", "umbrella", "wood", "plank", "rag", "fabric", "cloth", "yarn", "carpet",
        "sponge", "rubber", "tire", "brick", "stone", "tile", "dirt", "dust", "sand", "refuse"
    ]
}

def load_classifier():
    global model, model_loaded, imagenet_index
    if model_loaded:
        return True
    
    try:
        # Load TensorFlow and Keras pre-trained MobileNetV2
        import tensorflow as tf
        
        # Load model (will download weights on first run if connected to internet)
        model = tf.keras.applications.MobileNetV2(weights='imagenet')
        
        # Load imagenet classes
        from tensorflow.keras.applications.mobilenet_v2 import decode_predictions
        # Keep a dummy prediction to force download / compilation of decoding utils
        dummy = np.zeros((1, 224, 224, 3))
        decode_predictions(model.predict(dummy, verbose=0), top=1)
        
        model_loaded = True
        print("TensorFlow MobileNetV2 waste classifier loaded successfully!")
        return True
    except Exception as e:
        print(f"Error loading MobileNetV2 (falling back to heuristic classifier): {e}")
        model_loaded = False
        return False

# Attempt to load model at import time
load_classifier()

def classify_by_filename(filename):
    """
    Fallback method that classifies waste based on filename keywords
    """
    name_lower = filename.lower()
    
    # Check for direct keyword matches
    for category, keywords in MAPPING_KEYWORDS.items():
        for keyword in keywords:
            if keyword in name_lower:
                mapped_cat = CATEGORIES[category]
                return mapped_cat, 0.90, f"Heuristic prediction based on '{keyword}' in file name"
                
    # Default fallback based on extension or general category
    if any(ext in name_lower for ext in ["jpg", "jpeg", "png", "gif"]):
        # Rotate defaults or return dry waste
        return "Dry Waste", 0.70, "Default classification (Dry Waste)"
    return "Dry Waste", 0.50, "Default classification (Unknown type)"

def classify_waste_image(image_path, filename=""):
    """
    Classifies the image at image_path. 
    Returns: category, confidence, item_name, metadata
    """
    # 1. Check if we can classify with the TensorFlow model
    if model_loaded and model is not None:
        try:
            import tensorflow as tf
            from tensorflow.keras.applications.mobilenet_v2 import preprocess_input, decode_predictions
            
            # Load and preprocess image
            img = Image.open(image_path).convert('RGB')
            img = img.resize((224, 224))
            x = np.array(img, dtype=np.float32)
            x = np.expand_dims(x, axis=0)
            x = preprocess_input(x)
            
            # Predict
            preds = model.predict(x, verbose=0)
            decoded = decode_predictions(preds, top=5)[0]
            
            # Go through decoded predictions and find the best waste category match
            # Decoded is a list of tuples: (imagenet_id, label, probability)
            best_cat = None
            best_confidence = 0.0
            best_item_name = ""
            
            # Match top prediction first, but scan top 5 to see if any fall in E-Waste/Hazardous
            # since MobileNet classes are very specific (e.g. computer keyboard, syringe)
            top_label = decoded[0][1].replace("_", " ").title()
            top_prob = float(decoded[0][2])
            
            # Let's inspect all top 5 matches
            for imagenet_id, label, prob in decoded:
                label_clean = label.lower().replace("_", " ")
                prob = float(prob)
                
                # Check mapping lists
                for category_key, keywords in MAPPING_KEYWORDS.items():
                    for kw in keywords:
                        if kw in label_clean:
                            # Found a matching category!
                            mapped_category = CATEGORIES[category_key]
                            
                            # If it's the top label, or if we haven't found a category yet,
                            # or if we found a high-priority category like E-Waste / Hazardous
                            if best_cat is None or label_clean == decoded[0][1].lower():
                                best_cat = mapped_category
                                best_confidence = prob
                                best_item_name = label_clean.title()
                            elif category_key in ["ewaste", "hazardous"] and best_cat not in ["E-Waste", "Hazardous Waste"]:
                                # Prioritize Hazardous/E-Waste in top-5 detections
                                best_cat = mapped_category
                                best_confidence = prob
                                best_item_name = label_clean.title()
                                
            # If no matches in top 5, fall back to top prediction name and map to Dry Waste
            if best_cat is None:
                best_cat = "Dry Waste"
                best_confidence = top_prob
                best_item_name = top_label
                
            metadata = WASTE_METADATA[best_cat]
            return best_cat, round(best_confidence, 2), best_item_name, metadata
            
        except Exception as e:
            print(f"TensorFlow classification failed, falling back to heuristics: {e}")
            
    # 2. Heuristic fallback (if model not loaded or failed)
    fallback_cat, confidence, reason = classify_by_filename(filename or os.path.basename(image_path))
    
    # Get a clean item name from filename
    clean_name = os.path.splitext(os.path.basename(filename or image_path))[0]
    clean_name = clean_name.replace("-", " ").replace("_", " ").title()
    if len(clean_name) > 20:
        clean_name = clean_name[:20]
        
    metadata = WASTE_METADATA[fallback_cat]
    return fallback_cat, confidence, clean_name, metadata
