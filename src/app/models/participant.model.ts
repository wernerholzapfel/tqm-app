import {QuizModel} from './quiz.model';

export interface ParticipantModel {
    id?: string;
    naam: string;
    quiz: QuizModel;
    questions?: number;
}
