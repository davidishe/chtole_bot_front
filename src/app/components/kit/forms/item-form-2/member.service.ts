import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMember } from 'src/app/shared/models/items/member';
import { environment } from 'src/environments/environment';

type Item = IMember;

const apiRoute = 'members/';

@Injectable({
  providedIn: 'root'
})

export class MemberService {


  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  items: Item[] = [];


  delete(id: number) {
    return this.http.delete(this.baseUrl + apiRoute + 'delete?id=' + id);
  }

  getAll() {
    return this.http.get(this.baseUrl + apiRoute + 'all');
  }
  
  add(owner: Item, itemId: number) {
    return this.http.post(this.baseUrl + apiRoute + 'inidividuals/create/owner?itemId=' + itemId, owner);
  }


  getById(id: number) {
    return this.http.get(this.baseUrl + apiRoute + 'getbyid?id=' + id);
  }


  updateIndividualOwner(owner: Item) {
    return this.http.patch(this.baseUrl + apiRoute + 'inidividuals/update/owner', owner);
  }

  


}