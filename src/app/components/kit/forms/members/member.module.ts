import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemFormComponent2, MemberComponent } from './member.component';
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
import { ModalIndividualModule } from './member-add/modal-individual.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatTableRowModule } from '../../mat-table-row/mat-table-row.module';



@NgModule({
  declarations: [
    MemberComponent,
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
    ModalIndividualModule,
    MatPaginatorModule,
    MatTableRowModule

  ],
  exports: [
    MemberComponent
  ]
})
export class MemberModule { }
