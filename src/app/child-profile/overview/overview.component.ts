import { Component, OnInit } from '@angular/core';
import { Overview } from './overview.model';
import { OverviewService } from './overview.service';
import { ActivatedRoute } from '@angular/router';
import { DesirableCondition } from './desirable-condition.model';
import { Evaluation } from '../evaluation/evaluation.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  body!: number;
  bodyColor!: string;
  bodyAvg!: number;
  emotional!: number;
  emotionalColor!: string;
  emoAvg!: number;
  society!: number;
  societyColor!: string;
  soAvg!: number;
  brain!: number;
  brainColor!: string;
  brainAvg!: number;

  constructor(private service: OverviewService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.getAll(id);
  }
  selectedPage?: string;

  data!: Overview[];
  dataFilter!: Overview[];

  selectPage(text: string) {
    this.selectedPage = text;
    this.dataFilter = this.data.filter((res: Overview) => res.developmentTopic == this.selectedPage);
  }

  getAll(id: number) {
    this.service.getDevelopmentAll().subscribe((res: any) => {
      this.data = res.filter((data: Overview) => data.child_id == id);

      let body: DesirableCondition[] = [];
      let emotional: DesirableCondition[] = [];
      let society: DesirableCondition[] = [];
      let brain: DesirableCondition[] = [];

      this.data.filter((result: Evaluation) => result.developmentTopic == "ร่างกาย").forEach((element: any) => body.push(element.desirableCondition));
      this.data.filter((result: Evaluation) => result.developmentTopic == "อารมณ์ จิตใจ").forEach((element: any) => emotional.push(element.desirableCondition));
      this.data.filter((result: Evaluation) => result.developmentTopic == "สังคม").forEach((element: any) => society.push(element.desirableCondition));
      this.data.filter((result: Evaluation) => result.developmentTopic == "สติปัญญา").forEach((element: any) => brain.push(element.desirableCondition));

      this.body = this.interpolateScore(this.sumScore(body), 3, (body.length * 3));
      this.emotional = this.interpolateScore(this.sumScore(emotional), 3, (emotional.length * 3));
      this.society = this.interpolateScore(this.sumScore(society), 3, (society.length * 3));
      this.brain = this.interpolateScore(this.sumScore(brain), 3, (brain.length * 3));

      this.bodyColor = this.changeColor(this.body);
      this.emotionalColor = this.changeColor(this.emotional);
      this.societyColor = this.changeColor(this.society);
      this.brainColor = this.changeColor(this.brain);

      this.bodyAvg = this.sumScore(body) / 2;
      this.emoAvg = this.sumScore(emotional) / 2;
      this.soAvg = this.sumScore(society) / 2;
      this.brainAvg = this.sumScore(brain) / 2;
    });
  }

  interpolateScore(score: number, maxScore: number, dif: number): number {
    return (score / dif) * maxScore;
  }

  sumScore(score: DesirableCondition[]): number {
    let term1 = score.reduce((partialSum, a) => partialSum + a.termOne, 0);
    let term2 = score.reduce((partialSum, a) => partialSum + a.termTwo, 0);
    return term1 + term2;
  }

  changeColor(score: number): string {
    if (score >= 2.5) {
      return 'bg-green-600 hover:bg-green-700 text-white';
    } else if (score >= 1.5) {
      return 'bg-yellow-400 hover:bg-yellow-500 text-white';
    } else if (score >= 1) {
      return 'bg-red-600 hover:bg-red-700 text-white';
    } else {
      return 'bg-white hover:bg-gray-100';
    }
  }

}
