import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {QuizService} from '../../services/quiz.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import {PARTICIPANT_ID, QUIZ_ID} from '../../constants/storage.contants';
import { Storage } from '@ionic/storage';
import {FirebaseAuth} from '@angular/fire';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
    selector: 'app-create-quiz',
    templateUrl: './create-quiz.component.html',
    styleUrls: ['./create-quiz.component.scss'],
})
export class CreateQuizComponent implements OnInit {

    constructor(public modalController: ModalController,
                private quizService: QuizService,
                private storage: Storage,
                private firebase: AngularFireAuth) {
    }

    createQuizForm = new FormGroup({
        naam: new FormControl(null, Validators.required),
        beschrijving: new FormControl('', Validators.required),
        aantalVragen: new FormControl(null, Validators.required),
    });

    ngOnInit() {
    }

    dismissModal() {
        this.modalController.dismiss(false);
    }

    onSubmit() {
        this.quizService.createQuiz(this.createQuizForm.value)
            .pipe(switchMap(quiz => {
                this.storage.set(QUIZ_ID, quiz.id);
                return this.quizService.joinQuiz({quiz: {id: quiz.id}, naam: this.createQuizForm.value.naam});
            }))
            .subscribe(token => {
                // this.storage.set(PARTICIPANT_ID, participant.id);
                this.firebase.auth.signInWithCustomToken(token.token).catch(error => {
                    // Handle Errors here. //todo
                    console.log(error.message);
                    // var errorCode = error.code;
                    // var errorMessage = error.message;
                    // ...
                });
                this.modalController.dismiss(true);
            });
    }
}

