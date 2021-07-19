export interface ILegalOwner {
  id?: number | null;
  regDate?: Date;
  shareValue: number,
  shortName: string,
  innNumber: string,
  ogrnNumber: string,
  mainOkved: string,
  legalAddress: string
}


export interface IIndividOwner {
  id?: number | null;
  regDate?: Date;
  cityzenType: string;
  shareValue: number,
  innNumber: string,
  snilsNumber: string,
  familyName: string;
  firstName: string;
  fatherName: string;
  birthPlace: string;

}

