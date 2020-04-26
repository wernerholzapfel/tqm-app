import {ParticipantModel} from './participant.model';

export interface QuestionModel {
    id?: string;
    vraag?: string;
    a?: string;
    b?: string;
    c?: string;
    d?: string;
    quiz: { id: string };
    owner?: ParticipantModel;
    isFinished: boolean;
    answers?: number
}
