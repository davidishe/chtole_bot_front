import { Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { IIndividOwner } from 'src/app/shared/models/items/owners';


type Item = IIndividOwner;

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss']
})


export class ChipListComponent implements OnInit {

  @Input() items: Item[];
  @Output() itemEmiter = new EventEmitter<Item>();
  @Input() selectedItemId?: number;
  selectedItemIdInner?: number;

  hoveredItem: Item; 


  constructor() { }

  ngOnInit() {
    if (this.items) {
      console.log(this.items);
      
    }
  }

  // setHoveredItem(item: Item): void {

  //   if (this.hoveredItem === item) {
  //     this.hoveredItem = null;
  //     this.itemEmiter.emit(this.hoveredItem);
  //   }
  //   else {
  //     this.hoveredItem = item;
  //     this.itemEmiter.emit(this.hoveredItem);
  //   }

  // }

  // getSelectedIndex(): number {
  //   if (this.hoveredItem) {
  //     var index = this.items.findIndex(u => u === this.hoveredItem);
  //     return index;     
  //   }
  //   else {
  //     this.selectedItemId;
  //   }
  // }

  selectIndex(index: number, item: Item) {
    console.log(index);
    console.log(item.id);
    console.log(this.selectedItemId);

    // this.selectedItemId = item.id;

    // убираем selectedItemId если он уже выбран
    if ((this.selectedItemId == item.id) && this.selectedItemId != null) {
      console.log('убираем');
      this.selectedItemId = null;
      this.itemEmiter.emit(item);
    }

    // selectedItemId равняется item.id по которому кликнули
    if ((this.selectedItemId != item.id) && this.selectedItemId != null) {
      this.selectedItemId = item.id;
      this.itemEmiter.emit(item);

      console.log('добавляем');

    }


    if ((this.selectedItemId == item.id) && this.selectedItemId == null) {
      this.selectedItemId = item.id;
      console.log('sfsfsfs');
    }


    if ((this.selectedItemId != item.id) && this.selectedItemId == null) {
      this.selectedItemId = -1;
      console.log('123123123');
    }
    
  }


}
