import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useApp } from "../../hooks/AppContext";

export const Snackbar = () => {
  const { snackbar, setSnackbar } = useApp();
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (!snackbar || !snackbar.show) return;

    setTimeLeft(10);

    // Setup 1 second tick for visual countdown
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setSnackbar(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [snackbar, setSnackbar]);

  if (!snackbar || !snackbar.show) return null;

  return (
    <AnimatePresence>
      <div className="fixed bottom-[88px] inset-x-0 z-50 flex justify-center px-4 pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="w-full max-w-[400px] bg-neutral-900 text-white rounded-2xl py-3 px-4 shadow-soft-lg flex items-center justify-between border border-neutral-800 pointer-events-auto"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">{snackbar.message}</span>
            <span className="text-[10px] text-gray-400 font-mono bg-neutral-800 px-1.5 py-0.5 rounded">
              {timeLeft}s
            </span>
          </div>
          
          <button
            onClick={snackbar.onUndo}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/20 hover:bg-primary/30 active:scale-95 text-primary rounded-xl text-xs font-bold transition-all min-h-[32px] cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Undo
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
