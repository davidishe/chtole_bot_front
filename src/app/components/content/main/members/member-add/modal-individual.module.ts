import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalIndividualComponent } from './modal-individual.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatBtnSmallModule } from '../../../../kit/buttons/mat-btn-small/mat-btn-small.module';
import { IconModule } from '../../../../kit/icon/icon.module';
import { DropdownModule } from '../../../../kit/inputs/dropdown/dropdown.module';
import { InputTextModule } from '../../../../kit/inputs/input-text/input-text.module';
import { TitleModule } from '../../../../kit/titles/title/title.module';



@NgModule({
  declarations: [
    ModalIndividualComponent
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
    ModalIndividualComponent
  ]
})
export class ModalIndividualModule { }
