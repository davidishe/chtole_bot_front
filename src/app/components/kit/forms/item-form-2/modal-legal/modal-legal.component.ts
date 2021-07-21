import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IIndividOwner, ILegalOwner } from 'src/app/shared/models/items/owners';
import { OwnerIndividualService } from '../owner-individual.service';
import { OwnerLegalService } from '../owner-legal.service';

@Component({
  selector: 'app-modal-legal',
  templateUrl: './modal-legal.component.html',
  styleUrls: ['./modal-legal.component.scss']
})
export class ModalLegalComponent implements OnInit {

  form: FormGroup;
  owner: ILegalOwner;
  @Output() savedOwner = new EventEmitter<ILegalOwner>();
  
  constructor(
    public dialog: MatDialog,
    private ref: ChangeDetectorRef,
    private ownerService: OwnerLegalService
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

      this.ownerService.addLegalOwner(this.owner, 2).subscribe((res: any) => {
        this.owner = res;
        this.savedOwner.emit(this.owner);

      })
    }
  }


  createFormIndivid(){
    this.form = new FormGroup({
      shareValue: new FormControl(null, Validators.required),
      shortName: new FormControl(null, Validators.required),
      innNumber: new FormControl(null, Validators.required),
      ogrnNumber: new FormControl(null, Validators.required),
      mainOkved: new FormControl(null, Validators.required),
      legalAddress: new FormControl(null, Validators.required),
    });
  }


  ngAfterViewInit() {
    this.ref.detectChanges();
  }

}
