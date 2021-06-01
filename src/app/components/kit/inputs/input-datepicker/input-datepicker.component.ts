import { Time } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-datepicker',
  templateUrl: './input-datepicker.component.html',
  styleUrls: ['./input-datepicker.component.scss']
})
export class InputDatepickerComponent implements OnInit {

  @Input() title: string;
  @Input() controlName: string;
  @Input() form: FormGroup;
  @Input() required: boolean;

  constructor() { }

  ngOnInit() {
  }

}
