import { NgIf } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IIndividOwner, ILegalOwner } from 'src/app/shared/models/items/owners';
import { OwnerService } from '../owner.service';


@Component({
  selector: 'app-item-form-individual',
  templateUrl: './item-form-individual.component.html',
  styleUrls: ['./item-form-individual.component.scss']
})


export class ItemFormIndividualComponent implements AfterViewInit {

  @Input() individualForm: FormGroup;
  @Input() individualFormArray: FormArray;
  @Input() itemId: number;
  @Input() owner?: IIndividOwner;

  @Output() outputEntity = new EventEmitter<IIndividOwner>();

  


  constructor(
    private formBuilder: FormBuilder,
    private ownerService: OwnerService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    

  }


  // onSubmit(index: number){
  //   const valueForMap = this.individualForm.value.individualFormArray[index];
  //   // this.mapItem(valueForMap);
  //   this.item = valueForMap;
  //   console.log(this.item);
    
  // }

  onSubmit(index: number){
    const valueForMap = this.individualForm.value.individualFormArray[index];
    this.owner = valueForMap;
    this.ownerService.addIndividualOwner(this.owner, this.itemId).subscribe((res: IIndividOwner) => {
      if (res) {
        this.outputEntity.emit(res);
        this.removeRow(index);
        this.openSnackBar('данные сохранены')
      }
    })
    
  }




  removeRow(index: number) {
    (<FormArray>this.individualForm.get("individualFormArray")).removeAt(index);
  }

  mapItem(): void {
    // this.item.innNumber = ;
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }

}
