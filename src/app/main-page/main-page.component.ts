import { Component, OnInit } from '@angular/core';
import { MainPage } from './main-page';
import { MainPageService } from './main-page.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  children!: Array<MainPage>;

  constructor(private service: MainPageService) { }

  ngOnInit(): void {
    this.service.getAllChildren().subscribe((response : any) => {
      this.children = response;
    })
  }

}
