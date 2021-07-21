import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILegalOwner } from 'src/app/shared/models/items/owners';
import { environment } from 'src/environments/environment';

type Item = ILegalOwner;

const apiRoute = 'owners/';

@Injectable({
  providedIn: 'root'
})

export class OwnerLegalService {


  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  items: Item[] = [];


  getLegalOwners(itemId: number) {
    return this.http.get(this.baseUrl + apiRoute + 'legals/getentitybyitemid?id=' + itemId);
  }


  deleteLegalOwner(ownerId: number) {
    return this.http.delete(this.baseUrl + apiRoute + 'legals/delete?id=' + ownerId);
  }

  addLegalOwner(owner: Item, itemId: number) {
    return this.http.post(this.baseUrl + apiRoute + 'legals/create/owner?itemId=' + itemId, owner);
  }

  updateUkValue(ukValue: number, itemId) {
    return this.http.put(this.baseUrl + apiRoute + 'uk?ukValue=' + ukValue + '&itemId=' + + itemId, null);
  }

  


}