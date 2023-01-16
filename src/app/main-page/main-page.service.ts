import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMainPage } from './main-page.model';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  private url = "http://localhost:8080/children";

  constructor(private httpClient: HttpClient) { }

  getAllChildren() {
    return this.httpClient.get<IMainPage[]>(this.url);
  }

}
