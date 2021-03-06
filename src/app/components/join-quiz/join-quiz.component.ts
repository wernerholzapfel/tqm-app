import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {QuizService} from '../../services/quiz.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {QUIZ_ID} from '../../constants/storage.contants';
import {Storage} from '@ionic/storage';
import {FirebaseApp} from '@angular/fire';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-join-quiz',
    templateUrl: './join-quiz.component.html',
    styleUrls: ['./join-quiz.component.scss'],
})
export class JoinQuizComponent implements OnInit {
    constructor(public modalController: ModalController, private quizService: QuizService, private storage: Storage,
                private firebase: FirebaseApp) {
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
        }).pipe(take(1)) // todo find out why this request is send over and over
            .subscribe(token => {
            // this.storage.set(PARTICIPANT_ID, participant.id);
            this.firebase.auth().signInWithCustomToken(token.token).catch(error => {
                // Handle Errors here. //todo
                console.log(error.message);
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // ...
            });
            this.storage.set(QUIZ_ID, this.joinQuizForm.value.quizid);
            this.modalController.dismiss(true);
        });
    }
}
