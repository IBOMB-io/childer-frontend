import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MainPageService } from '../main-page/main-page.service';
import { AddChildService } from './add-child.service';
import { ChildModel } from './child.model';


@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.css']
})
export class AddChildComponent implements OnInit {

  imageError!: string;
  isImageSaved!: boolean;
  cardImageBase64!: string;

  formImageData: FormData = new FormData();

  constructor(private service: AddChildService, private router: Router) {
  };

  ngOnInit() { }

  getAge(birthDate: Date): number {
    birthDate = new Date(birthDate);
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  getGrade(birthDate: Date): string {
    const age: number = this.getAge(birthDate);
    
    if (age == 3) {
      return "1"
    } else if (age == 4) {
      return "2"
    } else if (age >= 5) {
      return "3"
    }
    return '';
  }

  postChild(data: any) {
    const child: ChildModel = {
      fname: data.fname,
      lname: data.lname,
      nickName: data.nickName,
      ethnicity: data.ethnicity,
      nationality: data.nationality,
      idCard: data.idCard,
      bod: data.bod,
      parentName: data.parentName,
      grade: this.getGrade(data.bod),
      tel: data.tel,
      address: {
        houseNumber: data.houseNumber,
        moo: data.moo,
        tambon: data.tambon,
        district: data.district,
        province: data.province
      },
      imagePath: '',
      book: {
        schoolName: data.schoolName,
        schoolLocation: data.schoolLocation,
        affiliation: data.affiliation,
        room: 0,
        schoolYear: data.schoolYear
      }
    };


    this.service.uploadImage(this.formImageData).subscribe(async (res) => {
      child.imagePath = res;
      await this.service.postChild(child).subscribe((res) => {
        console.log(res);
        this.router.navigate(['/main']);
      });
    });
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = "";
    if (fileInput.target.files && fileInput.target.files[0]) {
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = 226;
          const img_width = 226;

          console.log(img_height, img_width);


          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            this.formImageData.append("image", fileInput.target.files[0], fileInput.target.files[0].name);
            //console.log(this.formImageData.get("image"));

            return fileInput.target.files[0];
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
    return null;
  }

}
