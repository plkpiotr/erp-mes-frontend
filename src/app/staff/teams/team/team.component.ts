import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../services/team.service';
import {ActivatedRoute} from '@angular/router';
import {Team} from '../../../types';
import {MatDialog} from "@angular/material";
import { ReplyDialogComponent } from '../../../communication/emails/reply-dialog/reply-dialog.component';

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
              private dialog: MatDialog) { }

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

  sendEmail(email: string) {
    this.dialog.open(ReplyDialogComponent, {
      width: '350px',
      data: {email: email}
    });
  }
}
