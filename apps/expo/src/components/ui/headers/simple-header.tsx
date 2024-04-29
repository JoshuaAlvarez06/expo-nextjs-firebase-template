import type { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text, View } from "react-native";
import { useColorScheme } from "nativewind";

import Logo from "~/assets/icons/logo.svg";
import { getBackgroundColor } from "~/utils";

export const SimpleHeader = (props: BottomTabHeaderProps) => {
  const { colorScheme } = useColorScheme();
  const Right = props.options.headerRight;
  return (
    <View className="flex-row items-center justify-between border-b border-accent bg-background p-4">
      <View className="flex flex-row items-center gap-2">
        <Logo
          height={32}
          width={32}
          stroke={getBackgroundColor(colorScheme, true)}
        />
        <Text
          className="flex-[0.75] text-2xl font-bold text-foreground"
          numberOfLines={1}
        >
          {props.options.title}
        </Text>
      </View>
      {Right && <Right />}
    </View>
  );
};
