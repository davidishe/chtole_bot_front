import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItem } from 'src/app/shared/models/item';
import { environment } from 'src/environments/environment';

type Item = IItem;
const apiRoute = 'clients/';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  createItem(item: IItem) {
    return this.http.post(this.baseUrl + apiRoute + 'create/', item);
  }

  deleteItem(id: number) {
    return this.http.delete(this.baseUrl + apiRoute + 'delete/?id=' + id);
  }

  updateItem(item: IItem) {
    return this.http.put(this.baseUrl + apiRoute + 'update', item);
  }

  getItemById(id: number) {
    return this.http.get(this.baseUrl + apiRoute + 'getbyid?id=' + id);
  }


}
