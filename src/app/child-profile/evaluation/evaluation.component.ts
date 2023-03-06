import { Component, OnInit } from '@angular/core';
import { EvaluationService } from './evaluation.service';
import { Evaluation } from './evaluation.model';
import { DesirableCondition } from '../overview/desirable-condition.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  body!: string;
  emotional!: string;
  society!: string;
  brain!: string;
  data: Evaluation[] = [];

  constructor(private evaluationService: EvaluationService, private route: ActivatedRoute) { };

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.getAll(id);
  };

  getAll(id: number): void {
    this.evaluationService.getDevelopmentAll().subscribe((res: any) => {
      this.data = res.filter((data: Evaluation) => data.child_id == id);

      let body: DesirableCondition[] = [];
      let emotional: DesirableCondition[] = [];
      let society: DesirableCondition[] = [];
      let brain: DesirableCondition[] = [];

      this.data.filter((result: Evaluation) => result.developmentTopic == "ร่างกาย").forEach((element: any) => body.push(element.desirableCondition));
      this.data.filter((result: Evaluation) => result.developmentTopic == "อารมณ์ จิตใจ").forEach((element: any) => emotional.push(element.desirableCondition));
      this.data.filter((result: Evaluation) => result.developmentTopic == "สังคม").forEach((element: any) => society.push(element.desirableCondition));
      this.data.filter((result: Evaluation) => result.developmentTopic == "สติปัญญา").forEach((element: any) => brain.push(element.desirableCondition));

      this.body = this.tranformText(Math.ceil(this.interpolateScore(this.sumScore(body), res.length * 3)));
      this.emotional = this.tranformText(Math.ceil(this.interpolateScore(this.sumScore(emotional), res.length * 3)));
      this.society = this.tranformText(Math.ceil(this.interpolateScore(this.sumScore(society), res.length * 3)));
      this.brain = this.tranformText(Math.ceil(this.interpolateScore(this.sumScore(brain), res.length * 3)));
    });
  }

  interpolateScore(score: number, maxScore: number): number {
    return (score / maxScore) * 3
  }

  sumScore(score: DesirableCondition[]): number {
    let term1 = score.reduce((partialSum, a) => partialSum + a.termOne, 0);
    let term2 = score.reduce((partialSum, a) => partialSum + a.termTwo, 0);
    return term1 + term2;
  }

  tranformText(data: number): string {
    if (data == 3) {
      return `ปฏิบัติได้ดี ${data}`;
    } else if (data == 2) {
      return `ปฏิบัติได้ปานกลาง ${data}`;
    }
    return `ควรสงเสริม ${data}`;
  }

}
