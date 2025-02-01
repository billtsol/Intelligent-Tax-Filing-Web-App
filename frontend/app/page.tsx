"use client";

import { useState, useEffect } from "react";
import TaxCalculatorForm from "@/components/TaxCalculatorForm";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200">
          <h1 className="text-3xl font-bold p-6 bg-blue-800 text-white text-center">
            Tax Calculator
          </h1>
          <TaxCalculatorForm darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </div>
    </main>
  );
}
