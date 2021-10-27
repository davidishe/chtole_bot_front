import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemAddComponent } from './item-add.component';
import { MatBtnSmallModule } from '../../../../kit/buttons/mat-btn-small/mat-btn-small.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from '../../../../kit/inputs/input-text/input-text.module';
import { TitleModule } from '../../../../kit/titles/title/title.module';
import { DropdownModule } from '../../../../kit/inputs/dropdown/dropdown.module';
import { InputDatepickerModule } from '../../../../kit/inputs/input-datepicker/input-datepicker.module';
import { InputTextAreaModule } from '../../../../kit/inputs/input-text-area/input-text-area.module';



@NgModule({
  declarations: [
    ItemAddComponent
  ],
  imports: [
    CommonModule,
    MatBtnSmallModule,
    InputTextModule,
    RouterModule,
    ReactiveFormsModule,
    TitleModule,
    DropdownModule,
    InputDatepickerModule,
    InputTextAreaModule
  ],

  exports: [
    ItemAddComponent
  ]
})
export class ItemAddModule { }
