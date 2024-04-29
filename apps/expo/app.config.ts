import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Acme",
  slug: "acme",
  scheme: "acme",
  version: "0.1.0",
  orientation: "portrait",
  icon: "./src/assets/icons/logo-black.png",
  userInterfaceStyle: "automatic",
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    googleServicesFile: "./GoogleService-Info.plist",
    bundleIdentifier: "app.acme.solydapp",
    supportsTablet: true,
  },
  android: {
    googleServicesFile: "./google-services.json",
    package: "app.acme.solydapp",
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/splashscreen.png",
      backgroundColor: "#1F104A",
    },
  },
  // extra: {
  //   eas: {
  //     projectId: "your-eas-project-id",
  //   },
  // },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: [
    "expo-router",
    "@react-native-firebase/app",
    "@react-native-firebase/auth",
    "@react-native-firebase/crashlytics",
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
        },
      },
    ],
  ],
});
