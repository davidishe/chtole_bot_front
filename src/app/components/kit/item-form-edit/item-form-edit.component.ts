import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ItemsService } from '../../content/main/items/items.service';
import { IShelter, IShelterToCreate } from 'src/app/shared/models/shelters/shelter';
import { PetService } from '../../content/main/items/pet.service';
import { IItem } from 'src/app/shared/models/item';

type Item = IItem;

@Component({
  selector: 'app-item-form-edit',
  templateUrl: './item-form-edit.component.html',
  styleUrls: ['./item-form-edit.component.scss']
})

export class ItemFormEditComponent implements OnInit {

  @Input() itemForm?: FormGroup;
  @Input() item: IItem;
  @Input() type: string;
  @Output() changedItem = new EventEmitter<IItem | boolean>();

  items: IItem[] = [];  

  constructor(
    private breadcrumbService: BreadcrumbService,
    private itemService: ItemsService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private petService: PetService,
    private router: Router
  ) {}

  ngOnInit() {

  }


  UpdateItem() {
    if (this.itemForm.invalid) {
      console.log(this.itemForm.controls.itemForm.errors);
      return;
    } else {
      this.item = {
        id: this.item.id,
        companyName: this.itemForm.controls.name.value,
        pictureUrl: this.item.pictureUrl,
        itemTypeId: 1,
        directorName: '', 
        userPosition: '', 
        userName: '', 
        userFamilyName: '', 
        userFatherName: ''
      };

      this.updateAnimal(this.item);

    }
  }


  updateAnimal(item: IItem) {
    this.petService.updateItem(item).subscribe((item: IItem) => {
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


  updateShelter(item: IShelter) {
    this.itemService.updateItemShelter(item).subscribe((item: IItem) => {
      if (item) {
        this.openSnackBar('запись обновлена');
        this.changedItem.emit(item);
        // this.router.navigateByUrl('/shelters/shelter/' + item.id);
      }
    }, error => {
      console.log(error);
      this.openSnackBar('🙁 что-то пошло не так!');
    });
  }


  emitItem(item: IItem | boolean): void {
    this.changedItem.emit(item);
  }


  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {duration: 2500});
  }

}
