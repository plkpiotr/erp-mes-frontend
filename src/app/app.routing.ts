import {RouterModule, Routes} from '@angular/router';
import {EmployeesComponent} from './employees/employees.component';
import {EmployeeComponent} from './employee/employee.component';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import {TeamsComponent} from './teams/teams.component';
import {TeamComponent} from './team/team.component';
import {AddHolidayComponent} from './add-holiday/add-holiday.component';
import {TasksComponent} from './tasks/tasks.component';
import {TaskComponent} from './task/task.component';
import {AddTaskComponent} from './add-task/add-task.component';
import {ReportsComponent} from './reports/reports.component';
import {ReportComponent} from './report/report.component';
import {CurrentReportComponent} from './current-report/current-report.component';
import {DeliveriesComponent} from "./deliveries/deliveries.component";
import {DeliveryComponent} from "./delivery/delivery.component";
import {AddDeliveryComponent} from "./add-delivery/add-delivery.component";
import {ItemsComponent} from "./items/items.component";
import {ItemComponent} from "./item/item.component";
import {AddItemComponent} from "./add-item/add-item.component";
import {LoginComponent} from "./login/login.component";
import {ValidateComponent} from "./validate/validate.component";
import {PlanningService} from "./planning.service";
import {SpecialPlansComponent} from "./special-plans/special-plans.component";
import {PlanningComponent} from "./planning/planning.component";
import {UpdateDailyPlanComponent} from "./update-daily-plan/update-daily-plan.component";

export const appRoutes: Routes = [
  {path: 'employees', component: EmployeesComponent},
  {path: 'employees/add', component: AddEmployeeComponent},
  {path: 'employees/:id', component: EmployeeComponent},
  {path: 'employees/:id/validate', component: ValidateComponent},
  {path: 'teams', component: TeamsComponent},
  {path: 'teams/:id', component: TeamComponent},
  {path: 'holidays/add', component: AddHolidayComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'tasks/add', component: AddTaskComponent},
  {path: 'tasks/:id', component: TaskComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'reports/:id', component: ReportComponent},
  {path: 'current-report', component: CurrentReportComponent},
  {path: 'deliveries', component: DeliveriesComponent},
  {path: 'deliveries/add', component: AddDeliveryComponent},
  {path: 'deliveries/:id', component: DeliveryComponent},
  {path: 'items', component: ItemsComponent},
  {path: 'items/add', component: AddItemComponent},
  {path: 'items/:id', component: ItemComponent},
  {path: 'planning', component: PlanningComponent},
  {path: 'planning/update', component: UpdateDailyPlanComponent},
  {path: 'special-plans', component: SpecialPlansComponent},
  {path: 'login', component: LoginComponent}
  ];

export const routing = RouterModule.forRoot(appRoutes);
