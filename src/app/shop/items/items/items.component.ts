import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ItemService} from '../../../services/item.service';
import {Item} from '../../../types';
import {MatPaginator, MatTableDataSource} from "@angular/material";

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
              private itemService: ItemService) {
  }

  ngOnInit() {
    this.fetchItems();
  }

  fetchItems() {
    this.itemService.fetchAllItems().subscribe(res => {
      this.items = res;
    }, err => {
      console.log(err);
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
    this.areItemsLoaded = false;
    this.itemService.setSpecialOffer(this.percentOff, this.query).subscribe(res => {
    }, err => {
      console.log(err);
    }, () => {
      this.fetchItems();
    });
  }

  cancelSpecialOffer() {
    this.areItemsLoaded = false;
    this.itemService.cancelSpecialOffer().subscribe(res => {
      this.items = res;
    }, err => {
      console.log(err);
    }, () => {
      this.areItemsLoaded = true;
    });
  }
}
