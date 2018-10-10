import {Component, OnInit, ViewChild} from '@angular/core';
import {PlanningService} from '../../../services/planning.service';
import {SpecialPlan} from '../../../types';
import {MatPaginator, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-special-plans',
  templateUrl: './special-plans.component.html',
  styleUrls: ['./special-plans.component.scss']
})
export class SpecialPlansComponent implements OnInit {

  specialPlans: Array<SpecialPlan>;
  arePlansLoaded = false;
  dataSource: MatTableDataSource<SpecialPlan> = new MatTableDataSource([]);
  paginator: any;

  @ViewChild(MatPaginator)
  set pagination(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private planningService: PlanningService) {
  }

  ngOnInit() {
    this.planningService.fetchSpecialPlans().subscribe(res => {
      this.specialPlans = res;
    }, err => {
      console.log(err);
    }, () => {
      this.arePlansLoaded = true;
      this.dataSource = new MatTableDataSource<SpecialPlan>(this.specialPlans);
    });
  }
}
