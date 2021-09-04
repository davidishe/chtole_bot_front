export interface IMember {
  id?: number;
  name: string;
  isEnabled: boolean;
}

export interface IHeadManager {
  id?: number;
  headManagerPositionId?: number;
  headManagerPosition?: IHeadManagerPosition;

  ownerIndividualId?: number;
  ownerIndividual?: IMember;
  
}

export interface IHeadManagerPosition {
  id?: number;
  name: string;
  selected?: boolean;
}
