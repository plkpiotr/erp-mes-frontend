import {Component, OnInit, ViewChild} from '@angular/core';
import {Complaint} from '../../../types';
import {ComplaintService} from '../../../services/complaint.service';
import {Router} from '@angular/router';
import {MatPaginator, MatTableDataSource} from "@angular/material";

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

  constructor(private complaintService: ComplaintService, private router: Router) {
  }

  ngOnInit() {
    this.fetchComplaints();
  }

  fetchComplaints() {
    this.complaintService.fetchAllComplaints().subscribe(res => {
      this.complaints = res;
    }, err => {
      console.log(err);
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

}
