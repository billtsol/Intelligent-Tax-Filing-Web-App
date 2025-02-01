"use client";

import { useState, useMemo } from "react";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { calculateTax } from "../utils/taxCalculations";
import { saveTaxData, exportTaxData } from "../actions/actions";
import type { TaxData, IncomeItem, ExpenseItem } from "../types/types";
import FormButton from "@/components/FormButton";
import { Moon, Sun } from "lucide-react";

const incomeCategories = ["Salary", "Business Profits", "Interest"];
const expenseCategories = ["Professional Services", "Equipment", "Advertising"];

interface TaxCalculatorFormProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export default function TaxCalculatorForm({
  darkMode,
  setDarkMode,
}: TaxCalculatorFormProps) {
  const [taxLiability, setTaxLiability] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const { register, control, handleSubmit, watch } = useForm<TaxData>({
    defaultValues: {
      incomeItems: [{ category: "", amount: 0 }],
      expenseItems: [{ category: "", amount: 0, description: "" }],
    },
  });

  const {
    fields: incomeFields,
    append: appendIncome,
    remove: removeIncome,
  } = useFieldArray({
    control,
    name: "incomeItems",
  });

  const {
    fields: expenseFields,
    append: appendExpense,
    remove: removeExpense,
  } = useFieldArray({
    control,
    name: "expenseItems",
  });

  const watchedData = watch();

  const selectedIncomeCategories = useMemo(() => {
    return watchedData.incomeItems.map((item) => item.category).filter(Boolean);
  }, [watchedData.incomeItems]);

  const selectedExpenseCategories = useMemo(() => {
    return watchedData.expenseItems
      .map((item) => item.category)
      .filter(Boolean);
  }, [watchedData.expenseItems]);

  const calculateTaxLiability = (data: TaxData) => {
    const totalIncome = data.incomeItems
      .filter((item) => item.category !== "")
      .reduce((sum, item) => sum + (item.amount || 0), 0);
    const totalExpenses = data.expenseItems
      .filter((item) => item.category !== "")
      .reduce((sum, item) => sum + (item.amount || 0), 0);
    return calculateTax(totalIncome, totalExpenses);
  };

  const onSubmit: SubmitHandler<TaxData> = async (data) => {
    const calculatedTax = calculateTaxLiability(data);
    setTaxLiability(calculatedTax);

    // Filter out items with empty category or amount 0
    const filteredData: TaxData = {
      incomeItems: data.incomeItems.filter(
        (item): item is IncomeItem => item.category !== "" && item.amount > 0
      ),
      expenseItems: data.expenseItems.filter(
        (item): item is ExpenseItem => item.category !== "" && item.amount > 0
      ),
      taxLiability: Number(calculatedTax.toFixed(2)),
    };

    setIsSaving(true);
    try {
      await saveTaxData(filteredData);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Filter out items with empty category or amount 0
      const filteredData: TaxData = {
        incomeItems: watchedData.incomeItems.filter(
          (item): item is IncomeItem => item.category !== "" && item.amount > 0
        ),
        expenseItems: watchedData.expenseItems.filter(
          (item): item is ExpenseItem => item.category !== "" && item.amount > 0
        ),
        taxLiability: Number(taxLiability.toFixed(2)),
      };
      await exportTaxData(filteredData);
      alert("Data exported successfully!");
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Failed to export data. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </div>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300">
          Income
        </h2>
        {incomeFields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4"
          >
            <select
              {...register(`incomeItems.${index}.category` as const)}
              className="w-full sm:w-1/3 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">Select Category</option>
              {incomeCategories.map((category) => (
                <option
                  key={category}
                  value={category}
                  disabled={
                    selectedIncomeCategories.includes(category) &&
                    watchedData.incomeItems[index].category !== category
                  }
                >
                  {category}
                </option>
              ))}
            </select>
            <input
              type="number"
              {...register(`incomeItems.${index}.amount` as const, {
                valueAsNumber: true,
              })}
              className="w-full sm:w-1/3 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Amount"
            />

            <FormButton
              type="button"
              onClick={() => removeIncome(index)}
              className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
            >
              Remove
            </FormButton>
          </div>
        ))}

        <FormButton
          type="button"
          onClick={() => appendIncome({ category: "", amount: 0 })}
          className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800"
          disabled={selectedIncomeCategories.length === incomeCategories.length}
        >
          + Add Income
        </FormButton>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300">
          Expenses
        </h2>
        {expenseFields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4"
          >
            <select
              {...register(`expenseItems.${index}.category` as const)}
              className="w-full sm:w-1/4 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">Select Category</option>
              {expenseCategories.map((category) => (
                <option
                  key={category}
                  value={category}
                  disabled={
                    selectedExpenseCategories.includes(category) &&
                    watchedData.expenseItems[index].category !== category
                  }
                >
                  {category}
                </option>
              ))}
            </select>
            <input
              type="number"
              {...register(`expenseItems.${index}.amount` as const, {
                valueAsNumber: true,
              })}
              className="w-full sm:w-1/4 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Amount"
            />
            <input
              type="text"
              {...register(`expenseItems.${index}.description` as const)}
              className="w-full sm:w-1/4 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Description"
            />
            <FormButton
              type="button"
              onClick={() => removeExpense(index)}
              className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
            >
              Remove
            </FormButton>
          </div>
        ))}
        <FormButton
          type="button"
          onClick={() =>
            appendExpense({ category: "", amount: 0, description: "" })
          }
          className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800"
          disabled={
            selectedExpenseCategories.length === expenseCategories.length
          }
        >
          + Add Expense
        </FormButton>
      </section>

      <section className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">
          Tax Summary
        </h2>
        <div className="space-y-2 text-gray-900 dark:text-gray-100">
          <p>
            Total Income: $
            {watchedData.incomeItems
              .filter((item) => item.category !== "")
              .reduce((sum, item) => sum + (item.amount || 0), 0)
              .toFixed(2)}
          </p>
          <p>
            Total Expenses: $
            {watchedData.expenseItems
              .filter((item) => item.category !== "")
              .reduce((sum, item) => sum + (item.amount || 0), 0)
              .toFixed(2)}
          </p>
          <p className="text-lg font-bold">
            Estimated Tax Liability: ${taxLiability.toFixed(2)}
          </p>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <FormButton
          type="submit"
          disabled={isSaving}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {isSaving ? "Saving..." : "Save Data"}
        </FormButton>
        <FormButton
          type="button"
          onClick={handleExport}
          disabled={isExporting}
          className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          {isExporting ? "Exporting..." : "Export Data"}
        </FormButton>
      </div>
    </form>
  );
}
