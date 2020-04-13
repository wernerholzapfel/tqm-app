import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {QuizService} from '../../services/quiz.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {QUIZ_ID} from '../../constants/storage.contants';
import {Storage} from '@ionic/storage';
import {AngularFireAuth} from '@angular/fire/auth';
import {take} from 'rxjs/operators';

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
            .pipe(take(1))
            .subscribe(response => {
                this.storage.set(QUIZ_ID, response.quiz.id);
                this.firebase.auth.signInWithCustomToken(response.token)
                    .catch(error => {
                    // Handle Errors here. //todo
                    console.log(error.message);
                });
                this.modalController.dismiss(true);
            });
    }
}

