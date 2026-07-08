export const defaultCategories = [
  {
    name: "Vegetables",
    icon: "Salad",
    color: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",
    subcategories: ["Leafy Vegetables", "Root Vegetables", "Seasonal"],
    predefinedItems: [
      { name: "Tomato", defaultUnit: "kg", subcategory: "Seasonal" },
      { name: "Potato", defaultUnit: "kg", subcategory: "Root Vegetables" },
      { name: "Onion", defaultUnit: "kg", subcategory: "Root Vegetables" },
      { name: "Garlic", defaultUnit: "gram", subcategory: "Root Vegetables" },
      { name: "Ginger", defaultUnit: "gram", subcategory: "Root Vegetables" },
      { name: "Green Chilli", defaultUnit: "gram", subcategory: "Leafy Vegetables" },
      { name: "Capsicum", defaultUnit: "kg", subcategory: "Seasonal" },
      { name: "Cabbage", defaultUnit: "piece", subcategory: "Leafy Vegetables" },
      { name: "Cauliflower", defaultUnit: "piece", subcategory: "Seasonal" },
      { name: "Spinach", defaultUnit: "packet", subcategory: "Leafy Vegetables" },
      { name: "Lady Finger", defaultUnit: "kg", subcategory: "Seasonal" },
      { name: "Brinjal", defaultUnit: "kg", subcategory: "Seasonal" },
      { name: "Peas", defaultUnit: "kg", subcategory: "Seasonal" },
      { name: "Coriander", defaultUnit: "packet", subcategory: "Leafy Vegetables" },
      { name: "Lemon", defaultUnit: "piece", subcategory: "Seasonal" },
      { name: "Cucumber", defaultUnit: "kg", subcategory: "Seasonal" }
    ]
  },
  {
    name: "Fruits",
    icon: "Apple",
    color: "bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400",
    subcategories: ["Citrus", "Berries", "Tropical", "Seasonal"],
    predefinedItems: [
      { name: "Apple", defaultUnit: "kg", subcategory: "Seasonal" },
      { name: "Banana", defaultUnit: "dozen", subcategory: "Tropical" },
      { name: "Orange", defaultUnit: "kg", subcategory: "Citrus" },
      { name: "Mango", defaultUnit: "kg", subcategory: "Seasonal" },
      { name: "Papaya", defaultUnit: "piece", subcategory: "Tropical" },
      { name: "Grapes", defaultUnit: "kg", subcategory: "Berries" },
      { name: "Watermelon", defaultUnit: "piece", subcategory: "Seasonal" },
      { name: "Pomegranate", defaultUnit: "kg", subcategory: "Tropical" }
    ]
  },
  {
    name: "Dairy",
    icon: "Milk",
    color: "bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400",
    subcategories: ["Milk & Curd", "Cheese & Butter", "Others"],
    predefinedItems: [
      { name: "Milk", defaultUnit: "litre", subcategory: "Milk & Curd" },
      { name: "Curd", defaultUnit: "packet", subcategory: "Milk & Curd" },
      { name: "Paneer", defaultUnit: "gram", subcategory: "Cheese & Butter" },
      { name: "Butter", defaultUnit: "packet", subcategory: "Cheese & Butter" },
      { name: "Cheese", defaultUnit: "packet", subcategory: "Cheese & Butter" },
      { name: "Ghee", defaultUnit: "litre", subcategory: "Others" }
    ]
  },
  {
    name: "Grocery",
    icon: "Wheat",
    color: "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400",
    subcategories: ["Flour", "Rice", "Pulses", "Cooking Oils", "Sweeteners"],
    predefinedItems: [
      { name: "Flour", defaultUnit: "kg", subcategory: "Flour" },
      { name: "Rice", defaultUnit: "kg", subcategory: "Rice" },
      { name: "Dal", defaultUnit: "kg", subcategory: "Pulses" },
      { name: "Sugar", defaultUnit: "kg", subcategory: "Sweeteners" },
      { name: "Salt", defaultUnit: "packet", subcategory: "Sweeteners" },
      { name: "Cooking Oil", defaultUnit: "litre", subcategory: "Cooking Oils" },
      { name: "Tea", defaultUnit: "packet", subcategory: "Others" },
      { name: "Coffee", defaultUnit: "bottle", subcategory: "Others" },
      { name: "Besan", defaultUnit: "packet", subcategory: "Flour" },
      { name: "Poha", defaultUnit: "packet", subcategory: "Rice" },
      { name: "Suji", defaultUnit: "packet", subcategory: "Flour" }
    ]
  },
  {
    name: "Spices",
    icon: "Flame",
    color: "bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400",
    subcategories: ["Whole Spices", "Powdered Spices"],
    predefinedItems: [
      { name: "Turmeric Powder", defaultUnit: "packet", subcategory: "Powdered Spices" },
      { name: "Red Chilli Powder", defaultUnit: "packet", subcategory: "Powdered Spices" },
      { name: "Coriander Powder", defaultUnit: "packet", subcategory: "Powdered Spices" },
      { name: "Cumin Seeds", defaultUnit: "packet", subcategory: "Whole Spices" },
      { name: "Garam Masala", defaultUnit: "packet", subcategory: "Powdered Spices" },
      { name: "Mustard Seeds", defaultUnit: "packet", subcategory: "Whole Spices" }
    ]
  },
  {
    name: "Cleaning",
    icon: "Sparkles",
    color: "bg-teal-100 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400",
    subcategories: ["Detergents", "Household", "Personal Hygiene"],
    predefinedItems: [
      { name: "Detergent", defaultUnit: "kg", subcategory: "Detergents" },
      { name: "Dishwash", defaultUnit: "piece", subcategory: "Household" },
      { name: "Floor Cleaner", defaultUnit: "bottle", subcategory: "Household" },
      { name: "Toilet Cleaner", defaultUnit: "bottle", subcategory: "Household" },
      { name: "Soap", defaultUnit: "piece", subcategory: "Personal Hygiene" },
      { name: "Hand Wash", defaultUnit: "bottle", subcategory: "Personal Hygiene" }
    ]
  },
  {
    name: "Snacks",
    icon: "Cookie",
    color: "bg-yellow-100 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-400",
    subcategories: ["Biscuits", "Chips & Namkeen", "Chocolates"],
    predefinedItems: [
      { name: "Biscuits", defaultUnit: "packet", subcategory: "Biscuits" },
      { name: "Chips", defaultUnit: "packet", subcategory: "Chips & Namkeen" },
      { name: "Namkeen", defaultUnit: "packet", subcategory: "Chips & Namkeen" },
      { name: "Chocolates", defaultUnit: "piece", subcategory: "Chocolates" }
    ]
  },
  {
    name: "Beverages",
    icon: "CupSoda",
    color: "bg-pink-100 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400",
    subcategories: ["Cold Drinks", "Juices & Soda"],
    predefinedItems: [
      { name: "Soft Drink", defaultUnit: "bottle", subcategory: "Cold Drinks" },
      { name: "Fruit Juice", defaultUnit: "packet", subcategory: "Juices & Soda" },
      { name: "Soda Water", defaultUnit: "bottle", subcategory: "Juices & Soda" }
    ]
  },
  {
    name: "Medicines",
    icon: "Pills",
    color: "bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400",
    subcategories: ["Daily Supplements", "First Aid & Tablets"],
    predefinedItems: [
      { name: "Multi-Vitamin", defaultUnit: "box", subcategory: "Daily Supplements" },
      { name: "Paracetamol", defaultUnit: "packet", subcategory: "First Aid & Tablets" },
      { name: "Cough Syrup", defaultUnit: "bottle", subcategory: "First Aid & Tablets" },
      { name: "Band-aid", defaultUnit: "box", subcategory: "First Aid & Tablets" }
    ]
  },
  {
    name: "Others",
    icon: "Package",
    color: "bg-gray-100 dark:bg-neutral-850 text-gray-600 dark:text-gray-400",
    subcategories: ["Household Utilities"],
    predefinedItems: [
      { name: "Garbage Bags", defaultUnit: "packet", subcategory: "Household Utilities" },
      { name: "Matchbox", defaultUnit: "box", subcategory: "Household Utilities" },
      { name: "Tissue Paper", defaultUnit: "packet", subcategory: "Household Utilities" }
    ]
  }
];

export const defaultUnits = [
  "kg",
  "gram",
  "litre",
  "ml",
  "piece",
  "packet",
  "bottle",
  "box",
  "dozen"
];

// Helper to look up unit default for a predefined item
export function getDefaultUnit(itemName) {
  const normalized = itemName.toLowerCase().trim();
  for (const cat of defaultCategories) {
    for (const item of cat.predefinedItems) {
      if (item.name.toLowerCase().trim() === normalized) {
        return item.defaultUnit;
      }
    }
  }
  // Standard fallbacks
  if (normalized.includes("oil") || normalized.includes("milk") || normalized.includes("ghee") || normalized.includes("juice")) {
    return "litre";
  }
  if (normalized.includes("flour") || normalized.includes("rice") || normalized.includes("dal") || normalized.includes("sugar")) {
    return "kg";
  }
  if (normalized.includes("biscuit") || normalized.includes("chips") || normalized.includes("namkeen") || normalized.includes("curd")) {
    return "packet";
  }
  if (normalized.includes("soap") || normalized.includes("lemon") || normalized.includes("cabbage")) {
    return "piece";
  }
  return "piece";
}

export const itemTranslations = {
  "Tomato": { en: "Tomato", hi: "टमाटर", hinglish: "Tamatar" },
  "Potato": { en: "Potato", hi: "आलू", hinglish: "Aloo" },
  "Onion": { en: "Onion", hi: "प्याज़", hinglish: "Pyaz" },
  "Garlic": { en: "Garlic", hi: "लहसुन", hinglish: "Lahsun" },
  "Ginger": { en: "Ginger", hi: "अदरक", hinglish: "Adrak" },
  "Green Chilli": { en: "Green Chilli", hi: "हरी मिर्च", hinglish: "Hari Mirch" },
  "Capsicum": { en: "Capsicum", hi: "शिमला मिर्च", hinglish: "Shimla Mirch" },
  "Cabbage": { en: "Cabbage", hi: "पत्ता गोभी", hinglish: "Patta Gobhi" },
  "Cauliflower": { en: "Cauliflower", hi: "फूल गोभी", hinglish: "Phool Gobhi" },
  "Spinach": { en: "Spinach", hi: "पालक", hinglish: "Palak" },
  "Lady Finger": { en: "Lady Finger", hi: "भिंडी", hinglish: "Bhindi" },
  "Brinjal": { en: "Brinjal", hi: "बैंगन", hinglish: "Baingan" },
  "Peas": { en: "Peas", hi: "मटर", hinglish: "Matar" },
  "Coriander": { en: "Coriander", hi: "धनिया", hinglish: "Dhaniya" },
  "Lemon": { en: "Lemon", hi: "नींबू", hinglish: "Nimboo" },
  "Cucumber": { en: "Cucumber", hi: "खीरा", hinglish: "Kheera" },
  
  "Apple": { en: "Apple", hi: "सेब", hinglish: "Seb" },
  "Banana": { en: "Banana", hi: "केला", hinglish: "Kela" },
  "Orange": { en: "Orange", hi: "संतरा", hinglish: "Santra" },
  "Mango": { en: "Mango", hi: "आम", hinglish: "Aam" },
  "Papaya": { en: "Papaya", hi: "पपीता", hinglish: "Papita" },
  "Grapes": { en: "Grapes", hi: "अंगूर", hinglish: "Angoor" },
  "Watermelon": { en: "Watermelon", hi: "तरबूज", hinglish: "Tarbooz" },
  "Pomegranate": { en: "Pomegranate", hi: "अनार", hinglish: "Anaar" },

  "Milk": { en: "Milk", hi: "दूध", hinglish: "Doodh" },
  "Curd": { en: "Curd", hi: "दही", hinglish: "Dahi" },
  "Paneer": { en: "Paneer", hi: "पनीर", hinglish: "Paneer" },
  "Butter": { en: "Butter", hi: "मक्खन", hinglish: "Makkhan" },
  "Cheese": { en: "Cheese", hi: "चीज़", hinglish: "Cheese" },
  "Ghee": { en: "Ghee", hi: "घी", hinglish: "Ghee" },

  "Flour": { en: "Flour", hi: "आटा", hinglish: "Aata" },
  "Rice": { en: "Rice", hi: "चावल", hinglish: "Chawal" },
  "Dal": { en: "Dal", hi: "दाल", hinglish: "Dal" },
  "Sugar": { en: "Sugar", hi: "चीनी", hinglish: "Cheeni" },
  "Salt": { en: "Salt", hi: "नमक", hinglish: "Namak" },
  "Cooking Oil": { en: "Cooking Oil", hi: "तेल", hinglish: "Tel" },
  "Tea": { en: "Tea", hi: "चाय", hinglish: "Chai" },
  "Coffee": { en: "Coffee", hi: "कॉफी", hinglish: "Coffee" },

  "Turmeric Powder": { en: "Turmeric Powder", hi: "हल्दी पाउडर", hinglish: "Haldi Powder" },
  "Red Chilli Powder": { en: "Red Chilli Powder", hi: "लाल मिर्च पाउडर", hinglish: "Lal Mirch Powder" },
  "Coriander Powder": { en: "Coriander Powder", hi: "धनिया पाउडर", hinglish: "Dhaniya Powder" },
  "Cumin Seeds": { en: "Cumin Seeds", hi: "जीरा", hinglish: "Jeera" },
  "Garam Masala": { en: "Garam Masala", hi: "गरम मसाला", hinglish: "Garam Masala" },
  "Mustard Seeds": { en: "Mustard Seeds", hi: "राई", hinglish: "Rai" },

  "Soap": { en: "Soap", hi: "साबुन", hinglish: "Sabun" },
  "Detergent": { en: "Detergent", hi: "सर्फ / डिटर्जेंट", hinglish: "Surf" },
  "Floor Cleaner": { en: "Floor Cleaner", hi: "फर्श साफ करने वाला", hinglish: "Floor Cleaner" },
  "Dishwash": { en: "Dishwash", hi: "बर्तन धोने वाला", hinglish: "Dishwash" }
};

export function translateItemName(name, lang) {
  const normalized = name.trim();
  const key = Object.keys(itemTranslations).find(
    (k) => k.toLowerCase() === normalized.toLowerCase()
  );
  if (key && itemTranslations[key]) {
    return itemTranslations[key][lang];
  }
  return name;
}

export const hinglishUnitMappings = {
  "dabba": "box",
  "dhabba": "box",
  "bax": "box",
  "box": "box",
  "container": "box",
  "packet": "packet",
  "pouch": "packet",
  "pkt": "packet",
  "kilo": "kg",
  "kilogram": "kg",
  "kg": "kg",
  "gram": "gram",
  "g": "gram",
  "gm": "gram",
  "litre": "litre",
  "liter": "litre",
  "l": "litre",
  "ml": "ml",
  "millilitre": "ml",
  "piece": "piece",
  "pc": "piece",
  "dana": "piece",
  "botal": "bottle",
  "bottle": "bottle",
  "dozen": "dozen",
  "darjan": "dozen",
  "dazan": "dozen"
};

export function parseHinglishUnit(word) {
  const normalized = word.toLowerCase().trim();
  // Exact match first
  if (hinglishUnitMappings[normalized]) {
    return hinglishUnitMappings[normalized];
  }
  // Substring match fallback
  const matchedKey = Object.keys(hinglishUnitMappings).find(
    (k) => normalized.includes(k) || k.includes(normalized)
  );
  return matchedKey ? hinglishUnitMappings[matchedKey] : null;
}

// Auto-detect category based on item name and predefined keywords
export function autoDetectCategory(itemName, categoriesList) {
  const normalized = itemName.toLowerCase().trim();
  
  // 1. Check exact predefined items first
  for (const cat of defaultCategories) {
    for (const item of cat.predefinedItems) {
      if (item.name.toLowerCase().trim() === normalized) {
        // Find corresponding category in actual DB categories (by name)
        const dbCat = categoriesList.find(c => c.name === cat.name);
        if (dbCat) return dbCat._id;
      }
    }
  }

  // 2. Keyword based guessing
  const categoryKeywords = {
    "Vegetables": ["tomato", "potato", "onion", "garlic", "ginger", "chilli", "cabbage", "spinach", "pea", "lady finger", "brinjal", "carrot", "radish", "tamatar", "aloo", "pyaz", "adrak", "mirch", "gobhi", "palak", "bhindi", "baingan", "matar"],
    "Fruits": ["apple", "banana", "orange", "mango", "papaya", "grape", "watermelon", "pomegranate", "seb", "kela", "santra", "aam", "papita", "angoor", "tarbooz", "anaar", "guava", "amrood"],
    "Dairy": ["milk", "curd", "paneer", "butter", "cheese", "ghee", "doodh", "dahi", "makkhan", "yogurt"],
    "Grocery": ["flour", "rice", "dal", "sugar", "salt", "oil", "tea", "coffee", "besan", "poha", "suji", "aata", "chawal", "cheeni", "namak", "tel", "chai", "maida", "wheat"],
    "Spices": ["powder", "seed", "masala", "turmeric", "chilli", "coriander", "cumin", "mustard", "haldi", "mirch", "dhaniya", "jeera", "rai", "cardamom", "elaichi", "clove", "laung"],
    "Cleaning": ["soap", "detergent", "cleaner", "wash", "surf", "vim", "harpic", "lizol", "shampoo", "brush"],
    "Snacks": ["biscuit", "chip", "namkeen", "chocolate", "maggi", "noodle", "pasta", "cookie", "cake"],
    "Beverages": ["drink", "juice", "soda", "water", "coke", "pepsi", "sprite", "limca", "maaza", "frooti"],
    "Medicines": ["vitamin", "paracetamol", "syrup", "band", "tablet", "pill", "medicine", "dawai", "crocin"]
  };

  for (const [catName, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(kw => normalized.includes(kw))) {
      const dbCat = categoriesList.find(c => c.name === catName);
      if (dbCat) return dbCat._id;
    }
  }

  // Default to null if no match, allowing fallback logic elsewhere
  return null;
}

// Resolves a spoken/translated name back to its canonical English dictionary key
export function resolveCanonicalName(spokenName) {
  if (!spokenName) return "";
  const normalized = spokenName.trim().toLowerCase();
  
  for (const [englishKey, translations] of Object.entries(itemTranslations)) {
    for (const val of Object.values(translations)) {
      if (val.toLowerCase().trim() === normalized) {
        return englishKey;
      }
    }
  }
  return spokenName;
}
