import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IChildModel } from '../add-child/child.model';
import { ChildProfileService } from './child-profile.service';

@Component({
  selector: 'app-child-profile',
  templateUrl: './child-profile.component.html',
  styleUrls: ['./child-profile.component.css']
})
export class ChildProfileComponent implements OnInit {

  child!: IChildModel;
  selected: boolean = true;
  constructor(private service: ChildProfileService, private route: ActivatedRoute) { };

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.getById(id);
  };


  getById(id: number) {
    this.service.getChildById(id).subscribe((res: any) => {
      this.child = res;
      this.child.bod = new Date(this.child.bod);
      console.log(this.child);

    });
  }

  selectTab(t: boolean) {
    this.selected = t;
  }

}
