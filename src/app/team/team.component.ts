import { Component, OnInit } from '@angular/core';
import {TeamService} from "../team.service";
import {ActivatedRoute} from "@angular/router";
import {Team} from "../types";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  private team: Team;

  constructor(private teamService: TeamService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.teamService.fetchOneTeam(this.route.snapshot.params[('id')])
      .subscribe(res => this.team = res);
  }

  deleteTeam() {
    this.teamService.deleteTeam(this.route.snapshot.params[('id')]);
  }

}
