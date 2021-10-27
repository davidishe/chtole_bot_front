import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MemberDetailedComponent } from './member-detailed.component';
import { MatBtnSmallModule } from '../../../../kit/buttons/mat-btn-small/mat-btn-small.module';
import { RouterModule } from '@angular/router';
import { TitleModule } from '../../../../kit/titles/title/title.module';


@NgModule({
  declarations: [
    MemberDetailedComponent
  ],
  imports: [
    CommonModule,
    MatBtnSmallModule,
    RouterModule,
    TitleModule,
  ],
  exports: [
    MemberDetailedComponent
  ]
})
export class MemberDetailedModule { }
