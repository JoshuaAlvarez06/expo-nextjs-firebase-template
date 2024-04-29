import type { TextInputProps } from "react-native";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { useField } from "formik";

import type { FieldBaseProps } from "./field-base";
import { cn } from "~/utils";

type TextFieldProps = FieldBaseProps &
  TextInputProps & {
    name: string;
    containerClassName?: string;
  };

export const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  containerClassName,
  ...textInputProps
}) => {
  const [focused, setFocused] = useState(false);

  const [, meta, helpers] = useField<string>(name);

  const handleChange = (new_text: string) => {
    void helpers.setValue(new_text);
  };

  const showError = meta.error && !focused && meta.touched;

  return (
    <View
      className={cn(
        "flex flex-col gap-2 rounded-2xl border-2 border-transparent bg-accent px-5 py-3",
        focused && !showError && "border-primary",
        showError && "border-red-500",
        !(textInputProps.editable ?? true) && "opacity-90",
        containerClassName,
      )}
    >
      <Text className="text-sm font-semibold text-accent-foreground">
        {label}
      </Text>
      <TextInput
        className="text-md bg-transparent p-0 text-accent-foreground"
        onChangeText={handleChange}
        value={meta.value}
        onFocus={(e) => {
          setFocused(true);
          void helpers.setTouched(true);
          textInputProps.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          textInputProps.onBlur?.(e);
        }}
        {...textInputProps}
      />
    </View>
  );
};
