import {Component, OnInit} from '@angular/core';
import {Return} from '../../../types';
import {ReturnService} from '../../../services/return.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.scss']
})
export class ReturnsComponent implements OnInit {

  returns: Array<Return>;
  visibleReturns: Array<Return>;
  areReturnsLoaded = false;

  returnsPerPage = 15;
  selectedPage = 1;
  pageNumbers: number[];

  constructor(private returnService: ReturnService, private router: Router) {
  }

  ngOnInit() {
    this.fetchReturns();
  }

  fetchReturns() {
    this.returnService.fetchAllReturns().subscribe(res => {
      this.returns = res;
    }, err => {
      console.log(err);
    }, () => {
      this.areReturnsLoaded = true;
      this.setVisibleReturns();
      this.setPageNumbers();
    });
  }

  seeReturn(id: number) {
    this.router.navigate(['/returns', id]);
  }

  addReturn() {
    this.router.navigate(['shop-service/add'], {
      queryParams: {
        service: 'return'
      }
    });
  }

  setVisibleReturns() {
    const pageIndex = (this.selectedPage - 1) * this.returnsPerPage;
    this.visibleReturns = this.returns.slice(
      pageIndex,
      pageIndex + this.returnsPerPage
    );
  }

  setPageNumbers() {
    this.pageNumbers = Array(
      Math.ceil(this.returns.length / this.returnsPerPage)
    )
      .fill(0)
      .map((x, i) => i + 1);
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
    this.setVisibleReturns();
  }
}
