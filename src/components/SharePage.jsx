import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { 
  CheckCircle2, Circle, Calendar, ShoppingBag, 
  Volume1, Volume2, RefreshCw, AlertCircle 
} from "lucide-react";
import { Card } from "./ui/Card";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import { translateItemName } from "../lib/defaultData";

export const SharePage = () => {
  const { listId } = useParams();
  const [list, setList] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchSharedList = async (isSilent = false) => {
    if (!isSilent) setIsUpdating(true);
    try {
      const res = await fetch(`/api/lists/share/${listId}`);
      if (!res.ok) {
        throw new Error("Shared list not found. Verify the link.");
      }
      const data = await res.json();
      setList(data.list);
      setItems(data.items || []);
      setError(null);
    } catch (err) {
      if (!isSilent) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
      setIsUpdating(false);
    }
  };

  // Initial Fetch & 5-Second Real-Time Polling Loop
  useEffect(() => {
    fetchSharedList();
  }, [listId]);

  const fetchSharedListRef = useRef(fetchSharedList);
  useEffect(() => {
    fetchSharedListRef.current = fetchSharedList;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchSharedListRef.current(true);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Public interactive checkbox toggle
  const handleToggleItem = async (itemId, currentStatus) => {
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
    try {
      const res = await fetch(`/api/lists/share/${listId}/item/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPurchased: !currentStatus })
      });
      if (res.ok) {
        setItems((prev) =>
          prev.map((i) => (i._id === itemId ? { ...i, isPurchased: !currentStatus } : i))
        );
      }
    } catch (err) {
      console.error("Toggle item error:", err);
    }
  };

  // Text to speech readout
  const handleSpeakItem = (e, name, qty, unit) => {
    e.stopPropagation();
    if (!window.speechSynthesis) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const speechText = `${name}, ${qty} ${unit}`;
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  // Play attached voice notes
  const handlePlayAudio = (e, base64Audio) => {
    e.stopPropagation();
    if (!base64Audio) return;
    const audio = new Audio(base64Audio);
    audio.play().catch((err) => console.error("Play voice note error:", err));
  };

  // Group items by category for structured grocery layouts
  const grouped = {};
  items.forEach((item) => {
    const catName = item.categoryId?.name || "Others";
    const catId = item.categoryId?._id || "others";

    if (!grouped[catId]) {
      grouped[catId] = {
        categoryName: catName,
        items: []
      };
    }
    grouped[catId].items.push(item);
  });

  const categoriesList = Object.values(grouped);

  // Sorting helper within category groups (bought items at bottom)
  categoriesList.forEach((group) => {
    group.items.sort((a, b) => {
      if (a.isPurchased && !b.isPurchased) return 1;
      if (!a.isPurchased && b.isPurchased) return -1;
      return a.name.localeCompare(b.name);
    });
  });

  const totalCount = items.length;
  const purchasedCount = items.filter((i) => i.isPurchased).length;
  const progressPercent = totalCount > 0 ? Math.round((purchasedCount / totalCount) * 100) : 0;

  // Running budget calculations
  const { totalBudget, spentBudget } = useMemo(() => {
    let total = 0;
    let spent = 0;
    items.forEach((item) => {
      const cost = (item.estimatedCost || 0) * (item.quantity || 1);
      total += cost;
      if (item.isPurchased) {
        spent += cost;
      }
    });
    return { totalBudget: total, spentBudget: spent };
  }, [items]);

  if (loading) {
    return <LoadingSpinner message="Loading shared list..." fullPage />;
  }

  if (error || !list) {
    return (
      <div className="min-h-screen bg-[#f4f4f5] text-slate-100 flex items-center justify-center p-6 text-center">
        <Card className="max-w-sm w-full p-6 border-red-500/20 flex flex-col gap-4 bg-white">
          <div className="h-12 w-12 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto border border-rose-500/20">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-black text-rose-500">Error Loading List</h2>
          <p className="text-sm font-semibold text-slate-500">{error || "Checklist not found. Verify link."}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f4f5] px-5 py-8 max-w-[480px] mx-auto select-none pb-20 text-slate-100">
      
      {/* Header Branding */}
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex justify-between items-center w-full">
          <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/10">
            GharList Public Link
          </span>
          {isUpdating && (
            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
              <RefreshCw className="h-3 w-3 animate-spin" />
              <span>Updating...</span>
            </span>
          )}
        </div>
        <h1 className="text-3xl font-black text-slate-100 mt-1">
          {list.name}
        </h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mt-1">
          <Calendar className="h-3.5 w-3.5" />
          <span>Interactive list • Syncs with family</span>
        </div>
      </div>

      {/* Progress & Budget Calculator Card */}
      {totalCount > 0 && (
        <Card className="flex flex-col gap-4 border-slate-700 bg-white mb-6 p-5">
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs font-black text-slate-200">
              <span>Items Progress</span>
              <span className="font-mono text-emerald-400">
                {purchasedCount} / {totalCount} Bought
              </span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
              <div
                style={{ width: `${progressPercent}%` }}
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              />
            </div>
          </div>
          
          {totalBudget > 0 && (
            <div className="border-t border-slate-800 pt-3.5 flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs font-extrabold text-slate-400">
                <span>Total Expected Budget:</span>
                <span className="font-mono text-slate-100">₹{totalBudget}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-extrabold text-slate-400">
                <span>Spent So Far:</span>
                <span className="font-mono text-emerald-400 font-black">₹{spentBudget}</span>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Items List grouped by category */}
      <div className="flex flex-col gap-6">
        {totalCount === 0 ? (
          <div className="text-center py-12 text-slate-400 font-bold border border-dashed border-slate-700 rounded-2xl p-6 bg-white">
            <ShoppingBag className="h-10 w-10 mx-auto text-slate-400 mb-2" />
            No items in this shared list.
          </div>
        ) : (
          categoriesList.map((group) => (
            <div key={group.categoryName} className="flex flex-col gap-2.5">
              {/* Category Heading */}
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 px-2">
                {group.categoryName}
              </h3>
              
              {/* Items Card List */}
              <div className="flex flex-col gap-3">
                {group.items.map((item) => {
                  const isPurchased = !!item.isPurchased;
                  return (
                    <Card
                      key={item._id}
                      clickable
                      onClick={() => handleToggleItem(item._id, isPurchased)}
                      className={`flex items-center justify-between py-4.5 px-4 border-2 transition-all duration-200 ${
                        isPurchased
                          ? "bg-emerald-955/40 border-emerald-500/20 opacity-50"
                          : "border-slate-750 bg-white hover:border-slate-705 shadow-soft-sm"
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleItem(item._id, isPurchased);
                          }}
                          className={`p-1 flex items-center justify-center min-w-[36px] min-h-[36px] border-none bg-transparent cursor-pointer ${
                            isPurchased ? "text-emerald-500" : "text-slate-400"
                          }`}
                        >
                          {isPurchased ? (
                            <CheckCircle2 className="h-7 w-7 fill-emerald-500/10 stroke-[2.5px]" />
                          ) : (
                            <Circle className="h-7 w-7 stroke-[2.5px]" />
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 pr-1">
                            <span
                              className={`text-base font-extrabold text-slate-100 leading-tight block truncate ${
                                isPurchased ? "line-through text-slate-400 font-bold" : ""
                              }`}
                            >
                              {translateItemName(item.name, "en")}
                            </span>

                            {/* Voice Note Playback button */}
                            {item.audioNote && (
                              <button
                                onClick={(e) => handlePlayAudio(e, item.audioNote)}
                                className="p-1 bg-emerald-950/20 border border-emerald-500/20 text-emerald-450 rounded-lg cursor-pointer hover:bg-emerald-950/30 active:scale-90 flex items-center justify-center min-w-[24px] min-h-[24px]"
                                title="Play Voice Note"
                              >
                                <Volume2 className="h-3.5 w-3.5" />
                              </button>
                            )}

                            {/* Text-To-Speech Button */}
                            <button
                              onClick={(e) => handleSpeakItem(e, item.name, item.quantity, item.unit)}
                              className="p-1 bg-slate-850 border border-slate-700 text-slate-100 rounded-lg cursor-pointer hover:bg-slate-750 active:scale-90 flex items-center justify-center min-w-[24px] min-h-[24px]"
                              title="Speak Item"
                            >
                              <Volume1 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-3 mt-1 text-[10px] font-black text-slate-400 uppercase tracking-wide">
                            <span>{item.quantity} {item.unit}</span>
                            {item.notes && (
                              <span className="normal-case truncate max-w-[120px]">
                                • {item.notes}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right min-w-[64px] border-l border-slate-800/40 pl-3">
                        <span className="text-base font-black text-slate-100 font-mono block leading-none">
                          {item.quantity}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 font-mono block mt-1.5 tracking-wider uppercase leading-none">
                          {item.unit}
                        </span>
                        {item.estimatedCost > 0 && (
                          <span className="text-[10px] font-extrabold text-emerald-500 block font-mono mt-1">
                            ₹{item.estimatedCost}
                          </span>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Static Footer */}
      <div className="text-center text-xs font-semibold text-slate-400 mt-12 py-6 border-t border-slate-700 leading-relaxed">
        Powered by <strong className="text-emerald-500 font-bold">GharList</strong> <br />
        Simple mobile grocery management for families.
      </div>
    </div>
  );
};
