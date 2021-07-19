import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OfficeService } from 'src/app/services/catalogs/office.service';
import { IIndividOwner, ILegalOwner } from 'src/app/shared/models/items/owners';
import { OwnerService } from '../owner.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {
  form: FormGroup;
  @Input() owner: IIndividOwner;
  @Output() emitUpdatedOwner = new EventEmitter<IIndividOwner | ILegalOwner>();

  
  constructor(
    public dialog: MatDialog,
    private ref: ChangeDetectorRef,
    private ownerService: OwnerService
  ) { }

  ngOnInit() {
    this.createFormIndivid();
  }



  submitUpdate() {
      if (this.form.invalid) {
      console.log('errrrrror');
      return;
    } else {

      this.patchValuesFromControls();
      this.ownerService.updateIndividualOwner(this.owner).subscribe((res: any) => {
        this.owner = res;
      })
    }
  }

  patchValuesFromControls(): void {
    console.log(this.owner);
    console.log(this.form.value);
    this.owner.cityzenType = this.form.controls.cityzenType.value;
    this.owner.shareValue = this.form.controls.shareValue.value;
    this.owner.innNumber = this.form.controls.innNumber.value;
    this.owner.snilsNumber = this.form.controls.snilsNumber.value;
    this.owner.firstName = this.form.controls.firstName.value;
    this.owner.familyName = this.form.controls.familyName.value;
    this.owner.fatherName = this.form.controls.fatherName.value;
    this.owner.birthPlace = this.form.controls.birthPlace.value;
  }

  createFormIndivid(){
    this.form = new FormGroup({
      shareValue: new FormControl(null, Validators.required),
      cityzenType: new FormControl(null, Validators.required),
      familyName: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      fatherName: new FormControl(null, Validators.required),
      innNumber: new FormControl(null, Validators.required),
      // birthDate: new FormControl(null, [Validators.nullValidator, Validators.required]),
      // birthDateHidden: new FormControl(null, [Validators.nullValidator, Validators.required]),
      birthPlace: new FormControl(null, Validators.required),
      snilsNumber: new FormControl(null, Validators.required)
    });
  }


  ngAfterViewInit() {
    this.ref.detectChanges();
  }

}
