import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItem } from 'src/app/shared/models/item';
import { AnimalsPagination } from 'src/app/shared/models/pagination';
import { IShelter } from 'src/app/shared/models/shelters/shelter';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { environment } from 'src/environments/environment';

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



  // deleteItem(itemId: number) {
  //   return this.http.delete(this.baseUrl + 'items/delete/?productId=' + itemId);
  // }

  addProductPhoto(product: IItem, formData: any) {
    return this.http.post(this.baseUrl + 'items/photo?productId=' + product.id, formData);
  }

  updateItemShelter(item: IShelter) {
    return this.http.put(this.baseUrl + 'shelters/update', item);
  }

  getItemByIdShelter(id: number) {
    return this.http.get(this.baseUrl + 'animals/animal/?id=' + id);
  }

}
