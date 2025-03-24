export interface IEmployee {
  employee: {
    id: string;
    name: string;
  };
  total_income: number;
  total_expense: number;
}

export interface IEmployeeFilter {
  turn: string;
  filials: string;
  start: string;
  end: string;
  [key: string]: string|number|undefined|boolean;
}
