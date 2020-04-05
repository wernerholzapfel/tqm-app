import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {QuizService} from '../../services/quiz.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-create-quiz',
    templateUrl: './create-quiz.component.html',
    styleUrls: ['./create-quiz.component.scss'],
})
export class CreateQuizComponent implements OnInit {

    constructor(public modalController: ModalController, private quizService: QuizService) {
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
                return this.quizService.joinQuiz({quiz: {id: quiz.id}, naam: this.createQuizForm.value.naam});
            }))
            .subscribe(quiz => {
                this.modalController.dismiss(true);
                // todo key in storage zetten
            });
    }
}

