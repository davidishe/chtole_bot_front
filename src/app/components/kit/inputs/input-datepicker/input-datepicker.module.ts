import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDatepickerComponent } from './input-datepicker.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextMaskModule } from 'angular2-text-mask';



@NgModule({
  declarations: [
    InputDatepickerComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    TextMaskModule
  ],
  exports: [
    InputDatepickerComponent
  ]
})
export class InputDatepickerModule { }
