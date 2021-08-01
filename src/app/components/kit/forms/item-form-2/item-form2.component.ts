import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IItem } from 'src/app/shared/models/items/item';
import { OfficeService } from 'src/app/services/catalogs/office.service';
import { ItemsService } from '../../../content/main/items/items.service';
import { IIndividOwner, ILegalOwner } from 'src/app/shared/models/items/owners';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { ModalIndividualComponent } from './modal-individual/modal-individual.component';
import { OwnerIndividualService } from './owner-individual.service';
import { OwnerLegalService } from './owner-legal.service';
import { ModalLegalComponent } from './modal-legal/modal-legal.component';

type Item = IItem;

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

  // @Input() gaugeTitleForm: FormGroup;
  // @Input() gaugeTitles: FormArray;

  // @Input() individualForm: FormGroup;
  // @Input() individualFormArray: FormArray;

  @Input() individualFormUpdate: FormGroup;
  @Input() individualFormArrayUpdate: FormArray;


  constructor(
    private breadcrumbService: BreadcrumbService,
    private itemsService: ItemsService,
    private snackBar: MatSnackBar,
    private officeService: OfficeService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private ownerLegalService: OwnerLegalService,
    private ownerIndividualService: OwnerIndividualService,
    public dialog: MatDialog,
    private ref: ChangeDetectorRef,
    private router: Router,
  ) { }


  ngOnInit() {
    this.onFormInit();

    this.itemId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.type = this.activatedRoute.snapshot.paramMap.get('type');

    // this.gaugeTitleForm = this.formBuilder.group({
    //   gaugeTitles: this.formBuilder.array([])
    // });

    // this.individualForm = this.formBuilder.group({
    //   individualFormArray: this.formBuilder.array([])
    // });

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
    this.ownerLegalService.getLegalOwners(this.itemId).subscribe((res: ILegalOwner[]) => {
      this.legalOwners = res;
    })
  }


  loadlIndividualOwners(): void {
    this.ownerIndividualService.getIndividualOwners(this.itemId).subscribe((res: IIndividOwner[]) => {
      this.individualOwners = res;
    })
  }


  addOwnerLegal(entity: ILegalOwner): void {
    this.legalOwners.push(entity);
  }


  addOwnerIndividual(entity: IIndividOwner): void {
    this.individualOwners.push(entity);
  }



  deleteOwnerLegal(ownerId: number): void {
    this.ownerLegalService.deleteLegalOwner(ownerId).subscribe((res: any) => {
      if (res === 202) {
        this.legalOwners = this.legalOwners.filter(z => z.id !== ownerId);
      }
    })
  }


  deleteOwnerIndividual(ownerId: number): void {
    this.ownerIndividualService.deleteIndividualOwner(ownerId).subscribe((res: any) => {
      if (res === 202) {
        this.individualOwners = this.individualOwners.filter(z => z.id !== ownerId);
      }
    })
  }


  openUpdateDialogIndivid(owner: IIndividOwner) {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.componentInstance.owner = owner;

    dialogRef.componentInstance.savedOwner.subscribe((savedOwner: IIndividOwner) => {
      this.individualOwners = this.individualOwners.filter(x => x.id !== savedOwner.id);
      this.individualOwners.push(savedOwner);
      
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  
  }

  openAddDialogIndivid() {
    const dialogRef = this.dialog.open(ModalIndividualComponent);
    dialogRef.componentInstance.savedOwner.subscribe((savedOwner: IIndividOwner) => {
      this.individualOwners.push(savedOwner);
    });
  
  }

  openAddDialogLegal() {
    const dialogRef = this.dialog.open(ModalLegalComponent);
    dialogRef.componentInstance.savedOwner.subscribe((savedOwner: ILegalOwner) => {
      this.legalOwners.push(savedOwner);
      
    });
  
  }


  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {duration: 2500});
  }


  onSubmit(): void {
    const ukValue = this.itemForm.controls.ukValue.value;
    this.ownerIndividualService.updateUkValue(ukValue, this.itemId).subscribe((res: any) => {
      console.log(res);
      if (res === 200) {
        this.router.navigate(['clients/add/third/' + this.type + '/', this.itemId])
      }
    })
  }

  isUkValueValid(): number {
    const ownersUkValues = [];
    this.legalOwners.forEach(owner => {
      ownersUkValues.push(owner.shareValue);
    });

    this.individualOwners.forEach(owner => {
      ownersUkValues.push(owner.shareValue);
    });

    return ownersUkValues.reduce((a, b) => a + b, 0);
      
  }


  ngAfterViewInit() {
    this.ref.detectChanges();
  }


}





