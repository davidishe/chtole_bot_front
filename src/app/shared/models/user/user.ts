import { IAddress } from "./address";

export interface IUser {
  id?: number;
  email: string;
  displayName?: string;
  token?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  phoneNumber?: string;
  pictureUrl?: string;
  userRoles?: string[];
  selectedRole?: number;
  userDescription?: string;
  userPosition?: string;
  bankOffice?: string;
  bankOfficeId?: number;
  userPositionId?: number;
}

// export interface IRole {
//   isRoleSelected?: boolean;
//   userRole?: string;
// }