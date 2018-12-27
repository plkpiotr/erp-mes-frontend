import {Component, OnInit, ViewChild} from '@angular/core';
import {Return} from '../../../types';
import {ReturnService} from '../../../services/return.service';
import {Router} from '@angular/router';
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {ErrorDialogComponent} from "../../../custom/error-dialog/error-dialog.component";

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.scss']
})
export class ReturnsComponent implements OnInit {

  returns: Array<Return>;
  areReturnsLoaded = false;
  dataSource: MatTableDataSource<Return> = new MatTableDataSource([]);
  paginator: any;

  @ViewChild(MatPaginator)
  set pagination(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private returnService: ReturnService, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchReturns();
  }

  fetchReturns() {
    this.returnService.fetchAllReturns().subscribe(res => {
      this.returns = res;
    }, err => {
      if (err.status == 401) {
        this.router.navigate(['/login']);
      } else {
        this.showError(err);
      }
    }, () => {
      this.areReturnsLoaded = true;
      this.dataSource = new MatTableDataSource<Return>(this.returns);
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
