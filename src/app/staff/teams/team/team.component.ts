import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../services/team.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Team} from '../../../types';
import {MatDialog} from "@angular/material";
import { ReplyDialogComponent } from '../../../communication/emails/reply-dialog/reply-dialog.component';
import {ErrorDialogComponent} from "../../../custom/error-dialog/error-dialog.component";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  team: Team;
  isLoaded = false;

  constructor(private teamService: TeamService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.teamService.fetchOneTeam(this.route.snapshot.params[('id')])
      .subscribe(res => {
        this.team = res;
      },
        err => {
        this.showError(err);
        },
        () => {
        this.isLoaded = true;
        });
  }

  showError(err) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error
      }
    });

    dialogRef.afterClosed().subscribe(() => this.router.navigate(['/teams']));
  }
}
