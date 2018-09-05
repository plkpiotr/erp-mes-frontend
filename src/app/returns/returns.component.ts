import {Component, OnInit} from '@angular/core';
import {Return} from "../types";
import {ReturnService} from "../return.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.css']
})
export class ReturnsComponent implements OnInit {

  returns: Array<Return>;
  areReturnsLoaded = false;

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
}
