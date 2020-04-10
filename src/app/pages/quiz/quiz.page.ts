import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {ParticipantModel} from '../../models/participant.model';
import {QUIZ_ID} from '../../constants/storage.contants';
import {Storage} from '@ionic/storage';
import {CreateQuizComponent} from '../../components/create-quiz/create-quiz.component';
import {IonRouterOutlet, ModalController} from '@ionic/angular';
import {CreateQuestionComponent} from '../../components/create-question/create-question.component';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.page.html',
    styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

    constructor(private db: AngularFireDatabase,
                private storage: Storage,
                private modalController: ModalController,
                private routerOutlet: IonRouterOutlet) {
    }

    quiz: { id: string, beschrijving: string, aantalVragen: number, participants: ParticipantModel[] };

    ngOnInit() {
        this.storage.get(QUIZ_ID).then((val) => {
            this.db.object<any>(val).valueChanges().subscribe(item => {
                this.quiz = item;
            });
        });
    }

    async createQuestion() {
            const modal = await this.modalController.create({
                component: CreateQuestionComponent,
                swipeToClose: true,
                presentingElement: this.routerOutlet.nativeEl,
                componentProps: {}
            });

            modal.onDidDismiss().then((event) => {
                if (event.data) {
                    console.log('create');
                }
            });

            return await modal.present();

    }
}
