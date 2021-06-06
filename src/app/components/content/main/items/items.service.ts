import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItem } from 'src/app/shared/models/item';
import { AnimalsPagination } from 'src/app/shared/models/pagination';
import { IShelter } from 'src/app/shared/models/shelters/shelter';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { environment } from 'src/environments/environment';


type Item = IItem;
const apiRoute = 'clients/';


@Injectable({
  providedIn: 'root'
})
export class ItemsService {


  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  pets: IItem[] = [];
  pagination = new AnimalsPagination();
  shopParams = new ShopParams();

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('app-token'),
      'Access-Control-Expose-Headers': '*'
    })
  };



  addProductPhoto(product: IItem, formData: any) {
    return this.http.post(this.baseUrl + 'items/photo?productId=' + product.id, formData);
  }

  updateItemShelter(item: IShelter) {
    return this.http.put(this.baseUrl + 'shelters/update', item);
  }

  getItemByIdShelter(id: number) {
    return this.http.get(this.baseUrl + 'animals/animal/?id=' + id);
  }


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
