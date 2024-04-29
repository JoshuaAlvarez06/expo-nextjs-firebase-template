"use client";

/* eslint-disable @typescript-eslint/no-misused-promises */
import type { User } from "@pawrty/db";
import { createContext, useEffect, useState } from "react";
import nookies from "nookies";

import { auth } from "~/lib/firebase";
import { api } from "~/trpc/react";

export const AuthContext = createContext<{
  user: User | null;
  isLoading: boolean;
}>({
  user: null,
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const utils = api.useUtils();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return auth.onIdTokenChanged(async (authUser) => {
      if (!authUser) {
        setUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const token = await authUser.getIdToken();
        await utils.auth.me.invalidate();
        const me = await utils.auth.me.fetch();
        setUser(me);
        nookies.set(undefined, "token", token, { path: "/" });
      }
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(
      async () => {
        const user = auth.currentUser;
        if (user) await user.getIdToken(true);
      },
      10 * 60 * 1000,
    );

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
