import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBtnSmallModule } from '../../buttons/mat-btn-small/mat-btn-small.module';
import { MatButtonModule } from '../../buttons/mat-button/mat-button.module';
import { BannerBigComponent } from './banner-big.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BannerBigComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [
    BannerBigComponent
  ]
})
export class BannerBigModule { }
