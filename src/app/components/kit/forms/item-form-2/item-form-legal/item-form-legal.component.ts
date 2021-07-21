import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ILegalOwner } from 'src/app/shared/models/items/owners';
import { OwnerLegalService } from '../owner-legal.service';

@Component({
  selector: 'app-item-form-legal',
  templateUrl: './item-form-legal.component.html',
  styleUrls: ['./item-form-legal.component.scss']
})
export class ItemFormLegalComponent implements OnInit {

  @Input() gaugeTitleForm: FormGroup;
  @Input() gaugeTitles: FormArray;
  @Input() itemId: number;
  @Input() itemForUpdate?: ILegalOwner;
  @Output() outputEntity = new EventEmitter<ILegalOwner>();

  item: ILegalOwner;


  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private ownerService: OwnerLegalService
  ) { }

  ngOnInit() {
  }


  onSubmit(index: number){
    const valueForMap = this.gaugeTitleForm.value.gaugeTitles[index];
    this.item = valueForMap;
    this.ownerService.addLegalOwner(this.item, this.itemId).subscribe((res: ILegalOwner) => {
      if (res) {
        this.outputEntity.emit(res);
        this.removeRow(index);
        this.openSnackBar('данные сохранены')
      }
    })
    
  }

  removeRow(index: number) {
    (<FormArray>this.gaugeTitleForm.get("gaugeTitles")).removeAt(index);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }

}
