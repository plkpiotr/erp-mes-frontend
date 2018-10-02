import {Component, OnInit} from '@angular/core';
import {Return, ReturnStatus} from '../../../types';
import {ReturnService} from '../../../services/return.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from "@angular/material";
import {StatusDialogComponent} from "../status-dialog/status-dialog.component";

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {

  isReturnLoaded = false;
  return: Return;
  status: ReturnStatus;

  constructor(private returnService: ReturnService, private route: ActivatedRoute,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchReturn();
  }

  fetchReturn() {
    this.returnService.fetchOneReturn(this.route.snapshot.params['id']).subscribe(res => {
      this.return = res;
    }, err => {
      console.log(err);
    }, () => {
      this.isReturnLoaded = true;
      this.status = this.return.status;
    });
  }

  updateReturnStatus() {
    let status = [];
    if (this.return.status === ReturnStatus.IN_PROGRESS) {
      status = ['ACCEPTED', 'DECLINED'];
    } else if (this.return.status === ReturnStatus.ACCEPTED) {
      status = ['MONEY_RETURNED'];
    }
    const dialogRef = this.dialog.open(StatusDialogComponent, {
      width: '350px',
      data: {
        status: status,
        r: this.return
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isReturnLoaded = false;
      this.fetchReturn();
    });
  }
}
