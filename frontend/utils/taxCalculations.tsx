export function calculateTax(income: number, expenses: number): number {
  const taxableIncome = Math.max(income - expenses, 0);
  const taxRate = 0.24;
  return taxableIncome * taxRate;
}
