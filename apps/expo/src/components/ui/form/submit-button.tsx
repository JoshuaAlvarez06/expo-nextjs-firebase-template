import type { FormikProps } from "formik";
import type { TouchableOpacityProps } from "react-native";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

import { cn } from "~/utils";

export type SubmitButtonProps = TouchableOpacityProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>;
  text?: string;
  rounded?: boolean;
};

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  formik,
  text = "Submit",
  rounded = false,
  ...touchableOpacityProps
}) => {
  return (
    <TouchableOpacity
      onPress={() => formik.handleSubmit()}
      disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
      className={cn(
        "h-16 w-full items-center justify-center rounded-lg bg-primary px-2 text-center text-white shadow-sm disabled:bg-primary disabled:opacity-70",
        rounded && "rounded-full",
      )}
      {...touchableOpacityProps}
    >
      {!formik.isSubmitting && (
        <Text className="text-center text-lg font-bold text-white">{text}</Text>
      )}
      {formik.isSubmitting && <ActivityIndicator color="white" />}
    </TouchableOpacity>
  );
};
