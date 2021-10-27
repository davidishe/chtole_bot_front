import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ItemsService } from '../../../content/main/items/items.service';
import { IItem } from 'src/app/shared/models/items/item';
import { OfficeService } from 'src/app/services/catalogs/office.service';
import { IBankOffice } from 'src/app/shared/models/user/bankoffice';

type Item = IItem;

@Component({
  selector: 'item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.scss']
})



export class ItemAddComponent implements OnInit {

  @Input() itemForm?: FormGroup;
  @Input() item: Item;
  @Output() changedItem = new EventEmitter<Item | boolean>();

  offices: IBankOffice[] = [];
  items: Item[] = [];  
  itemId: number;
  title: string = 'Добавление данных';
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
    this.itemId = +this.activatedRoute.snapshot.paramMap.get('id');    
    if (this.itemId > 0) {
      this.getCurrentItem(this.itemId);  
    }
    this.getAllOffices();
    this.onFormInit();
  }

  getCurrentItem(id: number): void {
    this.itemsService.getItemById(id).subscribe((res: any) => {
      this.item = res;
      console.log(this.item);
      
    if (this.item !== undefined && this.item !== null) {
      this.itemForm.controls.name.patchValue(this.item.name);
      this.itemForm.controls.messageText.patchValue(this.item.messageText);      
      this.itemForm.controls.cronExpression.patchValue(this.item.cronExpression);      
      this.itemForm.controls.chatId.patchValue(this.item.chatId);      
      // this.itemForm.controls.itemTypeId.patchValue(this.item.itemTypeId);
    }
    });
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
      // id: this.item.id,
      name: this.itemForm.controls.name.value,
      messageText: this.itemForm.controls.messageText.value,
      cronExpression: this.itemForm.controls.cronExpression.value,
      chatId: this.itemForm.controls.chatId.value,
      jobId: this.item.jobId,
      itemTypeId: 1
    };
  }

  onFormInit() {
    this.itemForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      messageText: new FormControl(null, Validators.required),
      cronExpression: new FormControl(null, Validators.required),
      chatId: new FormControl(null, Validators.required),
    });
  }


  updateItem(item: Item) {
    this.itemsService.updateItem(item).subscribe((item: Item) => {
      if (item) {        
        this.openSnackBar('запись обновлена');
        this.changedItem.emit(item);
        this.changedItem.emit(false);

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



  getAllOffices(): void {
    this.officeService.getAll().subscribe((res: IBankOffice[]) => {
      if (res) {
        this.offices = res;
      }
    })
  }

}
