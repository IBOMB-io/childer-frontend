import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from './login-form.model';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {

  }

  login(data: any) {
    const loginData: LoginForm = new LoginForm(data.username, data.password);
    localStorage.setItem("user", JSON.stringify(data));
    this.router.navigate(["/main"]).then(() => { window.location.reload() });
  }
}
