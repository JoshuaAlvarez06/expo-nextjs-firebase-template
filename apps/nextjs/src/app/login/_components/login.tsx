"use client";

import * as React from "react";
import { PhoneAuthProvider } from "firebase/auth";
import * as ui from "firebaseui";

import "./login.css";
import "firebaseui/dist/firebaseui.css";

import { auth } from "~/lib/firebase";

export function Login() {
  React.useEffect(() => {
    const initialize = async () => {
      if (typeof window === "undefined") return;
      const uiConfig = {
        signInSuccessUrl: "/",
        signInFlow: "popup",
        signInOptions: [PhoneAuthProvider.PROVIDER_ID],
        // Terms of service url.
        tosUrl: "http://localhost:3000",
        // Privacy policy url.
        privacyPolicyUrl: "http://localhost:3000",
      };

      const uiInstance = new ui.auth.AuthUI(auth);

      uiInstance.start("#firebaseui-auth-container", uiConfig);

      return async () => {
        await uiInstance.delete();
      };
    };
    return void initialize();
  }, []);

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
        <div className="login-box flex flex-col items-center gap-4">
          <h1 className="text-center text-3xl font-bold text-primary">Acme</h1>
          <div id="firebaseui-auth-container" />
        </div>
      </div>
    </>
  );
}
