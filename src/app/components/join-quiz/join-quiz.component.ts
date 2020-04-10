import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {QuizService} from '../../services/quiz.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PARTICIPANT_ID, QUIZ_ID} from '../../constants/storage.contants';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-join-quiz',
    templateUrl: './join-quiz.component.html',
    styleUrls: ['./join-quiz.component.scss'],
})
export class JoinQuizComponent implements OnInit {
    constructor(public modalController: ModalController, private quizService: QuizService, private storage: Storage) {
    }

    joinQuizForm = new FormGroup({
        naam: new FormControl(null, Validators.required),
        quizid: new FormControl('', Validators.required),
    });

    ngOnInit() {
    }

    dismissModal() {
        this.modalController.dismiss(false);
    }

    onSubmit() {
        this.quizService.joinQuiz({
            naam: this.joinQuizForm.value.naam,
            quiz: {id: this.joinQuizForm.value.quizid}
        }).subscribe(participant => {
            this.storage.set(PARTICIPANT_ID, participant.id);
            this.storage.set(QUIZ_ID, this.joinQuizForm.value.quizid);
            this.modalController.dismiss(true);
        });

    }
}
