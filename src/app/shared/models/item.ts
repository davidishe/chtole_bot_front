import { IUser } from "./user/user";

export interface IItem {
  id?: number | null;
  companyName?: string;
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
  gosKontractDate?: string;
  gosKontractOwnerAccount?: string;
  gosKontractOwnerName?: string;
  gosKontractOwnerInn?: string;
  pictureUrl?: string;
  appUser?: IUser;
}



