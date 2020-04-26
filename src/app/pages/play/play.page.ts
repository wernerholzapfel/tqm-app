import {Component, OnInit} from '@angular/core';
import {QUIZ_ID} from '../../constants/storage.contants';
import {Storage} from '@ionic/storage';
import {AngularFireDatabase} from '@angular/fire/database';
import {QuestionModel} from '../../models/question.model';
import {QuizService} from '../../services/quiz.service';
import {AnswerModel} from '../../models/answer.model';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-play',
    templateUrl: './play.page.html',
    styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {

    constructor(private db: AngularFireDatabase,
                private storage: Storage,
                private quizService: QuizService,
                public authService: AuthService) {
    }

    question: QuestionModel;
    quizId: string;
    isAnswered: boolean;
    table: { answers: AnswerModel[], id: string, naam: string, isAdmin: boolean, totaalScore: number, showAnswers: boolean }[];

    ngOnInit() {
        this.storage.get(QUIZ_ID).then((val) => {
            this.quizId = val;
            this.db.object<any>(`${val}/activeQuestion`).valueChanges().subscribe(question => {
                if (!this.question || this.question.id !== question.id) {
                    this.isAnswered = false;
                }
                this.question = question;
            });
            this.db.object<any>(`${val}/table`).valueChanges().subscribe(table => {
                console.log(table);
                this.table = table;
            });
        });
    }

    setAnswer(answer: string) {
        this.quizService.answerQuestion({question: {id: this.question.id}, answer, quizId: this.quizId}).subscribe(response => {
            this.isAnswered = true;
            // todo toast
            console.log(response);
        });
    }

    setQuestionAnswered() {
        this.quizService.setQuestionAnswered({id: this.question.id, quizId: this.quizId}).subscribe(response => {
            console.log(response);
        });
    }
}
