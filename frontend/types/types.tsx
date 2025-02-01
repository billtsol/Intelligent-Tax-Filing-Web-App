export interface IncomeItem {
  category: string;
  amount: number;
}

export interface ExpenseItem {
  category: string;
  amount: number;
  description: string;
}

export interface TaxData {
  incomeItems: IncomeItem[];
  expenseItems: ExpenseItem[];
  taxLiability?: number;
}

export interface FormButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}