import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TeamService} from "../team.service";
import {Team} from "../types";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  private teams: Array<Team>;

  constructor(private router: Router,
              private teamService: TeamService) { }

  ngOnInit() {
    this.teamService.fetchAllTeams().subscribe(res => this.teams = res);
  }

  seeTeam(id: number) {
    this.router.navigate(["/teams", id]);
  }

  addTeam() {
    this.router.navigate(["/teams/add"]);
  }

}
