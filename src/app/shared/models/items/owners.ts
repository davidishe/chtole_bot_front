export interface ILegalOwner {
  id?: number;
  regDate?: Date;
  shareValue: number,
  shortName: string,
  innNumber: string,
  ogrnNumber: string,
  mainOkved: string,
  legalAddress: string
}


export interface IIndividOwner {
  id?: number;
  cityzenType: string;
  shareValue: number,
  innNumber: string,
  snilsNumber: string,
  familyName: string;
  firstName: string;
  fatherName: string;
  birthPlace: string;

}

