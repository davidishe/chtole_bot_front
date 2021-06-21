import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AddressService } from './address.service';

/**
 * @title Highlight the first autocomplete option
 */

@Component({
  selector: 'app-dadata-address',
  templateUrl: './dadata-address.component.html',
  styleUrls: ['./dadata-address.component.scss']
})


export class DadataAddressComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  
  @Input() form: FormGroup;
  @Input() label?: string;
  @Input() controlName?: any;
  @Input() controlNameText?: string;
  @Input() inputValue?: string;
  @Input() placeholder?: string;

//   // addressControl = new FormControl();


  constructor(
    private addressService: AddressService
  ) { }


  ngOnInit() {
    if (this.inputValue) {
      this.form.get(this.controlNameText).patchValue(this.inputValue);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  filterOptions() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  getAddress(): void {
    const address = this.form.get(this.controlNameText).value;

    // this.mokOptions();


    this.addressService.getAddress(address).subscribe((response: any[]) => {
      if (response) {
        this.options = response;
        this.filterOptions();
      }

    })
  }


  mokOptions(): void {
    this.options = ['One', 'Two', 'Three'];
    this.filterOptions();
  }

}

