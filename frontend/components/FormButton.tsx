import React from "react";
import { FormButtonProps } from "@/types/types";

export default function FormButton({
  type = "button",
  onClick,
  disabled = false,
  className = "",
  children,
}: FormButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
