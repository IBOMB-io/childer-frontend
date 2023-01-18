import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChildProfileService } from './child-profile.service';

@Component({
  selector: 'app-child-profile',
  templateUrl: './child-profile.component.html',
  styleUrls: ['./child-profile.component.css']
})
export class ChildProfileComponent implements OnInit {

  selected: boolean = true;
  constructor(private service: ChildProfileService, private route: ActivatedRoute) { };

  ngOnInit(): void {

  };

  selectTab(t: boolean) {
    this.selected = t;
  }

}
