import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IItem } from 'src/app/shared/models/items/item';
import { ItemsService } from '../../../content/main/items/items.service';
import { IHeadManager, IHeadManagerPosition, IIndividOwner } from 'src/app/shared/models/items/owners';
import { MatDialog } from '@angular/material/dialog';
import { OwnerIndividualService } from '../item-form-2/owner-individual.service';
import { HeadManagerService } from './head-manager.service';

type Item = IItem;


@Component({
  selector: 'app-item-form3',
  templateUrl: './item-form3.component.html',
  styleUrls: ['./item-form3.component.scss']
})

export class ItemFormComponent3 implements OnInit {

  @Input() title: string = 'Новый продукт';
  itemForm: FormGroup;
  editedOwner: IIndividOwner;
  item: IItem = {};
  itemTypeId?: number;
  type: string;
  itemId: number;
  owners: IIndividOwner[];
  selectedOwnerId?: number;

  headManager: IHeadManager = {};
  headManagerPositions: IHeadManagerPosition[] = [
    {id: 1, name: 'Директор', selected: true},
    {id: 2, name: 'Генеральный директор', selected: false},
  ];


  constructor(
    private breadcrumbService: BreadcrumbService,
    private itemsService: ItemsService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private ownerIndividualService: OwnerIndividualService,
    private headManagerService: HeadManagerService
  ) { }

  ngOnInit() {

    this.itemId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    this.onFormInit();
    this.loadItemById();
    this.loadlIndividualOwners();

  }

  onFormInit() {
    this.itemForm = new FormGroup({
      cityzenType: new FormControl(null, Validators.required),
      familyName: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      fatherName: new FormControl(null, Validators.required),
      innNumber: new FormControl(null, Validators.required),
      headManagerPosition: new FormControl(null, Validators.required),
      // birthDate: new FormControl(null, [Validators.nullValidator, Validators.required]),
      // birthDateHidden: new FormControl(null, [Validators.nullValidator, Validators.required]),
      birthPlace: new FormControl(null, Validators.required),
      snilsNumber: new FormControl(null, Validators.required)
    });
  }


  loadlIndividualOwners(): void {
    this.ownerIndividualService.getIndividualOwners(this.itemId).subscribe((res: IIndividOwner[]) => {
      this.owners = res;
    })
  }


  getCurrentHeadManager(): void {
    if (this.item) {
      this.headManagerService.getCurrentHeadManager(this.item.headManagerId).subscribe((res: IHeadManager) => {
        if (this.headManager) {
          this.headManager = res;
          console.log(this.headManager);
          this.patchHeadManagerFromServer(this.headManager);
          this.selectedOwnerId = this.headManager.ownerIndividualId;
        }
      })
    }
  }


  patchValuesFromOwner(owner: IIndividOwner): void {
    if (owner !== null) {
      this.itemForm.controls.firstName.patchValue(owner.firstName);
      this.itemForm.controls.fatherName.patchValue(owner.fatherName);
      this.itemForm.controls.familyName.patchValue(owner.familyName);
      this.itemForm.controls.cityzenType.patchValue(owner.cityzenType);
      this.itemForm.controls.birthPlace.patchValue(owner.birthPlace);
      this.itemForm.controls.snilsNumber.patchValue(owner.snilsNumber);
      this.itemForm.controls.innNumber.patchValue(owner.innNumber);

      this.headManager.headManagerPositionId = this.headManager.headManagerPositionId;
      this.headManager.id = 1;

      this.headManager.ownerIndividualId = owner.id;
      this.headManager.ownerIndividual = owner;
    }
    if (owner === null) {
      this.itemForm.reset();
    }
  }


  patchHeadManagerFromServer(headManager: IHeadManager): void {
      this.itemForm.controls.firstName.patchValue(headManager.ownerIndividual.firstName);
      this.itemForm.controls.fatherName.patchValue(headManager.ownerIndividual.fatherName);
      this.itemForm.controls.familyName.patchValue(headManager.ownerIndividual.familyName);
      this.itemForm.controls.cityzenType.patchValue(headManager.ownerIndividual.cityzenType);
      this.itemForm.controls.birthPlace.patchValue(headManager.ownerIndividual.birthPlace);
      this.itemForm.controls.snilsNumber.patchValue(headManager.ownerIndividual.snilsNumber);
      this.itemForm.controls.innNumber.patchValue(headManager.ownerIndividual.innNumber);
      this.itemForm.controls.headManagerPosition.patchValue(headManager.headManagerPositionId);    
  }


  patchHeadManagerFromControls(): void {
      this.headManager.ownerIndividual.cityzenType = this.itemForm.controls.cityzenType.value;
      this.headManager.ownerIndividual.firstName = this.itemForm.controls.firstName.value;
      this.headManager.ownerIndividual.fatherName = this.itemForm.controls.fatherName.value;
      this.headManager.ownerIndividual.familyName = this.itemForm.controls.familyName.value;
      this.headManager.ownerIndividual.birthPlace = this.itemForm.controls.birthPlace.value;
      this.headManager.ownerIndividual.snilsNumber = this.itemForm.controls.snilsNumber.value;
      this.headManager.ownerIndividual.innNumber = this.itemForm.controls.innNumber.value;
      this.headManager.headManagerPositionId = this.itemForm.controls.headManagerPosition.value;    
  }


  



  addOrUpdateOwner(): void {
    this.patchHeadManagerFromControls();
    console.log(this.headManager);
    
    this.headManagerService.addHeadManager(this.headManager, this.itemId).subscribe((res: any) => {
      console.log(res);
    })
  }


  emitItem(emitedObject: IIndividOwner): void {
    this.patchValuesFromOwner(emitedObject);
  }


  loadItemById() {
      this.itemsService.getItemById(this.itemId).subscribe((response: Item) => {
        if (response) {
          this.item = response;
          this.getCurrentHeadManager();
          this.breadcrumbService.set('@productDetails', this.item.companyShortName);
        }
    }, err => {
      console.log(err);
    });
  }


  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {duration: 2500});
  }


}





