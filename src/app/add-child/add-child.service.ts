import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddChildService {

  url: string = "http://localhost:8080/children"

  constructor(private httpClient: HttpClient) { }

  postChild(child: FormData) {
    return this.httpClient.post(this.url, child);
  }

}
