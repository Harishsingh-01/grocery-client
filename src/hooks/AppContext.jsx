import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [familyCode, setFamilyCodeState] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [fontSize, setFontSizeState] = useState("md");
  const [isLoading, setIsLoading] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Connection state
  const [connectionStatus, setConnectionStatus] = useState("synced");

  // Lists & configs states
  const [lists, setLists] = useState([]);
  const [activeListId, setActiveListId] = useState(null);
  const [activeListType, setActiveListType] = useState("today");
  
  const [movePurchasedToBottom, setMovePurchasedToBottomState] = useState(true);
  const [shoppingMode, setShoppingModeState] = useState(false);
  const [autoSync, setAutoSyncState] = useState(true);

  // Active items states
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [favorites, setFavorites] = useState([]);
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [snackbar, setSnackbar] = useState(null);

  const applyFontSize = useCallback((size) => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    html.classList.remove("text-size-sm", "text-size-md", "text-size-lg");
    html.classList.add(`text-size-${size}`);
  }, []);

  // Initial Load & Listeners
  useEffect(() => {
    const savedCode = localStorage.getItem("gharlist_family_code");
    const savedFontSize = localStorage.getItem("gharlist_font_size");
    const savedBottomMove = localStorage.getItem("gharlist_move_bottom") !== "false";

    setMovePurchasedToBottomState(savedBottomMove);

    if (savedCode) {
      setFamilyCodeState(savedCode);
    }
    if (savedFontSize && ["sm", "md", "lg"].includes(savedFontSize)) {
      setFontSizeState(savedFontSize);
      applyFontSize(savedFontSize);
    } else {
      applyFontSize("md");
    }

    setIsLoading(false);
    document.documentElement.classList.remove("dark");

    setConnectionStatus(navigator.onLine ? "synced" : "offline");

    const handleOnline = () => setConnectionStatus("synced");
    const handleOffline = () => setConnectionStatus("offline");

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const handleInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleInstallPrompt);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
    };
  }, [applyFontSize]);

  const setFamilyCode = useCallback((code) => {
    setFamilyCodeState(code);
    if (code) {
      localStorage.setItem("gharlist_family_code", code);
    } else {
      localStorage.removeItem("gharlist_family_code");
      setItems([]);
      setLists([]);
      setCategories([]);
      setFavorites([]);
    }
  }, []);

  const setFontSize = useCallback((size) => {
    setFontSizeState(size);
    localStorage.setItem("gharlist_font_size", size);
    applyFontSize(size);
  }, [applyFontSize]);

  const setMovePurchasedToBottom = useCallback((val) => {
    setMovePurchasedToBottomState(val);
    localStorage.setItem("gharlist_move_bottom", val ? "true" : "false");
  }, []);

  const setAutoSync = useCallback((val) => {
    setAutoSyncState(val);
  }, []);

  const setShoppingMode = useCallback((val) => {
    setShoppingModeState(val);
  }, []);

  const installApp = useCallback(() => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => setDeferredPrompt(null));
    }
  }, [deferredPrompt]);

  // REST API operations for Direct MongoDB Synchronization
  const fetchLists = useCallback(async () => {
    if (!familyCode) return;
    try {
      const res = await fetch(`/api/lists?familyCode=${familyCode}`);
      if (res.ok) {
        const data = await res.json();
        setLists(data.lists || []);
      }
    } catch (err) {
      console.error("Fetch lists API error:", err);
    }
  }, [familyCode]);

  const fetchCategories = useCallback(async () => {
    if (!familyCode) return;
    try {
      const res = await fetch(`/api/categories?familyCode=${familyCode}`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error("Fetch categories API error:", err);
    }
  }, [familyCode]);

  const fetchItems = useCallback(async (listId = activeListId) => {
    if (!familyCode) return;
    const targetListId = listId || activeListId;
    if (!targetListId) {
      setItems([]);
      return;
    }
    try {
      let listType = activeListType;
      const activeList = lists.find((l) => l._id === targetListId);
      if (activeList) listType = activeList.type;

      const res = await fetch(`/api/items?familyCode=${familyCode}&listType=${listType}&listId=${targetListId}`);
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
        
        // Auto-align mismatched client-side tempId with true database ID
        if (data.listId && data.listId !== targetListId) {
          setActiveListId(data.listId);
        }
      }
    } catch (err) {
      console.error("Fetch items API error:", err);
    }
  }, [familyCode, activeListId, activeListType, lists]);

  const fetchFavorites = useCallback(async () => {
    if (!familyCode) return;
    try {
      const res = await fetch(`/api/favorites?familyCode=${familyCode}`);
      if (res.ok) {
        const data = await res.json();
        setFavorites(data.favorites || []);
      }
    } catch (err) {
      console.error("Fetch favorites API error:", err);
    }
  }, [familyCode]);

  // Mocked for backwards component compatibility
  const syncOfflineChanges = useCallback(async () => {
    setConnectionStatus("synced");
  }, []);

  useEffect(() => {
    if (familyCode) {
      fetchLists();
      fetchCategories();
      fetchFavorites();
    }
  }, [familyCode, fetchLists, fetchCategories, fetchFavorites]);

  useEffect(() => {
    if (familyCode && activeListId) {
      fetchItems(activeListId);
    }
  }, [activeListId, familyCode, fetchItems]);

  // Silently sync polling logic every 5 seconds (updates state in-place without visual flashes)
  const fetchListsRef = useRef(fetchLists);
  const fetchItemsRef = useRef(fetchItems);

  useEffect(() => {
    fetchListsRef.current = fetchLists;
    fetchItemsRef.current = fetchItems;
  }, [fetchLists, fetchItems]);

  useEffect(() => {
    if (!familyCode) return;

    const pollInterval = setInterval(() => {
      if (
        navigator.onLine &&
        document.visibilityState === "visible"
      ) {
        fetchListsRef.current();
        if (activeListId) {
          fetchItemsRef.current(activeListId);
        }
      }
    }, 5000);

    return () => clearInterval(pollInterval);
  }, [familyCode, activeListId]);

  // Handle activeListId selection automatically when listType changes
  useEffect(() => {
    if (lists.length > 0) {
      const matched = lists.find((l) => l.type === activeListType);
      if (matched) {
        setActiveListId(matched._id);
      } else {
        const listNamesMap = {
          today: "Today's Shopping",
          weekly: "Weekly List",
          monthly: "Monthly Grocery",
          custom: "Custom List"
        };
        const autoCreate = async () => {
          try {
            const res = await fetch("/api/lists", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                familyCode,
                name: listNamesMap[activeListType] || "Shopping List",
                type: activeListType
              })
            });
            if (res.ok) {
              const data = await res.json();
              setLists((prev) => [...prev, data.list]);
              setActiveListId(data.list._id);
            }
          } catch (err) {
            console.error("Auto create list error:", err);
          }
        };
        autoCreate();
      }
    }
  }, [activeListType, lists, familyCode]);

  const createCustomList = useCallback(async (name) => {
    if (!familyCode) return null;
    try {
      const res = await fetch("/api/lists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ familyCode, name })
      });
      if (res.ok) {
        const data = await res.json();
        const newList = data.list;
        setLists((prev) => [...prev, newList]);
        setActiveListId(newList._id);
        setActiveListType("custom");
        return newList._id;
      }
    } catch (err) {
      console.error("Create custom list error:", err);
    }
    return null;
  }, [familyCode]);

  const deleteCustomList = useCallback(async (listId) => {
    if (!familyCode) return;
    try {
      const res = await fetch("/api/lists", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ familyCode, listId })
      });
      if (res.ok) {
        setLists((prev) => prev.filter((l) => l._id !== listId));
        setItems((prev) => prev.filter((i) => i.listId !== listId));
      }
    } catch (err) {
      console.error("Delete custom list error:", err);
    }
  }, [familyCode]);

  const addItem = useCallback(async (data) => {
    if (!familyCode || !activeListId) return { success: false, error: "No active list selected" };

    const normalizedName = data.name.toLowerCase().trim();
    if (!data.forceAdd) {
      const duplicate = items.find(
        (item) => item.name.toLowerCase().trim() === normalizedName
      );
      if (duplicate) {
        return { success: false, conflict: true, existingItem: duplicate };
      }
    }

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          familyCode,
          listId: activeListId,
          listType: activeListType,
          categoryId: data.categoryId,
          subcategory: data.subcategory || "",
          name: data.name.trim(),
          quantity: data.quantity,
          unit: data.unit,
          notes: data.notes || "",
          forceAdd: data.forceAdd || false
        })
      });

      if (res.ok) {
        const resData = await res.json();
        if (resData.conflict) {
          return { success: false, conflict: true, existingItem: resData.existingItem };
        }

        const newItem = resData.item;
        const categoryDetails = categories.find((c) => c._id === newItem.categoryId);
        newItem.categoryId = categoryDetails || newItem.categoryId;
        
        setItems((prev) => [...prev, newItem]);
        return { success: true };
      }
    } catch (err) {
      console.error("Add item error:", err);
    }
    return { success: false, error: "Failed to add item" };
  }, [familyCode, activeListId, items, activeListType, categories]);

  const updateItem = useCallback(async (itemId, fields) => {
    if (!familyCode) return;
    try {
      const res = await fetch("/api/items", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ familyCode, itemId, ...fields })
      });
      if (res.ok) {
        setItems((prev) =>
          prev.map((item) => (item._id === itemId ? { ...item, ...fields } : item))
        );
      }
    } catch (err) {
      console.error("Update item error:", err);
    }
  }, [familyCode]);

  const deleteItem = useCallback(async (itemId) => {
    if (!familyCode) return;
    try {
      const res = await fetch("/api/items", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ familyCode, itemId })
      });
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item._id !== itemId));
      }
    } catch (err) {
      console.error("Delete item error:", err);
    }
  }, [familyCode]);

  const toggleFavorite = useCallback(async (name, categoryId) => {
    if (!familyCode) return;
    const normalizedName = name.trim();
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ familyCode, name: normalizedName, categoryId })
      });
      if (res.ok) {
        const resData = await res.json();
        const isFav = resData.isFavorite;
        
        if (isFav) {
          const resolvedCat = categories.find((c) => c._id === categoryId) || categories[0];
          const newFav = resData.favorite || {
            _id: Math.random().toString(36).substring(2),
            name: normalizedName,
            categoryId: resolvedCat
          };
          setFavorites((prev) => [...prev, newFav]);
        } else {
          setFavorites((prev) => prev.filter((f) => f.name.toLowerCase().trim() !== normalizedName.toLowerCase()));
        }

        setItems((prev) =>
          prev.map((item) =>
            item.name.toLowerCase().trim() === normalizedName.toLowerCase()
              ? { ...item, isFavorite: isFav }
              : item
          )
        );
      }
    } catch (err) {
      console.error("Toggle favorite error:", err);
    }
  }, [familyCode, categories]);

  return (
    <AppContext.Provider
      value={{
        familyCode,
        setFamilyCode,
        activeTab,
        setActiveTab,
        fontSize,
        setFontSize,
        isLoading,
        deferredPrompt,
        installApp,
        
        connectionStatus,
        syncOfflineChanges,
        
        lists,
        activeListId,
        setActiveListId,
        activeListType,
        setActiveListType,
        createCustomList,
        deleteCustomList,
        
        movePurchasedToBottom,
        setMovePurchasedToBottom,
        shoppingMode,
        setShoppingMode,
        autoSync,
        setAutoSync,
        
        items,
        categories,
        favorites,
        selectedItem,
        setSelectedItem,
        isEditorOpen,
        setIsEditorOpen,
        snackbar,
        setSnackbar,
        
        fetchLists,
        fetchCategories,
        fetchItems,
        fetchFavorites,
        addItem,
        updateItem,
        deleteItem,
        toggleFavorite
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
