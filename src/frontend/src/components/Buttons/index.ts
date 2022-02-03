import { MouseEvent } from "react";
import { OutlineButton } from "./OutlineButton";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";

export interface CustomButtonProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  text: string;
  icon: React.ReactNode;
}

export { OutlineButton, PrimaryButton, SecondaryButton };
