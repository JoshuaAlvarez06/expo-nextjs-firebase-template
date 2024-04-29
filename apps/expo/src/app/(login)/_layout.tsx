import { useEffect } from "react";
import { Stack, useNavigation, useRouter } from "expo-router";
import { StackActions } from "@react-navigation/native";
import { useColorScheme } from "nativewind";

import { HeaderBackButton } from "~/components";
import { useAuth } from "~/hooks";
import { getBackgroundColor } from "~/utils";

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  const navigation = useNavigation();
  const router = useRouter();

  const { colorScheme } = useColorScheme();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      if (navigation.canGoBack()) navigation.dispatch(StackActions.popToTop());
      router.replace("/(tabs)/home");
    }
  }, [navigation, router, user]);

  return (
    <Stack
      initialRouteName="login"
      screenOptions={{
        headerStyle: {
          backgroundColor: getBackgroundColor(colorScheme),
        },
        headerShadowVisible: false,
        headerTitle: "",
        headerLeft: HeaderBackButton,
      }}
    />
  );
}
