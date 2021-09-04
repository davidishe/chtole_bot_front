import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MemberDetailedComponent } from './member-detailed.component';
import { MatBtnSmallModule } from '../../../buttons/mat-btn-small/mat-btn-small.module';
import { RouterModule } from '@angular/router';
import { TitleModule } from '../../../titles/title/title.module';
import { ItemForm1Module } from '../../item-form-1/item-form-1.module';



@NgModule({
  declarations: [
    MemberDetailedComponent
  ],
  imports: [
    CommonModule,
    MatBtnSmallModule,
    RouterModule,
    TitleModule,
    ItemForm1Module
  ],
  exports: [
    MemberDetailedComponent
  ]
})
export class MemberDetailedModule { }
