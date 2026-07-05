import React from "react";
import { motion } from "framer-motion";

export const Card = ({
  children,
  clickable = false,
  border = true,
  padding = "md",
  className = "",
  onClick,
  ...props
}) => {
  const paddings = {
    none: "p-0",
    sm: "p-3",
    md: "p-5",
    lg: "p-7"
  };

  const baseStyle = `bg-[var(--card-bg)] rounded-3xl transition-all shadow-soft-sm ${
    border ? "border border-[var(--card-border)]" : ""
  } ${paddings[padding]} ${className}`;

  if (clickable) {
    return (
      <motion.div
        whileTap={{ scale: 0.98 }}
        whileHover={{ y: -2 }}
        onClick={onClick}
        className={`${baseStyle} cursor-pointer select-none active:bg-gray-50 dark:active:bg-neutral-800/50`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseStyle} {...props}>
      {children}
    </div>
  );
};
