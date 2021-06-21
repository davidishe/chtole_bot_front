import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ItemsService } from '../../../content/main/items/items.service';
import { IShelter, IShelterToCreate } from 'src/app/shared/models/shelters/shelter';
import { IItem } from 'src/app/shared/models/items/item';
import { OfficeService } from 'src/app/services/catalogs/office.service';
import { IBankOffice } from 'src/app/shared/models/user/bankoffice';

type Item = IItem;

@Component({
  selector: 'app-item-form-edit',
  templateUrl: './item-form-edit.component.html',
  styleUrls: ['./item-form-edit.component.scss']
})



export class ItemFormEditComponent implements OnInit {

  @Input() itemForm?: FormGroup;
  @Input() item: Item;
  @Output() changedItem = new EventEmitter<Item | boolean>();
  offices: IBankOffice[] = [];
  items: Item[] = [];  
  title: string = 'Обновление данных';
  subtitle: string = "Вводи данные и нажми кнопку 'Сохранить'";

  constructor(
    private breadcrumbService: BreadcrumbService,
    private itemService: ItemsService,
    private officeService: OfficeService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private itemsService: ItemsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllOffices();
    this.onFormInit();
  }


  submitUpdate() {
    if (this.itemForm.invalid) {
      console.log(this.itemForm.controls.itemForm.errors);
      return;
    } else {
      this.mapItemFields();
      this.updateItem(this.item);

    }
  }

  mapItemFields() {
  
    this.item = {
      id: this.item.id,
      ogrnNumber: this.itemForm.controls.ogrnNumber.value,
      innNumber: this.itemForm.controls.innNumber.value,
      companyShortName: this.itemForm.controls.companyShortName.value,
      companyFullName: this.itemForm.controls.companyFullName.value,
      directorPosition: this.itemForm.controls.directorPosition.value,
      directorName: this.itemForm.controls.directorName.value,
      itemTypeId: 1,
      accountNumberPsb: this.itemForm.controls.accountNumberPsb.value,
      bankOfficeId: this.itemForm.controls.bankOffice.value,
      gosKontractIdentificator: this.itemForm.controls.gosKontractIdentificator.value,
      gosKontractNumber: this.itemForm.controls.gosKontractNumber.value,
      gosKontractDate: this.itemForm.controls.gosKontractDateHidden.value,
      gosKontractOwnerName: this.itemForm.controls.gosKontractOwnerName.value,
      gosKontractOwnerInn: this.itemForm.controls.gosKontractOwnerInn.value,
      gosKontractOwnerAccount: this.itemForm.controls.gosKontractOwnerAccount.value,

      regPlace: this.itemForm.controls.regPlace.value,
      regDate: this.itemForm.controls.regDate.value,
      regOrganName: this.itemForm.controls.regOrganName.value,
      mainOkved: this.itemForm.controls.mainOkved.value,
      additionalOkveds: this.itemForm.controls.additionalOkveds.value,
    
      okpo: this.itemForm.controls.okpo.value,
      okato: this.itemForm.controls.okato.value,
      kpp: this.itemForm.controls.kpp.value,

      companyLatinName: this.itemForm.controls.companyLatinName.value,
      clientPhoneNumber: this.itemForm.controls.clientPhoneNumber.value,
      webSiteAddress: this.itemForm.controls.webSiteAddress.value,
      legalAddress: this.itemForm.controls.legalAddress.value,
      factAddress: this.itemForm.controls.factAddress.value,
      postAddress: this.itemForm.controls.postAddress.value,
    };
  }


  updateItem(item: Item) {
    this.itemsService.updateItem(item).subscribe((item: Item) => {
      if (item) {        
        this.openSnackBar('запись обновлена');
        this.changedItem.emit(item);
        // this.router.navigateByUrl('/pets/pet/' + item.id);
      }
    }, error => {
      console.log(error);
      this.openSnackBar('🙁 что-то пошло не так!');
    });
  }


  emitItem(item: Item | boolean): void {
    this.changedItem.emit(item);
  }


  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {duration: 2500});
  }


  onFormInit() {
    this.itemForm = new FormGroup({
      ogrnNumber: new FormControl(null, Validators.required),
      innNumber: new FormControl(null, Validators.required),
      companyName: new FormControl(null, Validators.required),
      directorPosition: new FormControl(null, Validators.required),
      directorName: new FormControl(null, Validators.required),
      accountNumberPsb: new FormControl(null, Validators.required),
      bankOffice: new FormControl(null, Validators.required),

      gosKontractIdentificator: new FormControl(null, Validators.required),
      gosKontractNumber: new FormControl(null, Validators.required),
      gosKontractDateHidden: new FormControl(null),
      gosKontractDate: new FormControl(null),
      gosKontractOwnerName: new FormControl(null, Validators.required),
      gosKontractOwnerInn: new FormControl(null, Validators.required),
      gosKontractOwnerAccount: new FormControl(null, Validators.required),

      okpo: new FormControl(null, Validators.required),
      okato: new FormControl(null, Validators.required),
      kpp: new FormControl(null, Validators.required),
    });
  }

  


  getAllOffices(): void {
    this.officeService.getAll().subscribe((res: IBankOffice[]) => {
      if (res) {
        this.offices = res;
      }
    })
  }

}
