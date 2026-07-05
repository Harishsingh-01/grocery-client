const DB_NAME = "gharlist_db";
const DB_VERSION = 1;

// Check if we are running in the browser
const isBrowser = typeof window !== "undefined" && typeof window.indexedDB !== "undefined";

export function initDb() {
  return new Promise((resolve, reject) => {
    if (!isBrowser) {
      resolve(null);
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error("IndexedDB error:", event);
      reject(event);
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Create stores if they don't exist
      if (!db.objectStoreNames.contains("items")) {
        db.createObjectStore("items", { keyPath: "_id" });
      }
      if (!db.objectStoreNames.contains("lists")) {
        db.createObjectStore("lists", { keyPath: "_id" });
      }
      if (!db.objectStoreNames.contains("categories")) {
        db.createObjectStore("categories", { keyPath: "_id" });
      }
      if (!db.objectStoreNames.contains("favorites")) {
        db.createObjectStore("favorites", { keyPath: "_id" });
      }
      if (!db.objectStoreNames.contains("syncQueue")) {
        db.createObjectStore("syncQueue", { keyPath: "id", autoIncrement: true });
      }
    };
  });
}

export async function getOfflineData(storeName) {
  const db = await initDb();
  if (!db) return [];

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (e) => {
      reject(e);
    };
  });
}

export async function putOfflineData(storeName, value) {
  const db = await initDb();
  if (!db) return;

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.put(value);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (e) => {
      reject(e);
    };
  });
}

export async function deleteOfflineData(storeName, id) {
  const db = await initDb();
  if (!db) return;

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (e) => {
      reject(e);
    };
  });
}

export async function clearOfflineStore(storeName) {
  const db = await initDb();
  if (!db) return;

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.clear();

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (e) => {
      reject(e);
    };
  });
}

// Sync Queue Utilities
export async function getSyncQueue() {
  const db = await initDb();
  if (!db) return [];

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("syncQueue", "readonly");
    const store = transaction.objectStore("syncQueue");
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (e) => {
      reject(e);
    };
  });
}

export async function addToSyncQueue(action, storeName, recordId, data) {
  const db = await initDb();
  if (!db) return;

  const item = {
    action,
    store: storeName,
    recordId,
    data,
    timestamp: Date.now()
  };

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("syncQueue", "readwrite");
    const store = transaction.objectStore("syncQueue");
    const request = store.add(item);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (e) => {
      reject(e);
    };
  });
}

export async function removeFromSyncQueue(id) {
  const db = await initDb();
  if (!db) return;

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("syncQueue", "readwrite");
    const store = transaction.objectStore("syncQueue");
    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (e) => {
      reject(e);
    };
  });
}
