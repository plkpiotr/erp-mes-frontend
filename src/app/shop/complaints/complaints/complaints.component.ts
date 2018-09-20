import {Component, OnInit} from '@angular/core';
import {Complaint} from '../../../types';
import {ComplaintService} from '../../../services/complaint.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {

  complaints: Array<Complaint>;
  visibleComplaints: Array<Complaint>;
  areComplaintsLoaded = false;

  complaintsPerPage = 15;
  selectedPage = 1;
  pageNumbers: number[];

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
      this.setVisibleComplaints();
      this.setPageNumbers();
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

  setVisibleComplaints() {
    const pageIndex = (this.selectedPage - 1) * this.complaintsPerPage;
    this.visibleComplaints = this.complaints.slice(
      pageIndex,
      pageIndex + this.complaintsPerPage
    );
  }

  setPageNumbers() {
    this.pageNumbers = Array(
      Math.ceil(this.complaints.length / this.complaintsPerPage)
    )
      .fill(0)
      .map((x, i) => i + 1);
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
    this.setVisibleComplaints();
  }

}
