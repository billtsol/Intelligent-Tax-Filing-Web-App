"use client";

import { useState, useEffect } from "react";
import type { TaxData } from "@/types/types";

import FormButton from "./FormButton";

interface AdviceFormProps {
  setShowCalculator: (showCalculator: boolean) => void;
  data: TaxData;
}

export default function AdvicePage({
  setShowCalculator,
  data,
}: AdviceFormProps) {
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    async function fetchAdvice() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/get-ai-advice/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Failed to fetch AI advice");

        const result = await response.json();
        setAdvice(result.advice);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAdvice();
  }, [data]);


  return (
    <div className=" dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
              Βάσει των φορολογικών σας πληροφοριών, εδώ είναι η συμβουλή μας:
            </h3>
            <div className="mt-5 text-gray-600 dark:text-gray-300">
              <p>{advice === "" ? "Thinking ..." : advice}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <FormButton
            onClick={() => setShowCalculator(true)}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Calculator
          </FormButton>
        </div>
      </div>
    </div>
  );
}
