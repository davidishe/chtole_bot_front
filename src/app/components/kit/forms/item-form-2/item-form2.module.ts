import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemFormComponent2 } from './item-form2.component';
import { MatBtnSmallModule } from '../../buttons/mat-btn-small/mat-btn-small.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from '../../inputs/input-text/input-text.module';
import { TitleModule } from '../../titles/title/title.module';
import { DropdownModule } from '../../inputs/dropdown/dropdown.module';
import { InputDatepickerModule } from '../../inputs/input-datepicker/input-datepicker.module';
import { DadataEgrulModule } from '../../dadata/dadata-egrul/dadata-egrul.module';
import { DadataAddressModule } from '../../dadata/dadata-address/dadata-address.module';
import { SubtitleModule } from '../../titles/subtitle/subtitle.module';
import { ModalModule } from './modal/modal.module';
import { ModalIndividualModule } from './modal-individual/modal-individual.module';
import { ModalLegalModule } from './modal-legal/modal-legal.module';



@NgModule({
  declarations: [
    ItemFormComponent2,
  ],
  imports: [
    CommonModule,
    MatBtnSmallModule,
    InputTextModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    TitleModule,
    DropdownModule,
    InputDatepickerModule,
    DadataEgrulModule,
    DadataAddressModule,
    SubtitleModule,
    ModalModule,
    ModalIndividualModule,
    ModalLegalModule


  ],
  exports: [
    ItemFormComponent2
  ]
})
export class ItemForm2Module { }
