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
      { name: "Cucumber", defaultUnit: "kg", subcategory: "Seasonal" },

      { name: "Carrot", defaultUnit: "kg", subcategory: "Root Vegetables" },
      { name: "Radish", defaultUnit: "kg", subcategory: "Root Vegetables" },
      { name: "Bottle Gourd", defaultUnit: "piece", subcategory: "Seasonal" },
      { name: "Bitter Gourd", defaultUnit: "kg", subcategory: "Seasonal" },
      { name: "Pumpkin", defaultUnit: "piece", subcategory: "Seasonal" },
      { name: "French Beans", defaultUnit: "kg", subcategory: "Seasonal" },
      { name: "Fenugreek Leaves", defaultUnit: "packet", subcategory: "Leafy Vegetables" },
      { name: "Mint Leaves", defaultUnit: "packet", subcategory: "Leafy Vegetables" },
      { name: "Mushroom", defaultUnit: "packet", subcategory: "Seasonal" }
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
      { name: "Pomegranate", defaultUnit: "kg", subcategory: "Tropical" },

      { name: "Guava", defaultUnit: "kg", subcategory: "Tropical" },
      { name: "Pineapple", defaultUnit: "piece", subcategory: "Tropical" },
      { name: "Sweet Lime", defaultUnit: "kg", subcategory: "Citrus" },
      { name: "Mosambi", defaultUnit: "kg", subcategory: "Citrus" },
      { name: "Litchi", defaultUnit: "kg", subcategory: "Seasonal" },
      { name: "Pear", defaultUnit: "kg", subcategory: "Seasonal" },
      { name: "Kiwi", defaultUnit: "piece", subcategory: "Seasonal" },
      { name: "Coconut", defaultUnit: "piece", subcategory: "Tropical" },
      { name: "Custard Apple", defaultUnit: "kg", subcategory: "Seasonal" },
      { name: "Jamun", defaultUnit: "kg", subcategory: "Seasonal" },
      { name: "Strawberry", defaultUnit: "packet", subcategory: "Berries" },
      { name: "Muskmelon", defaultUnit: "piece", subcategory: "Seasonal" },
      { name: "Dragon Fruit", defaultUnit: "piece", subcategory: "Seasonal" },
      { name: "Plum", defaultUnit: "kg", subcategory: "Seasonal" },
      { name: "Peach", defaultUnit: "kg", subcategory: "Seasonal" },
      { name: "Chikoo", defaultUnit: "kg", subcategory: "Tropical" }
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
      // Flour
      { name: "Flour (Atta)", defaultUnit: "kg", subcategory: "Flour" },
      { name: "Maida", defaultUnit: "kg", subcategory: "Flour" },
      { name: "Besan", defaultUnit: "kg", subcategory: "Flour" },
      { name: "Suji", defaultUnit: "kg", subcategory: "Flour" },
      { name: "Corn Flour", defaultUnit: "packet", subcategory: "Flour" },

      // Rice
      { name: "Rice", defaultUnit: "kg", subcategory: "Rice" },
      { name: "Basmati Rice", defaultUnit: "kg", subcategory: "Rice" },
      { name: "Poha", defaultUnit: "packet", subcategory: "Rice" },
      { name: "Flattened Rice", defaultUnit: "packet", subcategory: "Rice" },

      // Pulses
      { name: "Toor Dal", defaultUnit: "kg", subcategory: "Pulses" },
      { name: "Moong Dal", defaultUnit: "kg", subcategory: "Pulses" },
      { name: "Masoor Dal", defaultUnit: "kg", subcategory: "Pulses" },
      { name: "Chana Dal", defaultUnit: "kg", subcategory: "Pulses" },
      { name: "Urad Dal", defaultUnit: "kg", subcategory: "Pulses" },
      { name: "Rajma", defaultUnit: "kg", subcategory: "Pulses" },
      { name: "Kabuli Chana", defaultUnit: "kg", subcategory: "Pulses" },
      { name: "Kala Chana", defaultUnit: "kg", subcategory: "Pulses" },

      // Sweeteners
      { name: "Sugar", defaultUnit: "kg", subcategory: "Sweeteners" },
      { name: "Jaggery", defaultUnit: "kg", subcategory: "Sweeteners" },
      { name: "Brown Sugar", defaultUnit: "packet", subcategory: "Sweeteners" },
      { name: "Rock Sugar (Mishri)", defaultUnit: "packet", subcategory: "Sweeteners" },

      // Salt
      { name: "Salt", defaultUnit: "packet", subcategory: "Salt" },
      { name: "Rock Salt", defaultUnit: "packet", subcategory: "Salt" },
      { name: "Black Salt", defaultUnit: "packet", subcategory: "Salt" },

      // Cooking Oils
      { name: "Cooking Oil", defaultUnit: "litre", subcategory: "Cooking Oils" },
      { name: "Mustard Oil", defaultUnit: "litre", subcategory: "Cooking Oils" },
      { name: "Sunflower Oil", defaultUnit: "litre", subcategory: "Cooking Oils" },
      { name: "Groundnut Oil", defaultUnit: "litre", subcategory: "Cooking Oils" },
      { name: "Soybean Oil", defaultUnit: "litre", subcategory: "Cooking Oils" },
      { name: "Olive Oil", defaultUnit: "bottle", subcategory: "Cooking Oils" },
      { name: "Ghee", defaultUnit: "kg", subcategory: "Cooking Oils" },

      // Breakfast
      { name: "Oats", defaultUnit: "packet", subcategory: "Breakfast" },
      { name: "Cornflakes", defaultUnit: "box", subcategory: "Breakfast" },
      { name: "Muesli", defaultUnit: "packet", subcategory: "Breakfast" },
      { name: "Vermicelli", defaultUnit: "packet", subcategory: "Breakfast" },

      // Tea & Coffee
      { name: "Tea", defaultUnit: "packet", subcategory: "Tea & Coffee" },
      { name: "Coffee", defaultUnit: "bottle", subcategory: "Tea & Coffee" },
      { name: "Green Tea", defaultUnit: "box", subcategory: "Tea & Coffee" },

      // Baking
      { name: "Baking Soda", defaultUnit: "packet", subcategory: "Baking" },
      { name: "Baking Powder", defaultUnit: "packet", subcategory: "Baking" },
      { name: "Yeast", defaultUnit: "packet", subcategory: "Baking" },
      { name: "Custard Powder", defaultUnit: "packet", subcategory: "Baking" },

      // Dry Fruits
      { name: "Almonds", defaultUnit: "kg", subcategory: "Dry Fruits" },
      { name: "Cashews", defaultUnit: "kg", subcategory: "Dry Fruits" },
      { name: "Raisins", defaultUnit: "kg", subcategory: "Dry Fruits" },
      { name: "Pistachios", defaultUnit: "kg", subcategory: "Dry Fruits" },
      { name: "Walnuts", defaultUnit: "kg", subcategory: "Dry Fruits" },
      { name: "Dates", defaultUnit: "kg", subcategory: "Dry Fruits" },

      // Others
      { name: "Papad", defaultUnit: "packet", subcategory: "Others" },
      { name: "Pickle", defaultUnit: "jar", subcategory: "Others" },
      { name: "Honey", defaultUnit: "bottle", subcategory: "Others" },
      { name: "Soya Chunks", defaultUnit: "packet", subcategory: "Others" },
      { name: "Sabudana", defaultUnit: "packet", subcategory: "Others" },
      { name: "Peanuts", defaultUnit: "kg", subcategory: "Others" },
      { name: "Makhana", defaultUnit: "packet", subcategory: "Others" },
      { name: "Vinegar", defaultUnit: "bottle", subcategory: "Others" }
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
      { name: "Cumin Powder", defaultUnit: "packet", subcategory: "Powdered Spices" },
      { name: "Garam Masala", defaultUnit: "packet", subcategory: "Powdered Spices" },
      { name: "Kitchen King Masala", defaultUnit: "packet", subcategory: "Powdered Spices" },
      { name: "Chaat Masala", defaultUnit: "packet", subcategory: "Powdered Spices" },

      { name: "Cumin Seeds", defaultUnit: "packet", subcategory: "Whole Spices" },
      { name: "Mustard Seeds", defaultUnit: "packet", subcategory: "Whole Spices" },
      { name: "Coriander Seeds", defaultUnit: "packet", subcategory: "Whole Spices" },
      { name: "Black Pepper", defaultUnit: "packet", subcategory: "Whole Spices" },
      { name: "Cloves", defaultUnit: "packet", subcategory: "Whole Spices" },
      { name: "Green Cardamom", defaultUnit: "packet", subcategory: "Whole Spices" },
      { name: "Cinnamon", defaultUnit: "packet", subcategory: "Whole Spices" },
      { name: "Bay Leaves", defaultUnit: "packet", subcategory: "Whole Spices" },

      { name: "Kasuri Methi", defaultUnit: "packet", subcategory: "Herbs & Seasoning" },
    ]
  },
  {
    name: "Cleaning",
    icon: "Sparkles",
    color: "bg-teal-100 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400",
    subcategories: ["Detergents", "Household", "Personal Hygiene"],
    predefinedItems: [
      { name: "Detergent", defaultUnit: "kg", subcategory: "Detergents" },
      { name: "Dishwash Liquid", defaultUnit: "bottle", subcategory: "Kitchen Cleaning" },
      { name: "Dishwash Bar", defaultUnit: "piece", subcategory: "Kitchen Cleaning" },
      { name: "Floor Cleaner", defaultUnit: "bottle", subcategory: "Household" },
      { name: "Toilet Cleaner", defaultUnit: "bottle", subcategory: "Household" },
      { name: "Glass Cleaner", defaultUnit: "bottle", subcategory: "Household" },
      { name: "Soap", defaultUnit: "piece", subcategory: "Personal Hygiene" },
      { name: "Hand Wash", defaultUnit: "bottle", subcategory: "Personal Hygiene" },
      { name: "Shampoo", defaultUnit: "bottle", subcategory: "Personal Hygiene" },
      { name: "Toothpaste", defaultUnit: "piece", subcategory: "Personal Hygiene" },
      { name: "Toothbrush", defaultUnit: "piece", subcategory: "Personal Hygiene" },
      { name: "Tissue Paper", defaultUnit: "packet", subcategory: "Household" },
    ]
  },
  {
    name: "Snacks",
    icon: "Cookie",
    color: "bg-yellow-100 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-400",
    subcategories: ["Biscuits", "Chips & Namkeen", "Chocolates"],
    predefinedItems: [
      { name: "Biscuits", defaultUnit: "packet", subcategory: "Biscuits" },
      { name: "Cookies", defaultUnit: "packet", subcategory: "Biscuits" },
      { name: "Chips", defaultUnit: "packet", subcategory: "Chips & Namkeen" },
      { name: "Namkeen", defaultUnit: "packet", subcategory: "Chips & Namkeen" },
      { name: "Popcorn", defaultUnit: "packet", subcategory: "Chips & Namkeen" },
      { name: "Chocolates", defaultUnit: "piece", subcategory: "Chocolates" },
      { name: "Candy", defaultUnit: "packet", subcategory: "Chocolates" },
      { name: "Noodles", defaultUnit: "packet", subcategory: "Instant Food" },
      { name: "Pasta", defaultUnit: "packet", subcategory: "Instant Food" },
      { name: "Instant Soup", defaultUnit: "packet", subcategory: "Instant Food" },
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
      { name: "Paracetamol", defaultUnit: "strip", subcategory: "Medicines" },
      { name: "Cough Syrup", defaultUnit: "bottle", subcategory: "Medicines" },
      { name: "ORS", defaultUnit: "packet", subcategory: "Medicines" },
      { name: "Antiseptic Liquid", defaultUnit: "bottle", subcategory: "First Aid" },
      { name: "Band-Aid", defaultUnit: "box", subcategory: "First Aid" },
      { name: "Cotton", defaultUnit: "packet", subcategory: "First Aid" },
      { name: "Gauze", defaultUnit: "packet", subcategory: "First Aid" },
      { name: "Pain Relief Spray", defaultUnit: "bottle", subcategory: "First Aid" },
      { name: "Pain Relief Gel", defaultUnit: "tube", subcategory: "First Aid" },
      { name: "Multivitamin", defaultUnit: "box", subcategory: "Supplements" },
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
      { name: "Tissue Paper", defaultUnit: "packet", subcategory: "Household Utilities" },
      { name: "Aluminium Foil", defaultUnit: "roll", subcategory: "Kitchen Essentials" },
      { name: "Cling Wrap", defaultUnit: "roll", subcategory: "Kitchen Essentials" },
      { name: "Paper Napkins", defaultUnit: "packet", subcategory: "Household Utilities" },
      { name: "Candles", defaultUnit: "packet", subcategory: "Household Utilities" },
      { name: "Mosquito Coil", defaultUnit: "box", subcategory: "Household Utilities" },
      { name: "Mosquito Repellent", defaultUnit: "bottle", subcategory: "Household Utilities" },
      { name: "Batteries", defaultUnit: "pair", subcategory: "Utilities" },
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
  // Vegetables
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
  "Carrot": { en: "Carrot", hi: "गाजर", hinglish: "Gajar" },
  "Radish": { en: "Radish", hi: "मूली", hinglish: "Mooli" },
  "Bottle Gourd": { en: "Bottle Gourd", hi: "लौकी", hinglish: "Lauki" },
  "Bitter Gourd": { en: "Bitter Gourd", hi: "करेला", hinglish: "Karela" },
  "Pumpkin": { en: "Pumpkin", hi: "कद्दू", hinglish: "Kaddu" },
  "French Beans": { en: "French Beans", hi: "बीन्स", hinglish: "Beans" },
  "Fenugreek Leaves": { en: "Fenugreek Leaves", hi: "मेथी", hinglish: "Methi" },
  "Mint Leaves": { en: "Mint Leaves", hi: "पुदीना", hinglish: "Pudeena" },
  "Mushroom": { en: "Mushroom", hi: "मशरूम", hinglish: "Mushroom" },

  // Fruits
  "Apple": { en: "Apple", hi: "सेब", hinglish: "Seb" },
  "Banana": { en: "Banana", hi: "केला", hinglish: "Kela" },
  "Orange": { en: "Orange", hi: "संतरा", hinglish: "Santra" },
  "Mango": { en: "Mango", hi: "आम", hinglish: "Aam" },
  "Papaya": { en: "Papaya", hi: "पपीता", hinglish: "Papita" },
  "Grapes": { en: "Grapes", hi: "अंगूर", hinglish: "Angoor" },
  "Watermelon": { en: "Watermelon", hi: "तरबूज", hinglish: "Tarbooz" },
  "Pomegranate": { en: "Pomegranate", hi: "अनार", hinglish: "Anaar" },
  "Guava": { en: "Guava", hi: "अमरूद", hinglish: "Amrood" },
  "Pineapple": { en: "Pineapple", hi: "अनानास", hinglish: "Ananas" },
  "Sweet Lime": { en: "Sweet Lime", hi: "मौसमी", hinglish: "Mosambi" },
  "Mosambi": { en: "Mosambi", hi: "मौसमी", hinglish: "Mosambi" },
  "Litchi": { en: "Litchi", hi: "लीची", hinglish: "Litchi" },
  "Pear": { en: "Pear", hi: "नाशपाती", hinglish: "Nashpati" },
  "Kiwi": { en: "Kiwi", hi: "कीवी", hinglish: "Kiwi" },
  "Coconut": { en: "Coconut", hi: "नारियल", hinglish: "Nariyal" },
  "Custard Apple": { en: "Custard Apple", hi: "शरीफा", hinglish: "Shareefa" },
  "Jamun": { en: "Jamun", hi: "जामुन", hinglish: "Jamun" },
  "Strawberry": { en: "Strawberry", hi: "स्ट्रॉबेरी", hinglish: "Strawberry" },
  "Muskmelon": { en: "Muskmelon", hi: "खरबूजा", hinglish: "Kharbooza" },
  "Dragon Fruit": { en: "Dragon Fruit", hi: "ड्रैगन फ्रूट", hinglish: "Dragon Fruit" },
  "Plum": { en: "Plum", hi: "आलूबुखारा", hinglish: "Aloo Bukhara" },
  "Peach": { en: "Peach", hi: "आड़ू", hinglish: "Aadoo" },
  "Chikoo": { en: "Chikoo", hi: "चीकू", hinglish: "Chikoo" },

  // Dairy
  "Milk": { en: "Milk", hi: "दूध", hinglish: "Doodh" },
  "Curd": { en: "Curd", hi: "दही", hinglish: "Dahi" },
  "Paneer": { en: "Paneer", hi: "पनीर", hinglish: "Paneer" },
  "Butter": { en: "Butter", hi: "मक्खन", hinglish: "Makkhan" },
  "Cheese": { en: "Cheese", hi: "चीज़", hinglish: "Cheese" },
  "Ghee": { en: "Ghee", hi: "घी", hinglish: "Ghee" },

  // Grocery
  "Flour (Atta)": { en: "Flour (Atta)", hi: "आटा", hinglish: "Atta" },
  "Maida": { en: "Maida", hi: "मैदा", hinglish: "Maida" },
  "Besan": { en: "Besan", hi: "बेसन", hinglish: "Besan" },
  "Suji": { en: "Suji", hi: "सूजी", hinglish: "Suji" },
  "Corn Flour": { en: "Corn Flour", hi: "कॉर्न फ्लोर", hinglish: "Corn Flour" },
  "Rice": { en: "Rice", hi: "चावल", hinglish: "Chawal" },
  "Basmati Rice": { en: "Basmati Rice", hi: "बासमती चावल", hinglish: "Basmati Chawal" },
  "Poha": { en: "Poha", hi: "पोहा", hinglish: "Poha" },
  "Flattened Rice": { en: "Flattened Rice", hi: "पोहा", hinglish: "Poha" },
  "Toor Dal": { en: "Toor Dal", hi: "अरहर दाल", hinglish: "Toor Dal" },
  "Moong Dal": { en: "Moong Dal", hi: "मूंग दाल", hinglish: "Moong Dal" },
  "Masoor Dal": { en: "Masoor Dal", hi: "मसूर दाल", hinglish: "Masoor Dal" },
  "Chana Dal": { en: "Chana Dal", hi: "चना दाल", hinglish: "Chana Dal" },
  "Urad Dal": { en: "Urad Dal", hi: "उड़द दाल", hinglish: "Urad Dal" },
  "Rajma": { en: "Rajma", hi: "राजमा", hinglish: "Rajma" },
  "Kabuli Chana": { en: "Kabuli Chana", hi: "काबुली चना", hinglish: "Kabuli Chana" },
  "Kala Chana": { en: "Kala Chana", hi: "काला चना", hinglish: "Kala Chana" },
  "Sugar": { en: "Sugar", hi: "चीनी", hinglish: "Cheeni" },
  "Jaggery": { en: "Jaggery", hi: "गुड़", hinglish: "Gud" },
  "Brown Sugar": { en: "Brown Sugar", hi: "ब्राउन शुगर", hinglish: "Brown Sugar" },
  "Rock Sugar (Mishri)": { en: "Rock Sugar (Mishri)", hi: "मिश्री", hinglish: "Mishri" },
  "Salt": { en: "Salt", hi: "नमक", hinglish: "Namak" },
  "Rock Salt": { en: "Rock Salt", hi: "सेंधा नमक", hinglish: "Sendha Namak" },
  "Black Salt": { en: "Black Salt", hi: "काला नमक", hinglish: "Kala Namak" },
  "Cooking Oil": { en: "Cooking Oil", hi: "तेल", hinglish: "Tel" },
  "Mustard Oil": { en: "Mustard Oil", hi: "सरसों का तेल", hinglish: "Sarso Tel" },
  "Sunflower Oil": { en: "Sunflower Oil", hi: "सूरजमुखी तेल", hinglish: "Sunflower Oil" },
  "Groundnut Oil": { en: "Groundnut Oil", hi: "मूंगफली तेल", hinglish: "Moongfali Tel" },
  "Soybean Oil": { en: "Soybean Oil", hi: "सोयाबीन तेल", hinglish: "Soybean Oil" },
  "Olive Oil": { en: "Olive Oil", hi: "जैतून का तेल", hinglish: "Olive Oil" },
  "Oats": { en: "Oats", hi: "ओट्स", hinglish: "Oats" },
  "Cornflakes": { en: "Cornflakes", hi: "कॉर्नफ्लेक्स", hinglish: "Cornflakes" },
  "Muesli": { en: "Muesli", hi: "मूसली", hinglish: "Muesli" },
  "Vermicelli": { en: "Vermicelli", hi: "सेवई", hinglish: "Sevai" },
  "Tea": { en: "Tea", hi: "चाय", hinglish: "Chai" },
  "Coffee": { en: "Coffee", hi: "कॉफी", hinglish: "Coffee" },
  "Green Tea": { en: "Green Tea", hi: "ग्रीन टी", hinglish: "Green Tea" },
  "Baking Soda": { en: "Baking Soda", hi: "खाने का सोडा", hinglish: "Baking Soda" },
  "Baking Powder": { en: "Baking Powder", hi: "बेकिंग पाउडर", hinglish: "Baking Powder" },
  "Yeast": { en: "Yeast", hi: "यीस्ट", hinglish: "Yeast" },
  "Custard Powder": { en: "Custard Powder", hi: "कस्टर्ड पाउडर", hinglish: "Custard Powder" },
  "Almonds": { en: "Almonds", hi: "बादाम", hinglish: "Badam" },
  "Cashews": { en: "Cashews", hi: "काजू", hinglish: "Kaju" },
  "Raisins": { en: "Raisins", hi: "किशमिश", hinglish: "Kishmish" },
  "Pistachios": { en: "Pistachios", hi: "पिस्ता", hinglish: "Pista" },
  "Walnuts": { en: "Walnuts", hi: "अखरोट", hinglish: "Akhrot" },
  "Dates": { en: "Dates", hi: "खजूर", hinglish: "Khajur" },
  "Papad": { en: "Papad", hi: "पापड़", hinglish: "Papad" },
  "Pickle": { en: "Pickle", hi: "अचार", hinglish: "Achar" },
  "Honey": { en: "Honey", hi: "शहद", hinglish: "Shahad" },
  "Soya Chunks": { en: "Soya Chunks", hi: "सोया चंक्स", hinglish: "Soya Chunks" },
  "Sabudana": { en: "Sabudana", hi: "साबूदाना", hinglish: "Sabudana" },
  "Peanuts": { en: "Peanuts", hi: "मूंगफली", hinglish: "Moongfali" },
  "Makhana": { en: "Makhana", hi: "मखाना", hinglish: "Makhana" },
  "Vinegar": { en: "Vinegar", hi: "सिरका", hinglish: "Sirka" },

  // Spices
  "Turmeric Powder": { en: "Turmeric Powder", hi: "हल्दी पाउडर", hinglish: "Haldi Powder" },
  "Red Chilli Powder": { en: "Red Chilli Powder", hi: "लाल मिर्च पाउडर", hinglish: "Lal Mirch Powder" },
  "Coriander Powder": { en: "Coriander Powder", hi: "धनिया पाउडर", hinglish: "Dhaniya Powder" },
  "Cumin Powder": { en: "Cumin Powder", hi: "जीरा पाउडर", hinglish: "Jeera Powder" },
  "Garam Masala": { en: "Garam Masala", hi: "गरम मसाला", hinglish: "Garam Masala" },
  "Kitchen King Masala": { en: "Kitchen King Masala", hi: "किचन किंग मसाला", hinglish: "Kitchen King Masala" },
  "Chaat Masala": { en: "Chaat Masala", hi: "चाट मसाला", hinglish: "Chaat Masala" },
  "Cumin Seeds": { en: "Cumin Seeds", hi: "जीरा", hinglish: "Jeera" },
  "Mustard Seeds": { en: "Mustard Seeds", hi: "राई", hinglish: "Rai" },
  "Coriander Seeds": { en: "Coriander Seeds", hi: "धनिया बीज", hinglish: "Dhaniya Seeds" },
  "Black Pepper": { en: "Black Pepper", hi: "काली मिर्च", hinglish: "Kali Mirch" },
  "Cloves": { en: "Cloves", hi: "लौंग", hinglish: "Laung" },
  "Green Cardamom": { en: "Green Cardamom", hi: "हरी इलायची", hinglish: "Hari Elaichi" },
  "Cinnamon": { en: "Cinnamon", hi: "दालचीनी", hinglish: "Dalchini" },
  "Bay Leaves": { en: "Bay Leaves", hi: "तेज पत्ता", hinglish: "Tej Patta" },
  "Kasuri Methi": { en: "Kasuri Methi", hi: "कसूरी मेथी", hinglish: "Kasuri Methi" },

  // Cleaning
  "Detergent": { en: "Detergent", hi: "सर्फ / डिटर्जेंट", hinglish: "Surf" },
  "Dishwash Liquid": { en: "Dishwash Liquid", hi: "डिशवॉश लिक्विड", hinglish: "Dishwash Liquid" },
  "Dishwash Bar": { en: "Dishwash Bar", hi: "डिशवॉश बार", hinglish: "Dishwash Bar" },
  "Floor Cleaner": { en: "Floor Cleaner", hi: "फर्श साफ करने वाला", hinglish: "Floor Cleaner" },
  "Toilet Cleaner": { en: "Toilet Cleaner", hi: "टॉयलेट क्लीनर", hinglish: "Toilet Cleaner" },
  "Glass Cleaner": { en: "Glass Cleaner", hi: "कांच साफ करने वाला", hinglish: "Glass Cleaner" },
  "Soap": { en: "Soap", hi: "साबुन", hinglish: "Sabun" },
  "Hand Wash": { en: "Hand Wash", hi: "हैंड वॉश", hinglish: "Hand Wash" },
  "Shampoo": { en: "Shampoo", hi: "शैम्पू", hinglish: "Shampoo" },
  "Toothpaste": { en: "Toothpaste", hi: "टूथपेस्ट", hinglish: "Toothpaste" },
  "Toothbrush": { en: "Toothbrush", hi: "टूथब्रश", hinglish: "Toothbrush" },
  "Tissue Paper": { en: "Tissue Paper", hi: "टिशू पेपर", hinglish: "Tissue Paper" },

  // Snacks
  "Biscuits": { en: "Biscuits", hi: "बिस्कुट", hinglish: "Biscuit" },
  "Cookies": { en: "Cookies", hi: "कुकीज़", hinglish: "Cookies" },
  "Chips": { en: "Chips", hi: "चिप्स", hinglish: "Chips" },
  "Namkeen": { en: "Namkeen", hi: "नमकीन", hinglish: "Namkeen" },
  "Popcorn": { en: "Popcorn", hi: "पॉपकॉर्न", hinglish: "Popcorn" },
  "Chocolates": { en: "Chocolates", hi: "चॉकलेट", hinglish: "Chocolates" },
  "Candy": { en: "Candy", hi: "कैंडी", hinglish: "Candy" },
  "Noodles": { en: "Noodles", hi: "नूडल्स", hinglish: "Noodles" },
  "Pasta": { en: "Pasta", hi: "पास्ता", hinglish: "Pasta" },
  "Instant Soup": { en: "Instant Soup", hi: "सूप", hinglish: "Soup" },

  // Beverages
  "Soft Drink": { en: "Soft Drink", hi: "सॉफ्ट ड्रिंक", hinglish: "Soft Drink" },
  "Fruit Juice": { en: "Fruit Juice", hi: "फ्रूट जूस", hinglish: "Fruit Juice" },
  "Soda Water": { en: "Soda Water", hi: "सोडा", hinglish: "Soda" },

  // Medicines
  "Paracetamol": { en: "Paracetamol", hi: "पैरासिटामोल", hinglish: "Paracetamol" },
  "Cough Syrup": { en: "Cough Syrup", hi: "कफ सिरप", hinglish: "Cough Syrup" },
  "ORS": { en: "ORS", hi: "ओआरएस", hinglish: "ORS" },
  "Antiseptic Liquid": { en: "Antiseptic Liquid", hi: "एंटीसेप्टिक", hinglish: "Antiseptic Liquid" },
  "Band-Aid": { en: "Band-Aid", hi: "बैंड-एड", hinglish: "Band-Aid" },
  "Cotton": { en: "Cotton", hi: "रुई", hinglish: "Rui" },
  "Gauze": { en: "Gauze", hi: "पट्टी", hinglish: "Patti" },
  "Pain Relief Spray": { en: "Pain Relief Spray", hi: "दर्द निवारक स्प्रे", hinglish: "Pain Relief Spray" },
  "Pain Relief Gel": { en: "Pain Relief Gel", hi: "दर्द निवारक जेल", hinglish: "Pain Relief Gel" },
  "Multivitamin": { en: "Multivitamin", hi: "मल्टीविटामिन", hinglish: "Multivitamin" },

  // Others
  "Garbage Bags": { en: "Garbage Bags", hi: "कचरे का थैला", hinglish: "Garbage Bags" },
  "Matchbox": { en: "Matchbox", hi: "माचिस", hinglish: "Machis" },
  "Aluminium Foil": { en: "Aluminium Foil", hi: "फॉयल पेपर", hinglish: "Aluminium Foil" },
  "Cling Wrap": { en: "Cling Wrap", hi: "क्लिंग रैप", hinglish: "Cling Wrap" },
  "Paper Napkins": { en: "Paper Napkins", hi: "नेपकिन", hinglish: "Paper Napkin" },
  "Candles": { en: "Candles", hi: "मोमबत्ती", hinglish: "Mombatti" },
  "Mosquito Coil": { en: "Mosquito Coil", hi: "मच्छर अगरबत्ती", hinglish: "Mosquito Coil" },
  "Mosquito Repellent": { en: "Mosquito Repellent", hi: "मच्छर भगाने वाला", hinglish: "Mosquito Repellent" },
  "Batteries": { en: "Batteries", hi: "सेल / बैटरी", hinglish: "Battery" }
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
