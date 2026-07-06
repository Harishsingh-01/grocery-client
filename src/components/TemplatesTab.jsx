import React, { useState, useEffect } from "react";
import { useApp } from "../hooks/AppContext";
import { Play, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const TemplatesTab = () => {
  const { familyCode, applyTemplate } = useApp();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  
  useEffect(() => {
    fetchTemplates();
  }, [familyCode]);
  
  const fetchTemplates = async () => {
    if (!familyCode) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/lists/templates?familyCode=${familyCode}`);
      if (res.ok) {
        const data = await res.json();
        setTemplates(data.templates || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (templateId) => {
    const confirm = window.confirm("Apply this template to your current active list?");
    if (confirm) {
      await applyTemplate(templateId);
    }
  };

  const handleDelete = async (templateId) => {
    const confirm = window.confirm("Are you sure you want to delete this template?");
    if (!confirm) return;
    
    setDeletingId(templateId);
    try {
      const res = await fetch(`/api/lists`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ familyCode, listId: templateId })
      });
      if (res.ok) {
        setTemplates((prev) => prev.filter(t => t._id !== templateId));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-black text-slate-100 px-1">
        Smart List Templates
      </h2>

      {loading ? (
        <div className="text-center py-10 text-sm font-semibold text-slate-500">
          Loading templates...
        </div>
      ) : templates.length === 0 ? (
        <div className="text-center py-12 text-sm font-semibold text-slate-500 bg-slate-800/40 border border-slate-700/60 rounded-3xl p-5">
          No templates saved yet. Go to "My List" and click "Save as Template".
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {templates.map((template) => (
              <motion.div
                key={template._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-3xl flex justify-between items-center shadow-sm"
              >
                <div>
                  <h4 className="text-base font-extrabold text-slate-100">{template.name}</h4>
                  <p className="text-xs font-semibold text-slate-400 mt-1">
                    Saved on {new Date(template.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApply(template._id)}
                    className="p-2.5 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-xl cursor-pointer transition-colors active:scale-95 border-none"
                    title="Load Template"
                  >
                    <Play className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(template._id)}
                    disabled={deletingId === template._id}
                    className="p-2.5 bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 rounded-xl cursor-pointer transition-colors active:scale-95 border-none disabled:opacity-50"
                    title="Delete Template"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
