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


type Item = IItem;
import * as uuid from 'uuid';

@Component({
  selector: 'app-item-form2',
  templateUrl: './item-form2.component.html',
  styleUrls: ['./item-form2.component.scss']
})

export class ItemFormComponent2 implements OnInit {

  @Input() itemForm: FormGroup;
  @Input() title: string = 'Новый продукт';
  item: IItem;
  innLength: number;
  itemTypeId?: number;
  type: string;
  itemId: number;

  @Input() gaugeTitleForm: FormGroup;
  @Input() gaugeTitles: FormArray;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private itemsService: ItemsService,
    private snackBar: MatSnackBar,
    private officeService: OfficeService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.onFormInit();

    this.gaugeTitleForm = this.formBuilder.group({
      // gaugeTitles: this.formBuilder.array([this.createForm()])
      gaugeTitles: this.formBuilder.array([])
    });

  }

  calculateInnLength(event): void {

    this.type = this.activatedRoute.snapshot.paramMap.get('type');

    if (this.type == 'ooo') {
    }

    if (this.type == 'ip') {
    }

  }

  onFormInit() {
    this.itemForm = new FormGroup({
      ukValue: new FormControl(null, Validators.required),
    });

  }


  addItem() {
    if (this.itemForm.invalid) {
      console.log(this.itemForm.errors);
      return;
    } else {
      console.log(this.itemForm.controls.bankOffice.value);
      

      // this.item = {
      //   ogrnNumber: this.itemForm.controls.ogrnNumber.value,
      //   innNumber: this.itemForm.controls.innNumber.value,
      //   companyFullName: this.itemForm.controls.companyFullName.value,
      //   companyShortName: this.itemForm.controls.companyShortName.value,
      //   directorPosition: this.itemForm.controls.directorPosition.value,
      //   directorName: this.itemForm.controls.directorName.value,
      //   itemTypeId: this.itemTypeId,
      //   accountNumberPsb: this.itemForm.controls.accountNumberPsb.value,
      //   bankOfficeId: this.itemForm.controls.bankOffice.value,
      //   gosKontractIdentificator: this.itemForm.controls.gosKontractIdentificator.value,
      //   gosKontractNumber: this.itemForm.controls.gosKontractNumber.value,
      //   gosKontractDate: this.itemForm.controls.gosKontractDateHidden.value,
      //   gosKontractOwnerName: this.itemForm.controls.gosKontractOwnerName.value,
      //   gosKontractOwnerInn: this.itemForm.controls.gosKontractOwnerInn.value,
      //   gosKontractOwnerAccount: this.itemForm.controls.gosKontractOwnerAccount.value,
      // };

      this.createItem();

    }
  }

  createItem() {
    this.itemsService.createItem(this.item).subscribe((item: IItem) => {
      if (item) {
        this.openSnackBar('запись добавлена');
        this.router.navigateByUrl('clients');
      }
    }, error => {
      console.log(error);
      this.openSnackBar('что-то пошло не так!');
    });
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
    return this.formBuilder.group({
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

  createFormLegal(){
    return this.formBuilder.group({
      shareValue: new FormControl(null, Validators.required),
      shortName: new FormControl(null, Validators.required),
      innNumber: new FormControl(null, Validators.required),
      ogrnNumber: new FormControl(null, Validators.required),
      mainOkved: new FormControl(null, Validators.required),
      legalAddress: new FormControl(null, Validators.required),
    });
  }



  addForm():void{
    this.gaugeTitles = this.gaugeTitleForm.get('gaugeTitles') as FormArray;
    this.gaugeTitles.push(this.createFormLegal());
  }




}
