import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IIndividOwner, ILegalOwner } from 'src/app/shared/models/items/owners';
import { OwnerIndividualService } from '../owner-individual.service';

@Component({
  selector: 'app-modal-individual',
  templateUrl: './modal-individual.component.html',
  styleUrls: ['./modal-individual.component.scss']
})
export class ModalIndividualComponent implements OnInit {

  form: FormGroup;
  owner: IIndividOwner;
  @Output() savedOwner = new EventEmitter<IIndividOwner>();
  
  constructor(
    public dialog: MatDialog,
    private ref: ChangeDetectorRef,
    private ownerService: OwnerIndividualService
  ) { }

  ngOnInit() {
    this.createFormIndivid();
  }



  submitUpdate() {
      if (this.form.invalid) {
      console.log('errrrrror');
      return;
    } else {

      this.owner = this.form.value;

      this.ownerService.addIndividualOwner(this.owner, 2).subscribe((res: any) => {
        this.owner = res;
        this.savedOwner.emit(this.owner);

      })
    }
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
