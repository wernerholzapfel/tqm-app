import {ParticipantModel} from './participant.model';

export interface AnswerModel {
    id?: string;
    participant?: {id: string};
    question: {id: string};
    answer: string;
    quizId?: string;
}
