import type { PropsWithChildren } from "react";
import React from "react";
import { View } from "react-native";

import { cn } from "~/utils";

interface FormProps {
  className?: string;
}

export const Form: React.FC<PropsWithChildren<FormProps>> = ({
  children,
  className,
}) => {
  return (
    <View className={cn("flex w-full flex-col gap-4", className)}>
      {children}
    </View>
  );
};
