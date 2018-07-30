import {RouterModule, Routes} from "@angular/router";
import {EmployeesComponent} from "./employees/employees.component";
import {EmployeeComponent} from "./employee/employee.component";
import {AddEmployeeComponent} from "./add-employee/add-employee.component";
import {TeamsComponent} from "./teams/teams.component";
import {AddTeamComponent} from "./add-team/add-team.component";
import {TeamComponent} from "./team/team.component";

export const appRoutes: Routes = [
  {path: 'employees', component: EmployeesComponent},
  {path: 'employees/add', component: AddEmployeeComponent},
  {path: 'employees/:id', component: EmployeeComponent},
  {path: 'teams', component: TeamsComponent},
  {path: 'teams/add', component: AddTeamComponent},
  {path: 'teams/:id', component: TeamComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
