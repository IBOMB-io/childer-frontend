import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainPage } from './main-page';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  private url = "http://localhost:8080/children";
  private urlImage = "http://localhost:8080/image";

  constructor(private httpClient: HttpClient) { }

  getAllChildren() {
    return this.httpClient.get(this.url);
  }

  postChild(child: FormData) {
    return this.httpClient.post(this.url, child);
  }

}
