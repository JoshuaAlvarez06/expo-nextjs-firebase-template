import { Slot } from "expo-router";

import { getMe, TRPCProvider } from "~/utils/api";

import "../styles.css";

import type { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "react-native";
import auth from "@react-native-firebase/auth";
import { useColorScheme } from "nativewind";

import type { User } from "@acme/db";

import { SplashScreen } from "~/components";
import { AuthProvider } from "~/providers";
import { getBackgroundColor } from "~/utils";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const MIN_SPLASH_SCREEN_DURATION = 750;
const start = Date.now();

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  const [userLoaded, setUserLoaded] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const { colorScheme } = useColorScheme();

  const onAuthStateChanged = useCallback(
    async (fbUser: FirebaseAuthTypes.User | null) => {
      if (fbUser) {
        // use `fetch` because we're outside of tRPC context
        const dbUser = await getMe();
        if (dbUser) setUser(dbUser);
      } else {
        setUser(null);
      }
      setUserLoaded(true);
    },
    [],
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, [onAuthStateChanged]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (userLoaded) {
      const duration = Date.now() - start;
      timeout = setTimeout(
        () => {
          setInitializing(false);
        },
        Math.max(0, MIN_SPLASH_SCREEN_DURATION - duration),
      );
    }

    return () => clearTimeout(timeout);
  }, [userLoaded]);

  if (initializing) return <SplashScreen />;

  return (
    <TRPCProvider>
      <AuthProvider user={user} isInitializing={initializing}>
        <RootLayoutNav />
        <StatusBar backgroundColor={getBackgroundColor(colorScheme)} />
      </AuthProvider>
    </TRPCProvider>
  );
}

function RootLayoutNav() {
  return <Slot />;
}
