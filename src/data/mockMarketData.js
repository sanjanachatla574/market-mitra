export const CROPS = [
  {
    id: "tomato",
    names: { en: "Tomato", te: "టమాటా", ta: "தக்காளி", kn: "ಟೊಮೆಟೊ" },
    icon: "🍅",
    defaultUnit: "quintal",
    basePrice: 1850,
    packingType: "Crate (25 kg)",
    shelfLifeDays: 4,
    description: "Hybrid & Local varieties"
  },
  {
    id: "onion",
    names: { en: "Onion", te: "ఉల్లిపాయ", ta: "வெங்காயம்", kn: "ಈರುಳ್ಳಿ" },
    icon: "🧅",
    defaultUnit: "quintal",
    basePrice: 2400,
    packingType: "Jute Bag (50 kg)",
    shelfLifeDays: 30,
    description: "Red Nashik / Bellary Medium"
  },
  {
    id: "cotton",
    names: { en: "Cotton (Kapas)", te: "పత్తి", ta: "பருத்தி", kn: "ಹತ್ತಿ" },
    icon: "☁️",
    defaultUnit: "quintal",
    basePrice: 7150,
    packingType: "Loose / Bale",
    shelfLifeDays: 180,
    description: "Long staple DCH-32 / Bunny"
  },
  {
    id: "chilli",
    names: { en: "Dry Red Chilli", te: "ఎండు మిర్చి", ta: "சிவப்பு மிளகாய்", kn: "ಒಣ ಮೆಣಸಿನಕಾಯಿ" },
    icon: "🌶️",
    defaultUnit: "quintal",
    basePrice: 16800,
    packingType: "Gunny Bag (40 kg)",
    shelfLifeDays: 120,
    description: "Teja / Guntur Sannam S4"
  },
  {
    id: "paddy",
    names: { en: "Paddy (Common / BPT)", te: "వరి (ధాన్యం)", ta: "நெல்", kn: "ಭತ್ತ" },
    icon: "🌾",
    defaultUnit: "quintal",
    basePrice: 2320,
    packingType: "Gunny Bag (75 kg)",
    shelfLifeDays: 360,
    description: "Grade A MSP / Sona Masuri"
  },
  {
    id: "maize",
    names: { en: "Maize (Corn)", te: "మొక్కజొన్న", ta: "மக்காச்சோளம்", kn: "ಮೆಕ್ಕೆಜೋಳ" },
    icon: "🌽",
    defaultUnit: "quintal",
    basePrice: 2150,
    packingType: "Bag (50 kg)",
    shelfLifeDays: 90,
    description: "Yellow Hybrid Feed Grade"
  },
  {
    id: "groundnut",
    names: { en: "Groundnut (Pods)", te: "వేరుశనగ", ta: "நிலக்கடலை", kn: "ಕಡಲೆಕಾಯಿ" },
    icon: "🥜",
    defaultUnit: "quintal",
    basePrice: 6350,
    packingType: "Bag (40 kg)",
    shelfLifeDays: 90,
    description: "Bold / Java Pods"
  },
  {
    id: "turmeric",
    names: { en: "Turmeric (Finger)", te: "పసుపు కొమ్ములు", ta: "மஞ்சள்", kn: "ಅರಿಶಿನ" },
    icon: "🟡",
    defaultUnit: "quintal",
    basePrice: 13500,
    packingType: "Double Gunny Bag (60 kg)",
    shelfLifeDays: 365,
    description: "Nizamabad / Salem Bulb & Finger"
  },
  {
    id: "potato",
    names: { en: "Potato", te: "బంగాళాదుంప", ta: "உருளைக்கிழங்கு", kn: "ಆಲೂಗಡ್ಡೆ" },
    icon: "🥔",
    defaultUnit: "quintal",
    basePrice: 1620,
    packingType: "Mesh Bag (50 kg)",
    shelfLifeDays: 45,
    description: "Jyoti / Kufri Pukhraj"
  },
  {
    id: "soybean",
    names: { en: "Soybean", te: "సోయాబీన్", ta: "சோயாபீன்", kn: "ಸೋಯಾಬೀನ್" },
    icon: "🌱",
    defaultUnit: "quintal",
    basePrice: 4400,
    packingType: "Bag (50 kg)",
    shelfLifeDays: 180,
    description: "Yellow Seed Grade 1"
  }
];

export const ORIGINS = [
  { id: "siddipet", name: "Siddipet / Gajwel, Telangana", state: "Telangana", lat: 18.1018, lng: 78.8520 },
  { id: "jangaon", name: "Jangaon / Aler, Telangana", state: "Telangana", lat: 17.7288, lng: 79.1557 },
  { id: "miryalaguda", name: "Miryalaguda, Nalgonda, Telangana", state: "Telangana", lat: 16.8741, lng: 79.5638 },
  { id: "tenali", name: "Tenali / Mangalagiri, Andhra Pradesh", state: "Andhra Pradesh", lat: 16.2437, lng: 80.6400 },
  { id: "dharmavaram", name: "Dharmavaram, Anantapur, Andhra Pradesh", state: "Andhra Pradesh", lat: 14.4137, lng: 77.7126 },
  { id: "kanchipuram", name: "Kanchipuram, Tamil Nadu", state: "Tamil Nadu", lat: 12.8342, lng: 79.7036 },
  { id: "kolar", name: "Kolar / Malur, Karnataka", state: "Karnataka", lat: 13.1367, lng: 78.1291 },
  { id: "mandya", name: "Mandya / Maddur, Karnataka", state: "Karnataka", lat: 12.5218, lng: 76.8951 }
];

export const MANDIS = [
  {
    id: "bowenpally",
    name: "Bowenpally APMC Market",
    names: {
      en: "Bowenpally APMC, Hyderabad",
      te: "బోయిన్‌పల్లి వ్యవసాయ మార్కెట్, హైదరాబాద్",
      ta: "போவன்பல்லி ஏபிஎம்சி, ஹைதராபாத்",
      kn: "ಬೋವನ್‌ಪಲ್ಲಿ ಎಪಿಎಂಸಿ, ಹೈದರಾಬಾದ್"
    },
    district: "Hyderabad",
    state: "Telangana",
    baseDistanceKm: {
      siddipet: 68,
      jangaon: 88,
      miryalaguda: 146,
      tenali: 290,
      dharmavaram: 360,
      kanchipuram: 650,
      kolar: 570,
      mandya: 640
    },
    phone: "040-27751234",
    apmcCode: "TS-HYD-01"
  },
  {
    id: "warangal",
    name: "Warangal Enumamula APMC (Grain & Cotton)",
    names: {
      en: "Enumamula APMC, Warangal",
      te: "ఎనుమాముల వ్యవసాయ మార్కెట్, వరంగల్",
      ta: "எனுமாமுலா சந்தை, வாரங்கல்",
      kn: "ಎನುಮಾಮುಲಾ ಮಾರುಕಟ್ಟೆ, ವಾರಂಗಲ್"
    },
    district: "Warangal",
    state: "Telangana",
    baseDistanceKm: {
      siddipet: 92,
      jangaon: 58,
      miryalaguda: 135,
      tenali: 220,
      dharmavaram: 440,
      kanchipuram: 690,
      kolar: 630,
      mandya: 710
    },
    phone: "0870-2445678",
    apmcCode: "TS-WGL-02"
  },
  {
    id: "khammam",
    name: "Khammam APMC Yard",
    names: {
      en: "Khammam APMC Yard",
      te: "ఖమ్మం వ్యవసాయ మార్కెట్ యార్డ్",
      ta: "கம்மம் ஏபிஎம்சி தளம்",
      kn: "ಖಮ್ಮಂ ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆ"
    },
    district: "Khammam",
    state: "Telangana",
    baseDistanceKm: {
      siddipet: 175,
      jangaon: 125,
      miryalaguda: 94,
      tenali: 135,
      dharmavaram: 410,
      kanchipuram: 580,
      kolar: 590,
      mandya: 680
    },
    phone: "08742-232111",
    apmcCode: "TS-KHM-03"
  },
  {
    id: "guntur",
    name: "Guntur Mirchi Yard & Commercial APMC",
    names: {
      en: "Guntur APMC (Asia's Largest Mirchi Yard)",
      te: "గుంటూరు మిర్చి యార్డ్ & మార్కెట్",
      ta: "குண்டூர் மிளகாய் சந்தை",
      kn: "ಗುಂಟೂರು ಮೆಣಸಿನಕಾಯಿ ಮಾರುಕಟ್ಟೆ"
    },
    district: "Guntur",
    state: "Andhra Pradesh",
    baseDistanceKm: {
      siddipet: 310,
      jangaon: 240,
      miryalaguda: 125,
      tenali: 28,
      dharmavaram: 380,
      kanchipuram: 430,
      kolar: 510,
      mandya: 610
    },
    phone: "0863-2234001",
    apmcCode: "AP-GNT-01"
  },
  {
    id: "kurnool",
    name: "Kurnool APMC Market",
    names: {
      en: "Kurnool APMC Market",
      te: "కర్నూలు వ్యవసాయ మార్కెట్ యార్డ్",
      ta: "கர்நூல் ஏபிஎம்சி சந்தை",
      kn: "ಕರ್ನೂಲ್ ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆ"
    },
    district: "Kurnool",
    state: "Andhra Pradesh",
    baseDistanceKm: {
      siddipet: 275,
      jangaon: 285,
      miryalaguda: 210,
      tenali: 270,
      dharmavaram: 170,
      kanchipuram: 470,
      kolar: 340,
      mandya: 420
    },
    phone: "08518-255902",
    apmcCode: "AP-KRN-02"
  },
  {
    id: "koyambedu",
    name: "Koyambedu Wholesale Market Complex",
    names: {
      en: "Koyambedu Wholesale Market, Chennai",
      te: "కోయంబేడు టోకు మార్కెట్, చెన్నై",
      ta: "கோயம்பேடு மொத்த சந்தை வளாகம், சென்னை",
      kn: "ಕೋಯಂಬೇಡು ಸಗಟು ಮಾರುಕಟ್ಟೆ, ಚೆನ್ನೈ"
    },
    district: "Chennai",
    state: "Tamil Nadu",
    baseDistanceKm: {
      siddipet: 680,
      jangaon: 630,
      miryalaguda: 510,
      tenali: 410,
      dharmavaram: 390,
      kanchipuram: 72,
      kolar: 290,
      mandya: 375
    },
    phone: "044-24792345",
    apmcCode: "TN-CHN-01"
  },
  {
    id: "yeshwanthpur",
    name: "Yeshwanthpur APMC RMC Yard",
    names: {
      en: "Yeshwanthpur APMC Yard, Bengaluru",
      te: "యశ్వంత్‌పూర్ మార్కెట్ యార్డ్, బెంగళూరు",
      ta: "யஷ்வந்த்பூர் ஏபிஎம்சி, பெங்களூரு",
      kn: "ಯಶವಂತಪುರ ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆ, ಬೆಂಗಳೂರು"
    },
    district: "Bengaluru Urban",
    state: "Karnataka",
    baseDistanceKm: {
      siddipet: 610,
      jangaon: 640,
      miryalaguda: 550,
      tenali: 520,
      dharmavaram: 195,
      kanchipuram: 310,
      kolar: 68,
      mandya: 98
    },
    phone: "080-23371900",
    apmcCode: "KA-BLR-01"
  }
];

// Generate deterministic realistic price samples based on crop, mandi, and quality
export function getSampleMandiPrices(cropId, originId, qualityGrade = "gradeA") {
  const crop = CROPS.find(c => c.id === cropId) || CROPS[0];
  const origin = ORIGINS.find(o => o.id === originId) || ORIGINS[0];

  const qualityMultiplier = qualityGrade === "gradeA" ? 1.0 : qualityGrade === "gradeB" ? 0.90 : 0.78;

  // Generate for all mandis, sorted by distance or net profit
  return MANDIS.map((mandi, idx) => {
    const dist = mandi.baseDistanceKm[origin.id] || 85 + (idx * 25);
    
    // Mandi price variations based on regional specialization
    let mandiBonus = 0;
    if (cropId === "chilli" && mandi.id === "guntur") mandiBonus = 1200; // Guntur is mirchi capital
    if (cropId === "cotton" && mandi.id === "warangal") mandiBonus = 350; // Warangal kapas hub
    if (cropId === "tomato" && (mandi.id === "bowenpally" || mandi.id === "koyambedu")) mandiBonus = 180; // High consumption metro
    if (cropId === "turmeric" && mandi.id === "warangal") mandiBonus = 500;
    if (cropId === "onion" && mandi.id === "yeshwanthpur") mandiBonus = 220;

    const base = Math.round((crop.basePrice + mandiBonus + ((idx * 43) % 170) - 60) * qualityMultiplier);
    const minPrice = Math.round(base * 0.91);
    const maxPrice = Math.round(base * 1.08);
    const modalPrice = base;

    // Simulate varying arrival freshness
    // 1st & 2nd are fresh today, 3rd is yesterday, one mandi has stale/no arrivals for testing transparency rule!
    let freshnessStatus = "fresh";
    let arrivalDate = "2026-10-14";
    let lastUpdated = "Today, 11:30 AM IST";
    let freshnessReason = "Official morning auction reports verified on e-NAM & APMC terminal.";
    let arrivalQuantity = 450 + (idx * 110);

    if (idx === 2) {
      freshnessStatus = "yesterday";
      arrivalDate = "2026-10-13";
      lastUpdated = "Yesterday, 05:45 PM IST";
      freshnessReason = "Evening closing prices from previous trading session. Today's noon auctions pending.";
      arrivalQuantity = 380;
    } else if (idx === 4) {
      freshnessStatus = "stale";
      arrivalDate = "2026-10-11";
      lastUpdated = "3 days ago (11 Oct 2026)";
      freshnessReason = "APMC mandi closed for local festive holiday / weekend. Last traded prices shown with caution.";
      arrivalQuantity = 120;
    } else if (idx === 5) {
      freshnessStatus = "no_arrivals";
      arrivalDate = "2026-10-14";
      lastUpdated = "Today, 09:00 AM IST";
      freshnessReason = "Zero arrivals reported today for this crop grade. Showing indicative reference based on previous session.";
      arrivalQuantity = 0;
    }

    // Historical price trends for this mandi & crop (past 14 days)
    const history = [];
    for (let day = 14; day >= 0; day--) {
      const d = new Date(2026, 9, 14 - day);
      const dayStr = d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
      const randomSwing = Math.sin(day * 0.7 + idx) * (base * 0.05);
      const hModal = Math.round(base + randomSwing);
      history.push({
        date: dayStr,
        modal: hModal,
        min: Math.round(hModal * 0.92),
        max: Math.round(hModal * 1.07),
        volumeQtl: Math.round(300 + Math.cos(day) * 80)
      });
    }

    return {
      mandiId: mandi.id,
      mandiName: mandi.name,
      mandiNames: mandi.names,
      district: mandi.district,
      state: mandi.state,
      apmcCode: mandi.apmcCode,
      phone: mandi.phone,
      distanceKm: dist,
      cropId,
      cropName: crop.names.en,
      qualityGrade,
      minPrice,
      maxPrice,
      modalPrice,
      arrivalQuantity,
      arrivalDate,
      lastUpdated,
      freshnessStatus,
      freshnessReason,
      source: "Agmarknet (Directorate of Marketing & Inspection, GoI)",
      isSampleData: true, // STRICT RULE: Must be explicitly tagged
      history
    };
  });
}
