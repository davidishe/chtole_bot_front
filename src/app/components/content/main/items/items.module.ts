import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatBtnSmallModule } from 'src/app/components/kit/buttons/mat-btn-small/mat-btn-small.module';
import { RouterModule } from '@angular/router';
import { ItemDetailedCardModule } from 'src/app/components/kit/item-detailed-card/item-detailed-card.module';
import { ItemForm2Module } from 'src/app/components/kit/forms/members/item-form2.module';
import { ItemForm1Module } from 'src/app/components/kit/forms/item-form-1/item-form-1.module';

const UserModules = [
  CommonModule,
  MatPaginatorModule,
  MaterialModule,
  RouterModule,
  ItemForm2Module,
  ItemForm1Module,
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
