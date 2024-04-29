import { SafeAreaView, Text, View } from "react-native";
import { Tabs, useGlobalSearchParams } from "expo-router";

import { api } from "~/utils/api";

export default function Post() {
  const { id } = useGlobalSearchParams();
  const { data } = api.post.byId.useQuery(
    { id: id as string },
    {
      enabled: !!id && typeof id === "string",
    },
  );

  if (!data) return null;

  return (
    <SafeAreaView className="bg-background">
      <Tabs.Screen
        options={{
          title: data?.title || "Post",
        }}
      />
      <View className="h-full w-full p-4">
        <Text className="py-2 text-3xl font-bold text-primary">
          {data.title}
        </Text>
        <Text className="py-4 text-foreground">{data.content}</Text>
      </View>
    </SafeAreaView>
  );
}
