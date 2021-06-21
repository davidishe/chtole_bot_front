import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadataEgrulComponent } from './dadata-egrul.component';
import { MatBtnSmallModule } from '../../buttons/mat-btn-small/mat-btn-small.module';



@NgModule({
  declarations: [
    DadataEgrulComponent
  ],
  imports: [
    CommonModule,
    MatBtnSmallModule,

  ],
  exports: [
    DadataEgrulComponent
  ]
})
export class DadataEgrulModule { }
