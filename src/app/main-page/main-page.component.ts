import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMainPage } from './main-page.model';
import { MainPageService } from './main-page.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  children!: Array<IMainPage>;

  constructor(private service: MainPageService,private router:Router) { }

  gradeList: string[] = [
    "1", "2", "3"
  ];

  selected: number = 1;

  ngOnInit(): void {
    this.childrenList();
  }


  childrenList() {
    this.service.getAllChildren().subscribe((response: any) => {
      this.children = response.filter((child: IMainPage) => child.grade == "1");
    });
  }

  filterGrade(grade: any) {
    this.service.getAllChildren().subscribe((response: any) => {
      this.children = response.filter((child: IMainPage) => child.grade == grade.value);
    });
  }

  navigateProfile(id:number) {
    this.router.navigate([`profile/${id}`]);
  }

}
