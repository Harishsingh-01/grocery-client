import React from "react";

export const LoadingSpinner = ({
  message,
  fullPage = false
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="relative flex items-center justify-center">
        {/* Outer pulse */}
        <div className="absolute w-12 h-12 bg-primary/20 rounded-full animate-ping" />
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
      {message && (
        <p className="mt-4 text-base font-bold text-gray-700 dark:text-gray-300 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 bg-[var(--background)] flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};
