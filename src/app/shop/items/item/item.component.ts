import { Component, OnInit } from '@angular/core';
import {Item} from '../../../types';
import {ItemService} from '../../../services/item.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  isItemLoaded = false;
  item: Item;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.fetchItem();
  }

  fetchItem() {
    this.itemService.fetchOneItem(this.route.snapshot.params['id']).subscribe(res => {
      this.item = res;
    }, err => {
      console.log(err);
    }, () => {
      this.isItemLoaded = true;
    });
  }
}
