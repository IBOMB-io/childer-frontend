import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MainPageService } from '../main-page/main-page.service';
import { AddChildFormModel } from './add-child.model';


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
  constructor(private service: HttpClient) {
  }

  ngOnInit() {
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

  postChild(data: AddChildFormModel) {

    this.service.post("http://localhost:8080/image", this.formImageData, { responseType: "text" }).subscribe( async (res) => {
      data.imagePath = res;
      console.log(data);
      await this.service.post("http://localhost:8080/children", data).subscribe((res) => console.log(res));
    });
  }

}
