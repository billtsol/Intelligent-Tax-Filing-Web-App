"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Moon, Sun } from "lucide-react";

import type { TaxData } from "@/types/types";
import FormButton from "./FormButton";
import FormField from "./FormField";

interface TaxCalculatorFormProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  setData: (data: TaxData) => void;
  setShowCalculator: (showCalculator: boolean) => void;
}

export default function TaxCalculatorForm({
  darkMode,
  setDarkMode,
  setData,
  setShowCalculator,
}: TaxCalculatorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaxData>();
  const [isSaving, setIsSaving] = useState(false);

  const onSubmit: SubmitHandler<TaxData> = (data) => {
    setIsSaving(true);
    setData(data);
    setShowCalculator(false);
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <p className="text-gray-600 dark:text-gray-400">
          Εισάγετε τα στοιχεία σας για να λάβετε προσωποποιημένες φορολογικές
          συμβουλές.
        </p>
        <FormButton
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        >
          {darkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </FormButton>
      </div>

      <div>
        <FormField
          label="Ονοματεπώνυμο"
          name="fullName"
          register={register}
          error={errors.fullName}
          rules={{ required: "Το πεδίο 'Ονοματεπώνυμο' είναι υποχρεωτικό" }}
        />

        <FormField
          label="Ηλικία"
          name="age"
          register={register}
          error={errors.age}
          type="number"
          rules={{
            required: "Το πεδίο 'Ηλικία' είναι υποχρεωτικό",
            min: {
              value: 18,
              message: "Η ηλικία πρέπει να είναι τουλάχιστον 18 ετών",
            },
          }}
        />

        <FormField
          label="Κατάσταση Πολιτικής Οικογένειας"
          name="maritalStatus"
          register={register}
          error={errors.maritalStatus}
          type="select"
          options={[
            { value: "single", label: "Άγαμος" },
            { value: "married", label: "Έγγαμος" },
            { value: "divorced", label: "Διαζευγμένος" },
            { value: "widowed", label: "Χήρος/α" },
          ]}
          rules={{ required: "Επιλέξτε κατάσταση πολιτικής οικογένειας" }}
        />

        <FormField
          label="Εισόδημα (€)"
          name="income"
          register={register}
          error={errors.income}
          type="number"
          rules={{
            required: "Το εισόδημα είναι υποχρεωτικό",
            min: {
              value: 0,
              message: "Το εισόδημα πρέπει να είναι μεγαλύτερο ή ίσο με 0",
            },
          }}
        />

        <FormField
          label="Έξοδα (€)"
          name="expenses"
          register={register}
          error={errors.expenses}
          type="number"
          rules={{
            required: "Τα έξοδα είναι υποχρεωτικά",
            min: {
              value: 0,
              message: "Τα έξοδα πρέπει να είναι μεγαλύτερα ή ίσα με 0",
            },
          }}
        />

        <FormField
          label="Φορολογική Κλάση"
          name="taxClass"
          register={register}
          error={errors.taxClass}
          type="select"
          options={[
            { value: "Ατομικός φορολογούμενος", label: "Ατομικός φορολογούμενος" },
            { value: "Οικογενειακός φορολογούμενος", label: "Οικογενειακός φορολογούμενος" },
            { value: "Επαγγελματίας ή Επιχειρηματίας", label: "Επαγγελματίας ή Επιχειρηματίας" },
            { value: "Άτομα με ειδικές ανάγκες", label: "Άτομα με ειδικές ανάγκες" },
          ]}
          rules={{ required: "Επιλέξτε φορολογική κλάση" }}
        />

        <FormField
          label="Επιπλέον Εισοδήματα (€)"
          name="additionalIncome"
          register={register}
          error={errors.additionalIncome}
          type="number"
          rules={{
            min: {
              value: 0,
              message:
                "Τα επιπλέον εισοδήματα πρέπει να είναι μεγαλύτερα ή ίσα με 0",
            },
          }}
        />

        <FormField
          label="Προβλέψεις Εκπτώσεων ή Απαλλαγών (€)"
          name="deductions"
          register={register}
          error={errors.deductions}
          type="number"
          rules={{
            min: {
              value: 0,
              message:
                "Οι εκπτώσεις ή απαλλαγές πρέπει να είναι μεγαλύτερες ή ίσες με 0",
            },
          }}
        />
      </div>

      <div className="mt-8">
        <FormButton
          type="submit"
          disabled={isSaving}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isSaving ? "Υποβολή..." : "Υποβολή για Φορολογικές Συμβουλές"}
        </FormButton>
      </div>
    </form>
  );
}
