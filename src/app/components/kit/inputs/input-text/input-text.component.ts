import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit, ControlValueAccessor {

  @ViewChild('input', {static: true}) input: ElementRef;
  @Input() type?: string;
  @Input() value?: string;
  @Input() id?: string;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() isNumericOnly?: boolean;
  @Input() maxiLength?: string;
  @Input() miniLength?: string;
  

  @Output() outputEvent? = new EventEmitter<Event>();

  isEdited: boolean = false;
  isActive: boolean = true;


  constructor(
    @Self() public controlDir: NgControl
  ) {
    controlDir.valueAccessor = this;
  }

  is(o: any) {
    console.log(o);
  }

  ngOnInit() {
    const control = this.controlDir.control;
    const validators = control.validator ? [control.validator] : [];
    const asyncValidators = control.asyncValidator ? [control.asyncValidator] : [];

    control.setValidators(validators);
    control.setAsyncValidators(asyncValidators);
    control.updateValueAndValidity();

    if (this.value === '' || this.value === null) {
      this.writeValue('');
    }

    if (this.value !== '' || this.value !== null) {
      control.patchValue(this.value);
    }

    if (!this.maxiLength) {
      this.maxiLength = '300';
    }

  }

  onChange(event) {
  }

  onTouched() {
  }

  writeValue(obj: any): void {
    this.input.nativeElement.value  = obj || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  numberOnly(event): boolean {

    if (this.isNumericOnly) {
      const charCode = (event.which) ? event.which : event.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
        return false;
      }
      return true;
    }
  }

  // setDisabledState?(isDisabled: boolean): void {
  //   throw new Error('Method not implemented.');
  // }


}
