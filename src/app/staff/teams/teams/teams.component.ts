import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TeamService} from '../../../services/team.service';
import {Team} from '../../../types';
import {MatPaginator, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  teams: Array<Team>;
  isLoaded = false;
  dataSource: MatTableDataSource<Team> = new MatTableDataSource([]);
  paginator: any;

  @ViewChild(MatPaginator)
  set pagination(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private router: Router,
              private teamService: TeamService) { }

  ngOnInit() {
    this.teamService.fetchAllTeams().subscribe(res => {
      this.teams = res;
    }, err => {
      console.log(err);
    }, () => {
      this.isLoaded = true;
      this.dataSource = new MatTableDataSource<Team>(this.teams);
    });
  }

  seeTeam(id: number) {
    this.router.navigate(['/teams', id]);
  }
}
