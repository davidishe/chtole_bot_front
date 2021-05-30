import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ItemsService } from '../../content/main/items/items.service';
import { IShelter, IShelterToCreate } from 'src/app/shared/models/shelters/shelter';
import { PetService } from '../../content/main/items/pet.service';
import { IItem } from 'src/app/shared/models/item';
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
    private petService: PetService,
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
      companyName: this.itemForm.controls.companyName.value,
      directorPosition: this.itemForm.controls.directorPosition.value,
      directorName: this.itemForm.controls.directorName.value,
      itemTypeId: 1,
      accountNumberPsb: this.itemForm.controls.accountNumberPsb.value,
      bankOfficeId: this.itemForm.controls.bankOffice.value,
      gosKontractIdentificator: this.itemForm.controls.gosKontractIdentificator.value,
      gosKontractNumber: this.itemForm.controls.gosKontractNumber.value,
      // gosKontractDate: this.itemForm.controls.gosKontractDate.value,
      gosKontractOwnerAccount: this.itemForm.controls.gosKontractOwnerAccount.value,
    };
  }


  updateItem(item: Item) {
    this.petService.updateItem(item).subscribe((item: Item) => {
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
      gosKontractDate: new FormControl(null),
      gosKontractOwnerAccount: new FormControl(null, Validators.required)
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
