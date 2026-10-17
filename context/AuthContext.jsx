
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import { auth } from "@/lib/firebase";
import {
  onAuthStateChanged,
  signOut,
  reload,
} from "firebase/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = useCallback(() => {
    return signOut(auth);
  }, []);

  const refreshUser = useCallback(async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setUser(null);
      return null;
    }

    await reload(currentUser);

    // Read the refreshed user from Firebase Auth.
    const refreshedUser = auth.currentUser;

    setUser(refreshedUser);

    return refreshedUser;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
