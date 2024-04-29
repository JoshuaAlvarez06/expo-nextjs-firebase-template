import type { PropsWithChildren } from "react";
import { Text, View } from "react-native";

export interface FieldBaseProps {
  label: string;
}

export const FieldBase: React.FC<PropsWithChildren<FieldBaseProps>> = ({
  label,
  children,
}) => {
  return (
    <View className="flex flex-col">
      <Text className="mb-2 text-foreground">{label}</Text>
      {children}
    </View>
  );
};
