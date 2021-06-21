import { IItem } from './items/item';

export interface IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IItem[];
}

export class PaginatedResult<T> {
  result2: T;
  pagination2: IPagination;
}

export class SheltersPagination implements IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IItem[];
}

export class AnimalsPagination implements IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IItem[];
}



