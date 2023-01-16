import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private url: string = "http://localhost:8080/auth";

  constructor(private httpClinet: HttpClient) { }

  signOut() {
    return this.httpClinet.post(this.url, { responseType: 'text' });
  }
}
