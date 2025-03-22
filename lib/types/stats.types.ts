export interface IStats {
  orders: number;
  expenses: number;
  totals: {
    expense_amount: number;
    income_amount: number;
    expense_count: number;
    income_count: number;
    total: number;
  };
}
