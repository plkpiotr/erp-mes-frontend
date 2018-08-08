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
import {ReportsComponent} from "./reports/reports.component";
import {ReportComponent} from "./report/report.component";
import {CurrentReportComponent} from "./current-report/current-report.component";

export const appRoutes: Routes = [
  {path: 'employees', component: EmployeesComponent},
  {path: 'employees/add', component: AddEmployeeComponent},
  {path: 'employees/:id', component: EmployeeComponent},
  {path: 'teams', component: TeamsComponent},
  {path: 'teams/:id', component: TeamComponent},
  {path: 'holidays/add', component: AddHolidayComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'tasks/add', component: AddTaskComponent},
  {path: 'tasks/:id', component: TaskComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'reports/:id', component: ReportComponent},
  {path: 'current-report', component: CurrentReportComponent}
  ];

export const routing = RouterModule.forRoot(appRoutes);
