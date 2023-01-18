import { Component, OnInit } from '@angular/core';
import { ChildProfileService } from '../child-profile.service';
import { ActivatedRoute } from '@angular/router';
import { IChild } from '../ichild.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  child!: IChild;

  constructor(private service: ChildProfileService, private route: ActivatedRoute) {
  };

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.getById(id);
  }

  getById(id: number) {
    this.service.getChildById(id).subscribe((res: IChild) => {
      this.child = res;
      this.child.bod = new Date(this.child.bod);
    });
  }

  dateToStr(dob: Date): String {
    let date : number = dob.getDate();
    let month: string = dob.toLocaleString('default', {
      month: 'long',
    });
    let year : number = dob.getFullYear() + 543;
    return `เกิดวันที่ ${date} เดือน ${month} พ.ศ. ${year}`;
  }

}
