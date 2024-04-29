import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Link, Stack } from "expo-router";

import Logo from "~/assets/icons/logo.svg";
import BackgroundImage from "~/assets/images/landing.jpg";
import { BLURHASH } from "~/constants";

const Landing = () => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }} className="h-full w-full bg-background">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-background">
        <Image
          source={BackgroundImage}
          contentFit="cover"
          placeholder={BLURHASH}
          style={{
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
          }}
          transition={500}
        />
        <View className="absolute h-full w-full bg-black/55" />
      </View>

      <View
        style={{
          marginTop: top,
          marginBottom: bottom,
          height: Dimensions.get("window").height - top - bottom,
        }}
        className="h-full px-4 py-10"
      >
        <View className="h-full items-center justify-between">
          <View className="flex items-center justify-center gap-4 drop-shadow-2xl">
            <Logo width={100} height={100} />
            <Text className="text-6xl font-bold text-white">PAWRTY</Text>
          </View>
          <Link href="/(login)/login" asChild>
            <TouchableOpacity className="w-full rounded-lg bg-primary py-4 shadow-xl">
              <Text className="text-center text-xl font-extrabold text-white">
                Get Started
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default Landing;
