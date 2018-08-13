import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {routing} from './app.routing';
import {EmployeesComponent} from './employees/employees.component';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import {EmployeeComponent} from './employee/employee.component';
import {EmployeeService} from './employee.service';
import {TeamsComponent} from './teams/teams.component';
import {TeamComponent} from './team/team.component';
import {TeamService} from './team.service';
import {AddHolidayComponent} from './add-holiday/add-holiday.component';
import {HolidayService} from './holiday.service';
import {AddTaskComponent} from './add-task/add-task.component';
import {TaskComponent} from './task/task.component';
import {TasksComponent} from './tasks/tasks.component';
import {TaskService} from './task.service';
import {ReportService} from './report.service';
import { ReportsComponent } from './reports/reports.component';
import { ReportComponent } from './report/report.component';
import { CurrentReportComponent } from './current-report/current-report.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    AddEmployeeComponent,
    EmployeeComponent,
    TeamsComponent,
    TeamComponent,
    AddHolidayComponent,
    AddTaskComponent,
    TaskComponent,
    TasksComponent,
    ReportsComponent,
    ReportComponent,
    CurrentReportComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    routing,
    FormsModule
  ],
  providers: [
    EmployeeService,
    TeamService,
    HolidayService,
    TaskService,
    ReportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
