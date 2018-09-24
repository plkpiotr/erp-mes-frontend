import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TeamService} from '../../../services/team.service';
import {Team} from '../../../types';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  teams: Array<Team>;
  visibleTeams: Array<Team>;
  isLoaded = false;

  teamsPerPage = 15;
  selectedPage = 1;
  pageNumbers: number[];

  constructor(private router: Router,
              private teamService: TeamService) { }

  ngOnInit() {
    this.teamService.fetchAllTeams().subscribe(res => {
      this.teams = res;
    }, err => {
      console.log(err);
    }, () => {
      this.isLoaded = true;
      this.setVisibleTeams();
      this.setPageNumbers();
    });
  }

  seeTeam(id: number) {
    this.router.navigate(['/teams', id]);
  }

  setVisibleTeams() {
    const pageIndex = (this.selectedPage - 1) * this.teamsPerPage;
    this.visibleTeams = this.teams.slice(
      pageIndex,
      pageIndex + this.teamsPerPage
    );
  }

  setPageNumbers() {
    this.pageNumbers = Array(
      Math.ceil(this.teams.length / this.teamsPerPage)
    )
      .fill(0)
      .map((x, i) => i + 1);
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
    this.setVisibleTeams();
  }
}
