import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChildProfileService {

  url: string = 'http://localhost:8080/children'

  constructor(private httpClient: HttpClient) { }

  getChildById(id: number) {
    return this.httpClient.get(`${this.url}/${id}`);
  }
}
