import type { AlertOptions } from "burnt/build/types";
import { alert, toast } from "burnt";

export const showToast = ({
  type,
  title,
  message,
}: {
  type: "success" | "error" | "none";
  title: string;
  message?: string;
}) => {
  const preset = type === "success" ? "done" : type;
  toast({
    preset,
    title,
    message,
  });
};

export const showAlert = (options: AlertOptions) => {
  alert(options);
};
