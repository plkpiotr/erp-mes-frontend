import {Component, OnInit, ViewChild} from '@angular/core';
import {PlanningService} from '../../../services/planning.service';
import {SpecialPlan} from '../../../types';
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {ErrorDialogComponent} from "../../../custom/error-dialog/error-dialog.component";
import {Router} from "@angular/router";

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

  constructor(private planningService: PlanningService, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.planningService.fetchSpecialPlans().subscribe(res => {
      this.specialPlans = res;
    }, err => {
      if (err.status == 401) {
        this.router.navigate(['/login']);
      } else {
        this.showError(err);
      }
    }, () => {
      this.arePlansLoaded = true;
      this.dataSource = new MatTableDataSource<SpecialPlan>(this.specialPlans);
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
