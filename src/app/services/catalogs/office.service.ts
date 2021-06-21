import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItem } from 'src/app/shared/models/items/item';
import { IBankOffice } from 'src/app/shared/models/user/bankoffice';
import { environment } from 'src/environments/environment';

type Item = IBankOffice;
const apiRoute = 'office/';


@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.baseUrl + apiRoute + 'all/');
  }

  createItem(item: Item) {
    return this.http.post(this.baseUrl + apiRoute + 'create/', item);
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
