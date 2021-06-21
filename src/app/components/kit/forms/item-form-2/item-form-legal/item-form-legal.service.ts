import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItem } from 'src/app/shared/models/items/item';
import { ILegalOwner } from 'src/app/shared/models/items/owners';
import { environment } from 'src/environments/environment';




type Item = ILegalOwner;
const apiRoute = 'ownerlegals/';

@Injectable({
  providedIn: 'root'
})

export class ItemFormLegalService {


  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  items: Item[] = [];

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('app-token'),
      'Access-Control-Expose-Headers': '*'
    })
  };

  createItem(item: Item) {
    return this.http.post(this.baseUrl + apiRoute + 'create/owner', item);
  }

  createItemRelation(itemId: number, ownerId: number) {
    return this.http.post(this.baseUrl + apiRoute + 'create/relation', null);
  }

  deleteItem(id: number) {
    return this.http.delete(this.baseUrl + apiRoute + 'delete/?id=' + id);
  }

  updateItem(item: Item) {
    return this.http.put(this.baseUrl + apiRoute + 'update', item);
  }

  getItemById(id: number) {
    return this.http.get(this.baseUrl + apiRoute + 'getbyid?id=' + id);
  }


}
