import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ItemService} from '../../../services/item.service';
import {Item} from '../../../types';
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {SpecialOfferDialogComponent} from "../special-offer-dialog/special-offer-dialog.component";
import {ErrorDialogComponent} from "../../../custom/error-dialog/error-dialog.component";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  areItemsLoaded = false;
  items: Array<Item>;
  showAddSpecialOffer = false;
  percentOff: string;
  query = '';
  dataSource: MatTableDataSource<Item> = new MatTableDataSource([]);
  paginator: any;

  @ViewChild(MatPaginator)
  set pagination(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private router: Router,
              private itemService: ItemService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchItems();
  }

  fetchItems() {
    this.itemService.fetchAllItems().subscribe(res => {
      this.items = res;
    }, err => {
      if (err.status == 401) {
        this.router.navigate(['/login']);
      } else {
        this.showError(err, true);
      }
    }, () => {
      this.areItemsLoaded = true;
      this.dataSource = new MatTableDataSource<Item>(this.items);
    });
  }

  fetchItem(id: number) {
    this.router.navigate(['items', id]);
  }

  addItem() {
    this.router.navigate(['/items/add']);
  }

  addSpecialOffer() {
    const dialogRef = this.dialog.open(SpecialOfferDialogComponent, {
      width: '350px',
      data: {percentOff: this.percentOff, query: this.query}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.percentOff = result.percentOff;
        this.query = result.query == null ? '' : result.query;
        this.areItemsLoaded = false;
        this.itemService.setSpecialOffer(this.percentOff, this.query).subscribe(res => {
        }, err => {
          if (err.status == 401) {
            this.router.navigate(['/login']);
          } else {
            this.showError(err, false);
          }
        }, () => {
          this.fetchItems();
        });
      }
    });
  }

  cancelSpecialOffer() {
    this.areItemsLoaded = false;
    this.itemService.cancelSpecialOffer().subscribe(res => {
      this.items = res;
    }, err => {
      if (err.status == 401) {
        this.router.navigate(['/login']);
      } else {
        this.showError(err, false);
      }
    }, () => {
      this.areItemsLoaded = true;
      this.dataSource = new MatTableDataSource<Item>(this.items);
    });
  }

  showError(err, redirect: boolean) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error,
        status: err.status
      }
    });

    if (redirect) {
      dialogRef.afterClosed().subscribe(() => this.router.navigate(['/employees']));
    }
  }
}
