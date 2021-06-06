import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() title: string;
  @Input() items: any;
  @Input() selectedItemId?: number;
  @Input() controlName: string;
  @Input() form: FormGroup;
  
  constructor() { }

  ngOnInit() {
    if (this.selectedItemId >= 0) {
      this.form.get(this.controlName).patchValue(this.selectedItemId);
    }
  }

}
