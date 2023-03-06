import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EstimateService } from '../estimate.service';
import { Estimate } from '../estimate.model';

@Component({
  selector: 'app-add-estimate',
  templateUrl: './add-estimate.component.html',
  styleUrls: ['./add-estimate.component.css']
})
export class AddEstimateComponent implements OnInit {

  state: boolean = true;
  FormGroup!: FormGroup;
  grade!: number;

  @Output() stateEvent = new EventEmitter<boolean>();

  constructor(private formBuider: FormBuilder, private route: ActivatedRoute, private estimateService: EstimateService) { }

  ngOnInit(): void {
    this.grade = Number(this.route.snapshot.paramMap.get('grade'));
    this.FormGroup = this.formBuider.group({
      ess: this.formBuider.array([])
    });
    this.addForm();
  }

  createEssForm(): FormGroup {
    return this.formBuider.group({
      title: ['', Validators.required],
      objective: ['', Validators.required],
      level: [this.grade, Validators.required],
      field: ['', Validators.required],
      week: ['', Validators.required],
    })
  }

  addForm() {
    const essControl = <FormArray>this.FormGroup.controls['ess'];
    essControl.push(this.createEssForm());
  }

  deleteForm(index: number) {
    const essControl = this.FormGroup.get('ess') as FormArray;
    essControl.removeAt(index)
  }

  setState() {
    this.stateEvent.emit(this.state);
  }

  save(data: any) {
    const postData: Estimate[] = [...data.ess];
    console.log(postData);
    this.estimateService.saveEssForm(postData).forEach(() => window.location.reload());
  }

  get ess(): FormArray {
    return this.FormGroup.controls['ess'] as FormArray;
  }

}
