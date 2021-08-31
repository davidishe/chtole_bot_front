import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemDetailedCardComponent } from './item-detailed-card.component';
import { MatBtnSmallModule } from '../buttons/mat-btn-small/mat-btn-small.module';
import { RouterModule } from '@angular/router';
import { TitleModule } from '../titles/title/title.module';
import { ItemForm1Module } from '../forms/item-form-1/item-form-1.module';



@NgModule({
  declarations: [
    ItemDetailedCardComponent
  ],
  imports: [
    CommonModule,
    MatBtnSmallModule,
    RouterModule,
    TitleModule,
    ItemForm1Module
  ],
  exports: [
    ItemDetailedCardComponent
  ]
})
export class ItemDetailedCardModule { }
