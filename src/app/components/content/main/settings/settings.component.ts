import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  item: any;
  form?: FormGroup;

  constructor() { }

  ngOnInit() {
    this.onFormInit();
  }


  onFormInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      chatId: new FormControl(null, Validators.required),
    });
  }

  submit() {
    
  }

}
