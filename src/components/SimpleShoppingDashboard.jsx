import React, { useState, useMemo, useEffect } from "react";
import { 
  Share2, Plus, Check, Trash2, Copy, Users, LogOut, MessageCircle, 
  Link, RefreshCw, X, ChevronDown, ChevronUp, ShoppingCart, 
  ListChecks, History, Globe, Heart, AlertCircle, ArrowRight, Search, Mic, MicOff,
  Volume1, Volume2, Settings, Star
} from "lucide-react";
import { useApp } from "../hooks/AppContext";
import { defaultCategories, getDefaultUnit, translateItemName, parseHinglishUnit, autoDetectCategory } from "../lib/defaultData";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { BottomSheet } from "./ui/BottomSheet";
import { FrequentTab } from "./FrequentTab";
import { TemplatesTab } from "./TemplatesTab";
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const SimpleShoppingDashboard = () => {
  const {
    familyCode,
    setFamilyCode,
    items,
    categories,
    favorites,
    activeListId,
    setActiveListId,
    addItem,
    updateItem,
    deleteItem,
    toggleFavorite,
    setSelectedItem,
    setIsEditorOpen,
    fetchLists,
    fetchItems,
    shoppingMode,
    setShoppingMode,
    fontSize,
    setFontSize,
    movePurchasedToBottom,
    setMovePurchasedToBottom,
    autoSync,
    setAutoSync
  } = useApp();

  const [activeView, setActiveView] = useState("catalog");
  const [copied, setCopied] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [newCustomItemName, setNewCustomItemName] = useState({});
  const [familyInputCode, setFamilyInputCode] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [hiddenCatalogItems, setHiddenCatalogItems] = useState(() => {
    try {
      const saved = localStorage.getItem("gharlist_hidden_catalog_items");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const triggerHaptic = () => {
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
  };

  const handleSpeakItem = (item) => {
    if (!window.speechSynthesis) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const displayName = translateItemName(item.name, itemLanguage);
    const speechText = `${displayName}, ${item.quantity} ${item.unit}`;
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = (itemLanguage === "hi" || itemLanguage === "hinglish") ? "hi-IN" : "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const handlePlayAudioNote = (e, base64Audio) => {
    e.stopPropagation();
    if (!base64Audio) return;
    const audio = new Audio(base64Audio);
    audio.play().catch((err) => console.error("Audio playback error:", err));
  };
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Voice states
  const [isListening, setIsListening] = useState(false);
  const [voiceResult, setVoiceResult] = useState(null);
  const [voiceError, setVoiceError] = useState(null);

  // History states
  const [historyLogs, setHistoryLogs] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [expandedLog, setExpandedLog] = useState({});
  const [historyItems, setHistoryItems] = useState({});
  const [loadingLogItems, setLoadingLogItems] = useState({});

  // Item Display Language (en, hi, hinglish)
  const [itemLanguage, setItemLanguage] = useState("en");

  // Accordion open/close state for categories.
  const [expandedCategory, setExpandedCategory] = useState({});

  // Read language preference on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("gharlist_item_language");
    if (savedLang && ["en", "hi", "hinglish"].includes(savedLang)) {
      setItemLanguage(savedLang);
    }
  }, []);

  const handleLanguageChange = (lang) => {
    setItemLanguage(lang);
    localStorage.setItem("gharlist_item_language", lang);
  };

  // Initialize first category as expanded once categories load
  useEffect(() => {
    if (categories.length > 0 && Object.keys(expandedCategory).length === 0) {
      setExpandedCategory({ [categories[0]._id]: true });
    }
  }, [categories]);

  // Fetch History logs list
  const fetchHistory = async () => {
    if (!familyCode) return;
    setLoadingHistory(true);
    try {
      const res = await fetch(`/api/history?familyCode=${familyCode}`);
      if (res.ok) {
        const data = await res.json();
        setHistoryLogs(data.logs || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHistory(false);
    }
  };

  // Fetch items for expanded history list log
  const fetchHistoryListItems = async (listId) => {
    if (!familyCode || historyItems[listId]) return;
    setLoadingLogItems((prev) => ({ ...prev, [listId]: true }));
    try {
      const res = await fetch(`/api/items?familyCode=${familyCode}&listId=${listId}`);
      if (res.ok) {
        const data = await res.json();
        setHistoryItems((prev) => ({ ...prev, [listId]: data.items || [] }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLogItems((prev) => ({ ...prev, [listId]: false }));
    }
  };

  // Fetch history when history tab is clicked
  useEffect(() => {
    if (activeView === "history") {
      fetchHistory();
    }
  }, [activeView, familyCode]);

  // Filter items in active list that are checked (added) and sort by category order
  const checkedItems = useMemo(() => {
    const active = items.filter((item) => {
      const resolvedListId = item.listId?._id || item.listId || "";
      return resolvedListId === activeListId;
    });

    const categoryOrderMap = {
      "vegetables": 1,
      "fruits": 2,
      "dairy": 3,
      "grocery": 4,
      "spices": 5,
      "snacks": 6,
      "beverages": 7,
      "medicines": 8,
      "cleaning": 9,
      "others": 10
    };

    return [...active].sort((a, b) => {
      const nameA = (a.categoryId?.name || "").toLowerCase().trim();
      const nameB = (b.categoryId?.name || "").toLowerCase().trim();
      
      const orderA = categoryOrderMap[nameA] || 99;
      const orderB = categoryOrderMap[nameB] || 99;
      
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      
      return a.name.localeCompare(b.name);
    });
  }, [items, activeListId]);

  const { totalBudget, spentBudget } = useMemo(() => {
    let total = 0;
    let spent = 0;
    checkedItems.forEach((item) => {
      const cost = (item.estimatedCost || 0) * (item.quantity || 1);
      total += cost;
      if (item.isPurchased) {
        spent += cost;
      }
    });
    return { totalBudget: total, spentBudget: spent };
  }, [checkedItems]);

  // Copy Family Code helper
  const handleCopyCode = async () => {
    if (!familyCode) return;
    try {
      await navigator.clipboard.writeText(familyCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  // Join a family group
  const handleJoinFamily = async (e) => {
    e.preventDefault();
    if (!familyInputCode.trim() || familyInputCode.trim().length !== 6) return;
    
    try {
      const code = familyInputCode.trim().toUpperCase();
      const res = await fetch("/api/family/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
      });
      if (res.ok) {
        setFamilyCode(code);
        setFamilyInputCode("");
      } else {
        alert("Invalid Family Code! Please verify and try again.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Check if item is already added to active list
  const getExistingItem = (name) => {
    return checkedItems.find((i) => i.name.toLowerCase().trim() === name.toLowerCase().trim());
  };

  const handleProductToggle = async (productName, categoryId) => {
    triggerHaptic();
    const existing = getExistingItem(productName);
    if (existing) {
      await deleteItem(existing._id);
    } else {
      setSelectedItem({
        name: productName,
        categoryId: categoryId,
        subcategory: "",
        quantity: 1,
        unit: getDefaultUnit(productName),
        notes: ""
      });
      setIsEditorOpen(true);
    }
  };

  // Add a new custom item
  const handleAddCustomItem = async (catId) => {
    const name = newCustomItemName[catId] || "";
    if (!name.trim()) return;

    let targetCatId = catId;
    if (categories && categories.length > 0) {
      const detected = autoDetectCategory(name, categories);
      if (detected) targetCatId = detected;
    }

    await toggleFavorite(name.trim(), targetCatId);

    setSelectedItem({
      name: name.trim(),
      categoryId: targetCatId,
      subcategory: "",
      quantity: 1,
      unit: getDefaultUnit(name),
      notes: ""
    });
    setIsEditorOpen(true);

    setNewCustomItemName((prev) => ({ ...prev, [catId]: "" }));
  };

  // Delete item from catalog
  const handleDeleteCatalogItem = async (e, productName, categoryId) => {
    e.stopPropagation();
    
    const translatedName = translateItemName(productName, itemLanguage);
    const confirmDelete = window.confirm(
      itemLanguage === "en"
        ? `Are you sure you want to delete "${translatedName}" from the catalog?`
        : itemLanguage === "hi"
        ? `क्या आप वास्तव में कैटलॉग से "${translatedName}" को हटाना चाहते हैं?`
        : `Kya aap sach me "${translatedName}" ko catalog se hatana chahte hain?`
    );
    if (!confirmDelete) return;

    triggerHaptic();

    // 1. If it's a favorite, toggle it off to delete from database favorites
    const isFav = favorites.some(
      (f) => f.name.toLowerCase().trim() === productName.toLowerCase().trim()
    );
    if (isFav) {
      await toggleFavorite(productName, categoryId);
    }

    // 2. Add to hidden items list so it doesn't show in catalog view
    const normalizedName = productName.toLowerCase().trim();
    setHiddenCatalogItems((prev) => {
      if (prev.includes(normalizedName)) return prev;
      const next = [...prev, normalizedName];
      localStorage.setItem("gharlist_hidden_catalog_items", JSON.stringify(next));
      return next;
    });
  };

  // Share List to WhatsApp
  const handleShareWhatsApp = () => {
    if (checkedItems.length === 0) return;
    
    let text = "*GharList - Grocery Shopping List*\n\n";
    checkedItems.forEach((item, index) => {
      const displayName = translateItemName(item.name, itemLanguage);
      text += `${index + 1}. ${displayName} (${item.quantity} ${item.unit})\n`;
    });

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  // Share Public Link
  const handleShareLink = () => {
    if (!activeListId) return;
    const link = `${window.location.origin}/share/${activeListId}`;
    navigator.clipboard.writeText(link);
    alert("Public sharing link copied to clipboard!");
  };

  // Complete List, Save to History and reset for a fresh new list
  const handleNewListReset = async () => {
    if (!activeListId || !familyCode) return;
    
    const confirmReset = window.confirm("Are you sure you want to complete this list, save to History, and start a fresh list?");
    if (!confirmReset) return;

    setIsResetting(true);
    try {
      const res = await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ familyCode, listId: activeListId, action: "complete" })
      });

      if (res.ok) {
        const newTempId = Math.random().toString(36).substring(2, 15);
        const listRes = await fetch("/api/lists", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            familyCode,
            name: "Today's Shopping",
            type: "today",
            _id: newTempId
          })
        });

        if (listRes.ok) {
          await fetchLists();
          setActiveListId(newTempId);
          await fetchItems(newTempId);
          setActiveView("catalog");
        }
      }
    } catch (err) {
      console.error("Failed to reset list:", err);
    } finally {
      setIsResetting(false);
    }
  };

  // Repeat/Reuse List
  const handleRepeatList = async (listId) => {
    if (!familyCode || !activeListId) return;
    const confirmRepeat = window.confirm("Add all items of this completed list into your active shopping list?");
    if (!confirmRepeat) return;

    try {
      const res = await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ familyCode, listId, action: "repeat" })
      });

      if (res.ok) {
        await fetchItems(activeListId);
        setActiveView("review");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete single history log
  const handleDeleteHistoryLog = async (listId) => {
    if (!familyCode) return;
    const confirmDelete = window.confirm("Delete this history log permanently?");
    if (!confirmDelete) return;

    try {
      const res = await fetch("/api/history", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ familyCode, listId, clearAll: false })
      });

      if (res.ok) {
        fetchHistory();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleCategoryExpand = (catId) => {
    setExpandedCategory((prev) => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const toggleLogExpand = async (logId, listId) => {
    const nextState = !expandedLog[logId];
    setExpandedLog((prev) => ({ ...prev, [logId]: nextState }));
    if (nextState) {
      await fetchHistoryListItems(listId);
    }
  };

  // Hinglish & English Voice Input Parser
  const parseVoiceInput = (transcript) => {
    let text = transcript.toLowerCase().trim();
    
    const numbersMap = {
      "ek": 1, "one": 1, "1": 1,
      "do": 2, "two": 2, "2": 2,
      "teen": 3, "three": 3, "3": 3,
      "char": 4, "four": 4, "4": 4,
      "paanch": 5, "five": 5, "5": 5,
      "chah": 6, "six": 6, "6": 6,
      "saat": 7, "seven": 7, "7": 7,
      "aath": 8, "eight": 8, "8": 8,
      "nau": 9, "nine": 9, "9": 9,
      "das": 10, "ten": 10, "10": 10,
      " आधा": 0.5, "half": 0.5, "0.5": 0.5
    };

    // Category synonyms with common phonetic misspellings and transliterations
    const categorySynonyms = {
      "vegetables": ["vegetable", "vegetables", "vegitable", "vegitables", "vagetable", "vagetables", "veg", "sabzi", "sabji", "sabziya", "sabjiya", "सब्जी", "सब्जियां", "वेजिटेबल", "वेजिटेबल्स"],
      "fruits": ["fruit", "fruits", "frut", "fruts", "phal", "phall", "फल", "फ्रूट", "फ्रूट्स"],
      "dairy": ["dairy", "dairies", "milk", "doodh", "dudh", "डेयरी", "दूध", "मिल्क"],
      "grocery": ["grocery", "groceries", "grosery", "ration", "rashan", "kirana", "किराना", "राशन", "ग्रोसरी"],
      "spices": ["spice", "spices", "masala", "masale", "मसाले", "मसाला", "स्पाइस", "स्पाइसेस"],
      "snacks": ["snack", "snacks", "namkeen", "biscuits", "स्नैक्स", "नमकीन"],
      "beverages": ["beverage", "beverages", "drink", "drinks", "cold drink", "cold drinks", "tea", "coffee", "chai", "पानी", "चाय", "पेय", "कोल्ड ड्रिंक"],
      "medicines": ["medicine", "medicines", "dawa", "dawai", "दवा", "दवाइयां", "मेडिसिन", "मेडिसिन्स"],
      "cleaning": ["cleaning", "wash", "soap", "surf", "सफाई", "क्लीनिंग"]
    };

    let detectedCategoryId = null;
    let matchedTerm = null;

    // Search for category matching term
    for (const cat of categories) {
      const catNameLower = cat.name.toLowerCase().trim();
      const synonyms = categorySynonyms[catNameLower] || [];
      const searchTerms = [catNameLower, ...synonyms];

      for (const term of searchTerms) {
        if (text.includes(term)) {
          detectedCategoryId = cat._id;
          matchedTerm = term;
          break;
        }
      }
      if (detectedCategoryId) break;
    }

    // Strip the category word and surrounding prepositions if matched
    if (matchedTerm) {
      const prepositions = ["in", "under", "me", "mai", "mein", "pe", "par", "ko", "se", "में", "से", "को", "के", "अंदर", "के लिए", "for"];
      
      text = text.replace(matchedTerm, "");

      for (const prep of prepositions) {
        const prepRegex = new RegExp(`\\b${prep}\\b`, "g");
        text = text.replace(prepRegex, "");
        text = text.replace(prep, "");
      }
    }

    const words = text.split(/\s+/).filter(Boolean);
    if (words.length === 0) return null;

    let parsedQty = 1;
    let parsedUnit = "";
    let nameWords = [];

    // Common Hinglish/English helper words to skip/ignore from the item name
    const skipWords = [
      "le", "lo", "de", "do", "aur", "add", "kardo", "please", "kar"
    ];

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const isNum = !isNaN(Number(word)) || numbersMap[word] !== undefined;
      const matchedUnit = parseHinglishUnit(word);

      if (isNum) {
        parsedQty = !isNaN(Number(word)) ? Number(word) : numbersMap[word];
      } else if (matchedUnit) {
        parsedUnit = matchedUnit;
      } else {
        if (!skipWords.includes(word)) {
          nameWords.push(word);
        }
      }
    }

    let itemName = nameWords.join(" ").trim();
    if (!itemName) return null;

    // Extra regex cleanup for hanging prepositions or action verbs
    itemName = itemName.replace(/^(add|ko|in|me|mai|mein)\s+/i, "");
    itemName = itemName.replace(/\s+(add|ko|in|me|mai|mein)$/i, "");

    const finalName = itemName.charAt(0).toUpperCase() + itemName.slice(1);
    const finalUnit = parsedUnit || getDefaultUnit(itemName);

    return {
      name: finalName,
      quantity: parsedQty,
      unit: finalUnit,
      categoryId: detectedCategoryId
    };
  };

  // Speech Recognition hook trigger
  const handleVoiceListen = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome on Android/iOS.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    
    // Set speech recognition language based on selected app/item language
    recognition.lang = (itemLanguage === "hi" || itemLanguage === "hinglish") ? "hi-IN" : "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceError(null);
      setVoiceResult(null);
    };

    recognition.onerror = (event) => {
      console.error(event);
      setVoiceError("Could not hear you. Please try speaking again!");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const parsed = parseVoiceInput(transcript);
      if (parsed) {
        setVoiceResult(parsed);
      } else {
        setVoiceError(`Sorry, I couldn't understand "${transcript}". Please repeat clearly (e.g. 'Aalu 2 kilo')!`);
      }
    };

    recognition.start();
  };

  // Save spoken voice item directly into active shopping list and catalog
  const handleConfirmVoiceAdd = async () => {
    if (!voiceResult || !familyCode) return;

    let matchedCatId = voiceResult.categoryId;

    if (!matchedCatId) {
      // Find matching category from default predefined items
      for (const cat of defaultCategories) {
        const hasItem = cat.predefinedItems.some(i => i.name.toLowerCase() === voiceResult.name.toLowerCase());
        if (hasItem) {
          const activeCat = categories.find(c => c.name.toLowerCase() === cat.name.toLowerCase());
          if (activeCat) {
            matchedCatId = activeCat._id;
            break;
          }
        }
      }
    }

    if (!matchedCatId) {
      matchedCatId = categories[0]?._id;
    }

    // Check if the item is already in the catalog (predefined or favorite)
    const activeCat = categories.find((c) => c._id === matchedCatId);
    const defaultCat = defaultCategories.find(
      (c) => c.name.toLowerCase() === (activeCat?.name || "").toLowerCase()
    );
    const isPredefined = defaultCat
      ? defaultCat.predefinedItems.some(
          (p) => p.name.toLowerCase().trim() === voiceResult.name.toLowerCase().trim()
        )
      : false;

    const isFav = favorites.some(
      (f) => f.name.toLowerCase().trim() === voiceResult.name.toLowerCase().trim()
    );

    const inCatalog = isPredefined || isFav;

    // If it is not in the catalog, add it to Favorites (so it shows up in catalog)
    if (!inCatalog) {
      await toggleFavorite(voiceResult.name, matchedCatId);
    }

    // Add the item to the active shopping list (this ticks/checks it in the catalog)
    await addItem({
      categoryId: matchedCatId,
      subcategory: "",
      name: voiceResult.name,
      quantity: voiceResult.quantity,
      unit: voiceResult.unit,
      notes: "Added via Voice 🎙️"
    });

    setVoiceResult(null);
  };

  return (
    <div className="flex flex-col gap-5 px-4 py-5 select-none pb-28 max-w-md mx-auto bg-[var(--background)] min-h-screen text-slate-100">
      {/* Header */}
      <div className="flex flex-col gap-3 pb-3 border-b border-[var(--card-border)]">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-emerald-500 tracking-tight">
            GharList
          </h1>
          <div className="flex items-center gap-2">
            {familyCode && (
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-2 px-3 py-1.5 bg-emerald-955/40 text-emerald-400 rounded-full border border-emerald-500/20 text-xs font-bold cursor-pointer"
              >
                <Users className="h-3.5 w-3.5" />
                <span>{familyCode}</span>
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </button>
            )}
            {familyCode && (
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-1.5 text-slate-400 hover:text-slate-200 cursor-pointer border-none bg-transparent flex items-center justify-center min-w-[32px] min-h-[32px]"
                title="Settings"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Join Family section if not connected */}
        {!familyCode ? (
          <form onSubmit={handleJoinFamily} className="flex gap-2 w-full mt-1">
            <input
              type="text"
              placeholder="Enter 6-digit Family Code..."
              value={familyInputCode}
              onChange={(e) => setFamilyInputCode(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm font-bold placeholder-slate-505 focus:outline-none focus:border-emerald-500 text-white"
            />
            <button
              type="submit"
              className="px-4 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold rounded-xl transition-all flex items-center justify-center cursor-pointer border-none"
            >
              Join
            </button>
          </form>
        ) : (
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Saving changes to MongoDB
            </span>
          </div>
        )}
      </div>

      {/* Item Display Language Switcher pills */}
      <div className="flex items-center justify-between bg-slate-800/40 border border-slate-700/60 p-1.5 rounded-2xl">
        <div className="flex items-center gap-1.5 pl-2.5 text-slate-400">
          <Globe className="h-4 w-4" />
          <span className="text-xs font-black">Language</span>
        </div>
        <div className="flex gap-1.5">
          {["en", "hi", "hinglish"].map((lang) => {
            const labelMap = {
              en: "English",
              hi: "हिन्दी",
              hinglish: "Hinglish"
            };
            const isActive = itemLanguage === lang;
            return (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`py-1.5 px-3.5 rounded-xl text-xs font-extrabold cursor-pointer transition-all border-none ${
                  isActive
                    ? "bg-emerald-500 text-slate-950 font-black"
                    : "text-slate-300 hover:bg-slate-800 bg-transparent"
                }`}
              >
                {labelMap[lang]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area based on active view */}
      <div className="flex-1">
        {activeView === "catalog" && (
          <div className="flex flex-col gap-4.5 relative">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-black text-slate-100 px-1">
                Select Items from Categories
              </h2>
              <span className="text-xs font-bold text-slate-400 italic px-1 -mt-1 block">
                {itemLanguage === "en"
                  ? "Ticked items are already in your shopping list."
                  : itemLanguage === "hi"
                  ? "टिक किए गए आइटम आपकी सूची में पहले से हैं।"
                  : "Tick kiye huye items aapki list me pehle se hain."}
              </span>
              
              {/* Type-to-Search input box */}
              <div className="relative flex items-center">
                <Search className="absolute left-4.5 h-4.5 w-4.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search items by typing..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-10 py-3 bg-slate-800/80 border border-slate-700/60 rounded-2xl text-sm font-bold text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 min-h-[44px]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4.5 p-1 text-slate-400 hover:text-slate-200 border-none bg-transparent cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3.5">
              {categories.slice(0, 10).map((cat) => {
                const IconComponent = LucideIcons[cat.icon] || LucideIcons.ShoppingBag;
                const defaultCat = defaultCategories.find(
                  (c) => c.name.toLowerCase() === cat.name.toLowerCase()
                );
                const predefinedList = defaultCat ? defaultCat.predefinedItems : [];
                
                const categoryFavorites = favorites.filter((fav) => {
                  const resolvedFavCatId = fav.categoryId?._id || fav.categoryId || "";
                  return resolvedFavCatId === cat._id;
                });

                const itemsToDisplay = Array.from(
                  new Set([
                    ...predefinedList.map((p) => p.name),
                    ...categoryFavorites.map((f) => f.name)
                  ])
                ).filter(name => !hiddenCatalogItems.includes(name.toLowerCase().trim()));

                const filteredItems = itemsToDisplay.filter((productName) => {
                  if (!searchQuery.trim()) return true;
                  const translated = translateItemName(productName, itemLanguage).toLowerCase();
                  return translated.includes(searchQuery.toLowerCase().trim());
                });

                const isExpanded = searchQuery.trim() ? filteredItems.length > 0 : !!expandedCategory[cat._id];

                if (searchQuery.trim() && filteredItems.length === 0) return null;

                return (
                  <div
                    key={cat._id}
                    className="bg-slate-800/60 border border-slate-700/60 rounded-3xl flex flex-col shadow-sm overflow-hidden"
                  >
                    {/* Collapsible Accordion Header */}
                    <button
                      onClick={() => toggleCategoryExpand(cat._id)}
                      className="w-full flex items-center justify-between p-4.5 text-left cursor-pointer hover:bg-slate-850/65 transition-all border-none bg-transparent focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-5.5 w-5.5 text-emerald-400 stroke-[2.5px]" />
                        <span className="text-base font-extrabold text-slate-100">
                          {cat.name}
                        </span>
                      </div>
                      <div className="text-slate-400">
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </button>

                    {/* Collapsible Accordion Content */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4.5 pb-4.5 pt-0.5 flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-2.5">
                              {filteredItems.map((productName) => {
                                const existing = getExistingItem(productName);
                                const isChecked = !!existing;
                                const translatedName = translateItemName(productName, itemLanguage);

                                return (
                                  <div key={productName} className="relative w-full">
                                    <button
                                      type="button"
                                      onClick={(e) => handleDeleteCatalogItem(e, productName, cat._id)}
                                      className="absolute -top-1.5 -left-1.5 z-10 p-1.5 bg-slate-950 hover:bg-red-950/40 border border-slate-800 hover:border-red-500/40 text-slate-450 hover:text-red-400 rounded-full cursor-pointer transition-all active:scale-75 flex items-center justify-center shadow-md min-w-[28px] min-h-[28px]"
                                      title="Delete from catalog"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                    <button
                                      onClick={() => handleProductToggle(productName, cat._id)}
                                      className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left cursor-pointer active:scale-95 transition-all ${
                                        isChecked
                                          ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-400"
                                          : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-750"
                                      }`}
                                    >
                                      <span className="text-sm font-bold truncate max-w-[100px]" title={translatedName}>
                                        {translatedName}
                                      </span>
                                      <div className={`h-6 w-6 rounded-lg border flex items-center justify-center transition-all ${
                                        isChecked
                                          ? "bg-emerald-500 border-emerald-500 text-white"
                                          : "border-slate-700 bg-slate-800"
                                      }`}>
                                        {isChecked && <Check className="h-3.5 w-3.5 stroke-[3px]" />}
                                      </div>
                                    </button>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Add Custom Item Row */}
                            <div className="flex gap-2 items-center mt-1 pt-3 border-t border-slate-700/20">
                              <input
                                type="text"
                                placeholder={`+ Add item in ${cat.name.toLowerCase()}...`}
                                value={newCustomItemName[cat._id] || ""}
                                onChange={(e) =>
                                  setNewCustomItemName((prev) => ({ ...prev, [cat._id]: e.target.value }))
                                }
                                className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                              />
                              <button
                                onClick={() => handleAddCustomItem(cat._id)}
                                className="p-2 bg-emerald-500 text-white font-bold rounded-xl transition-all hover:bg-emerald-600 active:scale-90 flex items-center justify-center min-w-[32px] min-h-[32px] cursor-pointer border-none"
                              >
                                <Plus className="h-4 w-4 stroke-[3px]" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        )/* Removed local mic button from catalog-only view */ }

        {activeView === "favorites" && (
          <div className="flex flex-col gap-4.5">
            <h2 className="text-lg font-black text-slate-100 px-1">
              My Favorites (❤️ Quick Add)
            </h2>

            {favorites.length === 0 ? (
              <div className="p-8 text-center bg-slate-800/40 border border-slate-700/60 rounded-3xl flex flex-col gap-3.5 items-center">
                <Heart className="h-10 w-10 text-rose-500/50" />
                <p className="text-xs font-extrabold text-slate-400 max-w-[280px] leading-relaxed">
                  No favorite items yet. Go to Catalog, tap any item, and click the Heart icon ❤️ in their edit sheet to save them here for fast shopping!
                </p>
              </div>
            ) : (
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-3xl p-5 shadow-sm flex flex-col gap-4">
                <p className="text-xs font-bold text-slate-400">
                  Tap frequently used items below to add them directly to your list:
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {favorites.map((fav) => {
                    const existing = getExistingItem(fav.name);
                    const isChecked = !!existing;
                    const translatedName = translateItemName(fav.name, itemLanguage);
                    const catId = fav.categoryId?._id || fav.categoryId || "";

                    return (
                      <button
                        key={fav._id}
                        onClick={() => handleProductToggle(fav.name, catId)}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border text-left cursor-pointer active:scale-95 transition-all ${
                          isChecked
                            ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-400"
                            : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-750"
                        }`}
                      >
                        <span className="text-sm font-bold truncate max-w-[100px]">
                          {translatedName}
                        </span>
                        <div className={`h-6 w-6 rounded-lg border flex items-center justify-center transition-all ${
                          isChecked
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : "border-slate-700 bg-slate-800"
                        }`}>
                          {isChecked && <Check className="h-3.5 w-3.5 stroke-[3px]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {activeView === "review" && (
          <div className="p-5 bg-slate-800/80 border border-slate-700 rounded-3xl flex flex-col gap-4 shadow-md">
            <div className="flex flex-col gap-3 border-b border-slate-700 pb-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-100">
                  Selected List Review ({checkedItems.length})
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setActiveView("templates")}
                    className="text-xs font-bold text-amber-400 hover:text-amber-500 transition-colors flex items-center gap-1 active:scale-95 cursor-pointer bg-transparent border-none"
                  >
                    <ListChecks className="h-3.5 w-3.5" />
                    <span>Templates</span>
                  </button>
                  {checkedItems.length > 0 && (
                    <button
                      onClick={() => {
                        const name = window.prompt("Enter a name for this template:");
                        if (name) useApp().saveTemplate(name);
                      }}
                      className="text-xs font-bold text-blue-400 hover:text-blue-500 transition-colors flex items-center gap-1 active:scale-95 cursor-pointer bg-transparent border-none"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      <span>Save as Template</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                {checkedItems.length > 0 && (
                  <button
                    onClick={() => setShoppingMode(true)}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-500 transition-colors flex items-center gap-1 active:scale-95 cursor-pointer bg-transparent border-none"
                  >
                    <span>Shopping Mode</span>
                  </button>
                )}
                {checkedItems.length > 0 && (
                  <button
                    onClick={handleNewListReset}
                    disabled={isResetting}
                    className="text-xs font-bold text-rose-400 hover:text-rose-500 transition-colors flex items-center gap-1 active:scale-95 disabled:opacity-50 cursor-pointer bg-transparent border-none"
                  >
                    {isResetting ? <RefreshCw className="h-3.5 w-3.5" /> : <Trash2 className="h-3.5 w-3.5" />}
                    <span>New List</span>
                  </button>
                )}
              </div>
            </div>

            {checkedItems.length === 0 ? (
              <div className="py-12 text-center text-sm font-bold text-slate-500">
                No items selected yet. Go to "Catalog" tab and tick items!
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {checkedItems.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      setSelectedItem(item);
                      setIsEditorOpen(true);
                    }}
                    className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 hover:border-slate-700/60 cursor-pointer rounded-2xl shadow-soft-sm group active:scale-99 transition-all"
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-slate-100 truncate block">
                          {translateItemName(item.name, itemLanguage)}
                        </span>
                        {item.audioNote && (
                          <button
                            onClick={(e) => handlePlayAudioNote(e, item.audioNote)}
                            className="p-1 bg-emerald-950/20 border border-emerald-500/20 text-emerald-450 rounded-lg cursor-pointer hover:bg-emerald-950/30 active:scale-90 flex items-center justify-center min-w-[24px] min-h-[24px]"
                            title="Play Voice Instruction"
                          >
                            <Volume2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSpeakItem(item);
                          }}
                          className="p-1 bg-slate-850 border border-slate-700 text-slate-100 rounded-lg cursor-pointer hover:bg-slate-750 active:scale-90 flex items-center justify-center min-w-[24px] min-h-[24px]"
                          title="Speak Item"
                        >
                          <Volume1 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-[10px] font-black text-slate-400 uppercase tracking-wide">
                        <span>{item.quantity} {item.unit}</span>
                        {item.estimatedCost > 0 && (
                          <span className="text-emerald-400 font-extrabold normal-case">
                            Est: ₹{item.estimatedCost}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Direct +/- adjust buttons and direct Delete */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => {
                            triggerHaptic();
                            updateItem(item._id, { quantity: Math.max(1, (item.quantity || 1) - 1) });
                          }}
                          className="h-8 w-8 bg-slate-850 hover:bg-slate-750 active:scale-90 rounded-lg flex items-center justify-center font-black text-base cursor-pointer border border-slate-700 text-slate-100"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm font-black text-slate-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            triggerHaptic();
                            updateItem(item._id, { quantity: (item.quantity || 1) + 1 });
                          }}
                          className="h-8 w-8 bg-slate-850 hover:bg-slate-750 active:scale-90 rounded-lg flex items-center justify-center font-black text-base cursor-pointer border border-slate-700 text-slate-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteItem(item._id);
                        }}
                        className="p-2.5 text-red-500 hover:text-red-400 hover:bg-red-955/20 rounded-xl transition-all cursor-pointer border-none bg-transparent"
                        title="Delete Item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Budget Summary Banner */}
                <div className="bg-slate-900 border border-slate-700 p-4.5 rounded-2xl flex flex-col gap-2 mt-2 select-none">
                  <div className="flex justify-between items-center text-sm font-extrabold text-slate-350">
                    <span>Total Estimated Budget:</span>
                    <span className="font-mono text-slate-100 text-base">₹{totalBudget}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-extrabold text-slate-350 pt-2 border-t border-slate-800">
                    <span>Spent So Far:</span>
                    <span className="font-mono text-emerald-400 text-base">₹{spentBudget}</span>
                  </div>
                </div>

                {/* Share list button */}
                <div className="flex flex-col gap-2 mt-2">
                  <Button
                    variant="primary"
                    onClick={() => setShareModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 py-4.5 text-sm font-black rounded-2xl min-h-[48px]"
                  >
                    <Share2 className="h-4.5 w-4.5" />
                    Share Product List
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeView === "frequent" && (
          <div className="flex flex-col gap-5">
            <FrequentTab />
          </div>
        )}

        {activeView === "templates" && (
          <div className="flex flex-col gap-5">
            <TemplatesTab />
          </div>
        )}

        {activeView === "history" && (
          <div className="flex flex-col gap-5">
            <h2 className="text-lg font-black text-slate-100 px-1">
              Completed Lists History
            </h2>

            {loadingHistory ? (
              <div className="text-center py-12 text-sm font-semibold text-slate-500">
                Loading history...
              </div>
            ) : historyLogs.length === 0 ? (
              <div className="text-center py-12 text-sm font-semibold text-slate-500 bg-slate-800/40 border border-slate-700/60 rounded-3xl p-5">
                No completed lists in history yet.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {historyLogs.map((log) => {
                  const isExpanded = !!expandedLog[log._id];
                  const listId = log.listId?._id || "";
                  const listItemsList = historyItems[listId] || [];
                  const isLoadingItems = !!loadingLogItems[listId];

                  return (
                    <div
                      key={log._id}
                      className="bg-slate-800/60 border border-slate-700/60 rounded-3xl flex flex-col shadow-sm overflow-hidden"
                    >
                      {/* Log Header Accordion Trigger */}
                      <div
                        onClick={() => toggleLogExpand(log._id, listId)}
                        className="w-full flex justify-between items-start p-5 cursor-pointer hover:bg-slate-850/65 transition-all text-left"
                      >
                        <div>
                          <h4 className="text-base font-extrabold text-slate-100">
                            {log.listId?.name || "Grocery Shopping"}
                          </h4>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wide">
                            {new Date(log.completedAt).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </span>
                          <p className="text-xs text-slate-300 font-semibold mt-2.5 line-clamp-1">
                            {log.summary || `Bought ${log.itemsCount} items`}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRepeatList(listId);
                            }}
                            className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-black rounded-xl cursor-pointer active:scale-95 flex items-center gap-1 shadow-soft-sm border-none"
                            title="Repeat List"
                          >
                            <span>Reuse</span>
                            <ArrowRight className="h-3 w-3 stroke-[2.5px]" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteHistoryLog(listId);
                            }}
                            className="p-1.5 text-red-500 hover:text-red-400 hover:bg-red-950/20 rounded-lg active:scale-90 border-none bg-transparent"
                            title="Delete History Log"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Log Accordion Details Content */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden border-t border-slate-700/20"
                          >
                            <div className="p-5 bg-slate-900/40 flex flex-col gap-3">
                              <h5 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                                Items Purchased ({log.itemsCount}):
                              </h5>
                              {isLoadingItems ? (
                                <div className="text-xs text-slate-500 font-bold py-2 animate-pulse">
                                  Loading items list...
                                </div>
                              ) : listItemsList.length === 0 ? (
                                <div className="text-xs text-slate-500 font-bold py-2">
                                  No items found in this list.
                                </div>
                              ) : (
                                <div className="grid grid-cols-1 gap-2 pl-1">
                                  {listItemsList.map((item) => (
                                    <div
                                      key={item._id}
                                      className="flex items-center justify-between text-xs font-bold text-slate-200 py-1 border-b border-slate-750/30"
                                    >
                                      <span className="flex items-center gap-2">
                                        <Check className="h-3.5 w-3.5 text-emerald-500 stroke-[3px]" />
                                        <span>{translateItemName(item.name, itemLanguage)}</span>
                                      </span>
                                      <span className="text-[10px] font-black text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md">
                                        {item.quantity} {item.unit}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Voice Recognition Status Confirmation Popup Modal */}
      <AnimatePresence>
        {(voiceResult || voiceError || isListening) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 border border-slate-700 w-full max-w-sm rounded-[24px] p-6 shadow-2xl flex flex-col gap-4 text-slate-100 text-center"
            >
              {isListening && (
                <div className="flex flex-col gap-4 items-center py-4">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute h-16 w-16 bg-emerald-500/20 rounded-full animate-ping" />
                    <div className="h-14 w-14 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center shadow-lg">
                      <Mic className="h-7 w-7 stroke-[2.5px] animate-bounce" />
                    </div>
                  </div>
                  <h3 className="text-lg font-black text-emerald-400">Listening...</h3>
                  <p className="text-xs text-slate-350 px-2 leading-relaxed">
                    Speak clearly, e.g. <br />
                    <span className="font-bold text-slate-200">"Aalu do kilo"</span> or <br />
                    <span className="font-bold text-slate-200">"Tomato one kg"</span>
                  </p>
                  <Button variant="outline" onClick={() => setIsListening(false)} className="mt-2 text-xs py-2">
                    Cancel
                  </Button>
                </div>
              )}

              {voiceResult && (
                <div className="flex flex-col gap-3 py-2">
                  <div className="h-12 w-12 bg-emerald-950/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                    <Check className="h-6 w-6 stroke-[3px]" />
                  </div>
                  <h3 className="text-lg font-black text-emerald-400">Add Spoken Item?</h3>
                  <div className="bg-slate-900 p-4 border border-slate-750 rounded-2xl flex flex-col gap-1 text-left mt-2">
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Item Name</span>
                    <span className="text-base font-black text-slate-100 truncate">
                      {translateItemName(voiceResult.name, itemLanguage)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mt-2">Quantity</span>
                    <span className="text-sm font-black text-emerald-400">
                      {voiceResult.quantity} {voiceResult.unit}
                    </span>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <Button variant="outline" onClick={() => setVoiceResult(null)} className="flex-1 cursor-pointer">
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirmVoiceAdd} className="flex-1 cursor-pointer">
                      Yes, Add
                    </Button>
                  </div>
                </div>
              )}

              {voiceError && (
                <div className="flex flex-col gap-3.5 py-2">
                  <div className="h-12 w-12 bg-red-950/40 text-red-400 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-black text-red-400">Did not understand</h3>
                  <p className="text-sm text-slate-300 font-bold px-2 leading-normal">
                    {voiceError}
                  </p>

                  <div className="flex gap-3 mt-4">
                    <Button variant="outline" onClick={() => setVoiceError(null)} className="flex-1 cursor-pointer">
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleVoiceListen} className="flex-1 cursor-pointer">
                      Retry 🎙️
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal Dialog */}
      <AnimatePresence>
        {shareModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4"
            onClick={() => setShareModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 border border-slate-700 w-full max-w-sm rounded-[24px] p-6 shadow-2xl flex flex-col gap-4 text-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                <h3 className="text-lg font-black text-emerald-400">Share Shopping List</h3>
                <button
                  onClick={() => setShareModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-200 cursor-pointer border-none bg-transparent"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <button
                  onClick={() => {
                    handleShareWhatsApp();
                    setShareModalOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-4 bg-emerald-955/20 hover:bg-emerald-955/30 border border-emerald-500/30 rounded-2xl text-emerald-400 font-extrabold cursor-pointer active:scale-98 transition-all text-sm border-solid"
                >
                  <MessageCircle className="h-5 w-5 stroke-[2.5px]" />
                  <span>Send Text on WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    handleShareLink();
                    setShareModalOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-4 bg-slate-900 hover:bg-slate-950 border border-slate-850 rounded-2xl text-slate-200 font-extrabold cursor-pointer active:scale-98 transition-all text-sm border-solid"
                >
                  <Link className="h-5 w-5" />
                  <span>Copy Public Web Link</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Bottom Sheet */}
      <BottomSheet isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} title="App Settings">
        <div className="flex flex-col gap-6 select-none pb-6 text-slate-105">
          
          {/* Font Size Accessibility Setting */}
          <div className="flex flex-col gap-2.5">
            <label className="text-sm font-extrabold text-slate-350 uppercase tracking-wider">
              Text Size (Readability)
            </label>
            <div className="flex gap-2.5 w-full">
              {[
                { size: "sm", label: "Small" },
                { size: "md", label: "Medium" },
                { size: "lg", label: "Large" }
              ].map((f) => {
                const isActive = fontSize === f.size;
                return (
                  <button
                    key={f.size}
                    onClick={() => setFontSize(f.size)}
                    className={`flex-1 py-3 text-sm font-bold border rounded-xl transition-all cursor-pointer border-solid ${
                      isActive
                        ? "border-emerald-500 bg-emerald-950/20 text-emerald-400 font-black"
                        : "border-slate-700 text-slate-300 bg-slate-900 hover:bg-slate-800"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Move Purchased to Bottom Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-bold text-slate-100">
                Move Checked to Bottom
              </span>
              <span className="text-[10px] text-slate-400 font-semibold leading-tight">
                Moves purchased items to the bottom of the list.
              </span>
            </div>
            <button
              onClick={() => setMovePurchasedToBottom(!movePurchasedToBottom)}
              className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer border-none flex items-center ${
                movePurchasedToBottom ? "bg-emerald-500 justify-end" : "bg-slate-750 justify-start"
              }`}
            >
              <div className="w-4 h-4 bg-white rounded-full shadow-md" />
            </button>
          </div>

          {/* Auto-Sync Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-bold text-slate-100">
                Real-time Sync (5s)
              </span>
              <span className="text-[10px] text-slate-400 font-semibold leading-tight">
                Automatically checks for changes made by other family members.
              </span>
            </div>
            <button
              onClick={() => setAutoSync(!autoSync)}
              className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer border-none flex items-center ${
                autoSync ? "bg-emerald-500 justify-end" : "bg-slate-750 justify-start"
              }`}
            >
              <div className="w-4 h-4 bg-white rounded-full shadow-md" />
            </button>
          </div>

          {/* Restore Deleted Catalog Items */}
          {hiddenCatalogItems.length > 0 && (
            <div className="flex items-center justify-between p-3.5 bg-slate-900 border border-slate-800 rounded-2xl">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-bold text-slate-100">
                  Deleted Catalog Items ({hiddenCatalogItems.length})
                </span>
                <span className="text-[10px] text-slate-400 font-semibold leading-tight">
                  Restore hidden items back to the catalog list.
                </span>
              </div>
              <button
                onClick={() => {
                  if (window.confirm("Restore all deleted items back to the catalog?")) {
                    setHiddenCatalogItems([]);
                    localStorage.removeItem("gharlist_hidden_catalog_items");
                  }
                }}
                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl text-xs cursor-pointer border-none transition-all active:scale-95"
              >
                Restore All
              </button>
            </div>
          )}

          {/* Active Family Code Info */}
          <div className="bg-slate-900 p-4 border border-slate-800 rounded-2xl flex flex-col gap-2">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
              Your Family Code
            </span>
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-slate-100 tracking-wider">
                {familyCode}
              </span>
              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 cursor-pointer border-none"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 stroke-[3px]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Group Exit button */}
          <div className="border-t border-slate-700/20 pt-4 mt-2">
            <Button
              variant="danger"
              fullWidth
              onClick={() => {
                const confirmLeave = window.confirm("Are you sure you want to leave this family group? This will clear all cached list items on your device.");
                if (confirmLeave) {
                  setFamilyCode(null);
                  setIsSettingsOpen(false);
                }
              }}
              className="py-3.5 text-sm font-black rounded-2xl min-h-[48px]"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Leave Family Group
            </Button>
          </div>

        </div>
      </BottomSheet>

      {/* Floating Voice Microphone Button */}
      {activeView !== "history" && (
        <div className="fixed bottom-24 right-5 z-40">
          <button
            onClick={handleVoiceListen}
            className={`p-4 rounded-full text-slate-100 font-black shadow-soft-lg active:scale-95 transition-all flex items-center justify-center cursor-pointer border-none ${
              isListening ? "bg-red-500 text-slate-950 animate-pulse" : "bg-emerald-500 hover:bg-emerald-600 text-slate-950"
            }`}
            style={{ width: "56px", height: "56px" }}
            title="Speak to add items"
          >
            {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6 stroke-[2.5px]" />}
          </button>
        </div>
      )}

      {/* Floating Bottom Tab Bar Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 pb-5 pt-3.5 max-w-md mx-auto flex items-center justify-around">
        <button
          onClick={() => setActiveView("catalog")}
          className={`flex flex-col items-center gap-1.5 cursor-pointer text-xs font-black select-none border-none bg-transparent ${
            activeView === "catalog" ? "text-emerald-400" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Catalog</span>
        </button>

        <button
          onClick={() => setActiveView("favorites")}
          className={`flex flex-col items-center gap-1.5 cursor-pointer text-xs font-black select-none border-none bg-transparent ${
            activeView === "favorites" ? "text-emerald-400" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Heart className="h-5 w-5" />
          <span>Favorites</span>
        </button>

        <button
          onClick={() => setActiveView("review")}
          className={`flex flex-col items-center gap-1.5 cursor-pointer text-xs font-black select-none relative border-none bg-transparent ${
            activeView === "review" ? "text-emerald-400" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <ListChecks className="h-5 w-5" />
          <span>My List</span>
          {checkedItems.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-emerald-500 text-slate-950 text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center">
              {checkedItems.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveView("frequent")}
          className={`flex flex-col items-center gap-1.5 cursor-pointer text-xs font-black select-none border-none bg-transparent ${
            activeView === "frequent" ? "text-amber-400" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Star className={`h-5 w-5 ${ activeView === "frequent" ? "fill-amber-400" : ""}`} />
          <span>Frequent</span>
        </button>

        <button
          onClick={() => setActiveView("history")}
          className={`flex flex-col items-center gap-1.5 cursor-pointer text-xs font-black select-none border-none bg-transparent ${
            activeView === "history" ? "text-emerald-400" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <History className="h-5 w-5" />
          <span>History</span>
        </button>
      </div>
    </div>
  );
};
