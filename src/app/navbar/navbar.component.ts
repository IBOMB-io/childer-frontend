import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  hid: boolean = true;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    if (localStorage.getItem("user")) {
      this.hid = false;
    }
  }


  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });

  }

  navigateMainPage() {
    if (!localStorage.getItem("user")) {

    } else {
      this.router.navigate(['/main']);
    }

  }

}
