import React from "react";
import { View } from "react-native";

import Logo from "~/assets/icons/logo.svg";

export const SplashScreen = () => {
  return (
    <View className="h-full w-full items-center justify-center bg-[#333333]">
      <Logo width={100} height={100} />
    </View>
  );
};
