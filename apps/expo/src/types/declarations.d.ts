declare module "*.svg" {
  import type React from "react";
  import type { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "*.ttf" {
  const value: FontSource;
  export default value;
}

declare module "*.jpg" {
  import type { ImageSourcePropType } from "react-native";
  import type { ImageSource } from "expo-image";
  const value: ImageSourcePropType | ImageSource;
  export default value;
}
