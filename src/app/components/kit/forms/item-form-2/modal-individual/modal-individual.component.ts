import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IMember } from 'src/app/shared/models/items/member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-modal-individual',
  templateUrl: './modal-individual.component.html',
  styleUrls: ['./modal-individual.component.scss']
})
export class ModalIndividualComponent implements OnInit {

  form: FormGroup;
  owner: IMember;
  @Output() savedOwner = new EventEmitter<IMember>();
  
  constructor(
    public dialog: MatDialog,
    private ref: ChangeDetectorRef,
    private memberService: MemberService
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

      this.memberService.add(this.owner, 2).subscribe((res: any) => {
        this.owner = res;
        this.savedOwner.emit(this.owner);

      })
    }
  }


  createFormIndivid(){
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }


  ngAfterViewInit() {
    this.ref.detectChanges();
  }

}
