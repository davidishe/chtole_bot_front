import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadataQuery } from 'src/app/shared/models/dadata/dadata';

@Injectable({
  providedIn: 'root'
})
export class DadataEgrulService {

  baseUrl = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Token ' + "5f6e87441948ba1d00eb29d7cf605873cd17c722",
      'Access-Control-Expose-Headers': '*',
      "Content-Type": "application/json",
      "Accept": "application/json",
    })
  };

  dadataQuery: DadataQuery = {};

  constructor(private http: HttpClient) {}

  getAddressByInnOgrn(innogrn: string) {    
    this.dadataQuery.query = innogrn;
    return this.http.post(this.baseUrl, this.dadataQuery, this.httpOptions);
  }
}
