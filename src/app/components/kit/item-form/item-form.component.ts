import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { PetService } from '../../content/main/items/pet.service';
import { IItem } from 'src/app/shared/models/item';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})

export class ItemFormComponent implements OnInit {

  @Input() itemForm: FormGroup;
  @Input() title: string = 'Новый продукт';
  type: string;
  item: IItem;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private petService: PetService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.onFormInit();
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
  }

  onFormInit() {
    this.itemForm = new FormGroup({
      ogrnNumber: new FormControl(null, Validators.required),
      innNumber: new FormControl(null, Validators.required),
      companyName: new FormControl(null, Validators.required),
      directorPosition: new FormControl(null, Validators.required),
      directorName: new FormControl(null, Validators.required),
      accountNumberPsb: new FormControl(null, Validators.required),
      officeNamePsb: new FormControl(null, Validators.required),
      gosKontractIdentificator: new FormControl(null, Validators.required),
      gosKontractNumber: new FormControl(null, Validators.required),
      gosKontractDate: new FormControl(null),
      gosKontractOwnerAccount: new FormControl(null, Validators.required)
    });
  }

  AddItem() {
    if (this.itemForm.invalid) {
      console.log(this.itemForm.controls.itemForm.errors);
      return;
    } else {
      this.item = {
        ogrnNumber: this.itemForm.controls.ogrnNumber.value,
        innNumber: this.itemForm.controls.innNumber.value,
        companyName: this.itemForm.controls.companyName.value,
        directorPosition: this.itemForm.controls.directorPosition.value,
        directorName: this.itemForm.controls.directorName.value,
        itemTypeId: 1,
        accountNumberPsb: this.itemForm.controls.accountNumberPsb.value,
        officeNamePsb: this.itemForm.controls.officeNamePsb.value,
        gosKontractIdentificator: this.itemForm.controls.gosKontractIdentificator.value,
        gosKontractNumber: this.itemForm.controls.gosKontractNumber.value,
        // gosKontractDate: this.itemForm.controls.gosKontractDate.value,
        gosKontractOwnerAccount: this.itemForm.controls.gosKontractOwnerAccount.value,
      };

      this.createItem();

    }
  }

  createItem() {
    this.petService.createItem(this.item).subscribe((item: IItem) => {
      if (item) {
        this.openSnackBar('запись добавлена');
        // this.setTimeOut();
        this.router.navigateByUrl('clients');
      }
    }, error => {
      console.log(error);
      this.openSnackBar('что-то пошло не так!');
    });
  }



  setTimeOut(): void {
    setTimeout(() => {
    }, 100);
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {duration: 2500});
  }

}
