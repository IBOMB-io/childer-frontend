import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from './login.model';

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

  login(data: LoginModel) {
    console.log(data);
    localStorage.setItem("user", JSON.stringify(data));
    this.router.navigate(["/main"]).then(() => { window.location.reload() });
  }
}
