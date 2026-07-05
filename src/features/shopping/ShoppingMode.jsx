import React, { useState } from "react";
import { useApp } from "../../hooks/AppContext";
import { Circle, CheckCircle2, X, Volume2 } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Modal } from "../../components/ui/Modal";
import { motion, AnimatePresence } from "framer-motion";

export const ShoppingMode = () => {
  const {
    shoppingMode,
    setShoppingMode,
    items,
    lists,
    activeListId,
    updateItem,
    movePurchasedToBottom,
    familyCode
  } = useApp();

  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  if (!shoppingMode || !activeListId) return null;

  const currentList = lists.find((l) => l._id === activeListId);
  const listName = currentList ? currentList.name : "Shopping List";

  const totalCount = items.length;
  const purchasedCount = items.filter((i) => i.isPurchased).length;
  const progressPercent = totalCount > 0 ? Math.round((purchasedCount / totalCount) * 100) : 0;

  // Sorting logic based on movePurchasedToBottom preference
  const sortedItems = [...items].sort((a, b) => {
    if (movePurchasedToBottom) {
      if (a.isPurchased && !b.isPurchased) return 1;
      if (!a.isPurchased && b.isPurchased) return -1;
    }
    const catA = a.categoryId?.name || "";
    const catB = b.categoryId?.name || "";
    if (catA !== catB) return catA.localeCompare(catB);
    return a.name.localeCompare(b.name);
  });

  const handleCheckboxToggle = async (itemId, currentStatus) => {
    // Trigger vibration feedback
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
    await updateItem(itemId, { isPurchased: !currentStatus });
  };

  const handlePlayAudio = (e, base64Audio) => {
    e.stopPropagation();
    if (!base64Audio) return;
    const audio = new Audio(base64Audio);
    audio.play().catch((err) => console.error("Audio playback error:", err));
  };

  const handleCompleteShopping = async () => {
    setIsCompleting(true);
    try {
      const res = await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          familyCode,
          listId: activeListId,
          action: "complete"
        })
      });
      if (res.ok) {
        setShoppingMode(false);
        window.location.reload();
      }
    } catch (err) {
      console.error("Complete list error:", err);
    } finally {
      setIsCompleting(false);
      setIsCompleteModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[var(--background)] max-w-[480px] mx-auto flex flex-col select-none text-slate-100">
      
      {/* Shopping Mode Header */}
      <div className="px-6 pt-6 pb-4 border-b border-[var(--nav-border)]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold text-[var(--muted-text)] tracking-wider uppercase">
            Shopping Mode
          </h2>
          <button
            onClick={() => setShoppingMode(false)}
            className="p-2 bg-slate-850 hover:bg-slate-750 rounded-full text-slate-400 min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer border-none"
            title="Exit"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <h1 className="text-3xl font-black text-slate-100 leading-tight mb-3 truncate">
          {listName}
        </h1>

        {/* Progress Tracker */}
        <div className="flex flex-col gap-1.5 mt-4">
          <div className="flex justify-between items-center text-base font-black text-slate-200">
            <span>Progress</span>
            <span className="font-mono text-primary">
              {purchasedCount} / {totalCount} Items Bought
            </span>
          </div>
          <div className="w-full h-4.5 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden border border-gray-200/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-primary"
            />
          </div>
        </div>
      </div>

      {/* Shopping Items List */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-4 flex flex-col gap-4">
        {totalCount === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400">
            <span className="text-lg font-bold">No items in list.</span>
            <p className="text-xs text-[var(--muted-text)] mt-1">Exit shopping mode and search to add items.</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {sortedItems.map((item) => {
              const isPurchased = !!item.isPurchased;
              return (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                >
                  <Card
                    clickable
                    onClick={() => handleCheckboxToggle(item._id, isPurchased)}
                    className={`flex items-center justify-between p-5 min-h-[80px] border-2 transition-all ${
                      isPurchased
                        ? "bg-emerald-950/40 border-emerald-500/20 opacity-50"
                        : "border-slate-750 bg-[var(--card-bg)] hover:border-slate-705 shadow-soft-md"
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCheckboxToggle(item._id, isPurchased);
                        }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer min-w-[48px] min-h-[48px] border-none bg-transparent ${
                          isPurchased ? "text-primary" : "text-slate-400"
                        }`}
                      >
                        {isPurchased ? (
                          <CheckCircle2 className="w-10 h-10 fill-emerald-500/10 stroke-[2.5px]" />
                        ) : (
                          <Circle className="w-10 h-10 stroke-[2.5px]" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xl font-extrabold text-slate-100 leading-tight block truncate ${
                              isPurchased ? "line-through text-slate-400 font-bold" : ""
                            }`}
                          >
                            {item.name}
                          </span>
                          {item.audioNote && (
                            <button
                              onClick={(e) => handlePlayAudio(e, item.audioNote)}
                              className="p-1 bg-emerald-950/20 border border-emerald-500/20 text-emerald-450 rounded-lg cursor-pointer hover:bg-emerald-950/30 active:scale-90 flex items-center justify-center min-w-[28px] min-h-[28px]"
                              title="Play Instruction"
                            >
                              <Volume2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        {item.notes && (
                          <span className="text-xs font-semibold text-slate-400 block truncate mt-0.5 max-w-[180px]">
                            {item.notes}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right min-w-[64px] select-none">
                      <span className="text-lg font-black text-slate-100 block font-mono">
                        {item.quantity}
                      </span>
                      <span className="text-xs font-bold text-slate-400 block tracking-wide font-mono leading-none mt-0.5">
                        {item.unit}
                      </span>
                      {item.estimatedCost > 0 && (
                        <span className="text-xs font-extrabold text-emerald-500 block font-mono mt-1">
                          ₹{item.estimatedCost}
                        </span>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* Shopping Mode Footer */}
      <div className="p-6 border-t border-[var(--nav-border)] flex gap-4">
        <Button
          variant="outline"
          onClick={() => setShoppingMode(false)}
          className="flex-1 text-lg py-4 min-h-[56px] rounded-2xl"
        >
          Exit Mode
        </Button>
        {totalCount > 0 && purchasedCount === totalCount && (
          <Button
            variant="primary"
            onClick={() => setIsCompleteModalOpen(true)}
            className="flex-1 text-lg py-4 min-h-[56px] rounded-2xl"
          >
            Finish List
          </Button>
        )}
      </div>

      {/* Complete Shopping Confirmation Modal */}
      <Modal
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
        title="Finish Grocery Trip?"
        description="This will archive this shopping list, record your purchases in history, and clear your active shopping list. Are you ready?"
        confirmText="Yes, Finish"
        onConfirm={handleCompleteShopping}
        isConfirmLoading={isCompleting}
      />
    </div>
  );
};
