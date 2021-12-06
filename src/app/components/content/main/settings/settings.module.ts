import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { TitleModule } from 'src/app/components/kit/titles/title/title.module';
import { InputTextModule } from 'src/app/components/kit/inputs/input-text/input-text.module';
import { MatBtnSmallModule } from 'src/app/components/kit/buttons/mat-btn-small/mat-btn-small.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    TitleModule,
    InputTextModule,
    MatBtnSmallModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    SettingsComponent
  ]
})
export class SettingsModule { }
