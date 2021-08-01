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
  selectedItemId?: number;
  @Input() controlName: string;
  @Input() form: FormGroup;
  
  constructor() { }

  ngOnInit() {
    // if (this.selectedItemId >= 0) {
    //   this.form.get(this.controlName).patchValue(this.selectedItemId);
    // }


    if (this.items) {
      this.items.forEach(item => {
        if (item.selected === true) {
          this.selectedItemId = item.id;
          this.form.get(this.controlName).patchValue(this.selectedItemId);
        }
      });      
    }



  }

}
