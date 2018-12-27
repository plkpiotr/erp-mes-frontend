import {Component, OnInit} from '@angular/core';
import {Item} from '../../../types';
import {ItemService} from '../../../services/item.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NewPriceDialogComponent} from "../new-price-dialog/new-price-dialog.component";
import {MatDialog} from "@angular/material";
import {ErrorDialogComponent} from "../../../custom/error-dialog/error-dialog.component";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  isItemLoaded = false;
  item: Item;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.fetchItem();
  }

  fetchItem() {
    this.itemService.fetchOneItem(this.route.snapshot.params['id']).subscribe(res => {
      this.item = res;
    }, err => {
      if (err.status == 401) {
        this.router.navigate(['/login']);
      } else {
        this.showError(err);
      }
    }, () => {
      this.isItemLoaded = true;
    });
  }

  changePrice() {
    const dialogRef = this.dialog.open(NewPriceDialogComponent, {
      width: '350px',
      data: {id: this.item.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isItemLoaded = false;
      this.fetchItem();
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

    dialogRef.afterClosed().subscribe(() => this.router.navigate(['/items']));
  }
}
