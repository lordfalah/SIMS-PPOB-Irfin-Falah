import { useSyncExternalStore } from "react";
import { authTokenStore } from "@/lib/auth-token.store";

export const useAuthToken = () =>
  useSyncExternalStore(authTokenStore.subscribe, authTokenStore.getSnapshot);
