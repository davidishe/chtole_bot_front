import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberComponent } from './member.component';
import { MatBtnSmallModule } from '../../../kit/buttons/mat-btn-small/mat-btn-small.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from '../../../kit/inputs/input-text/input-text.module';
import { TitleModule } from '../../../kit/titles/title/title.module';
import { DropdownModule } from '../../../kit/inputs/dropdown/dropdown.module';
import { InputDatepickerModule } from '../../../kit/inputs/input-datepicker/input-datepicker.module';
import { DadataEgrulModule } from '../../../kit/dadata/dadata-egrul/dadata-egrul.module';
import { DadataAddressModule } from '../../../kit/dadata/dadata-address/dadata-address.module';
import { SubtitleModule } from '../../../kit/titles/subtitle/subtitle.module';
import { ModalIndividualModule } from './member-add/modal-individual.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableRowModule } from '../../../kit/mat-table-row/mat-table-row.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GenericCardModule } from 'src/app/components/kit/cards/generic-card/generic-card.module';



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
    DadataAddressModule,
    SubtitleModule,
    ModalIndividualModule,
    MatPaginatorModule,
    MatTableRowModule,
    MatProgressSpinnerModule,
    GenericCardModule

  ],
  exports: [
    MemberComponent
  ]
})
export class MemberModule { }
