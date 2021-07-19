import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IIndividOwner, ILegalOwner } from 'src/app/shared/models/items/owners';
import { environment } from 'src/environments/environment';

type Item = ILegalOwner | IIndividOwner;

const apiRoute = 'owners/';

@Injectable({
  providedIn: 'root'
})

export class OwnerService {


  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  items: Item[] = [];


  getLegalOwners(itemId: number) {
    return this.http.get(this.baseUrl + apiRoute + 'legals/getentitybyitemid?id=' + itemId);
  }


  deleteLegalOwner(ownerId: number) {
    return this.http.delete(this.baseUrl + apiRoute + 'legals/delete?id=' + ownerId);
  }

  deleteIndividualOwner(ownerId: number) {
    return this.http.delete(this.baseUrl + apiRoute + 'individuals/delete?id=' + ownerId);
  }

  getIndividualOwners(itemId: number) {
    return this.http.get(this.baseUrl + apiRoute + 'individuals/getentitybyitemid?id=' + itemId);
  }
  
  addIndividualOwner(owner: Item, itemId: number) {
    return this.http.put(this.baseUrl + apiRoute + 'inidividuals/create/owner?itemId=' + itemId, owner);
  }

  addLegalOwner(owner: Item, itemId: number) {
    return this.http.put(this.baseUrl + apiRoute + 'legals/create/owner?itemId=' + itemId, owner);
  }

  updateUkValue(ukValue: number, itemId) {
    return this.http.put(this.baseUrl + apiRoute + 'uk?ukValue=' + ukValue + '&itemId=' + + itemId, null);
  }


  updateIndividualOwner(owner: Item) {
    return this.http.patch(this.baseUrl + apiRoute + 'inidividuals/update/owner', owner);
  }

  


}