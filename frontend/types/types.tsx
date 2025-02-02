import type React from "react"

export interface TaxData {
  fullName: string
  age: number
  maritalStatus: string
  income: number
  expenses: number
  taxClass: "Ατομικός φορολογούμενος" | "Οικογενειακός φορολογούμενος" | "Επαγγελματίας ή Επιχειρηματίας" | "Συνταξιούχος" | "Άτομα με ειδικές ανάγκες"
  additionalIncome: number
  deductions: number
}

export interface FormButtonProps {
  type?: "button" | "submit" | "reset"
  onClick?: () => void
  disabled?: boolean
  className?: string
  children: React.ReactNode
}