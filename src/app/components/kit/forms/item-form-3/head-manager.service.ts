import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHeadManager, IIndividOwner, ILegalOwner } from 'src/app/shared/models/items/owners';
import { environment } from 'src/environments/environment';

type Item = ILegalOwner;

const apiRoute = 'owners/';

@Injectable({
  providedIn: 'root'
})

export class HeadManagerService {


  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  items: Item[] = [];


  addHeadManager(owner: IHeadManager, itemId: number) {
    return this.http.post(this.baseUrl + 'headmanager/' + 'headmanager?itemId=' + itemId, owner);
  }
  

  getCurrentHeadManager (itemId: number) {
    return this.http.get(this.baseUrl + 'headmanager/' + 'current?itemId=' + itemId);
  }



}