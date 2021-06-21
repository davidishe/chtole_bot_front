import { Component, Input } from '@angular/core';
import { IItem } from 'src/app/shared/models/items/item';

@Component({
  selector: 'app-mat-table-row',
  templateUrl: './mat-table-row.component.html',
  styleUrls: ['./mat-table-row.component.scss']
})
export class MatTableRowComponent {

  @Input() content?: string;
  @Input() isHidden?: boolean;
  @Input() item?: IItem;
  @Input() detailedMode?: boolean;
  @Input() link?: string;
  @Input() type?: string;

  constructor(
  ) {
    this.detailedMode = true;
  }


}
