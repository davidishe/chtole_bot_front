import { IUser } from "../user/user";

export interface IItem {
  id?: number | null;
  companyFullName?: string;
  companyShortName?: string;
  itemUrl?: string | null;
  directorPosition?: string | null;
  directorName?: string | null;
  userName?: string | null;
  userId?: number | null;
  itemTypeId?: number;
  enrolledDate?: Date;
  userPosition?: string;
  userFamilyName?: string;
  userFatherName?: string;
  userShortName?: string;
  userFullName?: string;
  type?: string;
  innNumber?: string;
  ogrnNumber?: string;
  accountNumberPsb?: string;
  officeNamePsb?: string;
  bankOfficeId?: number;
  gosKontractIdentificator?: string;
  gosKontractNumber?: string;
  gosKontractDate?: Date;
  gosKontractOwnerAccount?: string;
  gosKontractOwnerName?: string;
  gosKontractOwnerInn?: string;
  pictureUrl?: string;
  appUser?: IUser;
  companyLatinName: string; 
  clientPhoneNumber: string; 
  webSiteAddress: string; 
  legalAddress: string; 
  factAddress: string; 
  postAddress: string; 

  
  regPlace: string; 
  regDate: Date;
  regOrganName: string; 
  mainOkved: string; 
  additionalOkveds: string; 
  okpo: string;
  okato: string;
  kpp: string;

  ukValue?: number;


}



