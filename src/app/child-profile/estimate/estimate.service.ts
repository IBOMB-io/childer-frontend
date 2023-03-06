import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estimate } from './estimate.model';

@Injectable({
  providedIn: 'root'
})
export class EstimateService {

  url: string = "http://localhost:8080"

  constructor(private httpCilent: HttpClient) { }

  getassessmentFormAll(): Observable<Estimate[]> {
    return this.httpCilent.get<Estimate[]>(`${this.url}/assessmentForm`);
  }

  postEstiamte(data: any, id: number) {
    return this.httpCilent.post(`${this.url}/estimate/${id}`, data, { responseType: 'text' });
  }

  updateDes(data: any) {
    return this.httpCilent.put(`${this.url}/desirable`, data, { responseType: 'text' });
  }

  saveEssForm(data: any) {
    return this.httpCilent.post(`${this.url}/assessmentForm/saveall`, data, { responseType: 'text' });
  }

}
