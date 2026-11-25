(function () {
  const OFFICIAL_YT_URL = "https://youtube.com/@aadarshvanismacharnarayanp4382";
  const OFFICIAL_YT_CHANNEL_ID = "UCHplyeGVrLsVLnoaLn8w0dg";
  const AVS_FEED_URL = "https://aadarshvanisamachar.com/feed/";

  const FALLBACK_VIDEOS = [
    {
      id: "1pBJ0x55yIA",
      title: "बस्तर दशहरा के बाद नारायणपुर बिंजली दशहरा की धूम: कबाड़ के जुगाड़ की क्यों हो रही चर्चा",
      channel: "आदर्श वाणी समाचार नारायणपुर",
      date: "2026-10-22",
      category: "culture",
      thumbnail: "https://i.ytimg.com/vi/1pBJ0x55yIA/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=1pBJ0x55yIA"
    },
    {
      id: "XMNka5Mz4cg",
      title: "रावघाट पैसेंजर ट्रेन शुरू: रेल से मिली राहत, रोजगार और BSP के CSR पर भड़के ग्रामीण",
      channel: "आदर्श वाणी समाचार नारायणपुर",
      date: "2026-10-21",
      category: "public",
      thumbnail: "https://i.ytimg.com/vi/XMNka5Mz4cg/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=XMNka5Mz4cg"
    },
    {
      id: "-7OR0uAQ8NM",
      title: "BSP प्रबंधन के खिलाफ लामबंद हुए रावघाट माइंस प्रभावित युवा, नारायणपुर बेरोजगारों ने किया चक्काजाम",
      channel: "आदर्श वाणी समाचार नारायणपुर",
      date: "2026-10-15",
      category: "public",
      thumbnail: "https://i.ytimg.com/vi/-7OR0uAQ8NM/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=-7OR0uAQ8NM"
    },
    {
      id: "06kbGuZ6fSY",
      title: "NMDC से नौकरी मांग रहे युवा, जवाब में CSR बजट का हवाला! बचेली में बवाल",
      channel: "आदर्श वाणी समाचार नारायणपुर",
      date: "2026-10-13",
      category: "public",
      thumbnail: "https://i.ytimg.com/vi/06kbGuZ6fSY/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=06kbGuZ6fSY"
    },
    {
      id: "azE8wNEXWT0",
      title: "परंपराओं की जीवंत विरासत: करंगाल और दुग्गाल परगना द्वारा ‘गायता जोहारनी’ उत्सव का भव्य आयोजन",
      channel: "आदर्श वाणी समाचार नारायणपुर",
      date: "2026-10-11",
      category: "culture",
      thumbnail: "https://i.ytimg.com/vi/azE8wNEXWT0/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=azE8wNEXWT0"
    },
    {
      id: "ZDRgAV0sTkc",
      title: "रावघाट पहुंची ‘परख’ ट्रेन | दशकों का इंतजार खत्म होने की दहलीज पर | Narayanpur Bastar",
      channel: "आदर्श वाणी समाचार नारायणपुर",
      date: "2026-09-23",
      category: "culture",
      thumbnail: "https://i.ytimg.com/vi/ZDRgAV0sTkc/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=ZDRgAV0sTkc"
    },
    {
      id: "Dryn-2Ddw4Y",
      title: "अबूझमाड़ में अवैध हथियार निर्माण पर पुलिस की दबिश में दो भाई कीहकाड़ से गिरफ्तार, हथियार बरामद",
      channel: "आदर्श वाणी समाचार नारायणपुर",
      date: "2026-09-22",
      category: "naxal",
      thumbnail: "https://i.ytimg.com/vi/Dryn-2Ddw4Y/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=Dryn-2Ddw4Y"
    },
    {
      id: "TEEdel-DbeA",
      title: "तेज बारिश से डूबा नारायणपुर का बाजार, वर्षों की बदहाली का वीडियो वायरल",
      channel: "आदर्श वाणी समाचार नारायणपुर",
      date: "2026-09-20",
      category: "public",
      thumbnail: "https://i.ytimg.com/vi/TEEdel-DbeA/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=TEEdel-DbeA"
    },
    {
      id: "kSKv3cPCCBw",
      title: "पद्मश्री पंडिराम मांडवी की 17 कलाकृतियां चोरी! 12 बरामद, आरोपी गिरफ्तार | Narayanpur News",
      channel: "आदर्श वाणी समाचार नारायणपुर",
      date: "2026-09-15",
      category: "public",
      thumbnail: "https://i.ytimg.com/vi/kSKv3cPCCBw/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=kSKv3cPCCBw"
    },
    {
      id: "WJoXwXdj89A",
      title: "नन्हे बच्चों की गोंडी प्रार्थना ने सबको किया मंत्रमुग्ध | Narayanpur Video",
      channel: "आदर्श वाणी समाचार नारायणपुर",
      date: "2026-09-10",
      category: "culture",
      thumbnail: "https://i.ytimg.com/vi/WJoXwXdj89A/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=WJoXwXdj89A"
    }
  ];

  const FALLBACK_STORIES = [
    {
      id: "avs-vineet-dubey-suspended",
      date: "2026-11-18",
      source: "आदर्श वाणी समाचार",
      outlet_key: "AVS",
      category: "public",
      category_label: "क्राइम व प्रशासन",
      title: "फरार शोएब ढेबर से कथित सांठगांठ मामले में नारायणपुर में पदस्थ पुलिस निरीक्षक विनीत दुबे सस्पेंड, बस्तर IG का बड़ा एक्शन",
      summary: "राजधानी क्राइम के तार अबूझमाड़ के द्वार तक जुड़ने के मामले में पुलिस निरीक्षक विनीत दुबे के निलंबन व बस्तर IG की कार्रवाई की विस्तृत रिपोर्ट।",
      impact: true,
      image: "",
      url: "https://aadarshvanisamachar.com/2026/11/18/inspector-vineet-dubey-suspended-shoaib-dhebar-case/"
    },
    {
      id: "avs-csr-227-crore",
      date: "2026-11-17",
      source: "आदर्श वाणी समाचार",
      outlet_key: "AVS",
      category: "public",
      category_label: "इन्वेस्टिगेटिव",
      title: "नारायणपुर स्वास्थ्य विभाग में ₹2.27 करोड़ का हिसाब गायब! सहायक सांख्यिकी अधिकारी निलंबित, CSR राशि के रिकॉर्ड में मिला बड़ा अंतर",
      summary: "सरकारी दस्तावेजों में ₹2.27 करोड़ (227.73 लाख) Coal India CSR फंड रिकॉर्ड में वित्तीय गड़बड़ी का पर्दाफाश व अधिकारी निलंबन।",
      impact: true,
      image: "",
      url: "https://aadarshvanisamachar.com/2026/11/17/narayanpur-health-department-2-27-crore-financial-discrepancy-officer-suspended/"
    },
    {
      id: "avs-boys-hostel-theft",
      date: "2026-11-11",
      source: "आदर्श वाणी समाचार",
      outlet_key: "AVS",
      category: "public",
      category_label: "शिक्षा व सुरक्षा",
      title: "नारायणपुर के पोस्ट मैट्रिक बालक छात्रावास में चोरी, चोरों ने तोड़े 11 से ज्यादा ताले; छुट्टी के दौरान सुरक्षा व्यवस्था पर उठे सवाल",
      summary: "छुट्टी के दौरान छात्रावास में हुई चोरी की घटना और विद्यार्थियों की सुरक्षा व्यवस्था की लापरवाही को उजागर करती स्थानीय रिपोर्ट।",
      impact: false,
      image: "",
      url: "https://aadarshvanisamachar.com/2026/11/11/narayanpur-post-matric-boys-hostel-theft-11-locks-broken/"
    },
    {
      id: "avs-ratan-dubey-special",
      date: "2026-11-04",
      source: "आदर्श वाणी समाचार",
      outlet_key: "AVS",
      category: "public",
      category_label: "विशेषांक",
      title: "रतन दुबे की तृतीय पुण्यतिथि पर विशेषांक — जनसेवा और राजनीतिक सफर पर विशेष आलेख",
      summary: "नारायणपुर के लोकप्रिय जननेता रतन दुबे के जनसेवा सफर, संगठन धर्म और बस्तर क्षेत्र में उनके योगदान पर विशेष स्मृति आलेख।",
      impact: false,
      image: "",
      url: "https://aadarshvanisamachar.com/2026/11/04/ratan-dubey-narayanpur-bjp-leader-naxal-attack-kaushalnar/"
    },
    {
      id: "avs-cg-26-years-abujhmad",
      date: "2026-11-02",
      source: "आदर्श वाणी समाचार",
      outlet_key: "AVS",
      category: "culture",
      category_label: "विकास व अबूझमाड़",
      title: "26 साल का छत्तीसगढ़: विकास की नई इबारत लिखता बस्तर, बदलती तस्वीर के बीच अबूझमाड़ की नई पहचान",
      summary: "छत्तीसगढ़ राज्य स्थापना दिवस पर नारायणपुर और अबूझमाड़ के बदलते परिदृश्य, सड़क-शिक्षा व विकास यात्रा पर विशेष आलेख।",
      impact: false,
      image: "",
      url: "https://aadarshvanisamachar.com/2026/11/02/chhattisgarh-foundation-day-2026-changing-bastar-narayanpur-abujhmad/"
    },
    {
      id: "avs-dak-seva-jan-seva",
      date: "2026-11-01",
      source: "आदर्श वाणी समाचार",
      outlet_key: "AVS",
      category: "public",
      category_label: "ग्रामीण व जनसेवा",
      title: "डाक सेवा जन सेवा: चलित वीडियो वाहन और डाक चौपाल से नारायणपुर में गूंजी डाक विभाग की पहल",
      summary: "बरगद की छांव में आयोजित डाक चौपाल के माध्यम से बुजुर्गों और युवाओं तक पहुँची जनकल्याणकारी योजनाओं की जमीनी कवरेज।",
      impact: false,
      image: "",
      url: "https://aadarshvanisamachar.com/2026/11/01/dak-chaupal-narayanpur-india-post-public-services-awareness/"
    },
    {
      id: "avs-amdai-mines-dispute",
      date: "2026-10-30",
      source: "आदर्श वाणी समाचार",
      outlet_key: "AVS",
      category: "public",
      category_label: "माइनिंग व परिवहन",
      title: "लोडिंग पर्ची और गेट पास नहीं मिलने से नाराज नारायणपुर मालक परिवहन संघ के वाहन चालक (आमदाई लौह अयस्क माइंस)",
      summary: "आमदाई लौह अयस्क माइंस के मुख्य गेट पर स्थानीय वाहन चालकों के धरने और परिवहन विवाद की ग्राउंड कवरेज।",
      impact: false,
      image: "",
      url: "https://aadarshvanisamachar.com/2026/10/30/amdai-mines-loading-dispute-narayanpur-transport-union/"
    },
    {
      id: "avs-mahimagawadi-mandai",
      date: "2026-10-29",
      source: "आदर्श वाणी समाचार",
      outlet_key: "AVS",
      category: "culture",
      category_label: "लोक संस्कृति",
      title: "नए अन्न के स्वागत की खुशी और सगा जोहार से सराबोर महिमागवाड़ी मंडई व ऐतिहासिक मावली मेला कवरेज",
      summary: "महिमागवाड़ी मंडई, नवा खाई सगा जोहार समारोह और बस्तर के ऐतिहासिक मावली मेला की सांस्कृतिक विरासत पर रिपोर्ट।",
      impact: false,
      image: "",
      url: "https://aadarshvanisamachar.com/2026/10/29/narayanpur-andakuri-ganda-samaj-nawa-khai-saga-johar-ceremony/"
    },
    {
      "id": "etv-bhangaram-bidai",
      "date": "2026-09-08",
      "source": "ETV Bharat (English)",
      "outlet_key": "ETV",
      "category": "culture",
      "category_label": "बस्तर विरासत",
      "title": "Bhangaram Bidai: With Drumbeats And Prayers, Narayanpur Bids Farewell To The God Of Justice",
      "summary": "नारायणपुर की सदियों पुरानी न्याय परंपरा 'भंगाराम बिदाई' और आदिवासी आस्था को राष्ट्रीय मंच पर लाती विशेष रिपोर्ट।",
      "impact": false,
      "image": "",
      "url": "https://www.etvbharat.com/en/offbeat/chhattisgarh-bhangaram-bidai-with-drumbeats-and-prayers-narayanpur-bids-farewell-to-the-god-of-justice-enn26090800961"
    },
    {
      id: "etv-25-lakh-bounty-naxal",
      date: "2026-07-17",
      source: "ETV Bharat (English)",
      outlet_key: "ETV",
      category: "naxal",
      category_label: "नक्सल व सुरक्षा",
      title: "Naxal Leader With Rs 25 Lakh Bounty Arrested In Jharkhand; Arms, Explosives, IED Recovered From Chhattisgarh",
      summary: "नारायणपुर, कांकेर और झारखंड में चलाए गए संयुक्त नक्सल विरोधी अभियानों व IED बरामदगी पर बाईलाइन रिपोर्ट।",
      impact: false,
      image: "",
      url: "https://www.etvbharat.com/en/state/naxal-leader-arrested-in-jharkhand-arms-explosives-ied-recovered-from-chhattisgarh-enn26071705094"
    },
    {
      id: "etv-maspur-ashram-impact",
      date: "2026",
      source: "ETV Bharat (Impact)",
      outlet_key: "ETV",
      category: "public",
      category_label: "जनहित व शिक्षा",
      title: "मसपूर आश्रम की टपकती छत और बच्चों की बदहाली पर खबर का बड़ा असर, कलेक्टर ने दिए सुधार के आदेश",
      summary: "आदिवासी आश्रम की जर्जर स्थिति को प्रमुखता से दिखाने के बाद जिला कलेक्टर द्वारा तत्काल मरम्मत व व्यवस्था सुधार के निर्देश।",
      impact: true,
      image: "",
      url: "https://www.etvbharat.com/"
    },
    {
      id: "etv-kutul-tiranga",
      date: "2026",
      source: "ETV Bharat",
      outlet_key: "ETV",
      category: "naxal",
      category_label: "अबूझमाड़ व सुरक्षा",
      title: "78 साल बाद अबूझमाड़ के कुतुल में लहराया तिरंगा, नक्सल गढ़ में लोकतंत्र की नई सुबह",
      summary: "दशकों तक नक्सल प्रभाव में रहे दुर्गम कुतुल गांव में 78 साल बाद ऐतिहासिक ध्वजारोहण और बदलते नारायणपुर की ग्राउंड जीरो रिपोर्ट।",
      impact: true,
      image: "",
      url: "https://www.etvbharat.com/hi/state/new-year-wishes-2026-narayanpur-witnessed-the-sunset-of-the-red-terror-and-the-sunrise-of-development-chhattisgarh-news-cts26010100878"
    },
    {
      id: "ndtv-maad-bachao",
      date: "2026",
      source: "NDTV",
      outlet_key: "NDTV",
      category: "naxal",
      category_label: "माड़ बचाओ अभियान",
      title: "नेलांगुर और कुरुषनार के जंगलों में बड़ा ऑपरेशन, भारी मात्रा में हथियार, विस्फोटक और कैश बरामद",
      summary: "'माड़ बचाओ अभियान' के तहत अबूझमाड़ में नक्सलियों के हथियार डंप व नकदी बरामदगी की राष्ट्रीय कवरेज।",
      impact: false,
      image: "",
      url: "https://ndtv.in/chhattisgarh-news/narayanpur-police-naxal-cash-arms-seizure-maad-bachao-abhiyan-chhattisgarh-news-11484569"
    },
    {
      id: "etv-kachhapal-waterfalls",
      date: "2026",
      source: "ETV Bharat",
      outlet_key: "ETV",
      category: "culture",
      category_label: "पर्यटन विशेष",
      title: "कच्चापाल और फरसबेड़ा जलप्रपात: अबूझमाड़ की वादियों में छिपे खूबसूरत पर्यटन स्थल",
      summary: "नारायणपुर और अबूझमाड़ के अनछुए जलप्रपातों व प्राकृतिक सौंदर्य को पर्यटन मानचित्र पर लाने वाली विशेष रिपोर्ट।",
      impact: false,
      image: "",
      url: "https://www.etvbharat.com/"
    },
    {
      id: "avs-bastar-olympics-cricket",
      date: "2026-10-05",
      source: "आदर्श वाणी समाचार",
      outlet_key: "AVS",
      category: "culture",
      category_label: "खेल व छात्र प्रतिभा",
      title: "बस्तर ओलंपिक, अंडर-23 क्रिकेट चयन और अबूझमाड़ के होनहार छात्रों की उपलब्धियां",
      summary: "बस्तर ओलंपिक में आदिवासी युवाओं का दमखम, अंडर-23 क्रिकेट चयन व अबूझमाड़ के मेधावी छात्रों की सफलता की कहानियाँ।",
      impact: false,
      image: "",
      url: "https://aadarshvanisamachar.com/2026/10/05/bastar-olympic-2026-registration-timeline/"
    }
  ];

  let stories = [...FALLBACK_STORIES];
  let videos = [...FALLBACK_VIDEOS];
  let activeFilter = "all";
  let searchQuery = "";

  function sanitizeHttpUrl(raw) {
    if (!raw || typeof raw !== "string") return "";
    try {
      const parsed = new URL(raw);
      return parsed.protocol === "https:" ? parsed.href : "";
    } catch (_) {
      return "";
    }
  }

  function stripHtml(raw) {
    if (!raw) return "";
    const doc = new DOMParser().parseFromString(String(raw), "text/html");
    return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
  }

  function extractFirstImage(rawHtml) {
    if (!rawHtml) return "";
    const match = String(rawHtml).match(/<img[^>]+src=["'](https:\/\/[^"']+)["']/i);
    return match ? sanitizeHttpUrl(match[1]) : "";
  }

  function inferCategory(text) {
    const t = String(text || "").toLowerCase();
    if (/नक्सल|अबूझमाड़|कुतुल|कैंप|माड़|हथियार|bounty|ied|naxal|abujhmad|आत्मसमर्पण/.test(t)) return "naxal";
    if (/संस्कृति|मेला|मंडई|भंगाराम|दशहरा|जोहारनी|ओलंपिक|क्रिकेट|जलप्रपात|रेलवे|ट्रेन|छत्तीसगढ़|गोंडी|bhangaram/.test(t)) return "culture";
    return "public";
  }

  function extractYouTubeId(rawUrl) {
    if (!rawUrl) return "";
    try {
      const u = new URL(rawUrl);
      if (u.searchParams.get("v")) return u.searchParams.get("v");
      const parts = u.pathname.split("/").filter(Boolean);
      return parts[parts.length - 1] || "";
    } catch (_) {
      return "";
    }
  }

  function formatDateLabel(dateStr) {
    if (!dateStr) return "ताज़ा रिपोर्ट";
    if (/^\d{4}$/.test(dateStr)) return dateStr;
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return String(dateStr).slice(0, 10);
    return d.toLocaleDateString("hi-IN", { day: "2-digit", month: "short", year: "numeric" });
  }

  function getOutletBadgeClass(outletKey) {
    if (outletKey === "AVS") return "badge-avs";
    if (outletKey === "NDTV") return "badge-ndtv";
    if (outletKey === "YT") return "badge-yt";
    return "badge-etv";
  }

  function createFallbackBanner(outletKey, sourceName) {
    const wrap = document.createElement("div");
    let grad = "from-red-900/80 via-slate-900 to-slate-950";
    let iconClass = "fa-solid fa-newspaper";
    if (outletKey === "AVS") {
      grad = "from-amber-900/75 via-slate-900 to-slate-950";
      iconClass = "fa-solid fa-pen-nib";
    } else if (outletKey === "NDTV") {
      grad = "from-blue-900/80 via-slate-900 to-slate-950";
      iconClass = "fa-solid fa-tower-broadcast";
    }
    wrap.className = `h-36 w-full rounded-xl bg-gradient-to-br ${grad} border border-white/10 mb-3.5 p-4 flex flex-col justify-between relative overflow-hidden`;

    const badge = document.createElement("span");
    badge.className = "self-start text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-black/45 text-white border border-white/15";
    badge.textContent = sourceName || "ग्राउंड रिपोर्ट";

    const bottom = document.createElement("div");
    bottom.className = "flex items-center justify-between text-white/80";
    const label = document.createElement("span");
    label.className = "text-[11px] font-semibold";
    label.textContent = "आकाश सिंह ठाकुर • बस्तर कवरेज";
    const icon = document.createElement("i");
    icon.className = `${iconClass} text-2xl opacity-60`;
    bottom.append(label, icon);

    wrap.append(badge, bottom);
    return wrap;
  }

  function buildUnifiedItems() {
    const newsItems = stories.map(s => ({
      ...s,
      kind: "article",
      sortTime: Date.parse(s.date) || 0
    }));
    const videoItems = videos.map(v => ({
      id: `yt-${v.id}`,
      videoId: v.id,
      kind: "video",
      date: v.date,
      sortTime: Date.parse(v.date) || 0,
      source: "YouTube वीडियो",
      outlet_key: "YT",
      category: v.category || inferCategory(v.title),
      category_label: "वीडियो रिपोर्ट",
      title: v.title,
      summary: "आदर्श वाणी समाचार नारायणपुर YouTube चैनल की ग्राउंड वीडियो रिपोर्ट — क्लिक करके देखें।",
      impact: false,
      image: sanitizeHttpUrl(v.thumbnail) || `https://i.ytimg.com/vi/${encodeURIComponent(v.id)}/hqdefault.jpg`,
      url: sanitizeHttpUrl(v.url) || OFFICIAL_YT_URL
    }));

    return [...newsItems, ...videoItems].sort((a, b) => b.sortTime - a.sortTime);
  }

  function renderTicker() {
    const ticker = document.getElementById("news-ticker");
    if (!ticker || !stories.length) return;
    const topTitles = stories.slice(0, 6).map(s => `• [${s.source}] ${s.title}`);
    ticker.textContent = topTitles.join("    |    ");
  }

  function renderUnifiedFeed() {
    const grid = document.getElementById("unified-grid");
    const emptyState = document.getElementById("stories-empty-state");
    const countLabel = document.getElementById("hub-count-label");
    if (!grid) return;

    const unified = buildUnifiedItems();
    if (countLabel) countLabel.textContent = `${stories.length} खबरें + ${videos.length} वीडियो`;

    const filtered = unified.filter(item => {
      let matchCat = true;
      if (activeFilter === "video") {
        matchCat = item.kind === "video";
      } else if (activeFilter.startsWith("outlet:")) {
        matchCat = item.outlet_key === activeFilter.slice(7);
      } else if (activeFilter !== "all") {
        matchCat = item.category === activeFilter;
      }
      const haystack = `${item.title} ${item.summary || ""} ${item.source} ${item.category_label || ""}`.toLowerCase();
      const matchSearch = !searchQuery || haystack.includes(searchQuery);
      return matchCat && matchSearch;
    });

    const fragment = document.createDocumentFragment();
    for (const item of filtered) {
      const card = document.createElement("article");
      card.className = "bg-white dark:bg-slate-900/90 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-red-500/40 transition";

      const top = document.createElement("div");

      if (item.kind === "video") {
        const thumbBtn = document.createElement("button");
        thumbBtn.type = "button";
        thumbBtn.className = "relative w-full h-40 rounded-xl overflow-hidden bg-slate-900 mb-3.5 block text-left group";
        thumbBtn.addEventListener("click", () => window.openVideoModal(item));

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.title;
        img.loading = "lazy";
        img.referrerPolicy = "no-referrer";
        img.className = "w-full h-full object-cover group-hover:scale-105 transition duration-300";
        img.addEventListener("error", () => {
          img.src = `https://i.ytimg.com/vi/${encodeURIComponent(item.videoId)}/mqdefault.jpg`;
        }, { once: true });

        const playOverlay = document.createElement("span");
        playOverlay.className = "absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/15 transition";
        playOverlay.innerHTML = '<span class="w-11 h-11 rounded-full bg-red-600/95 text-white flex items-center justify-center shadow-lg"><i class="fa-solid fa-play ml-0.5"></i></span>';

        thumbBtn.append(img, playOverlay);
        top.append(thumbBtn);
      } else {
        const imgUrl = sanitizeHttpUrl(item.image);
        if (imgUrl) {
          const imgWrap = document.createElement("div");
          imgWrap.className = "mb-3.5 rounded-xl overflow-hidden bg-slate-800 h-40";
          const img = document.createElement("img");
          img.src = imgUrl;
          img.alt = item.title;
          img.loading = "lazy";
          img.referrerPolicy = "no-referrer";
          img.className = "w-full h-full object-cover";
          img.addEventListener("error", () => {
            imgWrap.replaceWith(createFallbackBanner(item.outlet_key, item.source));
          }, { once: true });
          imgWrap.append(img);
          top.append(imgWrap);
        } else {
          top.append(createFallbackBanner(item.outlet_key, item.source));
        }
      }

      const metaRow = document.createElement("div");
      metaRow.className = "flex items-center justify-between mb-2 gap-2";

      const badge = document.createElement("span");
      badge.className = `${getOutletBadgeClass(item.outlet_key)} text-white text-[11px] font-bold px-2.5 py-0.5 rounded`;
      badge.textContent = item.source;

      const dateCat = document.createElement("span");
      dateCat.className = "text-[11px] text-slate-500 dark:text-slate-400 text-right";
      dateCat.textContent = `${formatDateLabel(item.date)} • ${item.category_label}`;
      metaRow.append(badge, dateCat);

      const h3 = document.createElement("h3");
      h3.className = "text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug";
      h3.textContent = item.title;

      top.append(metaRow, h3);

      if (item.summary && item.kind !== "video") {
        const p = document.createElement("p");
        p.className = "text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3.5";
        p.textContent = item.summary;
        top.append(p);
      }

      const footer = document.createElement("div");
      footer.className = "pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold gap-2";

      if (item.kind === "video") {
        const playBtn = document.createElement("button");
        playBtn.type = "button";
        playBtn.className = "text-red-600 dark:text-red-400 hover:underline inline-flex items-center gap-1";
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i> यहीं चलाएं';
        playBtn.addEventListener("click", () => window.openVideoModal(item));

        const ytLink = document.createElement("a");
        ytLink.href = item.url;
        ytLink.target = "_blank";
        ytLink.rel = "noopener noreferrer";
        ytLink.className = "text-slate-600 dark:text-slate-300 hover:underline";
        ytLink.textContent = "YouTube ↗";

        footer.append(playBtn, ytLink);
      } else {
        const left = document.createElement("span");
        left.className = item.impact ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400";
        left.textContent = item.impact ? "⚡ इम्पैक्ट रिपोर्ट" : "आकाश सिंह ठाकुर";
        footer.append(left);

        const safeHref = sanitizeHttpUrl(item.url);
        if (safeHref) {
          const link = document.createElement("a");
          link.href = safeHref;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.className = "text-red-600 dark:text-amber-400 hover:underline";
          link.textContent = "रिपोर्ट पढ़ें ↗";
          footer.append(link);
        }
      }

      card.append(top, footer);
      fragment.append(card);
    }

    grid.replaceChildren(fragment);
    if (emptyState) emptyState.hidden = filtered.length > 0;
  }

  window.openVideoModal = function openVideoModal(videoItem) {
    const vidId = videoItem?.videoId || videoItem?.id || videos[0]?.id;
    if (!vidId) return;
    const modal = document.getElementById("videoModal");
    const frame = document.getElementById("modal-yt-player");
    const title = document.getElementById("modal-video-title");
    const ytLink = document.getElementById("modal-yt-external");
    if (!modal || !frame) return;

    frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(vidId)}?autoplay=1&rel=0`;
    frame.title = videoItem?.title || "YouTube Video Report";
    if (title) title.textContent = videoItem?.title || "वीडियो रिपोर्ट";
    if (ytLink) ytLink.href = sanitizeHttpUrl(videoItem?.url) || `https://www.youtube.com/watch?v=${encodeURIComponent(vidId)}`;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
  };

  window.closeVideoModal = function closeVideoModal() {
    const modal = document.getElementById("videoModal");
    const frame = document.getElementById("modal-yt-player");
    if (frame) frame.src = "";
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
    document.body.style.overflow = "";
  };

  function mergeStories(incoming) {
    const map = new Map();
    const keyFor = s => {
      const cleanTitle = String(s.title || "").replace(/[^\p{L}\p{N}]+/gu, "").toLowerCase().slice(0, 48);
      return cleanTitle || s.url || s.id;
    };

    for (const item of [...incoming, ...stories]) {
      const key = keyFor(item);
      if (!key) continue;
      if (!map.has(key)) {
        map.set(key, item);
      } else {
        const existing = map.get(key);
        if (!existing.image && item.image) existing.image = item.image;
        if ((!existing.url || existing.url === "https://aadarshvanisamachar.com/") && item.url) {
          existing.url = item.url;
        }
      }
    }

    stories = Array.from(map.values()).sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0));
  }

  function mergeVideos(incoming) {
    const seen = new Set();
    const merged = [];
    for (const v of [...incoming, ...videos]) {
      if (!v || !v.id || seen.has(v.id)) continue;
      seen.add(v.id);
      merged.push(v);
    }
    videos = merged;
  }

  async function fetchAvsRss() {
    const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(AVS_FEED_URL)}`;
    const res = await fetch(rssUrl, { cache: "no-cache" });
    if (!res.ok) return [];
    const json = await res.json();
    if (json.status !== "ok" || !Array.isArray(json.items)) return [];

    return json.items.map(item => {
      const title = stripHtml(item.title);
      const summary = stripHtml(item.description || item.content).slice(0, 145);
      const img =
        sanitizeHttpUrl(item.thumbnail) ||
        sanitizeHttpUrl(item.enclosure?.link) ||
        extractFirstImage(item.content || item.description);

      return {
        id: `avs-live-${item.guid || item.link || title.slice(0, 20)}`,
        date: String(item.pubDate || "").slice(0, 10) || "2026",
        source: "आदर्श वाणी समाचार",
        outlet_key: "AVS",
        category: inferCategory(title),
        category_label: (Array.isArray(item.categories) && item.categories[0]) ? String(item.categories[0]) : "ताज़ा समाचार",
        title,
        summary: summary ? `${summary}...` : "",
        impact: /निलंबित|सस्पेंड|₹2\.27|CSR|कलेक्टर|सीलबंद|सील/.test(title),
        image: img,
        url: sanitizeHttpUrl(item.link) || "https://aadarshvanisamachar.com/"
      };
    });
  }

  async function fetchWpFeaturedMediaMap() {
    try {
      const res = await fetch("https://aadarshvanisamachar.com/wp-json/wp/v2/posts?_embed&per_page=10", { cache: "no-cache" });
      if (!res.ok) return [];
      const posts = await res.json();
      if (!Array.isArray(posts)) return [];
      return posts.map(p => {
        const media = p?._embedded?.["wp:featuredmedia"]?.[0];
        const img = sanitizeHttpUrl(media?.source_url || "");
        const title = stripHtml(p?.title?.rendered || "");
        const summary = stripHtml(p?.excerpt?.rendered || "").slice(0, 145);
        return {
          id: `avs-wp-${p.id}`,
          date: String(p.date || "").slice(0, 10),
          source: "आदर्श वाणी समाचार",
          outlet_key: "AVS",
          category: inferCategory(title),
          category_label: "ताज़ा समाचार",
          title,
          summary: summary ? `${summary}...` : "",
          impact: /निलंबित|सस्पेंड|₹2\.27|CSR|कलेक्टर|सील/.test(title),
          image: img,
          url: sanitizeHttpUrl(p.link)
        };
      });
    } catch (_) {
      return [];
    }
  }

  async function fetchOfficialYouTubeVideos() {
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${OFFICIAL_YT_CHANNEL_ID}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
    const res = await fetch(apiUrl, { cache: "no-cache" });
    if (!res.ok) return [];
    const json = await res.json();
    if (json.status !== "ok" || !Array.isArray(json.items)) return [];

    return json.items.map(item => {
      const id = extractYouTubeId(item.link);
      const title = stripHtml(item.title);
      return {
        id,
        title,
        channel: "आदर्श वाणी समाचार नारायणपुर",
        date: String(item.pubDate || "").slice(0, 10),
        category: inferCategory(title),
        thumbnail: id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : sanitizeHttpUrl(item.thumbnail),
        url: sanitizeHttpUrl(item.link) || OFFICIAL_YT_URL
      };
    }).filter(v => v.id);
  }

  window.syncLiveUpdates = async function syncLiveUpdates(manual = false) {
    const statusEl = document.getElementById("sync-status-badge");
    if (statusEl) {
      statusEl.textContent = manual ? "🔄 लाइव सिंक हो रहा है..." : "🟢 aadarshvanisamachar.com से सिंक हो रहा है...";
    }

    try {
      const localRes = await fetch("./data/stories.json", { cache: "no-cache" });
      if (localRes.ok) {
        const localJson = await localRes.json();
        if (Array.isArray(localJson.stories)) mergeStories(localJson.stories);
        if (Array.isArray(localJson.videos)) mergeVideos(localJson.videos);
      }
    } catch (_) {}

    renderUnifiedFeed();
    renderTicker();

    const results = await Promise.allSettled([
      fetchWpFeaturedMediaMap(),
      fetchAvsRss(),
      fetchOfficialYouTubeVideos()
    ]);

    let synced = false;
    results.forEach((res, idx) => {
      if (res.status !== "fulfilled" || !Array.isArray(res.value) || !res.value.length) return;
      synced = true;
      if (idx <= 1) mergeStories(res.value);
      else mergeVideos(res.value);
    });

    renderUnifiedFeed();
    renderTicker();

    if (statusEl) {
      const t = new Date().toLocaleTimeString("hi-IN", { hour: "2-digit", minute: "2-digit" });
      statusEl.textContent = synced
        ? `🟢 Live Synced: aadarshvanisamachar.com (${t})`
        : `🟢 Official Archive Active (${t})`;
    }
  };

  window.filterNews = function filterNews(filter, btn) {
    activeFilter = filter;
    document.querySelectorAll(".filter-btn").forEach(b => {
      b.className = "filter-btn bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-bold px-3.5 py-2 rounded-lg transition";
    });
    if (btn) {
      btn.className = "filter-btn bg-red-600 text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-sm transition";
    }
    renderUnifiedFeed();
  };

  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("story-search");
    if (searchInput) {
      searchInput.addEventListener("input", event => {
        searchQuery = String(event.target.value || "").trim().toLowerCase();
        renderUnifiedFeed();
      });
    }

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") window.closeVideoModal();
    });

    renderUnifiedFeed();
    renderTicker();
    window.syncLiveUpdates(false);
  });
})();
