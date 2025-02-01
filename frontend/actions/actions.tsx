"use server";

import type { TaxData } from "../types/types";

export async function saveTaxData(data: TaxData) {
  // Save this data to a database
  console.log("Saving tax data:", data);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true };
}

export async function exportTaxData(data: TaxData) {
  // Generate a file (e.g., Excel or PDF) here
  console.log("Exporting tax data:", data);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true };
}
