# Multi-language Sustainability Chatbot Logic

CHAT_RESPONSES = {
    "en": {
        "greeting": "Hello! I am your EcoSort AI Sustainability Assistant. How can I help you save the planet today?",
        "recycle": "Recycling saves resources! Remember these rules:\n1. Clean and dry items before recycling.\n2. Separate by material (Blue: Paper/Plastic/Metal/Glass).\n3. Keep non-recyclables out of the blue bin.",
        "e_waste": "E-waste (computers, phones, chargers) contains precious metals and heavy toxins. Do not throw them in standard garbage. Use the Orange Bin or take them to an authorized e-waste collection center.",
        "wet_waste": "Wet waste (food scraps, vegetable peels, leaves) is biodegradable. You can easily compost it at home to create rich organic soil for your plants, reducing landfill methane emissions.",
        "hazardous": "Hazardous waste (batteries, spray cans, medicines, bulbs) requires special handling. Use the Red Bin. Never incinerate batteries or dump chemicals down the drain.",
        "sdg": "EcoSort AI supports global Sustainable Development Goals:\n- **SDG 11 (Sustainable Cities)**: Proper waste collection and cleaner environments.\n- **SDG 12 (Responsible Consumption & Production)**: Maximizing recycling and composting.\n- **SDG 13 (Climate Action)**: Reducing greenhouse gas emissions by preventing landfills.",
        "points": "Earn Green Points by uploading waste images for classification! \n- Wet waste: 10 points\n- Recyclable waste: 15 points\n- Hazardous waste: 20 points\n- E-Waste: 25 points\nAccumulate points to level up and earn badges!",
        "plastic": "Plastics take 100 to 1000 years to decompose. Look for the recycling triangle symbol (resin identification code 1-7). Polyethylene (PET #1, HDPE #2) are widely recycled. Clean them before disposal!",
        "glass": "Glass is 100% recyclable and can be recycled endlessly without loss in quality. Separate bottles by color (clear, green, amber) if required locally and place in blue bin.",
        "paper": "Paper is highly recyclable, but dirty/greasy paper (like pizza boxes) cannot be recycled because oil ruins the fibers. Compost food-stained paper instead!",
        "metal": "Aluminum and steel cans are highly valuable for recycling. They require 95% less energy to recycle than making new ones. Wash them out and place them in the blue recycling bin.",
        "default": "I'm here to help you sort waste and live sustainably! You can ask me about:\n- How to recycle plastic, metals, paper, or glass\n- Composting wet/organic waste\n- Disposing of batteries or electronics (E-waste)\n- The UN SDGs (11, 12, 13)\n- How our Green Points rewards system works."
    },
    "te": {
        "greeting": "నమస్కారం! నేను మీ EcoSort AI పర్యావరణ సహాయకుడిని. ఈ రోజు మన భూమిని కాపాడటానికి నేను మీకు ఏ విధంగా సహాయపడగలను?",
        "recycle": "రీసైక్లింగ్ వనరులను ఆదా చేస్తుంది! ఈ క్రింది నియమాలను గుర్తుంచుకోండి:\n1. రీసైక్లింగ్ చేసే ముందు వస్తువులను శుభ్రం చేసి ఆరబెట్టండి.\n2. పదార్థాల ఆధారంగా వేరు చేయండి (నీలం బిన్: కాగితం/ప్లాస్టిక్/మెటల్/గ్లాస్).\n3. రీసైకిల్ చేయలేని వాటిని నీలం బిన్ లో వేయకండి.",
        "e_waste": "ఈ-వ్యర్థాలలో (కంప్యూటర్లు, ఫోన్లు, ఛార్జర్లు) విలువైన లోహాలు మరియు హానికరమైన టాక్సిన్స్ ఉంటాయి. వాటిని సాధారణ చెత్తలో పారేయకండి. నారింజ రంగు బిన్ ఉపయోగించండి లేదా ఈ-వ్యర్థాల సేకరణ కేంద్రానికి తీసుకెళ్లండి.",
        "wet_waste": "తడి వ్యర్థాలు (ఆహార వ్యర్థాలు, కూరగాయల తొక్కలు, ఆకులు) త్వరగా కుళ్ళిపోతాయి. మీరు వీటితో ఇంట్లోనే సులభంగా కంపోస్ట్ తయారుచేసి మొక్కలకు వాడుకోవచ్చు. ఇది ల్యాండ్‌ఫిల్‌లలో మీథేన్ వాయువును తగ్గిస్తుంది.",
        "hazardous": "హానికరమైన వ్యర్థాలకు (బ్యాటరీలు, స్ప్రే క్యాన్లు, మందులు, బల్బులు) ప్రత్యేక శ్రద్ధ అవసరం. ఎరుపు రంగు బిన్ ఉపయోగించండి. బ్యాటరీలను కాల్చడం లేదా రసాయనాలను డ్రైనేజీల్లో పోయడం చేయకండి.",
        "sdg": "EcoSort AI ప్రపంచ స్థిరమైన అభివృద్ధి లక్ష్యాలకు (SDG) మద్దతు ఇస్తుంది:\n- **SDG 11 (స్థిరమైన నగరాలు)**: సరైన వ్యర్థాల సేకరణ మరియు పరిశుభ్రమైన వాతావరణం.\n- **SDG 12 (బాధ్యతాయుతమైన వినియోగం & ఉత్పత్తి)**: రీసైక్లింగ్ మరియు కంపోస్టింగ్‌ను పెంచడం.\n- **SDG 13 (వాతావరణ చర్య)**: గ్రీన్ హౌస్ వాయువుల ఉద్గారాలను తగ్గించడం.",
        "points": "వ్యర్థాల చిత్రాలను అప్‌లోడ్ చేసి గ్రీన్ పాయింట్లు సంపాదించండి!\n- తడి వ్యర్థాలు: 10 పాయింట్లు\n- రీసైకిల్ వ్యర్థాలు: 15 పాయింట్లు\n- హానికరమైన వ్యర్థాలు: 20 పాయింట్లు\n- ఈ-వ్యర్థాలు: 25 పాయింట్లు\nపాయింట్లు సంపాదించి మీ స్థాయిని పెంచుకోండి మరియు బ్యాడ్జీలు పొందండి!",
        "plastic": "ప్లాస్టిక్ కరిగిపోవడానికి 100 నుండి 1000 సంవత్సరాలు పడుతుంది. రీసైక్లింగ్ గుర్తును (కోడ్ 1-7) గమనించండి. PET (#1), HDPE (#2) ప్లాస్టిక్‌లు సులభంగా రీసైకిల్ అవుతాయి. వేసే ముందు వాటిని శుభ్రం చేయండి!",
        "glass": "గాజు 100% రీసైకిల్ చేయదగినది మరియు దీనిని ఎన్నిసార్లయినా నాణ్యత తగ్గకుండా రీసైకిల్ చేయవచ్చు. గాజు సీసాలను రంగుల వారీగా వేరు చేసి నీలం రంగు బిన్ లో వేయండి.",
        "paper": "కాగితం సులభంగా రీసైకిల్ అవుతుంది, కానీ నూనె మరకలు ఉన్న కాగితం (పిజ్జా బాక్సులు వంటివి) రీసైకిల్ కావు. అటువంటి వాటిని కంపోస్ట్ గా ఉపయోగించండి!",
        "metal": "అల్యూమినియం మరియు స్టీల్ డబ్బాలు రీసైక్లింగ్‌కు చాలా విలువైనవి. కొత్త వాటిని తయారు చేయడం కంటే వీటిని రీసైకిల్ చేయడానికి 95% తక్కువ శక్తి సరిపోతుంది. కడిగి నీలం బిన్ లో వేయండి.",
        "default": "వ్యర్థాలను సరిగ్గా వేరు చేయడానికి మరియు పర్యావరణహితంగా జీవించడానికి నేను మీకు సహాయం చేస్తాను! మీరు వీటి గురించి నన్ను అడగవచ్చు:\n- ప్లాస్టిక్, లోహాలు, కాగితం లేదా గాజును ఎలా రీసైకిల్ చేయాలి\n- తడి/సేంద్రీయ వ్యర్థాల కంపోస్టింగ్\n- బ్యాటరీలు లేదా ఎలక్ట్రానిక్స్ (ఈ-వ్యర్థాలు) పారవేయడం\n- UN SDGs (11, 12, 13) గురించి\n- మా గ్రీన్ పాయింట్స్ రివార్డ్ సిస్టమ్ ఎలా పనిచేస్తుంది."
    },
    "hi": {
        "greeting": "नमस्ते! मैं आपका इकोसॉर्ट एआई सस्टेनेबिलिटी सहायक हूं। आज पर्यावरण को बचाने में मैं आपकी क्या मदद कर सकता हूं?",
        "recycle": "रीसाइक्लिंग से संसाधनों की बचत होती है! इन नियमों को याद रखें:\n1. रीसायकल करने से पहले वस्तुओं को साफ और सूखा लें।\n2. सामग्री के अनुसार अलग करें (नीला बिन: कागज/प्लास्टिक/धातु/कांच)।\n3. गैर-रीसायकल योग्य वस्तुओं को नीले बिन में न डालें।",
        "e_waste": "ई-कचरे (कंप्यूटर, फोन, चार्जर) में मूल्यवान धातुएं और भारी विषैले तत्व होते हैं। इन्हें सामान्य कचरे में न फेंकें। नारंगी बिन का उपयोग करें या अधिकृत ई-कचरा संग्रह केंद्र में जमा करें।",
        "wet_waste": "गीला कचरा (बचा हुआ भोजन, सब्जियों के छिलके, पत्तियां) सड़ने योग्य होता है। आप इसे घर पर आसानी से कम्पोस्ट (खाद) बनाकर पौधों के लिए पोषक मिट्टी तैयार कर सकते हैं, जिससे लैंडफिल की मीथेन गैस कम होगी।",
        "hazardous": "खतरनाक कचरे (बैटरियों, स्प्रे डिब्बे, दवाएं, बल्ब) को विशेष रखरखाव की आवश्यकता होती है। लाल बिन का उपयोग करें। बैटरियों को कभी न जलाएं और रसायनों को नाली में न बहाएं।",
        "sdg": "EcoSort AI वैश्विक सतत विकास लक्ष्यों (SDGs) का समर्थन करता है:\n- **SDG 11 (सतत शहर)**: उचित कचरा संग्रह और स्वच्छ वातावरण।\n- **SDG 12 (जिम्मेदार उपभोग और उत्पादन)**: रीसाइक्लिंग और खाद बनाने को बढ़ावा देना।\n- **SDG 13 (जलवायु कार्रवाई)**: लैंडफिल कचरे को रोककर ग्रीनहाउस गैसों को कम करना।",
        "points": "वर्गीकरण के लिए कचरे की तस्वीरें अपलोड करके ग्रीन पॉइंट अर्जित करें!\n- गीला कचरा: 10 अंक\n- पुनर्चक्रण योग्य (రీసైకిల్) कचरा: 15 अंक\n- खतरनाक कचरा: 20 अंक\n- ई-कचरा: 25 अंक\nअंक जमा करके अपना स्तर बढ़ाएं और बैज अर्जित करें!",
        "plastic": "प्लास्टिक को नष्ट होने में 100 से 1000 वर्ष लगते हैं। रीसाइक्लिंग त्रिकोण चिह्न (कोड 1-7) की जांच करें। PET (#1) और HDPE (#2) आसानी से रीसायकल होते हैं। निपटान से पहले उन्हें साफ करें!",
        "glass": "कांच 100% पुनर्चक्रण योग्य है और गुणवत्ता खोए बिना इसे बार-बार रीसायकल किया जा सकता है। बोतलों को रंग के अनुसार अलग करें और नीले डिब्बे में डालें।",
        "paper": "कागज रीसायकल योग्य है, लेकिन तेल/चिकनाई वाले कागज (जैसे पिज्जा बॉक्स) को रीसायकल नहीं किया जा सकता क्योंकि तेल रेशों को नष्ट कर देता है। ऐसे कागजों को खाद (compost) में डालें!",
        "metal": "एल्युमिनियम और स्टील के डिब्बे रीसाइक्लिंग के लिए बहुत मूल्यवान हैं। इन्हें रीसायकल करने में नए डिब्बे बनाने की तुलना में 95% कम ऊर्जा लगती है। इन्हें धोकर नीले रीसाइक्लिंग डिब्बे में रखें।",
        "default": "मैं यहाँ कचरे को छांटने और पर्यावरण-अनुकूल जीवन जीने में आपकी मदद करने के लिए हूँ! आप मुझसे पूछ सकते हैं:\n- प्लास्टिक, धातु, कागज या कांच को कैसे रीसायकल करें\n- गीले/जैविक कचरे की खाद बनाना\n- बैटरियों या इलेक्ट्रॉनिक्स (ई-कचरा) का निपटान\n- संयुक्त राष्ट्र SDGs (11, 12, 13) के बारे में\n- हमारी ग्रीन पॉइंट पुरस्कार प्रणाली कैसे काम करती है।"
    }
}

def get_chatbot_response(message, language="en"):
    """
    Analyzes message content and returns a relevant response based on keywords.
    Supported languages: 'en' (default), 'te' (Telugu), 'hi' (Hindi).
    """
    lang = language.lower()
    if lang not in CHAT_RESPONSES:
        lang = "en"
        
    msg = message.lower()
    responses = CHAT_RESPONSES[lang]
    
    # Analyze keywords
    if any(k in msg for k in ["hi", "hello", "hey", "greeting", "నమస్కారం", "नमस्ते", "namaste"]):
        return responses["greeting"]
    elif any(k in msg for k in ["recycle", "segregate", "sort", "bin", "రీసైకిల్", "రీసైక్లింగ్", "रीसायकल", "सॉर्ट"]):
        return responses["recycle"]
    elif any(k in msg for k in ["e-waste", "ewaste", "computer", "phone", "charger", "laptop", "electronics", "ఈ-వ్యర్థాలు", "ई-कचरा", "मोबाइल"]):
        return responses["e_waste"]
    elif any(k in msg for k in ["wet", "organic", "food", "peel", "compost", "kitchen", "తడి వ్యర్థాలు", "కంపోస్ట్", "खाद", "गीला", "भोजन", "छिलके"]):
        return responses["wet_waste"]
    elif any(k in msg for k in ["hazardous", "battery", "batteries", "medicine", "chemical", "toxic", "బ్యాటరీ", "మందులు", "दवा", "बैटरी", "खतरनाक"]):
        return responses["hazardous"]
    elif any(k in msg for k in ["sdg", "sustainable", "goals", "11", "12", "13", "ఎస్డీజీ", "एसडीजी"]):
        return responses["sdg"]
    elif any(k in msg for k in ["points", "reward", "badge", "level", "leaderboard", "పాయింట్లు", "రివార్డు", "అంకెలు", "पुरस्कार", "अंक"]):
        return responses["points"]
    elif any(k in msg for k in ["plastic", "polythene", "pet", "hdpe", "ప్లాస్టిక్", "प्लास्टिक", "पॉलीथीन"]):
        return responses["plastic"]
    elif any(k in msg for k in ["glass", "bottle", "jar", "గాజు", "సీసా", "कांच", "बोतल"]):
        return responses["glass"]
    elif any(k in msg for k in ["paper", "cardboard", "box", "newspaper", "కాగితం", "న్యూస్ పేపర్", "कागज", "गत्ता"]):
        return responses["paper"]
    elif any(k in msg for k in ["metal", "can", "tin", "aluminum", "steel", "రాగి", "మెటల్", "धातु", "कैन", "लोहा"]):
        return responses["metal"]
    else:
        return responses["default"]
