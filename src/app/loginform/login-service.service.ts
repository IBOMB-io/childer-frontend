import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm } from './login-form.model';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private url: string = "http://localhost:8080/auth"

  constructor(private httpClient: HttpClient) { }

  login(acc: LoginForm) {
    return this.httpClient.post(`${this.url}/signin`, acc, { responseType: 'text' });
  }
}
