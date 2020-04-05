import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {ParticipantModel} from '../../models/participant.model';
import {QuizModel} from '../../models/quiz.model';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.page.html',
    styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

    constructor(private db: AngularFireDatabase) {
    }

    quiz: { beschrijving: string, aantalVragen: number, participants: ParticipantModel[] };

    ngOnInit() {
        this.db.object<any>(`bf0de5e8-702e-4beb-9b3d-4bb9f2487825`).valueChanges().subscribe(item => {
           this.quiz = item;
        });
    }

}
