import type {
  UseFormRegister,
  FieldError,
  RegisterOptions,
} from "react-hook-form";
import type { TaxData } from "@/types/types";

interface FormFieldProps {
  label: string;
  name: keyof TaxData;
  register: UseFormRegister<TaxData>;
  error?: FieldError;
  type?: string;
  options?: { value: string; label: string }[];
  rules?: RegisterOptions<TaxData, keyof TaxData>;
}

export default function FormField({
  label,
  name,
  register,
  error,
  type = "text",
  options,
  rules,
}: FormFieldProps) {
  return (
    <div className="mb-6">
      <label
        htmlFor={name}
        className="block text-md font-bold mb-2 text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      {type === "select" ? (
        <select
          {...register(name, rules)}
          id={name}
          className="mt-1 block w-full rounded-md shadow-sm border text-md py-2"
        >
          <option value="">Επιλέξτε...</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...register(name, rules)}
          type={type}
          id={name}
          className="mt-1 block w-full rounded-md shadow-sm border text-md py-2 pl-2"
        />
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
