import { DesirableCondition } from "./desirable-condition.model";

export interface Overview {
    id: number;
    child_id: number;
    developmentTopic: string;
    standard: string;
    point: string;
    desirableCondition: DesirableCondition;
}
