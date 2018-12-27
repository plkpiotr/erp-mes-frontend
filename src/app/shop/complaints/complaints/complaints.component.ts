import {Component, OnInit, ViewChild} from '@angular/core';
import {Complaint} from '../../../types';
import {ComplaintService} from '../../../services/complaint.service';
import {Router} from '@angular/router';
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {ErrorDialogComponent} from "../../../custom/error-dialog/error-dialog.component";

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {

  complaints: Array<Complaint>;
  areComplaintsLoaded = false;
  dataSource: MatTableDataSource<Complaint> = new MatTableDataSource([]);
  paginator: any;

  @ViewChild(MatPaginator)
  set pagination(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private complaintService: ComplaintService, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchComplaints();
  }

  fetchComplaints() {
    this.complaintService.fetchAllComplaints().subscribe(res => {
      this.complaints = res;
    }, err => {
      if (err.status == 401) {
        this.router.navigate(['/login']);
      } else {
        this.showError(err);
      }
    }, () => {
      this.areComplaintsLoaded = true;
      this.dataSource = new MatTableDataSource<Complaint>(this.complaints);
    });
  }

  seeComplaint(id: number) {
    this.router.navigate(['/complaints', id]);
  }

  addComplaint() {
    this.router.navigate(['shop-service/add'], {
      queryParams: {
        service: 'complaint'
      }
    });
  }

  showError(err) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error,
        status: err.status
      }
    });
    dialogRef.afterClosed().subscribe(() => this.router.navigate(['/employees']));
  }

}
