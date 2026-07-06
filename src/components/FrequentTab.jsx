import React, { useState, useEffect, useCallback } from "react";
import { useApp } from "../hooks/AppContext";
import { Star, CheckCircle2, Circle, TrendingUp, RefreshCw, ShoppingBag } from "lucide-react";
import { Card } from "./ui/Card";
import { motion, AnimatePresence } from "framer-motion";

export const FrequentTab = () => {
  const {
    familyCode,
    items,
    categories,
    activeListId,
    addItem,
    updateItem
  } = useApp();

  const [frequentItems, setFrequentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingItem, setAddingItem] = useState(null);

  const fetchFrequent = useCallback(async () => {
    if (!familyCode) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/history/frequent?familyCode=${familyCode}`);
      if (res.ok) {
        const data = await res.json();
        setFrequentItems(data.frequentItems || []);
      }
    } catch (err) {
      console.error("Fetch frequent items error:", err);
    } finally {
      setLoading(false);
    }
  }, [familyCode]);

  useEffect(() => {
    fetchFrequent();
  }, [fetchFrequent]);

  // Check if item is already in the active list
  const isInList = (name) =>
    items.some((i) => i.name.toLowerCase().trim() === name.toLowerCase().trim());

  const handleToggle = async (freqItem) => {
    if (!activeListId) return;
    if (navigator.vibrate) navigator.vibrate(15);

    const alreadyInList = isInList(freqItem.name);

    if (alreadyInList) {
      // Remove from list — find the item and delete it
      const existingItem = items.find(
        (i) => i.name.toLowerCase().trim() === freqItem.name.toLowerCase().trim()
      );
      if (existingItem) {
        await updateItem(existingItem._id, { isPurchased: false });
        // We don't delete, just un-purchase — user can remove manually
      }
      return;
    }

    // Add to list
    setAddingItem(freqItem.name);
    try {
      // Find category — use the one from freqItem if available
      let catId = freqItem.categoryId?._id || freqItem.categoryId;
      if (!catId && categories.length > 0) {
        catId = categories[0]._id;
      }

      await addItem({
        categoryId: catId,
        subcategory: "",
        name: freqItem.name,
        quantity: freqItem.quantity || 1,
        unit: freqItem.unit || "piece",
        notes: "",
        estimatedCost: freqItem.estimatedCost || 0,
        audioNote: "",
        forceAdd: true // Skip duplicate check since user explicitly chose this
      });
    } finally {
      setAddingItem(null);
    }
  };

  // Group frequent items by category
  const grouped = {};
  frequentItems.forEach((item) => {
    const catName = item.categoryId?.name || "Others";
    if (!grouped[catName]) grouped[catName] = [];
    grouped[catName].push(item);
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-400">
        <RefreshCw className="h-8 w-8 animate-spin text-emerald-500" />
        <span className="text-sm font-bold">Loading your frequent items...</span>
      </div>
    );
  }

  if (frequentItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center px-4">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
          <TrendingUp className="h-8 w-8 text-slate-500" />
        </div>
        <div>
          <h3 className="text-base font-black text-slate-200">No Data Yet</h3>
          <p className="text-xs font-semibold text-slate-400 mt-1 leading-relaxed">
            Complete a few shopping trips and your most-bought items will appear here automatically.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-lg font-black text-slate-100 flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
            Frequently Bought
          </h2>
          <p className="text-[10px] font-semibold text-slate-400">
            Tick to add instantly to your active list
          </p>
        </div>
        <button
          onClick={fetchFrequent}
          className="p-2 text-slate-400 hover:text-slate-200 border-none bg-transparent cursor-pointer"
          title="Refresh"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {/* Items grouped by category */}
      <AnimatePresence>
        {Object.entries(grouped).map(([catName, catItems]) => (
          <motion.div
            key={catName}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2"
          >
            {/* Category label */}
            <div className="flex items-center gap-2 px-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {catName}
              </span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            {/* Item cards */}
            {catItems.map((item) => {
              const inList = isInList(item.name);
              const isAdding = addingItem === item.name;

              return (
                <motion.div
                  key={item.name}
                  layout
                  whileTap={{ scale: 0.97 }}
                >
                  <Card
                    clickable
                    onClick={() => handleToggle(item)}
                    className={`flex items-center justify-between px-4 py-3.5 border-2 transition-all duration-200 ${
                      inList
                        ? "border-emerald-500/40 bg-emerald-950/30"
                        : "border-slate-750 bg-slate-900/40 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* Checkbox */}
                      <div className={`flex-shrink-0 transition-colors ${
                        inList ? "text-emerald-500" : "text-slate-600"
                      }`}>
                        {isAdding ? (
                          <RefreshCw className="h-6 w-6 animate-spin text-emerald-400" />
                        ) : inList ? (
                          <CheckCircle2 className="h-6 w-6 fill-emerald-500/15 stroke-[2.5px]" />
                        ) : (
                          <Circle className="h-6 w-6 stroke-[2.5px]" />
                        )}
                      </div>

                      {/* Item name + meta */}
                      <div className="flex-1 min-w-0">
                        <span className={`text-sm font-extrabold block truncate leading-tight ${
                          inList ? "text-emerald-400" : "text-slate-100"
                        }`}>
                          {item.name}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 font-mono">
                          {item.quantity} {item.unit}
                          {item.estimatedCost > 0 && (
                            <span className="text-emerald-500 ml-2">₹{item.estimatedCost}</span>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Frequency badge */}
                    <div className="flex flex-col items-end gap-1 min-w-[52px]">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                        inList
                          ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-400"
                          : "bg-slate-800 border-slate-700 text-slate-400"
                      }`}>
                        {inList ? "In List ✓" : `${item.count}×`}
                      </span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Footer tip */}
      <div className="text-center text-[10px] text-slate-500 font-semibold py-3 border-t border-slate-800 mt-2 flex items-center justify-center gap-1.5">
        <ShoppingBag className="h-3 w-3" />
        <span>Based on your last {frequentItems.length > 0 ? "completed" : ""} shopping trips</span>
      </div>
    </div>
  );
};
