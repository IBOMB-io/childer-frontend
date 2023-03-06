import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  private url: string = "http://localhost:8080/development";

  constructor(private httpClient: HttpClient) { }

  getDevelopmentAll() {
    return this.httpClient.get(this.url);
  }
}
