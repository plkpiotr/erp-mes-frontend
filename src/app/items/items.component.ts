import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ItemService} from "../item.service";
import {Item} from "../types";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  areItemsLoaded = false;
  items: Item[];
  showAddSpecialOffer = false;
  percentOff: string;
  query = '';

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
