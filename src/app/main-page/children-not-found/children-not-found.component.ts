import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-children-not-found',
  templateUrl: './children-not-found.component.html',
  styleUrls: ['./children-not-found.component.css']
})
export class ChildrenNotFoundComponent implements OnInit {

  constructor(private router: Router) { }
  ngOnInit(): void { }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

}
