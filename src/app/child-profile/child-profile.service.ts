import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChild } from './ichild.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildProfileService {

  url: string = 'http://localhost:8080/children'

  constructor(private httpClient: HttpClient) { }

  getChildById(id: number) : Observable<IChild> {
    return this.httpClient.get<IChild>(`${this.url}/${id}`);
  }
}
