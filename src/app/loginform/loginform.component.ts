import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from './login-form.model';
import { LoginServiceService } from './login-service.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {

  username: FormControl = new FormControl(null, [Validators.required]);
  password: FormControl = new FormControl(null, Validators.required);

  constructor(private router: Router, private service: LoginServiceService) {
  }

  ngOnInit(): void {

  }

  login() {
    const loginData: LoginForm = new LoginForm(this.username.value, this.password.value);
    if (!loginData.getUsername() && !loginData.getPassword()) {
      alert("กรุณาตรวจสอบข้อมูลหรือกรอกข้อมูลให้ครบ");
    } else {
      this.service.login(loginData).subscribe((res) => {
        localStorage.setItem("user", JSON.stringify(res));
        this.router.navigate(["/main"]).then(() => { window.location.reload() });
      });
    }
    console.log(loginData);

  }
}
