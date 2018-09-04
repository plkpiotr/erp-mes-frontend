export enum Role {
  ADMIN = 'ADMIN',
  ACCOUNTANT = 'ACCOUNTANT',
  ADMIN_ACCOUNTANT = 'ADMIN_ACCOUNTANT',
  ANALYST = 'ANALYST',
  ADMIN_ANALYST = 'ADMIN_ANALYST',
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

export enum ExpenseType {
  SHIPPING = 'SHIPPING',
  BILLS = 'BILLS',
  RENT = 'RENT',
  SALARIES = 'SALARIES',
  STOCK = 'STOCK',
  SOCIAL_FUND = 'SOCIAL_FUND',
  UNEXPECTED = 'UNEXPECTED',
  TAXES = 'TAXES'
}

export enum Status {
  WAITING_FOR_PAYMENT = 'WAITING_FOR_PAYMENT',
  IN_PROGRESS = 'IN_PROGRESS',
  SENT = 'SENT',
  DECLINED = 'DECLINED'
}

export enum State {
  REPORTED = 'REPORTED',
  ACCEPTED = 'ACCEPTED',
  SOLVED = 'SOLVED'
}

export enum Phase {
  REPORTED = 'REPORTED',
  IN_IMPLEMENTATION = 'IN_IMPLEMENTATION',
  IMPLEMENTED = 'IMPLEMENTED',
  ABANDONED = 'ABANDONED'
}

export enum Type {
  DELIVERY = 'DELIVERY',
  ORDER = 'ORDER',
  COMPLAINT = 'COMPLAINT',
  RETURN = 'RETURN'
}

export interface Contract {
  id: number;
  accountNumber: string;
  daysOffPerYear: number;
  salary: number;
}

export interface ContractRequest {
  accountNumber: string;
  daysOffPerYear: number;
  salary: number;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  password?: string;
  passwordValid?: boolean;
  contract?: Contract;
}

export interface EmployeeRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  contractRequest: ContractRequest;
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
  type?: Type;
  reference?: number;
  scheduledTime: Date;
}

export interface TaskRequest {
  name: string;
  category: Category;
  assigneeId?: number;
  precedingTaskIds: number[];
  details: string;
  estimatedTimeInMinutes: number;
  deadline: Date;
  type?: Type;
  reference?: number;
  scheduledTime: Date;
}

export interface EstimatedCosts {
  id: number;
  estimatedIncome: number;
  estimatedShippingCosts: number;
  estimatedBills: number;
  rent: number;
  salaries: number;
  stockCosts: number;
  socialFund: number;
  unexpected: number;
  taxes: number;
}

export interface EstimatedCostsRequest {
  estimatedIncome: number;
  estimatedShippingCosts: number;
  estimatedBills: number;
  rent: number;
  salaries: number;
  stockCosts: number;
  socialFund: number;
  unexpected: number;
}

export interface Expense {
  id: number;
  expenseType: ExpenseType;
  amount: number;
}

export interface ExpenseRequest {
  expenseType: ExpenseType;
  amount: number;
}

export interface MonthlyReport {
  id: number;
  expenses: Expense[];
  income: number[];
  startDate: Date;
  overallExpenses: number;
  overallIncome: number;
  balance: number;
  estimatedCosts: EstimatedCosts;
}

export interface CurrentReport {
  id: number;
  expenses: Expense[];
  income: number[];
  estimatedCosts: EstimatedCosts;
  startDate: Date;
}

export interface Item {
  id: number;
  name: string;
  quantity: number;
  stockPrice: number;
  originalPrice: number;
  currentPrice: number;
}

export interface ItemRequest {
  name: string;
  stockPrice: number;
  price: number;
}

export interface DeliveryItem {
  id: number;
  item: Item;
  quantity: number;
}

export interface DeliveryItemRequest {
  itemId: number;
  quantity: number;
}

export interface Delivery {
  id: number;
  deliveryItems: DeliveryItem[];
  scheduledFor: Date;
  value: number;
}

export interface DeliveryRequest {
  deliveryItemRequests: DeliveryItemRequest[];
  scheduledFor: Date;
}

export interface Order {
  id: number;
  status: Status;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  street: string;
  houseNumber: string;
  city: string;
  postalCode: string;
  deliveryItems: DeliveryItem[];
  scheduledFor: Date;
  value: number;
}

export interface OrderRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  street: string;
  houseNumber: string;
  city: string;
  postalCode: string;
  deliveryItemRequests: DeliveryItemRequest[];
  scheduledFor: Date;
}

export interface Notification {
  id: number;
  state: State;
  instruction: string;
  description?: string;
  notifier: Employee;
  transferee?: Employee;
  consignees: Employee[];
  creationTime: Date;
  type?: Type;
  reference?: number;
}

export interface NotificationRequest {
  instruction: string;
  description?: string;
  notifierId?: number;
  consigneeIds: number[];
  type?: Type;
  reference?: number;
}

export interface Suggestion {
  id: number;
  phase: Phase;
  name: string;
  description: string;
  author?: Employee;
  recipients: Employee[];
  creationTime: Date;
}

export interface SuggestionRequest {
  name: String;
  description: String;
  authorId?: number;
  recipientIds: number[];
}


