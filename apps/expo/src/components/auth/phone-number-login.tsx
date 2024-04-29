import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";

import type { SignInSchema } from "@pawrty/validation";
import { signInSchema } from "@pawrty/validation";

import Logo from "~/assets/icons/logo.svg";
import { BRAND_HEX } from "~/constants";
import { useAuth } from "~/hooks";
import { Form, SubmitButton, TextField } from "../ui";

export const PhoneNumberLoginScreen: React.FC = () => {
  const { signInWithPhoneNumber } = useAuth();

  const onLogin = async ({ countryCode, phoneNumber }: SignInSchema) =>
    await signInWithPhoneNumber({
      phoneNumber: `${countryCode}${phoneNumber}`,
    });

  return (
    <SafeAreaView className="bg-background">
      <KeyboardAvoidingView behavior="padding">
        <ScrollView
          contentContainerClassName="flex h-full w-full items-center p-4 gap-6"
          keyboardShouldPersistTaps="never"
          scrollEnabled={false}
        >
          <View className="flex w-full flex-row items-center justify-center">
            <Logo width={120} height={120} stroke={BRAND_HEX} />
          </View>

          <View className="w-full gap-2">
            <Text className="text-left text-[2.7rem] font-bold text-foreground">
              Welcome to Pawrty!
            </Text>
            <Text className="text-left text-lg font-semibold text-foreground opacity-80">
              Enter your phone number to log in or sign up
            </Text>
          </View>

          <Formik
            initialValues={INITIAL_FORM}
            validationSchema={toFormikValidationSchema(signInSchema)}
            onSubmit={onLogin}
          >
            {(formik) => (
              <Form className="gap-6">
                <View className="flex-row gap-2">
                  <TextField
                    label="Country"
                    name="countryCode"
                    editable={false}
                    onChangeText={(value) => {
                      const newValue = !value.startsWith("+")
                        ? `+${value}`
                        : value;
                      void formik.setFieldValue("countryCode", newValue);
                    }}
                    keyboardType="phone-pad"
                  />
                  <TextField
                    containerClassName="flex-1"
                    label="Phone Number"
                    name="phoneNumber"
                    placeholder="123 456 7890"
                    keyboardType="phone-pad"
                  />
                </View>
                <SubmitButton formik={formik} text="Login" rounded />
              </Form>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const INITIAL_FORM: SignInSchema = {
  phoneNumber: "",
  countryCode: "+1",
};
