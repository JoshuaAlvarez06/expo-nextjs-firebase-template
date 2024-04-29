import { BRAND_HEX, DARK_BACKGROUND, LIGHT_BACKGROUND } from "~/constants";

export const getBackgroundColor = (
  colorScheme: "light" | "dark" | undefined,
  opposite?: boolean,
) => {
  let scheme = colorScheme;
  if (opposite) {
    scheme = colorScheme === "dark" ? "light" : "dark";
  }
  switch (scheme) {
    case "dark":
      return DARK_BACKGROUND;
    case "light":
    default:
      return LIGHT_BACKGROUND;
  }
};

export const getColors = (colorScheme: "light" | "dark" | undefined) => {
  return {
    background: getBackgroundColor(colorScheme),
    primary: BRAND_HEX,
  };
};
