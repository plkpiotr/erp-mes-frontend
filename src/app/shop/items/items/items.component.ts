import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ItemService} from '../../../services/item.service';
import {Item} from '../../../types';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  areItemsLoaded = false;
  items: Array<Item>;
  visibleItems: Array<Item>;
  showAddSpecialOffer = false;
  percentOff: string;
  query = '';

  itemsPerPage = 15;
  selectedPage = 1;
  pageNumbers: number[];

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
      this.setVisibleItems();
      this.setPageNumbers();
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

  setVisibleItems() {
    const pageIndex = (this.selectedPage - 1) * this.itemsPerPage;
    this.visibleItems = this.items.slice(
      pageIndex,
      pageIndex + this.itemsPerPage
    );
  }

  setPageNumbers() {
    this.pageNumbers = Array(
      Math.ceil(this.items.length / this.itemsPerPage)
    )
      .fill(0)
      .map((x, i) => i + 1);
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
    this.setVisibleItems();
  }

}
