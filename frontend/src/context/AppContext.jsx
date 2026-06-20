import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AppContext = createContext();

// Copy over translations dictionary for multi-language support in React
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
    greeting: "Hello! I am your EcoSort AI Sustainability Assistant. How can I help you save the planet today?",
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
    greeting: "नमस्ते! मैं आपका इकोसॉर्ट एआई सस्टेनेबिलिटी सहायक हूं। आज पर्यावरण को बचाने में मैं आपकी क्या मदद कर सकता हूं?",
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
    about_project_body: "इकोसॉर्ट एआई एक स्थिरता मंच है जो बिना छंटे कचरे के बढ़ते संकट को हल करने के लिए बनाया गया है। विश्व स्तर पर, सालाना 2 अरब टन से अधिक कचरा उत्पन्न होता है, जिसमें से 20% से भी कम पुनर्चक्रित किया जाता है। गहन शिक्षण छवि वर्गीकरण को एक पुरस्कार डैशबोर्ड के साथ जोड़कर, इकोसॉर्ट एआई घरों, स्कूलों और समुदायों को स्थानीय स्तर पर कार्य करने और विश्व स्तर पर प्रभाव डालने के लिए सशक्त बनाता है।",
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
    hero_desc: "వ్యర్థాలను సరిగ్గా గుర్తించి వేరు చేయడం ద్వారా మన భూమిని కాపాడటానికి సహాయపడండి. వ్యర్థ వస్తువు చిత్రాన్ని అప్‌లోడ్ చేయండి మరియు మా అధునాతన AI సరైన పారవేసే పద్ధతిని సూచిస్తుంది.",
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
    greeting: "నమస్కారం! నేను మీ EcoSort AI పర్యావరణ సహాయకుడిని. ఈ రోజు మన భూమిని కాపాడటానికి నేను మీకు ఏ విధంగా సహాయపడగలను?",
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
    about_project_body: "EcoSort AI అనేది వ్యర్థాల వేరుచేయని సంక్షోభాన్ని పరిష్కరించడానికి నిర్మించబడిన ఒక స్థిరత్వ వేదిక. ప్రపంచవ్యాప్తంగా, ఏటా 2 బిలియన్ టన్నుల మునిసిపల్ వ్యర్థాలు ఉత్పత్తి అవుతుండగా, అందులో 20% కంటే తక్కువ మాత్రమే రీసైకిల్ చేయబడుతున్నాయి. ఇమేజ్ వర్గీకరణను రివార్డ్స్ డ్యాష్‌బోర్డ్‌తో కలపడం ద్వారా, EcoSort AI గృహాలు, పాఠశాలలు మరియు సంఘాలను స్థానికంగా పనిచేసి ప్రపంచవ్యాప్తంగా ప్రభావం చూపేలా ప్రోత్సహిస్తుంది.",
    about_team_heading: "ప్రాజెక్ట్ బృందం",
    about_future_heading: "భవిష్యత్ విస్తరణ పరిధి",
    future_item_1: "మైక్రోకంట్రోలర్లు మరియు బరువు సెన్సార్లను ఉపయోగించి IoT స్మార్ట్ బిన్ అనుసంధానం.",
    future_item_2: "స్థానిక వ్యర్థాల సేకరణ ఏజెంట్ల మ్యాపింగ్ మరియు షెడ్యూలింగ్.",
    future_item_3: "ప్యాక్ చేయబడిన ఉత్పత్తుల కోసం బార్‌కోడ్ స్కానింగ్ డేటాబేస్."
  }
};

export const AppProvider = ({ children }) => {
  const [token, setTokenState] = useState(localStorage.getItem('ecosort_token') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('ecosort_user')) || null);
  const [language, setLanguageState] = useState(localStorage.getItem('ecosort_lang') || 'en');
  const [theme, setThemeState] = useState(localStorage.getItem('ecosort_theme') || 'light');
  const [activePage, setActivePage] = useState('home');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Synchronize HTML element classes for light/dark mode
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('ecosort_theme', theme);
  }, [theme]);

  const setToken = (newToken) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem('ecosort_token', newToken);
    } else {
      localStorage.removeItem('ecosort_token');
    }
  };

  const setLanguage = async (lang) => {
    setLanguageState(lang);
    localStorage.setItem('ecosort_lang', lang);
    if (token) {
      try {
        await axios.post('/api/profile/language', { language: lang }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.error("Failed to sync language preference:", err);
      }
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('ecosort_user');
    setChatHistory([]);
    setActivePage('home');
  };

  const login = (userData, userToken) => {
    setToken(userToken);
    setUser(userData);
    localStorage.setItem('ecosort_user', JSON.stringify(userData));
    if (userData.language) {
      setLanguageState(userData.language);
      localStorage.setItem('ecosort_lang', userData.language);
    }
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <AppContext.Provider value={{
      token,
      setToken,
      user,
      setUser,
      language,
      setLanguage,
      theme,
      setTheme: setThemeState,
      activePage,
      setActivePage,
      chatHistory,
      setChatHistory,
      logout,
      login,
      t
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
export default AppContext;
