import React from "react";
import { motion } from "framer-motion";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center font-semibold rounded-2xl transition-colors focus:outline-none select-none active:scale-95";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover shadow-soft-sm disabled:bg-gray-300 dark:disabled:bg-neutral-800 disabled:text-gray-500",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:text-gray-150 dark:hover:bg-neutral-700 disabled:opacity-50",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-soft-sm disabled:opacity-50",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-55 dark:border-neutral-700 dark:text-gray-300 dark:hover:bg-neutral-800 disabled:opacity-50"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm min-h-[40px]",
    md: "px-6 py-3 text-base min-h-[48px]",
    lg: "px-8 py-4 text-lg min-h-[56px]"
  };

  const widthStyle = fullWidth ? "w-full" : "";
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      whileTap={isDisabled ? {} : { scale: 0.97 }}
      disabled={isDisabled}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
};
