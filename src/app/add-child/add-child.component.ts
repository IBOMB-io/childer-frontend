import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddChildService } from './add-child.service';
import { IChildModel } from './child.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.css']
})
export class AddChildComponent implements OnInit {

  fnameForm: FormControl = new FormControl(null, Validators.required);
  lnameForm: FormControl = new FormControl(null, Validators.required);
  nickNameForm: FormControl = new FormControl(null, Validators.required);
  ethnicityForm: FormControl = new FormControl(null, Validators.required);
  nationalityForm: FormControl = new FormControl(null, Validators.required);
  idCardForm: FormControl = new FormControl(null, Validators.required);
  bodForm: FormControl = new FormControl(null, Validators.required);
  parentNameForm: FormControl = new FormControl(null, Validators.required);
  telForm: FormControl = new FormControl(null, Validators.required);

  houseNumberForm: FormControl = new FormControl(null, Validators.required);
  mooForm: FormControl = new FormControl(null, Validators.required);
  tambonForm: FormControl = new FormControl(null, Validators.required);
  districtForm: FormControl = new FormControl(null, Validators.required);
  provinceForm: FormControl = new FormControl(null, Validators.required);

  schoolNameForm: FormControl = new FormControl(null, Validators.required);
  schoolLocationForm: FormControl = new FormControl(null, Validators.required);
  affiliationForm: FormControl = new FormControl(null, Validators.required);
  schoolYearForm: FormControl = new FormControl(null, Validators.required);

  imageError!: string;
  isImageSaved!: boolean;
  cardImageBase64!: string;

  formData: FormData = new FormData();

  constructor(private service: AddChildService, private router: Router, private toastr: ToastrService) { };

  ngOnInit() { }

  postChild() {
    const child: IChildModel = {
      fname: this.fnameForm.value,
      lname: this.lnameForm.value,
      nickName: this.nickNameForm.value,
      ethnicity: this.ethnicityForm.value,
      nationality: this.nationalityForm.value,
      idCard: this.idCardForm.value,
      bod: this.bodForm.value,
      parentName: this.parentNameForm.value,
      tel: this.telForm.value,
      address: {
        houseNumber: this.houseNumberForm.value,
        moo: this.mooForm.value,
        tambon: this.tambonForm.value,
        district: this.districtForm.value,
        province: this.provinceForm.value
      },
      book: {
        schoolName: this.schoolNameForm.value,
        schoolLocation: this.schoolLocationForm.value,
        affiliation: this.affiliationForm.value,
        schoolYear: this.schoolYearForm.value
      }
    };


    if (child.fname == null || child.lname == null || child.nickName == null || child.ethnicity == null || child.nationality == null || child.idCard == null || child.bod == null || child.parentName == null || child.tel == null
      || child.address.houseNumber == null || child.address.moo == null || child.address.tambon == null || child.address.district == null || child.address.province == null || child.book.schoolName == null || child.book.schoolLocation == null
      || child.book.affiliation == null || child.book.schoolYear == null) {
      console.log(child);
      this.toastr.error("กรุณาตรวจสอบข้อมูลหรือกรอกช้อมูลให้ครบ", "ไม่สำเร็จ", { timeOut: 2000 });
    } else {
      this.formData.append("child", JSON.stringify(child));
      this.service.postChild(this.formData).subscribe((res) => {
        console.log(res);
        this.toastr.success("ลงทะเบียนเด็กเรียบร้อย", 'สำเร็จ', { timeOut: 2000, });
        this.router.navigate(['/main']);
      });
    }
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

      this.formData.set("image", fileInput.target.files[0], fileInput.target.files[0].name);

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
            return fileInput.target.files[0];
          }
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
    return null;
  }

}
