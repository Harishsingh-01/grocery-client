import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider, useApp } from "./hooks/AppContext";
import { Onboarding } from "./features/family/Onboarding";
import { SimpleShoppingDashboard } from "./components/SimpleShoppingDashboard";
import { SharePage } from "./components/SharePage";
import { Snackbar } from "./components/ui/Snackbar";
import { ItemEditorSheet } from "./features/lists/ItemEditorSheet";
import { ShoppingMode } from "./features/shopping/ShoppingMode";

const AppContent = () => {
  const { familyCode, isLoading } = useApp();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-slate-100 flex items-center justify-center font-bold">
        <span>Loading GharList...</span>
      </div>
    );
  }

  return (
    <Router>
      <div className="app-container bg-[var(--background)] min-h-screen relative">
        <Routes>
          <Route
            path="/"
            element={familyCode ? <SimpleShoppingDashboard /> : <Onboarding />}
          />
          <Route path="/share/:listId" element={<SharePage />} />
          {/* Compatibility for old Next.js shared links */}
          <Route path="/:locale/share/:listId" element={<SharePage />} />
        </Routes>
        <Snackbar />
        <ItemEditorSheet />
        <ShoppingMode />
      </div>
    </Router>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
