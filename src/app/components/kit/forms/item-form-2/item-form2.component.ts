import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
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
import { OwnerService } from './owner.service';
import { IIndividOwner, ILegalOwner } from 'src/app/shared/models/items/owners';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from 'src/app/components/content/admin/profile/profile.component';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-item-form2',
  templateUrl: './item-form2.component.html',
  styleUrls: ['./item-form2.component.scss']
})

export class ItemFormComponent2 implements OnInit {

  @Input() itemForm: FormGroup;
  @Input() title: string = 'Новый продукт';
  editedOwner: IIndividOwner;
  item: IItem;
  innLength: number;
  itemTypeId?: number;
  type: string;
  itemId: number;

  legalOwners: ILegalOwner[] = [];
  individualOwners: IIndividOwner[] = [];

  @Input() gaugeTitleForm: FormGroup;
  @Input() gaugeTitles: FormArray;

  @Input() individualForm: FormGroup;
  @Input() individualFormArray: FormArray;

  @Input() individualFormUpdate: FormGroup;
  @Input() individualFormArrayUpdate: FormArray;


  constructor(
    private breadcrumbService: BreadcrumbService,
    private itemsService: ItemsService,
    private snackBar: MatSnackBar,
    private officeService: OfficeService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private ownerService: OwnerService,
    public dialog: MatDialog,
    private ref: ChangeDetectorRef,
    private router: Router,
  ) { }


  ngOnInit() {
    this.onFormInit();

    this.itemId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.type = this.activatedRoute.snapshot.paramMap.get('type');

    this.gaugeTitleForm = this.formBuilder.group({
      gaugeTitles: this.formBuilder.array([])
    });

    this.individualForm = this.formBuilder.group({
      individualFormArray: this.formBuilder.array([])
    });

    this.individualFormUpdate = this.formBuilder.group({
      individualFormArray: this.formBuilder.array([])
    });

    this.loadItemById();
    this.loadLegalOwners();
    this.loadlIndividualOwners();

  }


  onFormInit() {
    this.itemForm = new FormGroup({
      ukValue: new FormControl(null, Validators.required),
    });

  }


  loadItemById() {
      this.itemsService.getItemById(this.itemId).subscribe((response: Item) => {
        if (response) {
          this.item = response;
          this.patchValue();
          this.breadcrumbService.set('@productDetails', this.item.companyShortName);
        }
    }, err => {
      console.log(err);
    });
  }


  patchValue(): void {
    this.itemForm.controls.ukValue.patchValue(this.item.ukValue);
  }


  loadLegalOwners(): void {
    this.ownerService.getLegalOwners(this.itemId).subscribe((res: ILegalOwner[]) => {
      this.legalOwners = res;
    })
  }


  loadlIndividualOwners(): void {
    this.ownerService.getIndividualOwners(this.itemId).subscribe((res: IIndividOwner[]) => {
      this.individualOwners = res;
    })
  }


  addOwnerLegal(entity: ILegalOwner): void {
    this.legalOwners.push(entity);
  }


  addOwnerIndividual(entity: IIndividOwner): void {
    this.individualOwners.push(entity);
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


  deleteOwnerLegal(ownerId: number): void {
    this.ownerService.deleteLegalOwner(ownerId).subscribe((res: any) => {
      if (res === 202) {
        this.legalOwners = this.legalOwners.filter(z => z.id !== ownerId);
      }
    })
  }


  deleteOwnerIndividual(ownerId: number): void {
    this.ownerService.deleteIndividualOwner(ownerId).subscribe((res: any) => {
      if (res === 202) {
        this.individualOwners = this.individualOwners.filter(z => z.id !== ownerId);
      }
    })
  }


  addFormLegal():void{
    this.gaugeTitles = this.gaugeTitleForm.get('gaugeTitles') as FormArray;
    this.gaugeTitles.push(this.createFormLegal());
  }


  addFormIndividual():void{
    this.individualFormArray = this.individualForm.get('individualFormArray') as FormArray;
    this.individualFormArray.push(this.createFormIndivid());
  }
  

  openUpdateDialog(owner: IIndividOwner) {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.componentInstance.owner = owner;
    console.log(owner);
    

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {duration: 2500});
  }


  onSubmit(): void {
    const ukValue = this.itemForm.controls.ukValue.value;
    this.ownerService.updateUkValue(ukValue, this.itemId).subscribe((res: any) => {
      console.log(res);
      if (res === 200) {
        this.router.navigate(['clients/add/third/' + this.type + '/', this.itemId])
      }
    })
  }

  isUkValueValid(): boolean {
    const ownersUkValues = [];
    this.legalOwners.forEach(owner => {
      ownersUkValues.push(owner.shareValue);
    });

    this.individualOwners.forEach(owner => {
      ownersUkValues.push(owner.shareValue);
    });

    if (ownersUkValues.reduce((a, b) => a + b, 0) == 100) {
      return false;
    }

    return true;
  }


  ngAfterViewInit() {
    this.ref.detectChanges();
  }


}





