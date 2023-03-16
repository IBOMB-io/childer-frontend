import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EstimateService } from './estimate.service';
import { Estimate } from './estimate.model';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverviewService } from '../overview/overview.service';
import { Overview } from '../overview/overview.model';
import { DesirableCondition } from '../overview/desirable-condition.model';

@Component({
  selector: 'app-estimate',
  templateUrl: './estimate.component.html',
  styleUrls: ['./estimate.component.css']
})
export class EstimateComponent implements OnInit {

  state: boolean = true;
  btn!: boolean;

  formGroup!: FormGroup;

  assessmentForm: Estimate[] = [];
  assessmentFormFil: Estimate[] = [];
  titleList: string[] = [];
  weekList: string[] = [];
  grade!: number;
  id!: number;
  overviewData: Overview[] = [];
  desirableData: DesirableCondition[] = [];


  constructor(private service: EstimateService, private route: ActivatedRoute, private formBuider: FormBuilder, private overviewService: OverviewService) { };

  ngOnInit(): void {
    this.btn = !localStorage.getItem("user") ? true : false;
    this.formGroup = this.formBuider.group({
      body: this.formBuider.array([]),
      emotional: this.formBuider.array([]),
      society: this.formBuider.array([]),
      brain: this.formBuider.array([])
    });
    this.grade = Number(this.route.snapshot.paramMap.get('grade'));
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getAll();
    console.table(this.desirableData);
  };

  receiveState($event: any) {
    console.log($event);
    this.state = $event;
  }

  createAssForm(text: string, score: number): FormGroup {
    return this.formBuider.group({
      title: [text, Validators.required],
      score: [score, Validators.required]
    })
  };

  async getAll() {
    const titleSet: Set<string> = new Set();
    const weekSet: Set<string> = new Set();
    const controlBody = <FormArray>this.formGroup.controls['body'];
    const controlEmotional = <FormArray>this.formGroup.controls['emotional'];
    const controlsocietySociety = <FormArray>this.formGroup.controls['society'];
    const controlBrain = <FormArray>this.formGroup.controls['brain'];
    await this.service.getassessmentFormAll().forEach(next => {
      this.assessmentForm = next.filter((result: Estimate) => result.level == this.grade);
      this.assessmentForm.forEach(e => titleSet.add(e.title));
      this.titleList = Array.from(titleSet);
      this.assessmentForm.forEach(e => weekSet.add(e.week));
      this.weekList = Array.from(weekSet);
    });
    this.assessmentFormFil = this.assessmentForm.filter((result: Estimate) => result.title == this.assessmentForm[0].title);
    await this.overviewService.getDevelopmentAll().forEach((next: any) => {
      this.overviewData = next.filter((data: Overview) => data.child_id == this.id);
    })
    this.overviewData.forEach((e: Overview) => this.desirableData.push(e.desirableCondition));
    if (this.desirableData.length != 0) {
      for (const i in this.assessmentFormFil) {
        if (this.assessmentFormFil[i].field == "ร่างกาย") {
          this.desirableData.find(e => this.assessmentFormFil[i].objective == e.topic) ?
            controlBody.push(this.createAssForm(this.desirableData.find(e => this.assessmentFormFil[i].objective == e.topic)?.topic as string,
              this.desirableData.find(e => this.assessmentFormFil[i].objective == e.topic)?.termOne as number)) :
            controlBody.push(this.createAssForm(this.assessmentFormFil[i].objective, 0));
        }
        if (this.assessmentFormFil[i].field == "อารมณ์ จิตใจ") {
          this.desirableData.find(e => this.assessmentFormFil[i].objective == e.topic) ?
            controlEmotional.push(this.createAssForm(this.desirableData.find(e => this.assessmentFormFil[i].objective == e.topic)?.topic as string,
              this.desirableData.find(e => this.assessmentFormFil[i].objective == e.topic)?.termOne as number)) :
            controlEmotional.push(this.createAssForm(this.assessmentFormFil[i].objective, 0));
        }
        if (this.assessmentFormFil[i].field == "สังคม") {
          this.desirableData.find(e => this.assessmentFormFil[i].objective == e.topic) ?
            controlsocietySociety.push(this.createAssForm(this.desirableData.find(e => this.assessmentFormFil[i].objective == e.topic)?.topic as string,
              this.desirableData.find(e => this.assessmentFormFil[i].objective == e.topic)?.termOne as number)) :
            controlsocietySociety.push(this.createAssForm(this.assessmentFormFil[i].objective, 0));
        }
        if (this.assessmentFormFil[i].field == "สติปัญญา") {
          this.desirableData.find(e => this.assessmentFormFil[i].objective == e.topic) ?
            controlBrain.push(this.createAssForm(this.desirableData.find(e => this.assessmentFormFil[i].objective == e.topic)?.topic as string,
              this.desirableData.find(e => this.assessmentFormFil[i].objective == e.topic)?.termOne as number)) :
            controlBrain.push(this.createAssForm(this.assessmentFormFil[i].objective, 0));
        }
      }
    } else {
      for (const i in this.assessmentFormFil) {
        if (this.assessmentFormFil[i].field == "ร่างกาย") {
          controlBody.push(this.createAssForm(this.assessmentFormFil[i].objective, 0));
        }
        if (this.assessmentFormFil[i].field == "อารมณ์ จิตใจ") {
          controlEmotional.push(this.createAssForm(this.assessmentFormFil[i].objective, 0));
        }
        if (this.assessmentFormFil[i].field == "สังคม") {
          controlsocietySociety.push(this.createAssForm(this.assessmentFormFil[i].objective, 0));
        }
        if (this.assessmentFormFil[i].field == "สติปัญญา") {
          controlBrain.push(this.createAssForm(this.assessmentFormFil[i].objective, 0));
        }
      }
    }
  }

  filterTitle(data: any) {
    const controlBody = <FormArray>this.formGroup.controls['body'];
    const controlEmotional = <FormArray>this.formGroup.controls['emotional'];
    const controlSociety = <FormArray>this.formGroup.controls['society'];
    const controlBrain = <FormArray>this.formGroup.controls['brain'];
    this.assessmentFormFil = this.assessmentForm.filter((result: Estimate) =>
      result.week == data.value
    );

    controlBody.clear();
    controlEmotional.clear();
    controlSociety.clear();
    controlBrain.clear();
    if (this.desirableData.length != 0) {
      for (const i in this.assessmentFormFil) {
        if (this.assessmentFormFil[i].field == "ร่างกาย") {
          this.desirableData.find(e => this.assessmentFormFil[i].objective == e.topic) ?
            controlBody.push(this.createAssForm(this.desirableData.find(e => this.assessmentFormFil[i].objective == e.topic)?.topic as string,
              this.desirableData.find(e => this.assessmentFormFil[i].objective == e.topic)?.termOne as number)) :
            controlBody.push(this.createAssForm(this.assessmentFormFil[i].objective, 0));
        }
        if (this.assessmentFormFil[i].field == "อารมณ์ จิตใจ") {
          this.desirableData.find(e => this.assessmentFormFil[i].objective == e.topic) ?
            controlEmotional.push(this.createAssForm(this.desirableData.find(e => this.assessmentFormFil[i].objective == e.topic)?.topic as string,
              this.desirableData.find(e => this.assessmentFormFil[i].objective == e.topic)?.termOne as number)) :
            controlEmotional.push(this.createAssForm(this.assessmentFormFil[i].objective, 0));
        }
        if (this.assessmentFormFil[i].field == "สังคม") {
          this.desirableData.find(e => this.assessmentFormFil[i].objective == e.topic) ?
            controlSociety.push(this.createAssForm(this.desirableData.find(e => this.assessmentFormFil[i].objective == e.topic)?.topic as string,
              this.desirableData.find(e => this.assessmentFormFil[i].objective == e.topic)?.termOne as number)) :
            controlSociety.push(this.createAssForm(this.assessmentFormFil[i].objective, 0));
        }
        if (this.assessmentFormFil[i].field == "สติปัญญา") {
          this.desirableData.find(e => this.assessmentFormFil[i].objective == e.topic) ?
            controlBrain.push(this.createAssForm(this.desirableData.find(e => this.assessmentFormFil[i].objective == e.topic)?.topic as string,
              this.desirableData.find(e => this.assessmentFormFil[i].objective == e.topic)?.termOne as number)) :
            controlBrain.push(this.createAssForm(this.assessmentFormFil[i].objective, 0));
        }
      }
    } else {
      this.assessmentFormFil.forEach((result: Estimate) => {
        if (result.field == "ร่างกาย") {
          controlBody.push(this.createAssForm(result.objective, 0));
        }
        if (result.field == "อารมณ์ จิตใจ") {
          controlEmotional.push(this.createAssForm(result.objective, 0));
        }
        if (result.field == "สังคม") {
          controlSociety.push(this.createAssForm(result.objective, 0));
        }
        if (result.field == "สติปัญญา") {
          controlBrain.push(this.createAssForm(result.objective, 0));
        }
      });
    }
  }

  get body(): FormArray {
    return this.formGroup.controls['body'] as FormArray;
  }

  get emotional(): FormArray {
    return this.formGroup.controls['emotional'] as FormArray;
  }

  get society(): FormArray {
    return this.formGroup.controls['society'] as FormArray;
  }

  get brain(): FormArray {
    return this.formGroup.controls['brain'] as FormArray;
  }

  save(model: any) {
    let estimateData = {
      body: model.body,
      brain: model.brain,
      emotional: model.emotional,
      society: model.society,
    }

    this.service.postEstiamte(estimateData, this.id).subscribe(() => window.location.reload());
  }
}
