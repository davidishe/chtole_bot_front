import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IItem } from 'src/app/shared/models/items/item';
import { IMember } from 'src/app/shared/models/items/member';
import { IShelter } from 'src/app/shared/models/shelters/shelter';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ItemsService } from '../../items/items.service';
import { AccountService } from '../../../../kit/layouts/account/account.service';
import { MemberService } from '../member.service';

type Item = IMember;

@Component({
  selector: 'app-member-detailed',
  templateUrl: './member-detailed.component.html',
  styleUrls: ['./member-detailed.component.scss']
})

export class MemberDetailedComponent implements OnInit {

  item: Item;
  itemId: number;
  type: string;
  progress: boolean;
  formData = new FormData();
  isEdited: boolean;
  itemForm?: FormGroup;
  

  constructor(
    private memberService: MemberService,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    public accountService: AccountService,
    private router: Router,

  ) {
      this.breadcrumbService.set('@productDetails', '');
  }

  ngOnInit() {
    this.onFormInit();
  }


  ngAfterViewInit(): void {
    this.itemId = +this.activatedRoute.snapshot.paramMap.get('id');
    setTimeout(() => {
      this.loadItemWithOptions();
      
    }, 100);
  }


  patchValues() {
    this.itemForm.controls.name.patchValue(this.item.name);
  }


  loadItemWithOptions(): void {
    this.loadPetByGuId();
  }


  onFormInit() {
    this.itemForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }

  loadPetByGuId() {
      this.memberService.getById(this.itemId).subscribe((response: Item) => {
        if (response) {
          this.item = response;
          this.breadcrumbService.set('@productDetails', this.item.name);
          this.patchValues();
        }
    }, err => {
      console.log(err);
    });
  }


  getEmitedOutputItem(result: boolean | any) {
    if (result === false) {
      this.isEdited = false;
    }

    if (result.id > 0) {
      this.item = result;
      console.log(this.item);
    }
  }


  editMode(status: boolean): void {
    this.isEdited = status;
  }


  delete(id: number): void {
      this.memberService.delete(id).subscribe((res: any) => {
        if (res) {
          this.router.navigateByUrl('/members');
        }
      })


  }


}
