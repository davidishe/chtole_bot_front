import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IItem } from 'src/app/shared/models/items/item';
import { IBankOffice } from 'src/app/shared/models/user/bankoffice';
import { OfficeService } from 'src/app/services/catalogs/office.service';
import { ItemsService } from '../../../content/main/items/items.service';
import { DadataData } from 'src/app/shared/models/dadata/dadata';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})

export class ItemFormComponent implements OnInit {

  @Input() itemForm: FormGroup;
  @Input() title: string = 'Новый продукт';
  item: IItem;
  innLength: number;
  offices: IBankOffice[] = [];
  itemTypeId?: number;
  type: string;


  constructor(
    private breadcrumbService: BreadcrumbService,
    private itemsService: ItemsService,
    private snackBar: MatSnackBar,
    private officeService: OfficeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    
    this.onFormInit();
    this.getAllOffices();
  }

  calculateInnLength(event): void {


    if (this.type == 'ooo') {
      this.innLength = 10;
      this.itemTypeId = 2;
    }

    if (this.type == 'ip') {
      this.innLength = 13;
      this.itemTypeId = 1;
    }
      this.itemForm.controls.innNumber.setValidators([Validators.required, Validators.maxLength(this.innLength), Validators.minLength(this.innLength)]);

  }

  onFormInit() {
    this.itemForm = new FormGroup({

      ogrnNumber: new FormControl(null, [Validators.required, Validators.minLength(13)]),
      innNumber: new FormControl(null, [Validators.required]),
      companyShortName: new FormControl(null, Validators.required),
      companyFullName: new FormControl(null, Validators.required),
      companyLatinName: new FormControl(null, Validators.required),

      clientPhoneNumber: new FormControl(null, Validators.required),
      webSiteAddress: new FormControl(null, Validators.required),

      legalAddress: new FormControl(null, Validators.required),
      factAddress: new FormControl(null, Validators.required),
      postAddress: new FormControl(null, Validators.required),
      directorPosition: new FormControl(null, Validators.required),
      directorName: new FormControl(null, Validators.required),
      
      okpo: new FormControl(null, Validators.required),
      okato: new FormControl(null, Validators.required),
      kpp: new FormControl(null, Validators.required),
      
      regPlace: new FormControl(null, Validators.required),
      regDate: new FormControl(null, [Validators.nullValidator, Validators.required]),
      regDateHidden: new FormControl(null, [Validators.nullValidator, Validators.required]),
      regOrganName: new FormControl(null, Validators.required),
      mainOkved: new FormControl(null, Validators.required),
      additionalOkveds: new FormControl(null, Validators.required),
      
      accountNumberPsb: new FormControl(null, [Validators.required, Validators.minLength(20)]),
      bankOffice: new FormControl(null, Validators.required),
      gosKontractIdentificator: new FormControl(null, Validators.required),
      gosKontractNumber: new FormControl(null, Validators.required),
      gosKontractDate: new FormControl(null, [Validators.nullValidator, Validators.required]),
      gosKontractDateHidden: new FormControl(null, [Validators.nullValidator, Validators.required]),
      gosKontractOwnerName: new FormControl(null, Validators.required),
      gosKontractOwnerInn: new FormControl(null, Validators.required),
      gosKontractOwnerAccount: new FormControl('', [Validators.required, Validators.minLength(20)]),

    });
  }


  addItem() {
    if (this.itemForm.invalid) {
      console.log(this.itemForm.errors);
      return;
    } else {
      console.log(this.itemForm.controls.bankOffice.value);
      




      this.item = {
        ogrnNumber: this.itemForm.controls.ogrnNumber.value,
        innNumber: this.itemForm.controls.innNumber.value,
        companyFullName: this.itemForm.controls.companyFullName.value,
        companyShortName: this.itemForm.controls.companyShortName.value,
        directorPosition: this.itemForm.controls.directorPosition.value,
        directorName: this.itemForm.controls.directorName.value,
        itemTypeId: this.itemTypeId,
        accountNumberPsb: this.itemForm.controls.accountNumberPsb.value,
        bankOfficeId: this.itemForm.controls.bankOffice.value,
        gosKontractIdentificator: this.itemForm.controls.gosKontractIdentificator.value,
        gosKontractNumber: this.itemForm.controls.gosKontractNumber.value,
        gosKontractDate: this.itemForm.controls.gosKontractDateHidden.value,
        gosKontractOwnerName: this.itemForm.controls.gosKontractOwnerName.value,
        gosKontractOwnerInn: this.itemForm.controls.gosKontractOwnerInn.value,
        gosKontractOwnerAccount: this.itemForm.controls.gosKontractOwnerAccount.value,

        okpo: this.itemForm.controls.okpo.value,
        okato: this.itemForm.controls.okato.value,
        kpp: this.itemForm.controls.kpp.value,

        regPlace: this.itemForm.controls.regPlace.value,
        regDate: this.itemForm.controls.regDate.value,
        regOrganName: this.itemForm.controls.regOrganName.value,
        mainOkved: this.itemForm.controls.mainOkved.value,
        additionalOkveds: this.itemForm.controls.additionalOkveds.value,

        companyLatinName: this.itemForm.controls.companyLatinName.value,
        clientPhoneNumber: this.itemForm.controls.clientPhoneNumber.value,
        webSiteAddress: this.itemForm.controls.webSiteAddress.value,
        legalAddress: this.itemForm.controls.legalAddress.value,
        factAddress: this.itemForm.controls.factAddress.value,
        postAddress: this.itemForm.controls.postAddress.value,

      };

      this.createItem();

    }
  }

  createItem() {
    this.itemsService.createItem(this.item).subscribe((item: IItem) => {
      if (item) {
        // clients/add/:type/second
        this.router.navigateByUrl('clients/add/' + this.type +'/second');
      }
    }, error => {
      console.log(error);
      this.openSnackBar('что-то пошло не так!');
    });
  }

  setClient(client) {
    if (client.suggestions) {
      this.patchValuesFromDadata(client.suggestions[0].data);
      
    }    
  }

  patchValuesFromDadata(data: DadataData) {
    console.log(data);

    this.itemForm.controls.ogrnNumber.patchValue(data.ogrn);
    this.itemForm.controls.innNumber.patchValue(data.inn);
    this.itemForm.controls.companyFullName.patchValue(data.name.full_with_opf);
    this.itemForm.controls.companyShortName.patchValue(data.name.short_with_opf);
    this.itemForm.controls.directorPosition.patchValue(data.management.post);
    this.itemForm.controls.directorName.patchValue(data.management.name);
    this.itemForm.controls.legalAddress.patchValue(data.address.value);

    this.itemForm.controls.okato.patchValue(data.okato);
    this.itemForm.controls.okpo.patchValue(data.okpo);
    this.itemForm.controls.kpp.patchValue(data.kpp);

    this.itemForm.controls.mainOkved.patchValue(data.okved);
    var dateToPatch = this.getFormatedDate(new Date(data.ogrn_date));
    this.itemForm.controls.regDate.patchValue(dateToPatch);


  }

  getAllOffices(): void {
    this.officeService.getAll().subscribe((res: IBankOffice[]) => {
      if (res) {
        this.offices = res;
      }
    })
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {duration: 2500});
  }

  getFormatedDate(date: Date): string {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    var valueToReturn = dd + '.' + mm + '.' + yyyy;
    return valueToReturn;
  }

}
