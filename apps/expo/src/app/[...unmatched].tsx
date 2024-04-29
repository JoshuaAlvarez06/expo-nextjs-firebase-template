import { Redirect, Unmatched, useGlobalSearchParams } from "expo-router";

const NotFound = () => {
  const param = useGlobalSearchParams<{ unmatched: string[] }>();

  if (isFirebaseCallback(param.unmatched)) {
    return <Redirect href="/(login)/loading" />;
  }

  return <Unmatched />;
};

export default NotFound;

const isFirebaseCallback = (unmatched: string[] | undefined) => {
  return (
    unmatched?.length === 2 &&
    unmatched[0] === "firebaseauth" &&
    unmatched[1] === "link"
  );
};
