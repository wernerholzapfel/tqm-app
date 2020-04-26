import {ParticipantModel} from './participant.model';

export interface AnswerModel {
    id?: string;
    participant?: {id: string};
    question: {id: string, vraag?: string};
    answer: string;
    quizId?: string;
    score?: number;
}
