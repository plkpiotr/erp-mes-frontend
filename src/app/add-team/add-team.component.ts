import {Component, OnInit} from '@angular/core';
import {TeamService} from "../team.service";
import {Router} from "@angular/router";
import {Employee, Role, Team, TeamRequest} from "../types";
import {EmployeeService} from "../employee.service";

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  private teamRequest: TeamRequest;
  private role: Role;
  private managerId: number;
  private employeeIds: number[];

  private managers: Array<Employee>;
  private nonManagers: Array<Employee>;
  private roles;

  constructor(private teamService: TeamService,
              private router: Router,
              private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.employeeService.fetchAllManagers().subscribe(res => this.managers = res);
    this.employeeService.fetchAllNonManagers().subscribe(res => this.nonManagers = res);
    this.roles = Object.keys(Role);
  }

  submitForm() {
    this.teamRequest = {
      role: this.role,
      managerId: this.managerId,
      employeeIds: this.employeeIds
    };
    let team: Team;
    this.teamService.addTeam(this.teamRequest).subscribe(res => {
        team = res;
      },
      err => {
        console.log(err);
      },
      () => {
        this.router.navigate(["/teams", team.id]);
      });
  }
}
