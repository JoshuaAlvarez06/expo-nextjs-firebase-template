import { createContext } from "react";

import type { User } from "@acme/db";

export const AuthContext = createContext<{
  user: User | null;
  isInitializing: boolean;
}>({
  user: null,
  isInitializing: true,
});

export function AuthProvider({
  children,
  user,
  isInitializing,
}: {
  children: React.ReactNode;
  user: User | null;
  isInitializing: boolean;
}) {
  return (
    <AuthContext.Provider value={{ user, isInitializing }}>
      {children}
    </AuthContext.Provider>
  );
}
