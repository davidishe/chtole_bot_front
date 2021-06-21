import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItem } from 'src/app/shared/models/items/item';
import { IShelter } from 'src/app/shared/models/shelters/shelter';
import { environment } from 'src/environments/environment';


type Item = IItem;
const apiRoute = 'photo/';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}


  addPhotoToShelter(item: Item, formData: any) {
    return this.http.post(this.baseUrl + apiRoute + 'shelters?id=' + item.id, formData);
  }


  addPhotoToPet(item: Item, formData: any) {
    return this.http.post(this.baseUrl + apiRoute + 'pets?id=' + item.id, formData);
  }

}
