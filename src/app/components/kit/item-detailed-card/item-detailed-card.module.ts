import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemDetailedCardComponent } from './item-detailed-card.component';
import { CardModule } from '../card/card.module';
import { MatBtnSmallModule } from '../buttons/mat-btn-small/mat-btn-small.module';
import { RouterModule } from '@angular/router';
import { ItemFormEditModule } from '../item-form-edit/item-form-edit.module';
import { TitleModule } from '../title/title.module';



@NgModule({
  declarations: [
    ItemDetailedCardComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    MatBtnSmallModule,
    RouterModule,
    ItemFormEditModule,
    TitleModule
  ],
  exports: [
    ItemDetailedCardComponent
  ]
})
export class ItemDetailedCardModule { }
