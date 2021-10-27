import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatBtnSmallModule } from 'src/app/components/kit/buttons/mat-btn-small/mat-btn-small.module';
import { RouterModule } from '@angular/router';
import { ItemAddModule } from 'src/app/components/content/main/clients/item-add/item-add.module';

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
