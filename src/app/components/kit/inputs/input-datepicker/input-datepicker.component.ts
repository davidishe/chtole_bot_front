import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';


export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputDatepickerComponent),
  multi: true
};

const noop = () => {
};


@Component({
  selector: 'app-input-datepicker',
  templateUrl: './input-datepicker.component.html',
  styleUrls: ['./input-datepicker.component.scss'],
  providers: [
    CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR
  ],
})



export class InputDatepickerComponent implements ControlValueAccessor, AfterViewInit,  OnInit {
  
  @Input() title: string;
  @Input() controlName?: string;
  @Input() hiddenDatePickerName?: string;

  
  @Input() form: FormGroup;
  @Input() required: boolean;
  // @Input() value = new Date(2020, 11, "01");
  @Input() value?: Date;
  @Input() innerValue: Date;
  public mask = {
    guide: false,
    showMask: true,
    // keepCharPositions : true,
    mask: [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]
  };

  
  @ViewChild('picker',  {static: false}) datepicker: MatDatepicker<any>;
  @ViewChild('hiddenpickerinput',  {static: false}) hiddenDatePickerControl: ElementRef;
  @ViewChild('pickerinput',  {static: false}) input: ElementRef;


  
  constructor(
    private cdr: ChangeDetectorRef,
  ) { }
  ngOnInit(): void {
  }
  



  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;



  //get accessor
  getValue(): Date {
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  setValue(v: Date) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }
  //Occured value changed from module
  writeValue(value: any): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  onChange(event) {
    // console.log(event);
    // this.value = event;
    this.onBlur();  
  }
    
  todate(value){
    this.value = new Date(value);
  }

  onBlur() {
    this.onChangeCallback(this.innerValue);

    const newValue = this.form.get(this.hiddenDatePickerName).value;
    const date = new Date(newValue);

    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    var valueToReturn = dd + '.' + mm + '.' + yyyy;
    this.form.get(this.controlName).patchValue(valueToReturn);

    // console.log(this.form.get(this.hiddenDatePickerName).errors);
    
    if (this.form.get(this.hiddenDatePickerName).hasError('required') || this.form.get(this.hiddenDatePickerName).hasError('matDatepickerParse')) {
      this.form.get(this.controlName).setErrors({'incorrect': true});
    }

  }


  ngAfterViewInit(): void {
    if (this.datepicker && this.value) {
      // this.form.get(this.controlName).patchValue(this.value);
      this.onBlur();

    }

    
    this.cdr.detectChanges();


  }



}
