import { DesirableCondition } from "../overview/desirable-condition.model";

export interface Evaluation {
    id: number;
    child_id: number;
    developmentTopic: string;
    desirableCondition: DesirableCondition;
}
