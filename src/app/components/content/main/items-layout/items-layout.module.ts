import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsLayoutComponent } from './items-layout.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatBtnSmallModule } from 'src/app/components/kit/buttons/mat-btn-small/mat-btn-small.module';
import { RouterModule } from '@angular/router';
import { ItemDetailedCardModule } from 'src/app/components/kit/item-detailed-card/item-detailed-card.module';
import { MatTableRowModule } from 'src/app/components/kit/mat-table-row/mat-table-row.module';
import { ItemForm1Module } from 'src/app/components/kit/forms/item-form-1/item-form-1.module';

const UserModules = [
  CommonModule,
  MatPaginatorModule,
  MaterialModule,
  RouterModule,
  ItemForm1Module,
  MatBtnSmallModule
];

@NgModule({
  declarations: [
    ItemsLayoutComponent
  ],
  imports: [
    UserModules,
    MatTableRowModule
  ],
  exports: [
    ItemsLayoutComponent
  ]
})
export class ItemsLayoutModule { }
