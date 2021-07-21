import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalLegalComponent } from './modal-legal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatBtnSmallModule } from '../../../buttons/mat-btn-small/mat-btn-small.module';
import { IconModule } from '../../../icon/icon.module';
import { DropdownModule } from '../../../inputs/dropdown/dropdown.module';
import { InputTextModule } from '../../../inputs/input-text/input-text.module';
import { TitleModule } from '../../../titles/title/title.module';



@NgModule({
  declarations: [
    ModalLegalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TitleModule,
    IconModule,
    MatBtnSmallModule,
    MatDialogModule,
    DropdownModule,
    MatSelectModule,
    MatFormFieldModule,
    InputTextModule
  ],
  exports: [
    ModalLegalComponent
  ]
})
export class ModalLegalModule { }
