import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ILegalOwner } from 'src/app/shared/models/items/owners';
import { ItemFormLegalService } from './item-form-legal.service';

@Component({
  selector: 'app-item-form-legal',
  templateUrl: './item-form-legal.component.html',
  styleUrls: ['./item-form-legal.component.scss']
})
export class ItemFormLegalComponent implements OnInit {

  @Input() gaugeTitleForm: FormGroup;
  @Input() gaugeTitles: FormArray;
  item: ILegalOwner;


  constructor(
    private formBuilder: FormBuilder,
    private itemFormLegalService: ItemFormLegalService
  ) { }

  ngOnInit() {

  }


  onSubmit(index: number){
    const valueForMap = this.gaugeTitleForm.value.gaugeTitles[index];
    // this.mapItem(valueForMap);
    this.item = valueForMap;
    console.log(this.item);
    this.itemFormLegalService.createItem(this.item).subscribe((res: ILegalOwner) => {
      console.log(res);
    })
    
  }

  removeRow(index: number) {
    (<FormArray>this.gaugeTitleForm.get("gaugeTitles")).removeAt(index);
  }

  mapItem(): void {
    // this.item.innNumber = ;
  }

}
