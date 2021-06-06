import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-input-datepicker',
  templateUrl: './input-datepicker.component.html',
  styleUrls: ['./input-datepicker.component.scss']
})
export class InputDatepickerComponent implements AfterViewInit,  OnInit {
  
  @Input() title: string;
  @Input() controlName: string;
  @Input() form: FormGroup;
  @Input() required: boolean;
  // @Input() value = new Date(2020, 11, "01");
  @Input() value;

  
  @ViewChild('picker',  {static: false}) datepicker: MatDatepicker<any>;
  
  constructor(
    private cdr: ChangeDetectorRef,
  ) { }
  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    if (this.datepicker && this.value) {
      this.form.get(this.controlName).patchValue(this.value);
    }
    this.cdr.detectChanges();

  }

}
