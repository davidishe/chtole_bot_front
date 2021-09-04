import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { IUser } from 'src/app/shared/models/user/user';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IAddress } from 'src/app/shared/models/user/address';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountService } from 'src/app/components/kit/layouts/account/account.service';
import { IPhoto } from 'src/app/shared/models/user/photo';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OfficeService } from 'src/app/services/catalogs/office.service';
import { IBankOffice } from 'src/app/shared/models/user/bankoffice';
import { IUserPosition } from 'src/app/shared/models/user/user-position';
import { PositionsService } from 'src/app/services/catalogs/positions.service';
import { IUserForUpdate } from 'src/app/shared/models/user/userForUpdate';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('fadeInOut', [
          state('in', style({ opacity: 100 })),
          transition('* => void', [
          animate(300, style({ opacity: 0 }))
          ])
    ])
  ]
})
export class ProfileComponent implements OnInit {

  currentUser$!: Observable<IUser | any>;
  currentUser: IUser = {
    email: null
  };

  progress: number;
  @Output() public OnUploadFinished = new EventEmitter();
  public result?: IPhoto;

  baseUrl = environment.apiUrl;

  constructor(
    private accountService: AccountService,
    private http: HttpClient,
    private officeService: OfficeService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.currentUser$ = this.accountService.currentUser$;
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    const fileToUpload = <File> files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.result = null;

    
    this.http.post(this.baseUrl + 'photo/user', formData, {reportProgress: true, observe: 'events'})
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.OnUploadFinished.emit(event.body);
          this.accountService.loadCurrentUser().subscribe((res: IUser) => {
            if (res) {
              this.currentUser.pictureUrl = event.body.photoUrl;
            }
          })
        }
    });
  }


  mapRoleName(role: string): string {
    switch (role) {
      case "User": return "Пользователь";
      case "Admin": return "Администратор";    
      case "Curator": return "Куратор";    
      case "Volonter": return "Волонтер";
      case "ShelterOwner": return "Представитель приюта";
      case "Feeder": return "Представитель компании";
      default: role;
    }

  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }




}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.html',
  styleUrls: ['./dialog.scss'],
})
export class DialogContentComponent {

  formProfile: FormGroup;
  currentUser$!: Observable<IUser | any>;
  currentUser: IUser = {
    email: null
  };
  offices: IBankOffice[] = [];
  positions: IUserPosition[] =[];
  userForUpdate: IUserForUpdate = {};
  
  constructor(
    private accountService: AccountService,
    private officeService: OfficeService,
    private positionService: PositionsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.currentUser$ = this.accountService.currentUser$;
    this.createFormProfile();
    this.getAllOffices();
    this.getAllPositions();
    this.patchFormProifileValues();
  }



  updateProfile() {
      if (this.formProfile.invalid) {
      console.log('errrrrror');
      return;
    } else {
      console.log(this.formProfile.value);
      this.mapObjectForUpdate();
      this.accountService.updateUserProfile(this.userForUpdate).subscribe((response: IUser) => {
        this.currentUser = response;
        this.accountService.loadCurrentUser().subscribe();
        this.dialog.closeAll();
      });

    }
  }

  mapObjectForUpdate(): IUserForUpdate {
    this.userForUpdate.bankOfficeId = this.formProfile.get('office').value;
    this.userForUpdate.userPositionId = this.formProfile.get('position').value;
    this.userForUpdate.userDescription = this.formProfile.get('userDescription').value;
    this.userForUpdate.displayName = this.formProfile.get('displayName').value;
    return this.userForUpdate;
  }



  patchFormProifileValues() {
      this.currentUser$.subscribe((res: any) => {
        this.currentUser = res;
      });

      console.log(this.currentUser.displayName);
      
      this.formProfile.get('displayName').patchValue(this.currentUser.displayName);
      this.formProfile.get('userDescription').patchValue(this.currentUser.userDescription);
      this.formProfile.get('office').patchValue(this.currentUser.bankOfficeId);
      this.formProfile.get('position').patchValue(this.currentUser.userPositionId);

      console.log(this.formProfile);
      
  }


  createFormProfile() {
    this.formProfile = new FormGroup({
      displayName: new FormControl(null, [Validators.required]),
      office: new FormControl(null, [Validators.required]),
      position: new FormControl(null, [Validators.required]),
      userDescription: new FormControl(null, [])
    });
  }


  getAllOffices(): void {
    this.officeService.getAll().subscribe((res: IBankOffice[]) => {
      if (res) {
        this.offices = res;
      }
    })
  }


  getAllPositions(): void {
    this.positionService.getAll().subscribe((res: IUserPosition[]) => {
      if (res) {
        this.positions = res;
      }
    })
  }





}









