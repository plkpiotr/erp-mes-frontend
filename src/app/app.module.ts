import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {routing} from "./app.routing";
import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeComponent } from './employee/employee.component';
import {EmployeeService} from "./employee.service";
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './team/team.component';
import {TeamService} from "./team.service";
import { AddHolidayComponent } from './add-holiday/add-holiday.component';
import {HolidayService} from "./holiday.service";

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    AddEmployeeComponent,
    EmployeeComponent,
    TeamsComponent,
    TeamComponent,
    AddHolidayComponent
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
    HolidayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
