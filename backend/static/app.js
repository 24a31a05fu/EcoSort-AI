// EcoSort AI - Core SPA Frontend Logic

// Global State
const state = {
    token: localStorage.getItem('ecosort_token') || null,
    user: JSON.parse(localStorage.getItem('ecosort_user')) || null,
    language: localStorage.getItem('ecosort_lang') || 'en',
    activePage: 'home',
    isDarkMode: localStorage.getItem('ecosort_theme') === 'dark',
    chatHistory: [],
    dashboardStats: null,
    rewardsData: null,
    lastClassifyResult: null
};

// Multi-language Translation Dictionary
const translations = {
    en: {
        nav_home: "Home",
        nav_classify: "Waste AI",
        nav_dashboard: "Dashboard",
        nav_chatbot: "Eco Chat",
        nav_rewards: "Rewards",
        nav_about: "About",
        btn_signin: "Sign In",
        btn_signout: "Sign Out",
        slogan: "Transform Waste into Sustainability with AI",
        hero_desc: "Help save our planet by identifying and segregating waste correctly. Upload an image of any waste item and our advanced AI will instantly guide you to its correct disposal method.",
        btn_cta: "Scan Waste Now",
        sdg_title: "Supporting United Nations SDGs",
        sdg_11_title: "SDG 11: Sustainable Cities",
        sdg_11_desc: "Reduce environmental impact of cities by improving waste segregation and local recycling.",
        sdg_12_title: "SDG 12: Responsible Consumption",
        sdg_12_desc: "Encourage sustainable sourcing, waste reduction, composting, and circular economy practices.",
        sdg_13_title: "SDG 13: Climate Action",
        sdg_13_desc: "Divert organics and recyclable items from landfills to reduce greenhouse gas emissions.",
        stats_heading: "Global Environmental Impact",
        stats_analyzed: "Waste Analyzed",
        stats_recycled: "Recycled Items",
        stats_carbon: "Carbon CO2 Saved",
        stats_score: "Average Eco Score",
        features_heading: "Key Platform Features",
        feature_ai_title: "AI Waste Sorting",
        feature_ai_desc: "Classify items in seconds using deep learning image recognition models.",
        feature_gamify_title: "Gamified Rewards",
        feature_gamify_desc: "Earn Green Points, level up, and unlock achievements as you build recycling habits.",
        feature_analytics_title: "Carbon Analytics",
        feature_analytics_desc: "Track the direct environmental impact of your waste sorting history with real metrics.",
        feature_chatbot_title: "Eco Chatbot",
        feature_chatbot_desc: "Interact with our AI Sustainability Assistant to ask recycling and composting questions.",
        classify_heading: "AI Waste Classification Engine",
        classify_desc: "Drag & drop an image or click to select from your device to identify waste.",
        drag_drop_text: "Drag and drop your waste image here",
        or_text: "or",
        browse_btn: "Browse Files",
        scanning_text: "AI is analyzing your image...",
        prediction_title: "AI Prediction Results",
        confidence: "Confidence Score",
        points_earned: "Points Earned",
        carbon_saved: "CO2 Reduced",
        bin_color: "Bin Color Selection",
        disposal_guide: "Disposal Guidance & Tips",
        instructions_title: "Instructions",
        suggestions_title: "Suggestions",
        impact_title: "Environmental Impact",
        dashboard_title: "Sustainability Dashboard",
        dashboard_desc: "Real-time statistics and analytics tracking your waste sorting behavior.",
        total_scans: "Total Scans",
        recyclables_logged: "Recyclables Logged",
        hazardous_logged: "Hazardous Items",
        sustainability_score: "Sustainability Score",
        chart_category_title: "Waste Category Segregation",
        chart_timeline_title: "Weekly Activity & Carbon Offset",
        history_title: "Recent Waste Classification History",
        export_btn: "Export Report (PDF/HTML)",
        chatbot_title: "AI Sustainability Assistant",
        chatbot_desc: "Ask waste segregation questions, learn about composting, or inquire about sustainable living.",
        chat_placeholder: "Ask about plastic recycling, battery disposal, composting, SDGs...",
        chat_send: "Send",
        rewards_title: "Rewards & Gamification",
        rewards_desc: "Collect Green Points, unlock badges, and climb the sustainability leaderboard.",
        level_label: "Level",
        leaderboard_title: "Global Eco Leaderboard",
        rank: "Rank",
        user: "User",
        points: "Points",
        badges_title: "Unlocked Achievements",
        about_title: "About EcoSort AI",
        about_project_heading: "Project Overview",
        about_project_body: "EcoSort AI is a startup-quality sustainability platform built to solve the growing crisis of unsegregated waste. Globally, over 2 billion tons of municipal waste is generated annually, with less than 20% being recycled. By combining deep learning image classification with an engaging gamified rewards dashboard, EcoSort AI empowers households, schools, and communities to act locally and impact globally.",
        about_team_heading: "Development Team",
        about_future_heading: "Future Expansion Scope",
        future_item_1: "IoT Smart Bin integration using microcontrollers and weight sensors.",
        future_item_2: "Local waste collection agent mapping and scheduling.",
        future_item_3: "Barcode scanning database for packaged products."
    },
    hi: {
        nav_home: "मुख्य पृष्ठ",
        nav_classify: "कचरा एआई",
        nav_dashboard: "डैशबोर्ड",
        nav_chatbot: "इको चैट",
        nav_rewards: "पुरस्कार",
        nav_about: "हमारे बारे में",
        btn_signin: "लॉग इन करें",
        btn_signout: "लॉग आउट",
        slogan: "एआई के साथ कचरे को स्थिरता में बदलें",
        hero_desc: "कचरे की सही पहचान और अलगाव करके हमारे ग्रह को बचाने में मदद करें। किसी भी कचरे की छवि अपलोड करें और हमारा उन्नत एआई आपको निपटान की सही विधि बताएगा।",
        btn_cta: "कचरा स्कैन करें",
        sdg_title: "संयुक्त राष्ट्र SDGs का समर्थन",
        sdg_11_title: "SDG 11: सतत शहर",
        sdg_11_desc: "कचरा पृथक्करण और स्थानीय रीसाइक्लिंग में सुधार करके शहरों के पर्यावरणीय प्रभाव को कम करें।",
        sdg_12_title: "SDG 12: जिम्मेदार उपभोग",
        sdg_12_desc: "टिकाऊ उपभोग, कचरा कमी, खाद बनाने और चक्रीय अर्थव्यवस्था प्रथाओं को प्रोत्साहित करें।",
        sdg_13_title: "SDG 13: जलवायु कार्रवाई",
        sdg_13_desc: "ग्रीनहाउस गैस उत्सर्जन को कम करने के लिए जैविक और पुनर्चक्रण योग्य वस्तुओं को लैंडफिल से बचाएं।",
        stats_heading: "वैश्विक पर्यावरणीय प्रभाव",
        stats_analyzed: "विश्लेषित कचरा",
        stats_recycled: "पुनर्चक्रित वस्तुएं",
        stats_carbon: "बचाया गया कार्बन CO2",
        stats_score: "औसत इको स्कोर",
        features_heading: "मंच की मुख्य विशेषताएं",
        feature_ai_title: "एआई कचरा वर्गीकरण",
        feature_ai_desc: "डीप लर्निंग छवि पहचान मॉडल का उपयोग करके सेकंड में वस्तुओं को वर्गीकृत करें।",
        feature_gamify_title: "पुरस्कार प्रणाली",
        feature_gamify_desc: "जैसे-जैसे आप रीसाइक्लिंग की आदतें बनाते हैं, ग्रीन पॉइंट अर्जित करें, स्तर बढ़ाएं और उपलब्धियां अनलॉक करें।",
        feature_analytics_title: "कार्बन विश्लेषण",
        feature_analytics_desc: "वास्तविक मेट्रिक्स के साथ अपने कचरा छँटाई इतिहास के सीधे पर्यावरणीय प्रभाव को ट्रैक करें।",
        feature_chatbot_title: "इको चैटबॉट",
        feature_chatbot_desc: "रीसाइक्लिंग और कंपोस्टिंग प्रश्न पूछने के लिए हमारे एआई सस्टेनेबिलिटी सहायक के साथ बातचीत करें।",
        classify_heading: "एआई कचरा वर्गीकरण इंजन",
        classify_desc: "कचरे की पहचान करने के लिए छवि को ड्रैग एंड ड्रॉप करें या अपने डिवाइस से चुनें।",
        drag_drop_text: "अपने कचरे की छवि यहाँ खींचें और छोड़ें",
        or_text: "या",
        browse_btn: "फाइलें ब्राउज़ करें",
        scanning_text: "एआई आपकी छवि का विश्लेषण कर रहा है...",
        prediction_title: "एआई भविष्यवाणी परिणाम",
        confidence: "आत्मविश्वास स्कोर",
        points_earned: "अर्जित अंक",
        carbon_saved: "कम किया गया CO2",
        bin_color: "कचरा पात्र का रंग",
        disposal_guide: "निपटान मार्गदर्शन और सुझाव",
        instructions_title: "निर्देश",
        suggestions_title: "सुझाव",
        impact_title: "पर्यावरणीय प्रभाव",
        dashboard_title: "सस्टेनेबिलिटी डैशबोर्ड",
        dashboard_desc: "आपके कचरा छँटाई व्यवहार पर नज़र रखने वाले रीयल-टाइम आंकड़े और विश्लेषण।",
        total_scans: "कुल स्कैन",
        recyclables_logged: "पुनर्चक्रण योग्य वस्तुएं",
        hazardous_logged: "खतरनाक वस्तुएं",
        sustainability_score: "स्थिरता स्कोर",
        chart_category_title: "कचरा श्रेणी पृथक्करण",
        chart_timeline_title: "साप्ताहिक गतिविधि और कार्बन बचत",
        history_title: "हालिया कचरा वर्गीकरण इतिहास",
        export_btn: "रिपोर्ट निर्यात करें (PDF/HTML)",
        chatbot_title: "एआई सस्टेनेबिलिटी सहायक",
        chatbot_desc: "कचरा पृथक्करण के प्रश्न पूछें, कंपोस्ट बनाने के बारे में सीखें, या टिकाऊ जीवन के बारे में पूछताछ करें।",
        chat_placeholder: "प्लास्टिक रीसाइक्लिंग, बैटरी निपटान, खाद, एसडीजी के बारे में पूछें...",
        chat_send: "भेजें",
        rewards_title: "पुरस्कार और सरलीकरण",
        rewards_desc: "ग्रीन पॉइंट एकत्र करें, बैज अनलॉक करें, और स्थिरता लीडरबोर्ड पर चढ़ें।",
        level_label: "स्तर",
        leaderboard_title: "वैश्विक इको लीडरबोर्ड",
        rank: "रैंक",
        user: "उपयोगकर्ता",
        points: "अंक",
        badges_title: "अनलॉक की गई उपलब्धियां",
        about_title: "EcoSort AI के बारे में",
        about_project_heading: "परियोजना का अवलोकन",
        about_project_body: "इकोसॉर्ट एआई एक स्टार्टअप-गुणवत्ता स्थिरता मंच है जो बिना छंटे कचरे के बढ़ते संकट को हल करने के लिए बनाया गया है। विश्व स्तर पर, सालाना 2 अरब टन से अधिक नगरपालिका कचरा उत्पन्न होता है, जिसमें से 20% से भी कम पुनर्चक्रित किया जाता है। गहन शिक्षण छवि वर्गीकरण को एक आकर्षक गेमयुक्त पुरस्कार डैशबोर्ड के साथ जोड़कर, इकोसॉर्ट एआई घरों, स्कूलों और समुदायों को स्थानीय स्तर पर कार्य करने और विश्व स्तर पर प्रभाव डालने के लिए सशक्त बनाता है।",
        about_team_heading: "विकास दल",
        about_future_heading: "भविष्य के विस्तार का दायरा",
        future_item_1: "माइक्रोकंट्रोलर्स और वजन सेंसर का उपयोग करके आईओटी स्मार्ट बिन एकीकरण।",
        future_item_2: "स्थानीय कचरा संग्रह एजेंटों का मानचित्रण और शेड्यूलिंग।",
        future_item_3: "पैकेज्ड उत्पादों के लिए बारकोड स्कैनिंग डेटाबेस।"
    },
    te: {
        nav_home: "హోమ్",
        nav_classify: "వ్యర్థాల AI",
        nav_dashboard: "డ్యాష్‌బోర్డ్",
        nav_chatbot: "ఇకో చాట్",
        nav_rewards: "రివార్డులు",
        nav_about: "గురించి",
        btn_signin: "సైన్ ఇన్",
        btn_signout: "సైన్ అవుట్",
        slogan: "AI సహాయంతో వ్యర్థాలను స్థిరత్వంగా మార్చండి",
        hero_desc: "వ్యర్థాలను సరిగ్గా గుర్తించి వేరు చేయడం ద్వారా మన భూమిని కాపాడటానికి సహాయపడండి. ఏదైనా వ్యర్థ వస్తువు చిత్రాన్ని అప్‌లోడ్ చేయండి మరియు మా అధునాతన AI వెంటనే సరైన పారవేసే పద్ధతిని సూచిస్తుంది.",
        btn_cta: "వ్యర్థాలను స్కాన్ చేయండి",
        sdg_title: "ఐక్యరాజ్యసమితి SDGs మద్దతు",
        sdg_11_title: "SDG 11: స్థిరమైన నగరాలు",
        sdg_11_desc: "వ్యర్థాల వేరుచేయడం మరియు స్థానిక రీసైక్లింగ్‌ను మెరుగుపరచడం ద్వారా నగరాల పర్యావరణ ప్రభావాన్ని తగ్గించండి.",
        sdg_12_title: "SDG 12: బాధ్యతాయుతమైన వినియోగం",
        sdg_12_desc: "స్థిరమైన వినియోగం, వ్యర్థాల తగ్గింపు, కంపోస్టింగ్ మరియు వృత్తాకార ఆర్థిక పద్ధతులను ప్రోత్సహించండి.",
        sdg_13_title: "SDG 13: వాతావరణ చర్య",
        sdg_13_desc: "గ్రీన్‌హౌస్ వాయు ఉద్గారాలను తగ్గించడానికి సేంద్రీయ మరియు రీసైకిల్ చేయగల వస్తువులను ల్యాండ్‌ఫిల్‌ల నుండి రక్షించండి.",
        stats_heading: "ప్రపంచ పర్యావరణ ప్రభావం",
        stats_analyzed: "విశ్లేషించిన వ్యర్థాలు",
        stats_recycled: "రీసైకిల్ చేసిన వస్తువులు",
        stats_carbon: "ఆదా చేసిన కార్బన్ CO2",
        stats_score: "సగటు ఇకో స్కోర్",
        features_heading: "వేదిక యొక్క ముఖ్య లక్షణాలు",
        feature_ai_title: "AI వ్యర్థాల వర్గీకరణ",
        feature_ai_desc: "డీప్ లెర్నింగ్ ఇమేజ్ రికగ్నిషన్ మోడల్‌లను ఉపయోగించి సెకన్లలో వస్తువులను వర్గీకరించండి.",
        feature_gamify_title: "రివార్డుల విధానం",
        feature_gamify_desc: "మీరు రీసైక్లింగ్ అలవాట్లను పెంపొందించుకునేటప్పుడు గ్రీన్ పాయింట్లను సంపాదించండి, స్థాయిని పెంచుకోండి మరియు బ్యాడ్జీలను అన్‌లాక్ చేయండి.",
        feature_analytics_title: "కార్బన్ విశ్లేషణ",
        feature_analytics_desc: "వాస్తవ కొలతలతో మీ వ్యర్థాల వర్గీకరణ చరిత్ర యొక్క ప్రత్యక్ష పర్యావరణ ప్రభావాన్ని ట్రాక్ చేయండి.",
        feature_chatbot_title: "ఇకో చాట్‌బాట్",
        feature_chatbot_desc: "రీసైక్లింగ్ మరియు కంపోస్టింగ్ ప్రశ్నలను అడగడానికి మా AI సస్టైనబిలిటీ అసిస్టెంట్‌తో మాట్లాడండి.",
        classify_heading: "AI వ్యర్థాల వర్గీకరణ ఇంజిన్",
        classify_desc: "వ్యర్థాలను గుర్తించడానికి చిత్రాన్ని డ్రాగ్ & డ్రాప్ చేయండి లేదా మీ పరికరం నుండి ఎంచుకోండి.",
        drag_drop_text: "మీ వ్యర్థ చిత్రాన్ని ఇక్కడ లాగండి మరియు వదలండి",
        or_text: "లేదా",
        browse_btn: "ఫైళ్ళను బ్రౌజ్ చేయండి",
        scanning_text: "AI మీ చిత్రాన్ని విశ్లేషిస్తోంది...",
        prediction_title: "AI అంచనా ఫలితాలు",
        confidence: "విశ్వాస స్కోర్",
        points_earned: "సంపాదించిన పాయింట్లు",
        carbon_saved: "తగ్గిన CO2",
        bin_color: "డస్ట్‌బిన్ రంగు ఎంపిక",
        disposal_guide: "పారవేసే మార్గదర్శకత్వం & చిట్కాలు",
        instructions_title: "సూచనలు",
        suggestions_title: "సలహాలు",
        impact_title: "పర్యావరణ ప్రభావం",
        dashboard_title: "సస్టైనబిలిటీ డ్యాష్‌బోర్డ్",
        dashboard_desc: "మీ వ్యర్థాల వర్గీకరణ ప్రవర్తనను ట్రాక్ చేసే నిజ-సమయ గణాంకాలు మరియు విశ్లేషణలు.",
        total_scans: "మొత్తం స్కాన్లు",
        recyclables_logged: "నమోదైన రీసైకిల్స్",
        hazardous_logged: "హానికరమైన వస్తువులు",
        sustainability_score: "స్థిరత్వ స్కోరు",
        chart_category_title: "వ్యర్థాల వర్గాల వేరుచేయడం",
        chart_timeline_title: "వారపు కార్యాచరణ & కార్బన్ ఆదా",
        history_title: "ఇటీవలి వ్యర్థాల వర్గీకరణ చరిత్ర",
        export_btn: "నివేదికను ఎగుమతి చేయి (PDF/HTML)",
        chatbot_title: "AI సస్టైనబిలిటీ అసిస్టెంట్",
        chatbot_desc: "వ్యర్థాల వేరుచేయడం గురించి ప్రశ్నలు అడగండి, కంపోస్టింగ్ గురించి తెలుసుకోండి లేదా స్థిరమైన జీవనం గురించి విచారించండి.",
        chat_placeholder: "ప్లాస్టిక్ రీసైక్లింగ్, బ్యాటరీ పారవేసే విధానం, కంపోస్టింగ్, SDGs గురించి అడగండి...",
        chat_send: "పంపండి",
        rewards_title: "రివార్డులు & గేమిఫికేషన్",
        rewards_desc: "గ్రీన్ పాయింట్లను సేకరించండి, బ్యాడ్జీలను అన్‌లాక్ చేయండి మరియు లీడర్‌బోర్డ్‌లో పైకి ఎగబాకండి.",
        level_label: "స్థాయి",
        leaderboard_title: "గ్లోబల్ ఇకో లీడర్‌బోర్డ్",
        rank: "ర్యాంక్",
        user: "వినియోగదారు",
        points: "పాయింట్లు",
        badges_title: "అన్‌లాక్ చేయబడిన విజయాలు",
        about_title: "EcoSort AI గురించి",
        about_project_heading: "ప్రాజెక్ట్ అవలోకనం",
        about_project_body: "EcoSort AI అనేది వేరుచేయని వ్యర్థాల పెరుగుతున్న సంక్షోభాన్ని పరిష్కరించడానికి నిర్మించబడిన ఒక స్టార్టప్-నాణ్యత గల స్థిరత్వ వేదిక. ప్రపంచవ్యాప్తంగా, ఏటా 2 బిలియన్ టన్నుల మునిసిపల్ వ్యర్థాలు ఉత్పత్తి అవుతుండగా, అందులో 20% కంటే తక్కువ మాత్రమే రీసైకిల్ చేయబడుతున్నాయి. డీప్ లెర్నింగ్ ఇమేజ్ వర్గీకరణను రివార్డ్స్ డ్యాష్‌బోర్డ్‌తో కలపడం ద్వారా, EcoSort AI గృహాలు, పాఠశాలలు మరియు సంఘాలను స్థానికంగా పనిచేసి ప్రపంచవ్యాప్తంగా ప్రభావం చూపేలా ప్రోత్సహిస్తుంది.",
        about_team_heading: "ప్రాజెక్ట్ బృందం",
        about_future_heading: "భవిష్యత్ విస్తరణ పరిధి",
        future_item_1: "మైక్రోకంట్రోలర్లు మరియు బరువు సెన్సార్లను ఉపయోగించి IoT స్మార్ట్ బిన్ అనుసంధానం.",
        future_item_2: "స్థానిక వ్యర్థాల సేకరణ ఏజెంట్ల మ్యాపింగ్ మరియు షెడ్యూలింగ్.",
        future_item_3: "ప్యాక్ చేయబడిన ఉత్పత్తుల కోసం బార్‌కోడ్ స్కానింగ్ డేటాబేస్."
    }
};

// Translate function helper
function t(key) {
    return translations[state.language][key] || key;
}

// ----------------- Theme & Layout Management -----------------

function applyTheme() {
    if (state.isDarkMode) {
        document.documentElement.classList.add('dark');
        document.getElementById('theme-icon-sun').classList.remove('hidden');
        document.getElementById('theme-icon-moon').classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        document.getElementById('theme-icon-sun').classList.add('hidden');
        document.getElementById('theme-icon-moon').classList.remove('hidden');
    }
}

function toggleTheme() {
    state.isDarkMode = !state.isDarkMode;
    localStorage.setItem('ecosort_theme', state.isDarkMode ? 'dark' : 'light');
    applyTheme();
}

function toggleLangDropdown() {
    const dropdown = document.getElementById('lang-dropdown');
    dropdown.classList.toggle('hidden');
}

function changeLang(lang) {
    state.language = lang;
    localStorage.setItem('ecosort_lang', lang);
    document.getElementById('active-lang').innerText = lang;
    document.getElementById('lang-dropdown').classList.add('hidden');
    
    // If logged in, save preference to backend asynchronously
    if (state.token) {
        fetch('/api/profile/language', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            },
            body: JSON.stringify({ language: lang })
        }).catch(err => console.log("Failed to sync language setting to server"));
    }
    
    // Re-render current page and refresh navbar text
    updateNavbarTranslations();
    renderPage(state.activePage);
}

function updateNavbarTranslations() {
    document.getElementById('nav-home').innerText = t('nav_home');
    document.getElementById('nav-classify').innerText = t('nav_classify');
    document.getElementById('nav-dashboard').innerText = t('nav_dashboard');
    document.getElementById('nav-chatbot').innerText = t('nav_chatbot');
    document.getElementById('nav-rewards').innerText = t('nav_rewards');
    document.getElementById('nav-about').innerText = t('nav_about');
    
    const signInBtn = document.querySelector('#auth-section button');
    if (signInBtn && !state.token) {
        signInBtn.innerText = t('btn_signin');
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('menu-icon-open');
    const closeIcon = document.getElementById('menu-icon-close');
    
    menu.classList.toggle('hidden');
    openIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
}

// ----------------- Navigation Router -----------------

function navigateTo(page) {
    state.activePage = page;
    
    // Update active state in desktop navbar buttons
    const navIds = ['home', 'classify', 'dashboard', 'chatbot', 'rewards', 'about'];
    navIds.forEach(id => {
        const btn = document.getElementById(`nav-${id}`);
        if (id === page) {
            btn.className = "px-3 py-2 rounded-lg text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 transition-all";
        } else {
            btn.className = "px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-500/5 transition-all";
        }
    });
    
    renderPage(page);
}

function renderPage(page) {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    
    // Route page renderers
    switch(page) {
        case 'home':
            renderHome(container);
            break;
        case 'classify':
            renderClassify(container);
            break;
        case 'dashboard':
            if (!state.token) {
                navigateTo('home');
                openAuthModal();
            } else {
                renderDashboard(container);
            }
            break;
        case 'chatbot':
            renderChatbot(container);
            break;
        case 'rewards':
            renderRewards(container);
            break;
        case 'about':
            renderAbout(container);
            break;
        default:
            renderHome(container);
    }
    
    // Initialize newly rendered icons
    lucide.createIcons();
}

// ----------------- Page Renderers -----------------

function renderHome(container) {
    container.innerHTML = `
        <div class="space-y-16">
            <!-- Hero Section -->
            <section class="text-center max-w-4xl mx-auto space-y-6 pt-8">
                <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold font-outfit tracking-tight leading-tight">
                    <span class="bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-500 bg-clip-text text-transparent">${t('slogan')}</span>
                </h1>
                <p class="text-base sm:text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-normal">
                    ${t('hero_desc')}
                </p>
                <div class="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <button onclick="navigateTo('classify')" class="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/35 transition-all text-base transform hover:-translate-y-0.5">
                        ${t('btn_cta')}
                    </button>
                    <button onclick="navigateTo('about')" class="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-semibold rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-base">
                        ${t('nav_about')}
                    </button>
                </div>
            </section>

            <!-- SDG Highlights -->
            <section class="space-y-8">
                <h2 class="text-3xl font-bold font-outfit text-center text-slate-800 dark:text-white">${t('sdg_title')}</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- SDG 11 -->
                    <div class="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-emerald-500/10 hover:border-emerald-500/20 hover:shadow-xl transition-all duration-300">
                        <div class="space-y-4">
                            <div class="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-amber-500/20">11</div>
                            <h3 class="text-xl font-bold font-outfit text-slate-800 dark:text-white">${t('sdg_11_title')}</h3>
                            <p class="text-sm text-slate-500 dark:text-slate-400">${t('sdg_11_desc')}</p>
                        </div>
                        <a href="https://sdgs.un.org/goals/goal11" target="_blank" class="mt-6 text-emerald-500 hover:text-emerald-600 text-sm font-semibold flex items-center space-x-1">
                            <span>Learn More</span> <i data-lucide="arrow-right" class="w-4 h-4"></i>
                        </a>
                    </div>
                    <!-- SDG 12 -->
                    <div class="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-emerald-500/10 hover:border-emerald-500/20 hover:shadow-xl transition-all duration-300">
                        <div class="space-y-4">
                            <div class="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-amber-600/20">12</div>
                            <h3 class="text-xl font-bold font-outfit text-slate-800 dark:text-white">${t('sdg_12_title')}</h3>
                            <p class="text-sm text-slate-500 dark:text-slate-400">${t('sdg_12_desc')}</p>
                        </div>
                        <a href="https://sdgs.un.org/goals/goal12" target="_blank" class="mt-6 text-emerald-500 hover:text-emerald-600 text-sm font-semibold flex items-center space-x-1">
                            <span>Learn More</span> <i data-lucide="arrow-right" class="w-4 h-4"></i>
                        </a>
                    </div>
                    <!-- SDG 13 -->
                    <div class="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-emerald-500/10 hover:border-emerald-500/20 hover:shadow-xl transition-all duration-300">
                        <div class="space-y-4">
                            <div class="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-emerald-600/20">13</div>
                            <h3 class="text-xl font-bold font-outfit text-slate-800 dark:text-white">${t('sdg_13_title')}</h3>
                            <p class="text-sm text-slate-500 dark:text-slate-400">${t('sdg_13_desc')}</p>
                        </div>
                        <a href="https://sdgs.un.org/goals/goal13" target="_blank" class="mt-6 text-emerald-500 hover:text-emerald-600 text-sm font-semibold flex items-center space-x-1">
                            <span>Learn More</span> <i data-lucide="arrow-right" class="w-4 h-4"></i>
                        </a>
                    </div>
                </div>
            </section>

            <!-- Statistics Section -->
            <section class="glass-card rounded-3xl p-8 border border-emerald-500/10 relative overflow-hidden">
                <div class="absolute right-0 bottom-0 translate-x-10 translate-y-10 text-slate-100 dark:text-slate-900/10 text-9xl font-extrabold select-none pointer-events-none">ECO</div>
                <h2 class="text-2xl sm:text-3xl font-bold font-outfit text-center text-slate-800 dark:text-white mb-8">${t('stats_heading')}</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div class="space-y-1">
                        <p class="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-outfit">18,520+</p>
                        <p class="text-xs sm:text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase">${t('stats_analyzed')}</p>
                    </div>
                    <div class="space-y-1">
                        <p class="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-outfit">12,410+</p>
                        <p class="text-xs sm:text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase">${t('stats_recycled')}</p>
                    </div>
                    <div class="space-y-1">
                        <p class="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-outfit">9,800 kg</p>
                        <p class="text-xs sm:text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase">${t('stats_carbon')}</p>
                    </div>
                    <div class="space-y-1">
                        <p class="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-outfit">94.2%</p>
                        <p class="text-xs sm:text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase">${t('stats_score')}</p>
                    </div>
                </div>
            </section>

            <!-- Features Section -->
            <section class="space-y-8">
                <h2 class="text-3xl font-bold font-outfit text-center text-slate-800 dark:text-white">${t('features_heading')}</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="glass-card rounded-2xl p-6 border border-emerald-500/5 hover:border-emerald-500/20 hover:-translate-y-1 transition-all duration-300">
                        <div class="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 w-fit mb-4">
                            <i data-lucide="scan" class="w-6 h-6"></i>
                        </div>
                        <h3 class="text-lg font-bold font-outfit mb-2 text-slate-800 dark:text-white">${t('feature_ai_title')}</h3>
                        <p class="text-sm text-slate-500 dark:text-slate-400">${t('feature_ai_desc')}</p>
                    </div>
                    <div class="glass-card rounded-2xl p-6 border border-emerald-500/5 hover:border-emerald-500/20 hover:-translate-y-1 transition-all duration-300">
                        <div class="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 w-fit mb-4">
                            <i data-lucide="trophy" class="w-6 h-6"></i>
                        </div>
                        <h3 class="text-lg font-bold font-outfit mb-2 text-slate-800 dark:text-white">${t('feature_gamify_title')}</h3>
                        <p class="text-sm text-slate-500 dark:text-slate-400">${t('feature_gamify_desc')}</p>
                    </div>
                    <div class="glass-card rounded-2xl p-6 border border-emerald-500/5 hover:border-emerald-500/20 hover:-translate-y-1 transition-all duration-300">
                        <div class="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 w-fit mb-4">
                            <i data-lucide="bar-chart-2" class="w-6 h-6"></i>
                        </div>
                        <h3 class="text-lg font-bold font-outfit mb-2 text-slate-800 dark:text-white">${t('feature_analytics_title')}</h3>
                        <p class="text-sm text-slate-500 dark:text-slate-400">${t('feature_analytics_desc')}</p>
                    </div>
                    <div class="glass-card rounded-2xl p-6 border border-emerald-500/5 hover:border-emerald-500/20 hover:-translate-y-1 transition-all duration-300">
                        <div class="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 w-fit mb-4">
                            <i data-lucide="message-square" class="w-6 h-6"></i>
                        </div>
                        <h3 class="text-lg font-bold font-outfit mb-2 text-slate-800 dark:text-white">${t('feature_chatbot_title')}</h3>
                        <p class="text-sm text-slate-500 dark:text-slate-400">${t('feature_chatbot_desc')}</p>
                    </div>
                </div>
            </section>
        </div>
    `;
}

function renderClassify(container) {
    container.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <!-- Upload Column -->
            <div class="lg:col-span-7 space-y-6">
                <div class="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/10">
                    <h2 class="text-2xl sm:text-3xl font-bold font-outfit text-slate-800 dark:text-white mb-2">${t('classify_heading')}</h2>
                    <p class="text-sm text-slate-500 dark:text-slate-400 mb-6">${t('classify_desc')}</p>
                    
                    <!-- Drag and Drop Box -->
                    <div id="drop-zone" class="border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-2xl p-8 text-center cursor-pointer transition-all bg-slate-50/50 dark:bg-slate-950/20 relative group">
                        <input type="file" id="file-input" class="hidden" accept="image/*" onchange="handleFileSelect(event)">
                        
                        <div class="space-y-4" id="upload-prompt">
                            <div class="inline-flex p-4 bg-emerald-500/10 rounded-2xl text-emerald-500 group-hover:scale-110 transition-transform">
                                <i data-lucide="upload-cloud" class="w-8 h-8"></i>
                            </div>
                            <div>
                                <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">${t('drag_drop_text')}</p>
                                <p class="text-xs text-slate-400 mt-1">${t('or_text')}</p>
                            </div>
                            <button onclick="document.getElementById('file-input').click()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-emerald-500/10">
                                ${t('browse_btn')}
                            </button>
                        </div>
                        
                        <!-- Preview container -->
                        <div id="preview-container" class="hidden flex flex-col items-center space-y-4">
                            <img id="image-preview" src="#" alt="Upload Preview" class="max-h-64 rounded-xl object-contain shadow-md border border-slate-200 dark:border-slate-800">
                            <div class="flex space-x-2">
                                <button onclick="resetUpload(event)" class="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition-all">Remove</button>
                                <button onclick="submitClassification()" id="analyze-btn" class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-emerald-500/15">Analyze Waste</button>
                            </div>
                        </div>

                        <!-- Loading Indicator -->
                        <div id="loading-indicator" class="hidden py-8 space-y-4">
                            <div class="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">${t('scanning_text')}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Prediction & disposal guide column -->
            <div class="lg:col-span-5" id="result-column">
                <div class="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/10 text-center py-16 text-slate-400 dark:text-slate-500">
                    <i data-lucide="sparkles" class="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-slate-800"></i>
                    <p class="text-sm">Scan an image of waste to see classification, guidance, carbon offset, and earn Green Points.</p>
                </div>
            </div>
        </div>
    `;
    
    // Add Drag & Drop Listeners
    setupDragAndDrop();
}

function setupDragAndDrop() {
    const dropZone = document.getElementById('drop-zone');
    if (!dropZone) return;
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefault, false);
    });
    
    function preventDefault(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.add('border-emerald-500', 'bg-emerald-500/5'), false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove('border-emerald-500', 'bg-emerald-500/5'), false);
    });
    
    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0) {
            handleImageFile(files[0]);
        }
    });
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleImageFile(file);
    }
}

let selectedImageFile = null;

function handleImageFile(file) {
    selectedImageFile = file;
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('upload-prompt').classList.add('hidden');
        const previewContainer = document.getElementById('preview-container');
        previewContainer.classList.remove('hidden');
        const img = document.getElementById('image-preview');
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function resetUpload(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    selectedImageFile = null;
    document.getElementById('file-input').value = '';
    document.getElementById('upload-prompt').classList.remove('hidden');
    document.getElementById('preview-container').classList.add('hidden');
}

function submitClassification() {
    if (!selectedImageFile) return;
    
    const analyzeBtn = document.getElementById('analyze-btn');
    const previewContainer = document.getElementById('preview-container');
    const loadingIndicator = document.getElementById('loading-indicator');
    
    previewContainer.classList.add('hidden');
    loadingIndicator.classList.remove('hidden');
    
    const formData = new FormData();
    formData.append('image', selectedImageFile);
    
    const headers = {};
    if (state.token) {
        headers['Authorization'] = `Bearer ${state.token}`;
    }
    
    fetch('/api/classify', {
        method: 'POST',
        headers: headers,
        body: formData
    })
    .then(res => {
        if (!res.ok) throw new Error("Classification failed");
        return res.json();
    })
    .then(data => {
        loadingIndicator.classList.add('hidden');
        previewContainer.classList.remove('hidden');
        
        // If user logged in, update level/points state
        if (data.savedToHistory && data.userStats) {
            state.user.points = data.userStats.points;
            state.user.level = data.userStats.level;
            state.user.badges = data.userStats.badges;
            localStorage.setItem('ecosort_user', JSON.stringify(state.user));
            updateAuthDisplay();
        }
        
        renderClassifyResult(data);
    })
    .catch(err => {
        loadingIndicator.classList.add('hidden');
        previewContainer.classList.remove('hidden');
        alert("Classification server error. Make sure image is valid and server is running.");
    });
}

function renderClassifyResult(data) {
    const col = document.getElementById('result-column');
    
    // Choose badge style and color based on category
    let colorClass = "emerald";
    let iconClass = "smile";
    let bgGradient = "from-emerald-500 to-green-600";
    
    const cat = data.category;
    if (cat === "Recyclable Waste") {
        colorClass = "blue";
        iconClass = "recycle";
        bgGradient = "from-blue-500 to-blue-600";
    } else if (cat === "Dry Waste") {
        colorClass = "slate";
        iconClass = "trash-2";
        bgGradient = "from-slate-500 to-slate-600";
    } else if (cat === "Hazardous Waste") {
        colorClass = "red";
        iconClass = "alert-triangle";
        bgGradient = "from-red-500 to-rose-600";
    } else if (cat === "E-Waste") {
        colorClass = "orange";
        iconClass = "cpu";
        bgGradient = "from-orange-500 to-amber-600";
    }
    
    col.innerHTML = `
        <div class="glass-card rounded-3xl p-6 border border-emerald-500/10 space-y-6 fade-in">
            <!-- Header Prediction Info -->
            <div class="text-center pb-4 border-b border-slate-100 dark:border-slate-800">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-${colorClass}-500/10 text-${colorClass}-500 mb-2 uppercase tracking-widest">${cat}</span>
                <h3 class="text-2xl font-bold font-outfit text-slate-800 dark:text-white">${data.itemName}</h3>
                <p class="text-xs text-slate-400 mt-1">${t('confidence')}: ${(data.confidence * 100).toFixed(0)}%</p>
            </div>

            <!-- Stats Gained -->
            <div class="grid grid-cols-2 gap-4 text-center">
                <div class="p-3 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                    <p class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">${t('points_earned')}</p>
                    <p class="text-xl font-extrabold text-emerald-600 font-outfit">+${data.pointsEarned} GP</p>
                </div>
                <div class="p-3 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                    <p class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">${t('carbon_saved')}</p>
                    <p class="text-xl font-extrabold text-emerald-600 font-outfit">${data.carbonSaved} kg</p>
                </div>
            </div>

            <!-- Bin Color indicator -->
            <div class="p-4 bg-slate-50 dark:bg-slate-950/30 rounded-2xl flex items-center space-x-4 border border-slate-100 dark:border-slate-800">
                <div class="w-12 h-16 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-md bg-${colorClass}-500 relative">
                    <span class="absolute top-2 w-6 h-1 bg-white/20 rounded-full"></span>
                    <span class="absolute bottom-2 w-8 h-1 bg-white/10 rounded-full"></span>
                    ♻️
                </div>
                <div>
                    <h4 class="text-sm font-bold text-slate-700 dark:text-slate-200">${t('bin_color')}</h4>
                    <p class="text-base font-extrabold text-${colorClass}-500">${data.binColor}</p>
                </div>
            </div>

            <!-- Disposal Guidance -->
            <div class="space-y-4 text-left">
                <h4 class="text-base font-bold font-outfit text-slate-800 dark:text-white flex items-center space-x-2 border-b border-slate-100 dark:border-slate-850 pb-2">
                    <i data-lucide="shield-alert" class="w-5 h-5 text-emerald-500"></i>
                    <span>${t('disposal_guide')}</span>
                </h4>
                
                <div class="space-y-2">
                    <p class="text-sm">
                        <strong class="text-slate-700 dark:text-slate-200 block mb-0.5">${t('instructions_title')}</strong>
                        <span class="text-slate-500 dark:text-slate-400">${data.instructions}</span>
                    </p>
                    <p class="text-sm">
                        <strong class="text-slate-700 dark:text-slate-200 block mb-0.5">${t('suggestions_title')}</strong>
                        <span class="text-slate-500 dark:text-slate-400">${data.suggestions}</span>
                    </p>
                    <p class="text-sm">
                        <strong class="text-slate-700 dark:text-slate-200 block mb-0.5">${t('impact_title')}</strong>
                        <span class="text-slate-500 dark:text-slate-400">${data.environmentalImpact}</span>
                    </p>
                </div>
            </div>
            
            ${!state.token ? `
            <div class="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-600 dark:text-amber-400 text-center">
                <strong>Eco-Tip:</strong> Log in to save this scan to your profile and build your leaderboard position!
            </div>` : ''}
        </div>
    `;
    lucide.createIcons();
}

function renderDashboard(container) {
    container.innerHTML = `
        <div class="space-y-8">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                    <h2 class="text-3xl font-extrabold font-outfit text-slate-800 dark:text-white">${t('dashboard_title')}</h2>
                    <p class="text-sm text-slate-500 dark:text-slate-400">${t('dashboard_desc')}</p>
                </div>
                <div class="flex space-x-2">
                    <button onclick="exportReport()" class="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/10 transition-all text-sm flex items-center space-x-2">
                        <i data-lucide="download" class="w-4 h-4"></i>
                        <span>${t('export_btn')}</span>
                    </button>
                </div>
            </div>

            <!-- Summary metrics -->
            <div id="db-metrics" class="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Metrics will load dynamically -->
                <div class="glass-card rounded-2xl p-6 border border-emerald-500/10 text-center animate-pulse"><div class="h-8 bg-slate-200 dark:bg-slate-800 rounded mb-2"></div><div class="h-4 bg-slate-200 dark:bg-slate-800 w-1/2 mx-auto rounded"></div></div>
                <div class="glass-card rounded-2xl p-6 border border-emerald-500/10 text-center animate-pulse"><div class="h-8 bg-slate-200 dark:bg-slate-800 rounded mb-2"></div><div class="h-4 bg-slate-200 dark:bg-slate-800 w-1/2 mx-auto rounded"></div></div>
                <div class="glass-card rounded-2xl p-6 border border-emerald-500/10 text-center animate-pulse"><div class="h-8 bg-slate-200 dark:bg-slate-800 rounded mb-2"></div><div class="h-4 bg-slate-200 dark:bg-slate-800 w-1/2 mx-auto rounded"></div></div>
                <div class="glass-card rounded-2xl p-6 border border-emerald-500/10 text-center animate-pulse"><div class="h-8 bg-slate-200 dark:bg-slate-800 rounded mb-2"></div><div class="h-4 bg-slate-200 dark:bg-slate-800 w-1/2 mx-auto rounded"></div></div>
            </div>

            <!-- Charts Row -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <!-- Waste Segregation Categories -->
                <div class="lg:col-span-5 glass-card rounded-3xl p-6 border border-emerald-500/10 flex flex-col justify-between">
                    <div>
                        <h3 class="text-lg font-bold font-outfit text-slate-800 dark:text-white mb-4">${t('chart_category_title')}</h3>
                        <div class="h-64 flex items-center justify-center relative">
                            <canvas id="category-chart"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Timeline Bar Chart -->
                <div class="lg:col-span-7 glass-card rounded-3xl p-6 border border-emerald-500/10 flex flex-col justify-between">
                    <div>
                        <h3 class="text-lg font-bold font-outfit text-slate-800 dark:text-white mb-4">${t('chart_timeline_title')}</h3>
                        <div class="h-64 relative">
                            <canvas id="timeline-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Log History Table -->
            <div class="glass-card rounded-3xl p-6 border border-emerald-500/10 overflow-hidden">
                <h3 class="text-xl font-bold font-outfit text-slate-800 dark:text-white mb-4">${t('history_title')}</h3>
                <div class="overflow-x-auto">
                    <table class="min-w-full text-sm text-left">
                        <thead>
                            <tr class="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold">
                                <th class="py-3 px-4">Item Name</th>
                                <th class="py-3 px-4">Category</th>
                                <th class="py-3 px-4">Confidence</th>
                                <th class="py-3 px-4 text-center">Carbon Offset</th>
                                <th class="py-3 px-4 text-right">Points</th>
                            </tr>
                        </thead>
                        <tbody id="db-history-rows" class="divide-y divide-slate-100/50 dark:divide-slate-800/50">
                            <!-- Logs will dynamically render -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    fetchDashboardData();
}

function fetchDashboardData() {
    fetch('/api/dashboard', {
        headers: { 'Authorization': `Bearer ${state.token}` }
    })
    .then(res => res.json())
    .then(data => {
        state.dashboardStats = data;
        renderDashboardContent(data);
    })
    .catch(err => {
        console.error("Dashboard fetch error:", err);
    });
}

function renderDashboardContent(data) {
    // Fill metrics cards
    const metricsContainer = document.getElementById('db-metrics');
    const stats = data.stats;
    metricsContainer.innerHTML = `
        <div class="glass-card rounded-2xl p-6 border border-emerald-500/10 text-center">
            <p class="text-3xl font-extrabold text-emerald-600 font-outfit">${stats.totalScans}</p>
            <p class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mt-1">${t('total_scans')}</p>
        </div>
        <div class="glass-card rounded-2xl p-6 border border-emerald-500/10 text-center">
            <p class="text-3xl font-extrabold text-emerald-600 font-outfit">${stats.recyclableCount}</p>
            <p class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mt-1">${t('recyclables_logged')}</p>
        </div>
        <div class="glass-card rounded-2xl p-6 border border-emerald-500/10 text-center">
            <p class="text-3xl font-extrabold text-emerald-600 font-outfit">${stats.hazardousCount}</p>
            <p class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mt-1">${t('hazardous_logged')}</p>
        </div>
        <div class="glass-card rounded-2xl p-6 border border-emerald-500/10 text-center relative overflow-hidden">
            <p class="text-3xl font-extrabold text-emerald-600 font-outfit">${stats.sustainabilityScore}/100</p>
            <p class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mt-1">${t('sustainability_score')}</p>
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500" style="width: ${stats.sustainabilityScore}%"></div>
        </div>
    `;

    // Category Doughnut Chart
    const ctxCat = document.getElementById('category-chart').getContext('2d');
    const catData = data.categoryChartData;
    new Chart(ctxCat, {
        type: 'doughnut',
        data: {
            labels: catData.map(c => c.name),
            datasets: [{
                data: catData.map(c => c.value),
                backgroundColor: catData.map(c => c.color),
                borderWidth: 2,
                borderColor: state.isDarkMode ? '#0f172a' : '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: state.isDarkMode ? '#94a3b8' : '#475569',
                        font: { family: 'Inter', size: 11 }
                    }
                }
            },
            cutout: '65%'
        }
    });

    // Activity timeline bar/line chart
    const ctxTimeline = document.getElementById('timeline-chart').getContext('2d');
    const timeline = data.timelineChartData;
    new Chart(ctxTimeline, {
        type: 'bar',
        data: {
            labels: timeline.map(t => t.day),
            datasets: [
                {
                    label: 'Scans Handled',
                    data: timeline.map(t => t.scans),
                    backgroundColor: '#10b981',
                    borderRadius: 6
                },
                {
                    label: 'Carbon Saved (kg)',
                    data: timeline.map(t => t.carbon),
                    backgroundColor: '#3b82f6',
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: state.isDarkMode ? '#94a3b8' : '#475569' }
                },
                y: {
                    grid: { color: state.isDarkMode ? '#1e293b' : '#f1f5f9' },
                    ticks: { color: state.isDarkMode ? '#94a3b8' : '#475569', stepSize: 1 }
                }
            },
            plugins: {
                legend: {
                    labels: { color: state.isDarkMode ? '#94a3b8' : '#475569' }
                }
            }
        }
    });

    // History log rows
    const historyContainer = document.getElementById('db-history-rows');
    const recent = data.recentHistory;
    
    if (recent.length === 0) {
        historyContainer.innerHTML = `
            <tr>
                <td colspan="5" class="py-6 text-center text-slate-400 dark:text-slate-600">No waste items scanned yet. Head over to Waste AI to test the classifier.</td>
            </tr>
        `;
        return;
    }
    
    let html = "";
    recent.forEach(log => {
        let badgeColor = "slate";
        if (log.category === "Recyclable Waste") badgeColor = "blue";
        else if (log.category === "Wet Waste") badgeColor = "green";
        else if (log.category === "Hazardous Waste") badgeColor = "red";
        else if (log.category === "E-Waste") badgeColor = "orange";
        
        html += `
            <tr class="hover:bg-slate-500/5 transition-colors">
                <td class="py-4 px-4 font-semibold text-slate-700 dark:text-slate-200">${log.item_name}</td>
                <td class="py-4 px-4">
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-${badgeColor}-500/10 text-${badgeColor}-500 uppercase tracking-widest">${log.category}</span>
                </td>
                <td class="py-4 px-4 text-slate-400">${(log.confidence * 100).toFixed(0)}%</td>
                <td class="py-4 px-4 text-center text-emerald-500 font-semibold">${log.carbon_saved.toFixed(2)} kg</td>
                <td class="py-4 px-4 text-right text-emerald-500 font-bold font-outfit">+${log.points_earned} GP</td>
            </tr>
        `;
    });
    historyContainer.innerHTML = html;
}

function exportReport() {
    // We open export route in a new tab to download the file directly
    const url = `/api/report/export${state.token ? `?auth_token=${state.token}` : ''}`;
    
    // In production environment we pass JWT token in authorization headers, but since standard file download doesn't support headers easily:
    // We fetch it and convert to Blob or pass it via url parameter that Flask handles.
    // Let's implement an direct AJAX fetch and download:
    const headers = {};
    if (state.token) {
        headers['Authorization'] = `Bearer ${state.token}`;
    }
    
    fetch('/api/report/export', {
        headers: headers
    })
    .then(res => {
        if (!res.ok) throw new Error("Export failed");
        
        // Find correct extension from content-type
        const contentType = res.headers.get('content-type');
        const ext = contentType.includes('pdf') ? 'pdf' : 'html';
        
        return res.blob().then(blob => ({ blob, ext }));
    })
    .then(({ blob, ext }) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ecosort_sustainability_report.${ext}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    })
    .catch(err => {
        alert("Report generation failed: " + err.message);
    });
}

function renderChatbot(container) {
    container.innerHTML = `
        <div class="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/10 max-w-4xl mx-auto flex flex-col h-[70vh] justify-between">
            <div>
                <h2 class="text-2xl font-bold font-outfit text-slate-800 dark:text-white flex items-center space-x-2">
                    <i data-lucide="message-square" class="w-6 h-6 text-emerald-500 animate-bounce"></i>
                    <span>${t('chatbot_title')}</span>
                </h2>
                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 pb-4 border-b border-slate-100 dark:border-slate-800">${t('chatbot_desc')}</p>
            </div>

            <!-- Message Area -->
            <div id="chat-messages" class="flex-grow overflow-y-auto my-4 space-y-4 pr-2 scroll-smooth">
                <!-- Chat Greeting -->
                <div class="flex items-start space-x-3">
                    <div class="p-2 bg-emerald-500/10 rounded-xl text-emerald-500 mt-1">
                        <i data-lucide="bot" class="w-5 h-5"></i>
                    </div>
                    <div class="p-4 bg-slate-100 dark:bg-slate-900 rounded-3xl max-w-[80%] rounded-tl-none">
                        <p class="text-sm text-slate-700 dark:text-slate-300">
                            ${t('chat_placeholder') === translations.en.chat_placeholder ? translations[state.language].greeting : translations[state.language].greeting}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Input area -->
            <form onsubmit="handleChatSubmit(event)" class="flex items-center space-x-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <input type="text" id="chat-input" required placeholder="${t('chat_placeholder')}" class="flex-grow px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-emerald-500 text-sm transition-colors text-slate-800 dark:text-white">
                <button type="submit" class="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-lg shadow-emerald-500/15 transition-all">
                    <i data-lucide="send" class="w-5 h-5"></i>
                </button>
            </form>
        </div>
    `;
    
    // Populate past session chats if any
    renderPastChats();
}

function renderPastChats() {
    const chatContainer = document.getElementById('chat-messages');
    if (!chatContainer || state.chatHistory.length === 0) return;
    
    // Clear and render all
    chatContainer.innerHTML = `
        <div class="flex items-start space-x-3">
            <div class="p-2 bg-emerald-500/10 rounded-xl text-emerald-500 mt-1">
                <i data-lucide="bot" class="w-5 h-5"></i>
            </div>
            <div class="p-4 bg-slate-100 dark:bg-slate-900 rounded-3xl max-w-[80%] rounded-tl-none">
                <p class="text-sm text-slate-700 dark:text-slate-300">${translations[state.language].greeting}</p>
            </div>
        </div>
    `;
    
    state.chatHistory.forEach(chat => {
        addMessageBubble(chat.text, chat.isUser);
    });
    
    scrollToBottom();
}

function handleChatSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;
    
    input.value = '';
    
    // 1. Add User Message
    addMessageBubble(text, true);
    state.chatHistory.push({ text: text, isUser: true });
    scrollToBottom();
    
    // 2. Query Chatbot Endpoint
    fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, language: state.language })
    })
    .then(res => res.json())
    .then(data => {
        addMessageBubble(data.reply, false);
        state.chatHistory.push({ text: data.reply, isUser: false });
        scrollToBottom();
    })
    .catch(err => {
        addMessageBubble("Sorry, I'm having trouble connecting to my knowledge base right now.", false);
        scrollToBottom();
    });
}

function addMessageBubble(text, isUser) {
    const container = document.getElementById('chat-messages');
    if (!container) return;
    
    const div = document.createElement('div');
    div.className = isUser ? "flex items-start space-x-3 justify-end" : "flex items-start space-x-3";
    
    const formattedText = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    div.innerHTML = isUser ? `
        <div class="p-4 bg-emerald-600 text-white rounded-3xl max-w-[80%] rounded-tr-none">
            <p class="text-sm">${formattedText}</p>
        </div>
        <div class="p-2 bg-emerald-600/10 rounded-xl text-emerald-600 mt-1">
            <i data-lucide="user" class="w-5 h-5"></i>
        </div>
    ` : `
        <div class="p-2 bg-emerald-500/10 rounded-xl text-emerald-500 mt-1">
            <i data-lucide="bot" class="w-5 h-5"></i>
        </div>
        <div class="p-4 bg-slate-100 dark:bg-slate-900 rounded-3xl max-w-[80%] rounded-tl-none">
            <p class="text-sm text-slate-700 dark:text-slate-300">${formattedText}</p>
        </div>
    `;
    
    container.appendChild(div);
    lucide.createIcons();
}

function scrollToBottom() {
    const chatContainer = document.getElementById('chat-messages');
    if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

function renderRewards(container) {
    container.innerHTML = `
        <div class="space-y-8">
            <div class="text-center max-w-2xl mx-auto">
                <h2 class="text-3xl font-extrabold font-outfit text-slate-800 dark:text-white">${t('rewards_title')}</h2>
                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">${t('rewards_desc')}</p>
            </div>

            <!-- Gamification profile progress card -->
            <div class="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div class="absolute right-0 bottom-0 translate-x-12 translate-y-12 text-slate-100 dark:text-slate-900/15 text-8xl font-black select-none pointer-events-none">GP</div>
                <div class="flex items-center space-x-5">
                    <div class="w-20 h-20 rounded-full border-4 border-emerald-500 flex items-center justify-center bg-emerald-500/10 text-emerald-500 font-extrabold text-3xl font-outfit shadow-lg shadow-emerald-500/20 animate-pulse">
                        <span id="rewards-level">1</span>
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold font-outfit text-slate-800 dark:text-white" id="rewards-username">${state.user ? state.user.username : 'Guest User'}</h3>
                        <p class="text-sm text-slate-400 dark:text-slate-500" id="rewards-level-label">${t('level_label')} 1 Eco-Sort Novice</p>
                    </div>
                </div>
                
                <div class="w-full md:w-96 space-y-2">
                    <div class="flex justify-between text-xs font-semibold text-slate-400">
                        <span id="rewards-progress-label">0 / 100 GP</span>
                        <span>Level Up at +100 GP</span>
                    </div>
                    <div class="w-full bg-slate-100 dark:bg-slate-950/50 rounded-full h-4 overflow-hidden border border-slate-200/50 dark:border-slate-800">
                        <div id="rewards-progress-bar" class="bg-gradient-to-r from-emerald-500 to-green-600 h-full rounded-full transition-all duration-1000" style="width: 0%"></div>
                    </div>
                </div>
            </div>

            <!-- Achievements & Leaderboard side-by-side -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto">
                
                <!-- Unlocked Achievements -->
                <div class="lg:col-span-7 glass-card rounded-3xl p-6 border border-emerald-500/10 space-y-6">
                    <h3 class="text-xl font-bold font-outfit text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">${t('badges_title')}</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" id="badges-container">
                        <!-- Badges list dynamically rendered -->
                        <div class="h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
                        <div class="h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
                    </div>
                </div>

                <!-- Global Leaderboard -->
                <div class="lg:col-span-5 glass-card rounded-3xl p-6 border border-emerald-500/10 space-y-6">
                    <h3 class="text-xl font-bold font-outfit text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">${t('leaderboard_title')}</h3>
                    <div class="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800">
                        <table class="min-w-full text-sm text-left">
                            <thead>
                                <tr class="bg-slate-50 dark:bg-slate-950 text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-850">
                                    <th class="py-3 px-4 text-center w-12">${t('rank')}</th>
                                    <th class="py-3 px-4">${t('user')}</th>
                                    <th class="py-3 px-4 text-right">${t('points')}</th>
                                </tr>
                            </thead>
                            <tbody id="leaderboard-rows" class="divide-y divide-slate-100/50 dark:divide-slate-800/50">
                                <!-- Leaderboard dynamically rendered -->
                                <tr class="animate-pulse"><td class="py-4"></td><td class="h-6 bg-slate-200 dark:bg-slate-800 m-2 rounded"></td><td></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;

    fetchRewardsData();
}

function fetchRewardsData() {
    const headers = {};
    if (state.token) {
        headers['Authorization'] = `Bearer ${state.token}`;
    }

    fetch('/api/rewards', {
        headers: headers
    })
    .then(res => res.json())
    .then(data => {
        state.rewardsData = data;
        renderRewardsContent(data);
    })
    .catch(err => {
        console.error("Rewards fetch error:", err);
    });
}

function renderRewardsContent(data) {
    // Progress
    const lp = data.levelProgress;
    const progressLabel = document.getElementById('rewards-progress-label');
    const progressBar = document.getElementById('rewards-progress-bar');
    const levelBadge = document.getElementById('rewards-level');
    const levelLabelText = document.getElementById('rewards-level-label');
    
    if (levelBadge) {
        levelBadge.innerText = lp.level;
        progressLabel.innerText = `${lp.currentPoints} GP`;
        progressBar.style.width = `${lp.progress}%`;
        
        let levelTitle = "Eco-Sorter Novice";
        if (lp.level >= 2 && lp.level < 4) levelTitle = "Sort Specialist";
        else if (lp.level >= 4 && lp.level < 7) levelTitle = "Recycle Knight";
        else if (lp.level >= 7) levelTitle = "Carbon Crusader";
        
        levelLabelText.innerText = `${t('level_label')} ${lp.level} ${levelTitle}`;
    }

    // Achievements / Badges
    const badgeContainer = document.getElementById('badges-container');
    let badgeHtml = "";
    data.badges.forEach(badge => {
        const opacity = badge.unlocked ? "opacity-100" : "opacity-40 grayscale";
        const unlockedLabel = badge.unlocked ? "Unlocked" : "Locked";
        const borderClass = badge.unlocked ? "border-emerald-500/25 bg-emerald-500/5" : "border-slate-100 dark:border-slate-800/40";
        badgeHtml += `
            <div class="p-4 border rounded-2xl flex items-center space-x-3 transition-all ${borderClass} ${opacity}">
                <div class="text-3xl p-2 bg-slate-50 dark:bg-slate-950 rounded-xl">${badge.icon}</div>
                <div>
                    <h4 class="text-sm font-bold text-slate-800 dark:text-white flex items-center space-x-1.5">
                        <span>${badge.title}</span> 
                        <span class="text-[9px] px-1.5 py-0.5 rounded-full font-extrabold ${badge.unlocked ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-200 dark:bg-slate-850 text-slate-400'}">${unlockedLabel}</span>
                    </h4>
                    <p class="text-xs text-slate-400 mt-0.5 leading-tight">${badge.description}</p>
                </div>
            </div>
        `;
    });
    badgeContainer.innerHTML = badgeHtml;

    // Leaderboard
    const leaderboardContainer = document.getElementById('leaderboard-rows');
    let leaderHtml = "";
    data.leaderboard.forEach(row => {
        let rankColor = "text-slate-400";
        let bgClass = "";
        
        if (row.rank === 1) rankColor = "text-amber-500 font-extrabold text-base";
        else if (row.rank === 2) rankColor = "text-slate-300 font-extrabold text-base";
        else if (row.rank === 3) rankColor = "text-amber-700 font-extrabold text-base";
        
        // Highlight active user
        if (state.user && state.user.id === row.id) {
            bgClass = "bg-emerald-500/5 font-semibold";
        }
        
        leaderHtml += `
            <tr class="hover:bg-slate-500/5 transition-colors ${bgClass}">
                <td class="py-3 px-4 text-center ${rankColor}">${row.rank}</td>
                <td class="py-3 px-4 flex items-center space-x-2">
                    <span class="font-bold text-slate-700 dark:text-slate-200">${row.username}</span>
                    <span class="text-[9px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-semibold text-slate-400 uppercase tracking-widest">Lvl ${row.level}</span>
                </td>
                <td class="py-3 px-4 text-right font-bold text-emerald-500 font-outfit">${row.points} GP</td>
            </tr>
        `;
    });
    leaderboardContainer.innerHTML = leaderHtml;
}

function renderAbout(container) {
    const teamMembers = [
        "SHYAM",
        "DHANUSH VENKAT KUMAR",
        "CHARAN KUSUMANCHI",
        "OJESWITHA MANJU"
    ];

    const getInitials = (name) => {
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) {
            return parts[0].substring(0, 2).toUpperCase();
        }
        return (parts[0][0] + parts[1][0]).toUpperCase();
    };

    const teamHtml = teamMembers.map(name => `
        <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold text-sm shrink-0">${getInitials(name)}</div>
            <div>
                <h4 class="text-sm font-bold text-slate-700 dark:text-white">${name}</h4>
            </div>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="max-w-4xl mx-auto space-y-12">
            <!-- Project Header -->
            <section class="text-center space-y-4">
                <h2 class="text-4xl font-extrabold font-outfit text-slate-800 dark:text-white">${t('about_title')}</h2>
                <div class="h-1 w-20 bg-emerald-500 mx-auto rounded-full"></div>
            </section>

            <!-- Project Overview -->
            <section class="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/10 space-y-4">
                <h3 class="text-2xl font-bold font-outfit text-slate-800 dark:text-white flex items-center space-x-2">
                    <i data-lucide="info" class="w-6 h-6 text-emerald-500"></i>
                    <span>${t('about_project_heading')}</span>
                </h3>
                <p class="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                    ${t('about_project_body')}
                </p>
            </section>

            <!-- SDG alignment details -->
            <section class="space-y-6">
                <h3 class="text-2xl font-bold font-outfit text-slate-800 dark:text-white text-center">${t('sdg_title')}</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="glass-card p-6 rounded-2xl border border-emerald-500/5 text-center space-y-4">
                        <div class="w-16 h-16 bg-amber-500 text-white rounded-2xl flex items-center justify-center font-extrabold text-2xl mx-auto shadow-lg shadow-amber-500/20">11</div>
                        <h4 class="font-bold text-slate-800 dark:text-white">${t('sdg_11_title')}</h4>
                        <p class="text-xs text-slate-400 leading-relaxed">By promoting local recycling bins and raising awareness of community drop-off sites, we help cities become cleaner and decrease municipal waste density.</p>
                    </div>
                    <div class="glass-card p-6 rounded-2xl border border-emerald-500/5 text-center space-y-4">
                        <div class="w-16 h-16 bg-amber-600 text-white rounded-2xl flex items-center justify-center font-extrabold text-2xl mx-auto shadow-lg shadow-amber-600/20">12</div>
                        <h4 class="font-bold text-slate-800 dark:text-white">${t('sdg_12_title')}</h4>
                        <p class="text-xs text-slate-400 leading-relaxed">By educating users on biodegradable food scraps composting, plastics segregation guidelines, and heavy toxic battery management, we encourage circular economies.</p>
                    </div>
                    <div class="glass-card p-6 rounded-2xl border border-emerald-500/5 text-center space-y-4">
                        <div class="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-extrabold text-2xl mx-auto shadow-lg shadow-emerald-600/20">13</div>
                        <h4 class="font-bold text-slate-800 dark:text-white">${t('sdg_13_title')}</h4>
                        <p class="text-xs text-slate-400 leading-relaxed">Segregating recyclables and wet food waste reduces massive landfill dump sizes, directly stopping organic matter from creating high volumes of harmful methane gas.</p>
                    </div>
                </div>
            </section>

            <!-- Team & Future Scope Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Team Card -->
                <div class="glass-card rounded-3xl p-6 border border-emerald-500/10 space-y-4">
                    <h3 class="text-xl font-bold font-outfit text-slate-800 dark:text-white flex items-center space-x-2">
                        <i data-lucide="users" class="w-5 h-5 text-emerald-500"></i>
                        <span>${t('about_team_heading')}</span>
                    </h3>
                    <div class="space-y-4">
                        ${teamHtml}
                    </div>
                </div>

                <!-- Future Scope Card -->
                <div class="glass-card rounded-3xl p-6 border border-emerald-500/10 space-y-4">
                    <h3 class="text-xl font-bold font-outfit text-slate-800 dark:text-white flex items-center space-x-2">
                        <i data-lucide="milestone" class="w-5 h-5 text-emerald-500"></i>
                        <span>${t('about_future_heading')}</span>
                    </h3>
                    <ul class="space-y-2 text-xs text-slate-500 dark:text-slate-400 pl-4 list-disc">
                        <li>${t('future_item_1')}</li>
                        <li>${t('future_item_2')}</li>
                        <li>${t('future_item_3')}</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

// ----------------- Authentication logic -----------------

function openAuthModal() {
    document.getElementById('auth-modal').classList.remove('hidden');
    document.getElementById('auth-error').classList.add('hidden');
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.add('hidden');
    // Clear forms
    document.getElementById('auth-username').value = '';
    document.getElementById('auth-email').value = '';
    document.getElementById('auth-password').value = '';
}

let isSignUpMode = false;

function toggleAuthMode() {
    isSignUpMode = !isSignUpMode;
    const title = document.getElementById('auth-modal-title');
    const desc = document.getElementById('auth-modal-desc');
    const toggleBtn = document.getElementById('auth-toggle-btn');
    const toggleText = document.getElementById('auth-toggle-text');
    const submitBtn = document.getElementById('auth-submit-btn');
    const usernameContainer = document.getElementById('username-field-container');
    const emailLabel = document.getElementById('email-label');
    const emailInput = document.getElementById('auth-email');
    
    if (isSignUpMode) {
        title.innerText = "Create EcoSort Account";
        desc.innerText = "Register to save history and join leaderboard!";
        toggleText.innerText = "Already have an account?";
        toggleBtn.innerText = "Sign In";
        submitBtn.innerText = "Register";
        usernameContainer.classList.remove('hidden');
        emailLabel.innerText = "Email Address";
        emailInput.type = "email";
    } else {
        title.innerText = "Sign In to EcoSort";
        desc.innerText = "Unlock statistics, history, and rewards!";
        toggleText.innerText = "Don't have an account?";
        toggleBtn.innerText = "Create account";
        submitBtn.innerText = "Sign In";
        usernameContainer.classList.add('hidden');
        emailLabel.innerText = "Email or Username";
        emailInput.type = "text";
    }
}

function handleAuthSubmit(e) {
    e.preventDefault();
    const errorContainer = document.getElementById('auth-error');
    errorContainer.classList.add('hidden');
    
    const emailVal = document.getElementById('auth-email').value.trim();
    const passVal = document.getElementById('auth-password').value.trim();
    const userVal = document.getElementById('auth-username').value.trim();
    
    const endpoint = isSignUpMode ? '/api/auth/register' : '/api/auth/login';
    const payload = isSignUpMode ? {
        username: userVal,
        email: emailVal,
        password: passVal,
        language: state.language
    } : {
        usernameOrEmail: emailVal,
        password: passVal
    };
    
    fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(d => { throw new Error(d.error || "Authentication failed") });
        }
        return res.json();
    })
    .then(data => {
        // Save token and user details
        state.token = data.token;
        state.user = data.user;
        state.language = data.user.language;
        
        localStorage.setItem('ecosort_token', data.token);
        localStorage.setItem('ecosort_user', JSON.stringify(data.user));
        localStorage.setItem('ecosort_lang', data.user.language);
        
        document.getElementById('active-lang').innerText = data.user.language;
        
        updateAuthDisplay();
        closeAuthModal();
        
        // Redirect to dashboard
        navigateTo('dashboard');
    })
    .catch(err => {
        errorContainer.innerText = err.message;
        errorContainer.classList.remove('hidden');
    });
}

function updateAuthDisplay() {
    const authSection = document.getElementById('auth-section');
    const authOnlyNavs = document.querySelectorAll('.auth-only');
    
    if (state.token && state.user) {
        // Logged in
        authSection.innerHTML = `
            <div class="flex items-center space-x-2 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 bg-slate-50 dark:bg-slate-900/50">
                <div class="flex flex-col items-end leading-none text-right">
                    <span class="text-xs font-extrabold text-slate-700 dark:text-slate-200 font-outfit">${state.user.username}</span>
                    <span class="text-[9px] text-emerald-500 font-bold font-outfit mt-0.5">${state.user.points} GP (Lvl ${state.user.level})</span>
                </div>
                <button onclick="handleLogout()" class="p-1.5 text-slate-400 hover:text-rose-500 transition-colors" aria-label="Sign Out">
                    <i data-lucide="log-out" class="w-4 h-4"></i>
                </button>
            </div>
        `;
        authOnlyNavs.forEach(nav => nav.classList.remove('hidden'));
    } else {
        // Logged out
        authSection.innerHTML = `
            <button onclick="openAuthModal()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-500/15 hover:shadow-lg hover:shadow-emerald-500/25 transition-all">${t('btn_signin')}</button>
        `;
        authOnlyNavs.forEach(nav => nav.classList.add('hidden'));
    }
    
    updateNavbarTranslations();
    lucide.createIcons();
}

function handleLogout() {
    state.token = null;
    state.user = null;
    localStorage.removeItem('ecosort_token');
    localStorage.removeItem('ecosort_user');
    
    // Clear chat history on logout
    state.chatHistory = [];
    
    updateAuthDisplay();
    navigateTo('home');
}

// ----------------- App Initialization -----------------

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Configuration
    applyTheme();
    
    // 2. Language Display
    document.getElementById('active-lang').innerText = state.language;
    
    // 3. Auth UI Sync
    updateAuthDisplay();
    
    // 4. Default Page Render
    navigateTo(state.activePage);
});
