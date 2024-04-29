"use client";

import { useCallback, useContext } from "react";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";
import { useMutation } from "@tanstack/react-query";

import type { SignInSchema, VerifySchema } from "@pawrty/validation";

import { AuthContext } from "~/providers";
import { showToast } from "~/utils";

export const useAuth = () => {
  const router = useRouter();
  const { user, isInitializing } = useContext(AuthContext);

  const signInWithPhoneNumberFn = useCallback(
    async ({
      phoneNumber,
      forceResend,
    }: {
      phoneNumber: SignInSchema["phoneNumber"];
      forceResend?: boolean;
    }) => {
      if (!phoneNumber) return;
      try {
        const confirmation = await auth().signInWithPhoneNumber(
          phoneNumber,
          forceResend,
        );
        if (confirmation?.verificationId) {
          showToast({
            type: "success",
            title: "Verification code sent",
          });
          router.push({
            pathname: "/(login)/verify",
            params: {
              confirmationId: confirmation.verificationId,
              phoneNumber,
            },
          });
        }
      } catch {
        showToast({
          type: "error",
          title: "Failed to send verification code",
        });
      }
    },
    [router],
  );

  const verifyCodeFn = useCallback(
    async ({
      confirmationId,
      code,
    }: {
      confirmationId: string;
      code: VerifySchema["code"];
    }) => {
      if (!confirmationId || !code) return;
      try {
        const credential = auth.PhoneAuthProvider.credential(
          confirmationId,
          code,
        );
        const response = await auth().signInWithCredential(credential);
        if (response.user) {
          showToast({
            type: "success",
            title: "Successfully verified!",
          });
          router.push("/(tabs)/home");
        }
      } catch (err) {
        showToast({
          type: "error",
          title: "Failed to verify code",
          message: "Please try again.",
        });
      }
    },
    [router],
  );

  const signOutFn = useCallback(async () => {
    await auth().signOut();
  }, []);

  const signInMutation = useMutation({
    mutationFn: signInWithPhoneNumberFn,
  });

  const verifyMutation = useMutation({
    mutationFn: verifyCodeFn,
  });

  const signOutMutation = useMutation({
    mutationFn: signOutFn,
  });

  return {
    user,
    isInitializing,
    signOut: signOutMutation.mutateAsync,
    signInWithPhoneNumber: signInMutation.mutateAsync,
    verifyCode: verifyMutation.mutateAsync,
    isSigningIn: signInMutation.isPending,
    isVerifying: verifyMutation.isPending,
    isSigningOut: signOutMutation.isPending,
  };
};
