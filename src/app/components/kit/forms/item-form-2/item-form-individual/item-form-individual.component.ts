import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ILegalOwner } from 'src/app/shared/models/items/owners';
import { ItemFormLegalService } from '../item-form-legal/item-form-legal.service';


@Component({
  selector: 'app-item-form-individual',
  templateUrl: './item-form-individual.component.html',
  styleUrls: ['./item-form-individual.component.scss']
})


export class ItemFormIndividualComponent implements OnInit {

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
    
  }

  removeRow(index: number) {
    (<FormArray>this.gaugeTitleForm.get("gaugeTitles")).removeAt(index);
  }

  mapItem(): void {
    // this.item.innNumber = ;
  }

}
