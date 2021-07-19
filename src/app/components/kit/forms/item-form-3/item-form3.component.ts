import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IItem } from 'src/app/shared/models/items/item';
import { IBankOffice } from 'src/app/shared/models/user/bankoffice';
import { OfficeService } from 'src/app/services/catalogs/office.service';
import { ItemsService } from '../../../content/main/items/items.service';
import { DadataData } from 'src/app/shared/models/dadata/dadata';
import * as uuid from 'uuid';
import { OwnerService } from './owner.service';
import { IIndividOwner, ILegalOwner } from 'src/app/shared/models/items/owners';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from 'src/app/components/content/admin/profile/profile.component';

type Item = IItem;


@Component({
  selector: 'app-item-form3',
  templateUrl: './item-form3.component.html',
  styleUrls: ['./item-form3.component.scss']
})

export class ItemFormComponent3 implements OnInit {

  @Input() itemForm: FormGroup;
  @Input() title: string = 'Новый продукт';
  editedOwner: IIndividOwner;
  item: IItem;
  innLength: number;
  itemTypeId?: number;
  type: string;
  itemId: number;



  constructor(
    private breadcrumbService: BreadcrumbService,
    private itemsService: ItemsService,
    private snackBar: MatSnackBar,
    private officeService: OfficeService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private ownerService: OwnerService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createFormIndivid();

    this.itemId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.type = this.activatedRoute.snapshot.paramMap.get('type');

    this.loadItemById();

  }

 


  loadItemById() {
      this.itemsService.getItemById(this.itemId).subscribe((response: Item) => {
        if (response) {
          this.item = response;
          this.breadcrumbService.set('@productDetails', this.item.companyShortName);
        }
    }, err => {
      console.log(err);
    });
  }



  


  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {duration: 2500});
  }


  createFormIndivid(){
    this.itemForm = new FormGroup({
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

 


  
  openUpdateDialog(owner: IIndividOwner) {
  }






}





