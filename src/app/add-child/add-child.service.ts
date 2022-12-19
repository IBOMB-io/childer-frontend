import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChildModel } from './child.model';

@Injectable({
  providedIn: 'root'
})
export class AddChildService {

  url: string = "http://localhost:8080/children"

  constructor(private httpClient: HttpClient) { }

  postChild(child: ChildModel) {
    return this.httpClient.post(this.url, child);
  }

  uploadImage(image: FormData) {
    return this.httpClient.post("http://localhost:8080/image", image, { responseType: "text" });
  }
}
