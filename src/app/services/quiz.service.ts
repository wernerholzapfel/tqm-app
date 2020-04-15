import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ParticipantModel} from '../models/participant.model';
import {QuizModel} from '../models/quiz.model';
import {QuestionModel} from '../models/question.model';
import {AnswerModel} from '../models/answer.model';

@Injectable({
    providedIn: 'root'
})
export class QuizService {

    constructor(private http: HttpClient) {
    }

    createQuiz(body: QuizModel): Observable<{ quiz: QuizModel, token: string }> {
        return this.http.post<{ quiz: QuizModel, token: string }>(`${environment.apiBaseUrl}/quiz`, body);
    }

    joinQuiz(body: ParticipantModel): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(`${environment.apiBaseUrl}/participant`, body);
    }

    createQuestion(body: QuestionModel): Observable<QuestionModel> {
        return this.http.post<QuestionModel>(`${environment.apiBaseUrl}/question`, body);
    }

    answerQuestion(body: AnswerModel): Observable<AnswerModel> {
        return this.http.post<AnswerModel>(`${environment.apiBaseUrl}/answer`, body);
    }

    startQuiz(body: { id: string, isComplete: boolean }): Observable<QuizModel> {
        return this.http.put<QuizModel>(`${environment.apiBaseUrl}/quiz`, body);
    }

    setQuestionAnswered(body: { id: string, quizId: string }): Observable<QuizModel> {
        return this.http.put<QuizModel>(`${environment.apiBaseUrl}/question/answered`, body);
    }
}
