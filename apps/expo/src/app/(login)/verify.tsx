import {
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";

import type { VerifySchema } from "@acme/validation";
import { verifySchema } from "@acme/validation";

import Logo from "~/assets/icons/logo.svg";
import { Form, HeaderBackButton, SubmitButton, TextField } from "~/components";
import { BRAND_HEX } from "~/constants";
import { useAuth } from "~/hooks";

export default function Verify() {
  const router = useRouter();
  const { confirmationId, phoneNumber } = useLocalSearchParams<{
    confirmationId: string;
    phoneNumber: string;
  }>();
  const { verifyCode, signInWithPhoneNumber, isSigningIn } = useAuth();

  const onVerify = async ({ code }: VerifySchema) =>
    await verifyCode({ confirmationId, code });

  const onResend = async () =>
    await signInWithPhoneNumber({ phoneNumber, forceResend: true });

  return (
    <SafeAreaView className="bg-background">
      {/* Changes page title visible on the header */}
      <Stack.Screen
        options={{
          headerLeft: () => (
            <HeaderBackButton onPress={() => router.push("/(login)/login")} />
          ),
        }}
      />
      <KeyboardAvoidingView behavior="padding">
        <ScrollView
          contentContainerClassName="flex h-full w-full items-center p-4 gap-5"
          keyboardShouldPersistTaps="never"
          scrollEnabled={false}
        >
          <View className="flex w-full flex-row items-center justify-center ">
            <Logo width={120} height={120} stroke={BRAND_HEX} />
          </View>

          <View>
            <Text className="text-center text-3xl font-semibold text-foreground">
              Verify phone number
            </Text>
          </View>

          <Formik
            initialValues={INITIAL_FORM}
            validationSchema={toFormikValidationSchema(verifySchema)}
            onSubmit={onVerify}
          >
            {(formik) => (
              <Form>
                <TextField
                  label="Verification Code"
                  name="code"
                  placeholder="000000"
                  keyboardType="phone-pad"
                  maxLength={6}
                  autoComplete="sms-otp"
                  onChangeText={(value) => {
                    const numOnly = value.replace(/\D/g, "");
                    void formik.setFieldValue("code", numOnly);
                  }}
                />
                <SubmitButton formik={formik} text="Continue" rounded />
                <View className="mx-auto my-4 h-px w-[80%] bg-accent" />
                <Pressable
                  disabled={formik.isSubmitting || isSigningIn}
                  onPress={onResend}
                  className="flex-row items-center justify-center gap-1"
                >
                  <Text className="text-center text-primary underline">
                    Resend code
                  </Text>
                </Pressable>
              </Form>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const INITIAL_FORM: VerifySchema = {
  code: "",
};
