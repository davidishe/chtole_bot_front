import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from 'src/app/shared/material.module';
import { CardModule } from 'src/app/components/kit/card/card.module';
import { MatBtnSmallModule } from 'src/app/components/kit/buttons/mat-btn-small/mat-btn-small.module';
import { RouterModule } from '@angular/router';
import { ItemFormModule } from 'src/app/components/kit/forms/item-form/item-form.module';
import { ItemDetailedCardModule } from 'src/app/components/kit/item-detailed-card/item-detailed-card.module';
import { ItemForm2Module } from 'src/app/components/kit/forms/item-form-2/item-form2.module';
import { ItemForm3Module } from 'src/app/components/kit/forms/item-form-3/item-form3.module';

const UserModules = [
  CommonModule,
  MatPaginatorModule,
  MaterialModule,
  CardModule,
  RouterModule,
  ItemFormModule,
  ItemForm2Module,
  ItemForm3Module,
  MatBtnSmallModule
];

@NgModule({
  declarations: [
    ItemsComponent
  ],
  imports: [
    UserModules  
  ],
  exports: [
    ItemsComponent
  ]
})
export class ItemsModule { }
