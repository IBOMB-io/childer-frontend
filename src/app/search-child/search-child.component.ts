import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainPageService } from '../main-page/main-page.service';
import { IMainPage } from "../main-page/main-page.model";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-child',
  templateUrl: './search-child.component.html',
  styleUrls: ['./search-child.component.css']
})
export class SearchChildComponent implements OnInit {

  fullname: FormControl = new FormControl(null, Validators.required);

  constructor(private router: Router, private service: MainPageService, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  async search() {
    const fullName: string = this.fullname.value;
    const fName: string = fullName.search(" ") != undefined ? fullName.slice(0, fullName.search(" ")) : fullName;
    const children: IMainPage[] = [];
    await this.service.getAllChildren().forEach((res: any) => children.push(...res));
    const id: number = children.find(e => e.fname == fName)?.id as number;
    const grade: string = children.find(e => e.fname == fName)?.grade as string;
    if (id == undefined || fullName == null) {
      console.log(fullName.search(" "));
      
      this.toastr.error("กรุณาตรวจสอบข้อมูลหรือกรอกช้อมูลให้ครบ", "ไม่พบข้อมูล", { timeOut: 2000 });
    } else {
      this.toastr.success("", 'สำเร็จ', { timeOut: 2000, });
      this.router.navigate([`/profile/${grade}/${id}`]);
    }
  }
}
