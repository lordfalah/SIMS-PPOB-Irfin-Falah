export const TOKEN_KEY = "auth_token";

/* ================= SNAPSHOT ================= */
const getSnapshot = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/* ================= SUBSCRIBE ================= */
const subscribe = (listener: () => void) => {
  const onStorage = (e: StorageEvent) => {
    if (e.key === TOKEN_KEY) {
      listener();
    }
  };

  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener("storage", onStorage);
  };
};

/* ================= STORE ================= */
export const authTokenStore = {
  getSnapshot,
  subscribe,
};

/* ================= ACTIONS ================= */
export const setAuthToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(
    new StorageEvent("storage", {
      key: TOKEN_KEY,
      newValue: token,
    }),
  );
};

export const clearAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(
    new StorageEvent("storage", {
      key: TOKEN_KEY,
      newValue: null,
    }),
  );
};

// penggunaan
// const token = useSyncExternalStore(
//   authTokenStore.subscribe,
//   authTokenStore.getSnapshot,
// );
