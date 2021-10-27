import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemAddComponent } from './item-add.component';
import { MatBtnSmallModule } from '../../buttons/mat-btn-small/mat-btn-small.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from '../../inputs/input-text/input-text.module';
import { TitleModule } from '../../titles/title/title.module';
import { DropdownModule } from '../../inputs/dropdown/dropdown.module';
import { InputDatepickerModule } from '../../inputs/input-datepicker/input-datepicker.module';
import { InputTextAreaModule } from '../../inputs/input-text-area/input-text-area.module';



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
