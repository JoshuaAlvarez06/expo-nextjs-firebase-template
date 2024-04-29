import React from "react";
import { Redirect } from "expo-router";

import { useAuth } from "~/hooks";

const Index = () => {
  const { user } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  return <Redirect href={(user ? "/home/" : "(login)") as any} />;
};

export default Index;
