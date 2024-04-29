import type { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useCallback, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Tabs, useNavigation, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import auth from "@react-native-firebase/auth";
import { StackActions } from "@react-navigation/native";
import { useColorScheme } from "nativewind";

import { SimpleHeader } from "~/components";
import { cn, getBackgroundColor } from "~/utils";

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  const navigation = useNavigation();
  const router = useRouter();

  const { colorScheme } = useColorScheme();

  const onAuthStateChanged = useCallback(
    (fbUser: FirebaseAuthTypes.User | null) => {
      if (!fbUser) {
        if (navigation.canGoBack())
          navigation.dispatch(StackActions.popToTop());
        router.replace("/(login)/");
      }
    },
    [navigation, router],
  );

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, [onAuthStateChanged]);

  const tabBarLabel = useCallback(
    ({
      children,
      color,
      focused,
    }: {
      children: string;
      color: string;
      focused: boolean;
      position: "below-icon" | "beside-icon";
    }) => (
      <View>
        <View>
          <Text
            className={cn("text-sm", focused ? "font-bold" : "font-normal")}
            style={{
              color,
            }}
          >
            {children}
          </Text>
        </View>
      </View>
    ),
    [],
  );

  return (
    <SafeAreaView className="bg-background" style={{ flex: 1 }}>
      <Tabs
        initialRouteName="home/index"
        screenOptions={{
          tabBarActiveTintColor: getBackgroundColor(colorScheme, true),
          tabBarBackground: () => <View className="border-t border-accent" />,
          header: (headerProps) => <SimpleHeader {...headerProps} />,
          tabBarStyle: {
            paddingTop: 20,
            paddingBottom: 15,
            borderTopWidth: 0,
          },
        }}
      >
        <Tabs.Screen
          name="home/index"
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            ),
            tabBarLabel,
          }}
        />

        <Tabs.Screen
          name="post/[id]"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="search/index"
          options={{
            title: "Search",
            tabBarIcon: ({ focused, size, color }) => (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                size={size}
                color={color}
              />
            ),
            tabBarLabel,
          }}
        />

        <Tabs.Screen
          name="favorites/index"
          options={{
            title: "Favorites",
            tabBarIcon: ({ focused, size, color }) => (
              <Ionicons
                name={focused ? "heart-circle" : "heart-circle-outline"}
                size={size}
                color={color}
              />
            ),
            tabBarLabel,
          }}
        />

        <Tabs.Screen
          name="profile/index"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused, size, color }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={size}
                color={color}
              />
            ),
            tabBarLabel,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
