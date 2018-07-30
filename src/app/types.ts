export enum Role {
  ADMIN = 'ADMIN',
  ACCOUNTANT = 'ACCOUNTANT',
  ADMIN_ACCOUNTANT = 'ADMIN_ACCOUNTANT',
  HR = 'HR',
  ADMIN_HR = 'ADMIN_HR',
  SUPPLY_CHAIN = 'SUPPLY_CHAIN',
  ADMIN_SUPPLY_CHAIN = 'ADMIN_SUPPLY_CHAIN',
  WAREHOUSE = 'WAREHOUSE',
  ADMIN_WAREHOUSE = 'ADMIN_WAREHOUSE'
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  password: string;
  passwordValid: boolean;
}

export interface EmployeeRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

export interface Team {
  id: number;
  role: Role;
  manager: Employee;
  employees: Employee[];
}

export interface TeamRequest {
  role: Role;
  managerId: number;
  employeeIds: number[];
}
