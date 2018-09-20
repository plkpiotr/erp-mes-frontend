import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../services/team.service';
import {ActivatedRoute} from '@angular/router';
import {Team} from '../../../types';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  team: Team;
  isLoaded = false;

  constructor(private teamService: TeamService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.teamService.fetchOneTeam(this.route.snapshot.params[('id')])
      .subscribe(res => {
        this.team = res;
      },
        err => {
        console.log(err);
        },
        () => {
        this.isLoaded = true;
        });
  }
}
