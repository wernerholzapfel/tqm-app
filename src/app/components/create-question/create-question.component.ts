import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {QuizService} from '../../services/quiz.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PARTICIPANT_ID, QUIZ_ID} from '../../constants/storage.contants';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-create-question',
    templateUrl: './create-question.component.html',
    styleUrls: ['./create-question.component.scss'],
})
export class CreateQuestionComponent implements OnInit {

    constructor(public modalController: ModalController,
                private quizService: QuizService,
                private storage: Storage) {
    }

    createQuestionForm = new FormGroup({
        vraag: new FormControl(null, Validators.required),
        a: new FormControl('', Validators.required),
        b: new FormControl('', Validators.required),
        c: new FormControl('', Validators.required),
        d: new FormControl('', Validators.required),
    });

    ngOnInit() {
    }

    dismissModal() {
        this.modalController.dismiss(false);
    }

    onSubmit() {
        this.storage.get(QUIZ_ID).then(quizId => {
            this.storage.get(PARTICIPANT_ID).then((participantId) => {
                this.quizService.createQuestion({...this.createQuestionForm.value, owner: participantId, quiz: {id:  quizId}})
                    .subscribe(question => {
                        this.modalController.dismiss(true);
                    });
            }); // todo error gooien
        });
    }
}
