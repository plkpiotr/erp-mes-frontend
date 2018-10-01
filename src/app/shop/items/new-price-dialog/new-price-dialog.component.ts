import {Component, Inject} from '@angular/core';
import {ItemService} from "../../../services/item.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-new-price-dialog',
  templateUrl: './new-price-dialog.component.html',
  styleUrls: ['./new-price-dialog.component.scss']
})
export class NewPriceDialogComponent {

  price = null;

  constructor(public dialogRef: MatDialogRef<NewPriceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private itemService: ItemService) {
  }

  cancel() {
    this.dialogRef.close(null);
  }

  submit() {
    this.itemService.setNewPrice(this.data.id, this.price)
      .subscribe(() => {
        },
        err => console.log(err),
        () => this.cancel());
  }

  isPriceValid() {
    const regexp = new RegExp('^\\d+\\.\\d{2}$');
    return this.price != null && regexp.test(this.price.toString());
  }

}
