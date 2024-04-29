"use client";

import * as React from "react";

import "firebaseui/dist/firebaseui.css";

import dynamic from "next/dynamic";

const Login = dynamic(
  () => import("./_components/login").then((r) => r.Login),
  { ssr: false },
);

export default function LoginPage() {
  return (
    <>
      <Login />
    </>
  );
}
