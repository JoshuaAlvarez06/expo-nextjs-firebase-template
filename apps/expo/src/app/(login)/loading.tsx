import React, { useCallback } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";

import { getBackgroundColor } from "~/utils";

const Loading = () => {
  const { colorScheme } = useColorScheme();
  const router = useRouter();

  // prevent being stuck on loading screen
  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        router.replace("/(login)/login");
      }, 10_000);

      return () => clearTimeout(timeout);
    }, [router]),
  );

  return (
    <SafeAreaView className="h-full w-full flex-1 items-center justify-center bg-background">
      <ActivityIndicator
        color={getBackgroundColor(colorScheme, true)}
        className="h-16 w-16"
      />
    </SafeAreaView>
  );
};

export default Loading;
