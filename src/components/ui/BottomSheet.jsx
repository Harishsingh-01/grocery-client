import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export const BottomSheet = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  // Prevent page scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 pointer-events-auto"
          />

          {/* Sheet Container */}
          <div className="fixed inset-x-0 bottom-0 flex justify-center z-50 pointer-events-none">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="w-full max-w-[480px] bg-[var(--card-bg)] border-t border-[var(--card-border)] rounded-t-[32px] p-6 shadow-soft-lg pointer-events-auto max-h-[85vh] overflow-y-auto no-scrollbar flex flex-col pb-8"
            >
              {/* Drag Handle Indicator */}
              <div className="w-12 h-1.5 bg-gray-300 dark:bg-neutral-700 rounded-full mx-auto mb-5" />

              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                {title ? (
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {title}
                  </h3>
                ) : (
                  <div />
                )}
                <button
                  onClick={onClose}
                  className="p-2 bg-gray-100 hover:bg-gray-250 dark:bg-neutral-800 dark:hover:bg-neutral-705 rounded-full text-gray-600 dark:text-gray-350 min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto no-scrollbar">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
