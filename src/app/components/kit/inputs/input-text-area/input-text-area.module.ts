import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextAreaComponent } from './input-text-area.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatBtnSmallModule } from '../../buttons/mat-btn-small/mat-btn-small.module';



@NgModule({
  declarations: [
    InputTextAreaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatBtnSmallModule,
    RouterModule
  ],
  exports: [
    InputTextAreaComponent
  ]
})
export class  InputTextAreaModule { }
