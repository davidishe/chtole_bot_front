import { IUser } from "../user/user";
import { IHeadManager } from "./owners";

export interface IItem {
  id?: number | null;
  name: string;
  messageText: string;
  itemTypeId?: number;
  enrolledDate?: Date;
  type?: string;
  chatId: string;
  cronExpression: string;
  jobId?: string;



  userPosition?: string;
  userFamilyName?: string;
  userFatherName?: string;
  userShortName?: string;
  userFullName?: string;
  officeNamePsb?: string;
  bankOfficeId?: number;
  appUser?: IUser;

}



