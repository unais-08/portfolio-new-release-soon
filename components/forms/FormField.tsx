import React from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  type?: "text" | "url" | "number" | "textarea";
  placeholder?: string;
  value: string | number;
  onChange: (value: string) => void;
  rows?: number;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  required = false,
  error,
  type = "text",
  placeholder,
  value,
  onChange,
  rows = 3,
}) => {
  const InputComponent = type === "textarea" ? Textarea : Input;

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      <InputComponent
        id={id}
        type={type === "textarea" ? undefined : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={error ? "border-red-500 focus:border-red-500" : ""}
        rows={type === "textarea" ? rows : undefined}
      />

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};
