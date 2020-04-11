import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ParticipantModel} from '../models/participant.model';
import {QuizModel} from '../models/quiz.model';
import {QuestionModel} from '../models/question.model';

@Injectable({
    providedIn: 'root'
})
export class QuizService {

    constructor(private http: HttpClient) {
    }

    createQuiz(body: QuizModel): Observable<QuizModel> {
        return this.http.post<QuizModel>(`${environment.apiBaseUrl}/quiz`, body);
    }

    joinQuiz(body: ParticipantModel): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(`${environment.apiBaseUrl}/participant`, body);
    }

    createQuestion(body: QuestionModel): Observable<QuestionModel> {
        return this.http.post<QuestionModel>(`${environment.apiBaseUrl}/question`, body);
    }

    startQuiz(body: { id: string, isComplete: boolean }): Observable<QuizModel> {
        return this.http.put<QuizModel>(`${environment.apiBaseUrl}/quiz`, body);
    }
}
