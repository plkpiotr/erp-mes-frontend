import {Component, OnInit} from '@angular/core';
import {Complaint} from "../types";
import {ComplaintService} from "../complaint.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  complaints: Array<Complaint>;
  areComplaintsLoaded = false;

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
