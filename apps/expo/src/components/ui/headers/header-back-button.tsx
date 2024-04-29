import type { HeaderBackButtonProps } from "@react-navigation/native-stack/src/types";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "nativewind";

import { getBackgroundColor } from "~/utils";

export const HeaderBackButton: React.FC<
  Omit<HeaderBackButtonProps, "canGoBack"> & {
    onPress?: () => void;
    canGoBack?: boolean;
  }
> = ({ canGoBack, label, onPress }) => {
  const router = useRouter();
  const { colorScheme } = useColorScheme();

  if (!canGoBack && !onPress) return null;

  return (
    <TouchableOpacity
      onPress={onPress ?? router.back}
      className="flex items-center gap-2"
    >
      <Ionicons
        name="arrow-back"
        size={34}
        color={getBackgroundColor(colorScheme, true)}
        className="fill-foreground text-foreground"
      />
      {label && <Text className="text-foreground">{label}</Text>}
    </TouchableOpacity>
  );
};
