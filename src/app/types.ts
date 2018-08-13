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

export enum HolidayType {
  VACATION = 'VACATION',
  SICK_LEAVE = 'SICK_LEAVE',
  PARENTAL_LEAVE = 'PARENTAL_LEAVE',
  BEREAVEMENT = 'BEREAVEMENT',
  EMERGENCY_CHILD_CARE = 'EMERGENCY_CHILD_CARE'
}

export enum ApprovalState {
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
  PENDING = 'PENDING'
}

export enum Category {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE'
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
  manager?: Employee;
  employees?: Employee[];
}

export interface Holiday {
  id: number;
  startDate: Date;
  duration: number;
  holidayType: HolidayType;
  approvalState: ApprovalState;
  employee: Employee;
}

export interface HolidayRequest {
  startDate: Date;
  duration: number;
  holidayType: HolidayType;
}

export interface Task {
  id: number;
  name: string;
  category: Category;
  assignee?: Employee;
  precedingTasks: Task[];
  details: string;
  estimatedTimeInMinutes: number;
  deadline: Date;
  creationTime: Date;
  startTime?: Date;
  endTime?: Date;
}

export interface TaskRequest {
  name: string;
  category: Category;
  assigneeId?: number;
  precedingTaskIds: number[];
  details: string;
  estimatedTimeInMinutes: number;
  deadline: Date;
}
