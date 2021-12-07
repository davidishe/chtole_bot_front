import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IItem } from 'src/app/shared/models/items/item';
import { IShelter } from 'src/app/shared/models/shelters/shelter';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ItemsService } from '../../../content/main/items/items.service';
import { AccountService } from '../../layouts/account/account.service';

type Item = IItem;

@Component({
  selector: 'app-item-detailed-card',
  templateUrl: './item-detailed-card.component.html',
  styleUrls: ['./item-detailed-card.component.scss']
})

export class ItemDetailedCardComponent implements OnInit {

  item: Item;
  itemId: number;
  type: string;
  progress: boolean;
  formData = new FormData();
  isEdited: boolean;
  itemForm?: FormGroup;
  

  constructor(
    private itemsService: ItemsService,
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
    this.type = this.activatedRoute.snapshot.paramMap.get('type');

    setTimeout(() => {
      this.loadItemWithOptions();
      console.log('halo worild');
      
    }, 100);
  }


  patchValues() {
    this.itemForm.controls.name.patchValue(this.item.name);
    this.itemForm.controls.description.patchValue(this.item.name);
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
      this.itemsService.getItemById(this.itemId).subscribe((response: Item) => {
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
      this.itemsService.deleteItem(id).subscribe((res: any) => {
        if (res) {
          this.router.navigateByUrl('/items');
        }
      })


  }


}
