import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsLayoutComponent } from './items-layout.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatBtnSmallModule } from 'src/app/components/kit/buttons/mat-btn-small/mat-btn-small.module';
import { RouterModule } from '@angular/router';
import { MatTableRowModule } from 'src/app/components/kit/mat-table-row/mat-table-row.module';
import { ItemAddModule } from 'src/app/components/kit/forms/item-add/item-add.module';

const UserModules = [
  CommonModule,
  MatPaginatorModule,
  MaterialModule,
  RouterModule,
  ItemAddModule,
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
