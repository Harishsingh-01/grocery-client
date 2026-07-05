import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, ArrowRight, ArrowLeft, Globe } from "lucide-react";
import { useApp } from "../../hooks/AppContext";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

const localTranslations = {
  en: {
    welcome: "Welcome to GharList",
    subtitle: "Your family's shared grocery list, made simple.",
    createFamily: "Create Family",
    createFamilyDesc: "Start a new shared list for your household",
    joinFamily: "Join Family",
    joinFamilyDesc: "Enter a code to join your family's list",
    enterCode: "Enter Family Code",
    enterCodeDesc: "Ask a family member for their 6-character code",
    placeholder: "e.g., AB12CD",
    submit: "Join",
    back: "Back",
    generating: "Generating code...",
    joining: "Joining...",
    invalidCode: "Invalid code. Please check and try again.",
    errorConnection: "Error connecting to server."
  },
  hi: {
    welcome: "घरलिस्ट (GharList) में आपका स्वागत है",
    subtitle: "आपके परिवार की साझी राशन सूची, बिल्कुल आसान।",
    createFamily: "नया परिवार बनाएं",
    createFamilyDesc: "अपने घर के लिए एक नई साझी सूची शुरू करें",
    joinFamily: "परिवार से जुड़ें",
    joinFamilyDesc: "अपने परिवार की सूची में शामिल होने के लिए कोड डालें",
    enterCode: "पारिवारिक कोड दर्ज करें",
    enterCodeDesc: "परिवार के किसी सदस्य से उनका 6-अक्षर का कोड मांगें",
    placeholder: "जैसे: AB12CD",
    submit: "जुड़ें",
    back: "पीछे जाएं",
    generating: "कोड बनाया जा रहा है...",
    joining: "जुड़ रहे हैं...",
    invalidCode: "गलत कोड। कृपया जांचें और दोबारा प्रयास करें।",
    errorConnection: "सर्वर से कनेक्ट करने में त्रुटि।"
  }
};

export const Onboarding = () => {
  const { setFamilyCode } = useApp();
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("gharlist_item_language");
    return saved === "hi" ? "hi" : "en";
  });
  
  const t = (key) => localTranslations[lang][key] || key;

  const [step, setStep] = useState("welcome");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const toggleLanguage = () => {
    const nextLang = lang === "en" ? "hi" : "en";
    setLang(nextLang);
    localStorage.setItem("gharlist_item_language", nextLang);
  };

  const handleCreateFamily = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const res = await fetch("/api/family/create", {
        method: "POST"
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      if (data.code) {
        setFamilyCode(data.code);
      } else {
        setApiError(t("invalidCode"));
      }
    } catch (err) {
      setApiError(t("errorConnection"));
    } finally {
      setLoading(false);
    }
  };

  const handleJoinFamily = async (e) => {
    e.preventDefault();
    if (code.trim().length !== 6) return;

    setLoading(true);
    setApiError(null);
    try {
      const res = await fetch("/api/family/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim().toUpperCase() })
      });
      const resData = await res.json();
      if (res.ok && resData.success) {
        setFamilyCode(resData.code);
      } else {
        setApiError(resData.error || t("invalidCode"));
      }
    } catch (err) {
      setApiError(t("errorConnection"));
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (e) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setCode(val.slice(0, 6));
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-6 py-12 select-none relative min-h-screen">
      {/* Language Switcher */}
      <button
        onClick={toggleLanguage}
        className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/60 border border-slate-700/60 text-slate-300 rounded-full text-xs font-bold transition-all hover:bg-slate-750 cursor-pointer"
      >
        <Globe className="h-3.5 w-3.5" />
        <span>{lang === "en" ? "हिन्दी" : "English"}</span>
      </button>

      <AnimatePresence mode="wait">
        {step === "welcome" ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            {/* Logo Icon */}
            <div className="w-20 h-20 bg-emerald-500/10 rounded-[32px] flex items-center justify-center mb-6 border border-emerald-500/20">
              <span className="text-3xl font-extrabold text-emerald-500">GL</span>
            </div>

            <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight leading-tight mb-2">
              {t("welcome")}
            </h2>
            <p className="text-base font-semibold text-[var(--muted-text)] max-w-[280px] mb-8 leading-relaxed">
              {t("subtitle")}
            </p>

            <div className="w-full flex flex-col gap-4">
              <Card
                clickable
                onClick={handleCreateFamily}
                className="flex items-center gap-4 text-left border-emerald-500/15 hover:border-emerald-500/30"
              >
                <div className="p-3.5 bg-emerald-500/10 rounded-2xl text-emerald-500">
                  <Plus className="h-6 w-6 stroke-[2.5px]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {loading ? t("generating") : t("createFamily")}
                  </h4>
                  <p className="text-xs text-[var(--muted-text)] mt-0.5">
                    {t("createFamilyDesc")}
                  </p>
                </div>
              </Card>

              <Card
                clickable
                onClick={() => setStep("join")}
                className="flex items-center gap-4 text-left hover:border-gray-300 dark:hover:border-neutral-700"
              >
                <div className="p-3.5 bg-gray-100 dark:bg-neutral-800 rounded-2xl text-gray-655 dark:text-gray-400">
                  <Users className="h-6 w-6 stroke-[2.5px]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {t("joinFamily")}
                  </h4>
                  <p className="text-xs text-[var(--muted-text)] mt-0.5">
                    {t("joinFamilyDesc")}
                  </p>
                </div>
              </Card>
            </div>

            {apiError && (
              <p className="mt-6 text-sm font-bold text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200/30 px-4 py-2.5 rounded-2xl w-full">
                {apiError}
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="join"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col"
          >
            <button
              onClick={() => {
                setStep("welcome");
                setApiError(null);
              }}
              className="self-start flex items-center gap-1.5 text-sm font-bold text-[var(--muted-text)] mb-8 hover:text-gray-900 min-h-[36px] cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("back")}
            </button>

            <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-2">
              {t("enterCode")}
            </h3>
            <p className="text-sm font-semibold text-[var(--muted-text)] mb-6">
              {t("enterCodeDesc")}
            </p>

            <form onSubmit={handleJoinFamily} className="flex flex-col gap-4">
              <div>
                <input
                  type="text"
                  placeholder={t("placeholder")}
                  onChange={handleCodeChange}
                  value={code}
                  className="w-full text-center text-3xl font-black tracking-[0.3em] pl-[0.3em] uppercase py-4 border-2 border-gray-250 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 rounded-2xl focus:outline-none focus:border-emerald-500 transition-all placeholder:tracking-normal placeholder:text-lg placeholder:text-gray-350 min-h-[64px]"
                  autoFocus
                  disabled={loading}
                />
              </div>

              {apiError && (
                <p className="text-sm font-bold text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200/30 px-4 py-2.5 rounded-2xl text-center">
                  {apiError}
                </p>
              )}

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={loading}
                disabled={code.length !== 6 || loading}
                className="mt-4 text-lg py-4"
              >
                <span className="flex items-center justify-center gap-2">
                  {t("submit")}
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
