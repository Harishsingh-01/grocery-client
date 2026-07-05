import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "./Button";

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  confirmText,
  onConfirm,
  confirmVariant = "primary",
  isConfirmLoading = false
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
            className="fixed inset-0 bg-black z-50"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="w-full max-w-[400px] bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[32px] p-6 shadow-soft-lg pointer-events-auto flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="p-1.5 bg-gray-50 hover:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-full text-gray-500 dark:text-gray-400 min-w-[32px] min-h-[32px] flex items-center justify-center cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Description */}
              {description && (
                <p className="text-sm font-medium text-[var(--muted-text)] mb-4 leading-relaxed">
                  {description}
                </p>
              )}

              {/* Main Content */}
              {children && <div className="mb-5">{children}</div>}

              {/* Actions Footer */}
              {onConfirm && confirmText && (
                <div className="flex gap-3 justify-end mt-2">
                  <Button variant="outline" size="sm" onClick={onClose} disabled={isConfirmLoading}>
                    Cancel
                  </Button>
                  <Button
                    variant={confirmVariant}
                    size="sm"
                    onClick={onConfirm}
                    isLoading={isConfirmLoading}
                  >
                    {confirmText}
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
