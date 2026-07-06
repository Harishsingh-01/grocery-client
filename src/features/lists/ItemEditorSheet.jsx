import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../../hooks/AppContext";
import { BottomSheet } from "../../components/ui/BottomSheet";
import { Button } from "../../components/ui/Button";
import { Heart, Trash2, Mic, Play, Square, Volume2 } from "lucide-react";
import { defaultUnits, getDefaultUnit, autoDetectCategory } from "../../lib/defaultData";

export const ItemEditorSheet = () => {
  const {
    isEditorOpen,
    setIsEditorOpen,
    selectedItem,
    setSelectedItem,
    addItem,
    updateItem,
    deleteItem,
    categories,
    toggleFavorite,
    favorites,
    fetchRecentItemDetails
  } = useApp();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("piece");
  const [notes, setNotes] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  // New features: Budget & Audio Notes
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [audioNote, setAudioNote] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  // Sync state with selectedItem when opened
  useEffect(() => {
    if (selectedItem) {
      setName(selectedItem.name || "");
      setNotes(selectedItem.notes || "");
      setSubcategory(selectedItem.subcategory || "");
      
      const resolvedCategoryId = selectedItem.categoryId?._id || selectedItem.categoryId || "";
      setCategoryId(resolvedCategoryId);

      // Check if it's already a favorite template
      const isFav = favorites.some(
        (fav) => fav.name.toLowerCase().trim() === (selectedItem.name || "").toLowerCase().trim()
      ) || !!selectedItem.isFavorite;
      setIsFavorite(isFav);

      if (selectedItem._id) {
        // Editing existing item
        setQuantity(selectedItem.quantity || 1);
        setUnit(selectedItem.unit || "piece");
        setEstimatedCost(selectedItem.estimatedCost || 0);
      } else {
        // Adding a new item - use smart memory and auto category if not provided
        const itemName = selectedItem.name || "";
        
        if (!resolvedCategoryId) {
          const autoCat = autoDetectCategory(itemName, categories);
          if (autoCat) setCategoryId(autoCat);
        }

        const defaultUnit = getDefaultUnit(itemName);
        setQuantity(selectedItem.quantity || 1);
        setUnit(defaultUnit);
        setEstimatedCost(selectedItem.estimatedCost || 0);

        // Fetch recent details asynchronously to prefill if user hasn't explicitly set them
        if (itemName) {
          fetchRecentItemDetails(itemName).then(recent => {
            if (recent && recent.found && !selectedItem.quantity) {
              setQuantity(recent.quantity);
              setUnit(recent.unit);
              if (recent.categoryId) setCategoryId(recent.categoryId);
              if (recent.estimatedCost) setEstimatedCost(recent.estimatedCost);
            }
          });
        }
      }

      // Sync budget & audio note states
      setAudioNote(selectedItem.audioNote || "");
      setIsRecording(false);
      setRecordingSeconds(0);
    }
  }, [selectedItem, favorites, categories, fetchRecentItemDetails]);

  if (!selectedItem) return null;

  const isEditing = !!selectedItem._id;

  const handleQuantityChange = (val) => {
    if (val < 0.1) return;
    setQuantity(Math.round(val * 100) / 100);
  };

  const handleSave = async () => {
    if (!name.trim()) return;

    let targetCatId = categoryId;
    if (!targetCatId && categories.length > 0) {
      targetCatId = categories[0]._id;
    }

    const payload = {
      categoryId: targetCatId,
      subcategory,
      name: name.trim(),
      quantity,
      unit,
      notes: notes.trim(),
      isFavorite,
      estimatedCost,
      audioNote
    };

    if (isEditing) {
      await updateItem(selectedItem._id, payload);
    } else {
      await addItem(payload);
    }

    handleClose();
  };

  const handleDelete = () => {
    if (isEditing) {
      deleteItem(selectedItem._id);
    }
    handleClose();
  };

  const handleClose = () => {
    // If active recording exists, stop it
    if (isRecording) {
      stopRecording();
    }
    setIsEditorOpen(false);
    setSelectedItem(null);
  };

  // Audio recording helpers using standard MediaRecorder API
  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Microphone recording is not supported in this browser.");
      return;
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        
        // Convert audio Blob into clean base64 data string URL
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          setAudioNote(reader.result);
        };

        // Stop microhphone streams to release media hardware
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
      setRecordingSeconds(5);

      let timeLeft = 5;
      timerRef.current = setInterval(() => {
        timeLeft -= 1;
        setRecordingSeconds(timeLeft);
        if (timeLeft <= 0) {
          stopRecording();
        }
      }, 1000);

    } catch (err) {
      console.error("Microphone access error:", err);
      alert("Please allow microphone access to record voice instructions!");
    }
  };

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const deleteAudioNote = () => {
    setAudioNote("");
  };

  const playAudioNote = () => {
    if (!audioNote) return;
    const audio = new Audio(audioNote);
    audio.play().catch(e => console.error("Audio playback failed:", e));
  };

  // Context-aware quick quantity selector pills
  const renderQuickPills = () => {
    const isWeight = unit === "kg" || unit === "gram";
    const isVolume = unit === "litre" || unit === "ml";

    if (isWeight) {
      const pills = [
        { label: "250 g", q: 250, u: "gram" },
        { label: "500 g", q: 500, u: "gram" },
        { label: "1 kg", q: 1, u: "kg" },
        { label: "2 kg", q: 2, u: "kg" },
        { label: "5 kg", q: 5, u: "kg" }
      ];
      return (
        <div className="flex flex-wrap gap-2.5 mt-2">
          {pills.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setQuantity(p.q);
                setUnit(p.u);
              }}
              className={`px-3 py-2 text-sm font-bold border rounded-xl transition-all cursor-pointer ${
                quantity === p.q && unit === p.u
                  ? "border-emerald-500 bg-emerald-950/20 text-emerald-450"
                  : "border-slate-700 text-slate-300 bg-slate-900 hover:bg-slate-800"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      );
    }

    if (isVolume) {
      const pills = [
        { label: "250 ml", q: 250, u: "ml" },
        { label: "500 ml", q: 500, u: "ml" },
        { label: "1 L", q: 1, u: "litre" },
        { label: "2 L", q: 2, u: "litre" },
        { label: "5 L", q: 5, u: "litre" }
      ];
      return (
        <div className="flex flex-wrap gap-2.5 mt-2">
          {pills.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setQuantity(p.q);
                setUnit(p.u);
              }}
              className={`px-3 py-2 text-sm font-bold border rounded-xl transition-all cursor-pointer ${
                quantity === p.q && unit === p.u
                  ? "border-emerald-500 bg-emerald-950/20 text-emerald-455"
                  : "border-slate-700 text-slate-300 bg-slate-900 hover:bg-slate-800"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      );
    }

    const pills = [1, 2, 3, 5, 6, 12];
    return (
      <div className="flex flex-wrap gap-2.5 mt-2">
        {pills.map((p) => (
          <button
            key={p}
            onClick={() => setQuantity(p)}
            className={`px-4 py-2 text-sm font-bold border rounded-xl transition-all cursor-pointer ${
              quantity === p
                ? "border-emerald-500 bg-emerald-950/20 text-emerald-455"
                : "border-slate-700 text-slate-300 bg-slate-900 hover:bg-slate-800"
            }`}
          >
            {p} {unit}
          </button>
        ))}
      </div>
    );
  };

  const handleToggleFavorite = () => {
    if (categories.length > 0) {
      let catId = categoryId;
      if (!catId) {
        const matchedCat = categories.find((c) => c._id === selectedItem.categoryId?._id || c._id === selectedItem.categoryId);
        catId = matchedCat?._id || categories[0]._id;
      }
      toggleFavorite(name, catId);
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <BottomSheet isOpen={isEditorOpen} onClose={handleClose} title={isEditing ? "Edit Item" : "Add Item"}>
      <div className="flex flex-col gap-6 select-none pb-6 text-slate-100">
        
        {/* Name Header and Favorite Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-100 leading-tight">
              {name}
            </h2>
          </div>
          <button
            onClick={handleToggleFavorite}
            className={`p-3 border rounded-2xl transition-all cursor-pointer ${
              isFavorite
                ? "border-rose-500 bg-rose-955/20 text-rose-500"
                : "border-slate-700 text-slate-400 bg-slate-900 hover:bg-slate-800"
            }`}
          >
            <Heart className={`h-6 w-6 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Quantity Picker & Manual entry */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-extrabold text-slate-350 uppercase tracking-wider">
            Quantity
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="w-14 h-14 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-2xl flex items-center justify-center font-black text-2xl text-slate-100 transition-colors cursor-pointer select-none active:scale-90"
            >
              -
            </button>
            <input
              type="number"
              value={quantity === 0 ? "" : quantity}
              onChange={(e) => handleQuantityChange(parseFloat(e.target.value) || 0)}
              className="flex-1 text-center font-black text-3xl py-2 bg-slate-900 text-slate-100 border border-slate-700 rounded-2xl focus:outline-none focus:border-emerald-500 min-h-[56px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="0"
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="w-14 h-14 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-2xl flex items-center justify-center font-black text-2xl text-slate-100 transition-colors cursor-pointer select-none active:scale-90"
            >
              +
            </button>
          </div>
          
          {/* Quick pills */}
          {renderQuickPills()}
        </div>

        {/* Unit Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-extrabold text-slate-350 uppercase tracking-wider">
            Unit
          </label>
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {defaultUnits.map((u) => {
              const isActive = unit === u;
              return (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                    isActive
                      ? "border-emerald-500 bg-emerald-950/20 text-emerald-455"
                      : "border-slate-700 text-slate-300 bg-slate-900 hover:bg-slate-800"
                  }`}
                >
                  {u}
                </button>
              );
            })}
          </div>
        </div>

        {/* Estimated Price Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-extrabold text-slate-350 uppercase tracking-wider">
            Estimated Price (₹)
          </label>
          <input
            type="number"
            placeholder="e.g. 50"
            value={estimatedCost === 0 ? "" : estimatedCost}
            onChange={(e) => setEstimatedCost(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-3.5 bg-slate-900 border border-slate-700 rounded-2xl text-base text-slate-100 focus:outline-none focus:border-emerald-500 min-h-[48px] placeholder:text-slate-505"
          />
        </div>

        {/* Voice Note Instruction */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-extrabold text-slate-350 uppercase tracking-wider">
            Voice Instruction Note
          </label>
          <div className="flex items-center gap-3">
            {!audioNote ? (
              <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 border rounded-2xl font-bold transition-all cursor-pointer ${
                  isRecording
                    ? "bg-rose-500/10 border-rose-500 text-rose-500 animate-pulse"
                    : "bg-slate-900 border-slate-700 hover:bg-slate-850 text-slate-200"
                }`}
              >
                {isRecording ? (
                  <>
                    <Square className="h-5 w-5 fill-current" />
                    <span>Stop ({recordingSeconds}s)</span>
                  </>
                ) : (
                  <>
                    <Mic className="h-5 w-5 stroke-[2px]" />
                    <span>Record Voice Note (Max 5s)</span>
                  </>
                )}
              </button>
            ) : (
              <div className="flex-1 flex items-center justify-between bg-slate-900 border border-slate-700 rounded-2xl p-3 min-h-[52px]">
                <button
                  type="button"
                  onClick={playAudioNote}
                  className="flex items-center gap-2 px-3 py-2 bg-emerald-950/20 border border-emerald-500/20 text-emerald-450 font-bold rounded-xl text-xs hover:bg-emerald-950/30 cursor-pointer active:scale-95"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>Play Instruction</span>
                </button>
                <button
                  type="button"
                  onClick={deleteAudioNote}
                  className="text-xs font-bold text-red-500 hover:text-red-400 hover:underline px-3 cursor-pointer bg-transparent border-none"
                >
                  Delete Voice
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Notes (Optional) */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-extrabold text-slate-350 uppercase tracking-wider">
            Notes
          </label>
          <input
            type="text"
            placeholder="Add special instruction (e.g. Ripen, brand)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-3.5 bg-slate-900 border border-slate-700 rounded-2xl text-base text-slate-100 focus:outline-none focus:border-emerald-500 min-h-[48px] placeholder:text-slate-500"
          />
        </div>

        {/* Buttons Footer */}
        <div className="flex gap-3 mt-4">
          {isEditing && (
            <Button
              variant="outline"
              onClick={handleDelete}
              className="border-red-900/40 text-red-500 hover:bg-red-955/20 min-h-[48px] px-4"
              title="Delete Item"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          )}
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} className="flex-1">
            Save
          </Button>
        </div>

      </div>
    </BottomSheet>
  );
};
