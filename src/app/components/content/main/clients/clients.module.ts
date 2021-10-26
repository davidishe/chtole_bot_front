import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsLayoutModule } from '../items-layout/items-layout.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatBtnSmallModule } from 'src/app/components/kit/buttons/mat-btn-small/mat-btn-small.module';
import { RouterModule } from '@angular/router';
import { TitleModule } from 'src/app/components/kit/titles/title/title.module';
import { ClientsComponent } from './clients.component';
import { InputTextModule } from 'src/app/components/kit/inputs/input-text/input-text.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClientsComponent
  ],
  imports: [
    CommonModule,
    ItemsLayoutModule,
    MatPaginatorModule,
    MaterialModule,
    MatBtnSmallModule,
    RouterModule,
    TitleModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ClientsComponent
  ]
})
export class ClientsModule { }
