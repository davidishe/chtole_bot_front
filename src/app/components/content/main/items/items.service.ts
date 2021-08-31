import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItem } from 'src/app/shared/models/items/item';
import { AnimalsPagination } from 'src/app/shared/models/pagination';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { environment } from 'src/environments/environment';


type Item = IItem;
const apiRoute = 'items/';


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

  
  createItem(item: IItem, itemId?: number) {
    console.log(itemId);

    if (itemId != 0) {
      return this.http.put(this.baseUrl + apiRoute + 'update', item);
    }
    if (itemId == 0) {
      return this.http.post(this.baseUrl + apiRoute + 'create', item);
    }
  }
  
  updateItem(item: IItem) {
    return this.http.put(this.baseUrl + apiRoute + 'update', item);
  }
  
  getItemById(id: number) {
    return this.http.get(this.baseUrl + apiRoute + 'getbyid?id=' + id);
  }
  
  deleteItem(id: number) {
    return this.http.delete(this.baseUrl + apiRoute + 'delete/?id=' + id);
  }
  
  addProductPhoto(product: IItem, formData: any) {
    return this.http.post(this.baseUrl + 'items/photo?productId=' + product.id, formData);
  }

}
