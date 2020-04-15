import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {ParticipantModel} from '../../models/participant.model';
import {QUIZ_ID} from '../../constants/storage.contants';
import {Storage} from '@ionic/storage';
import {IonRouterOutlet, ModalController} from '@ionic/angular';
import {CreateQuestionComponent} from '../../components/create-question/create-question.component';
import {QuizService} from '../../services/quiz.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.page.html',
    styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

    constructor(private db: AngularFireDatabase,
                private storage: Storage,
                private modalController: ModalController,
                private quizService: QuizService,
                private routerOutlet: IonRouterOutlet,
                private router: Router,
                public authService: AuthService) {
    }

    isReadyForQuiz = false;
    showParticipantList = false;
    quiz: { id: string, beschrijving: string, aantalVragen: number, participants: ParticipantModel[], isComplete: boolean };

    ngOnInit() {

        this.storage.get(QUIZ_ID).then((val) => {
            this.db.object<any>(val).valueChanges().subscribe(item => {
                if (item && item.metadata) {
                    this.quiz = item.metadata;
                    if (item.metadata.participants && item.metadata.participants.length > 0) {
                        this.isReadyForQuiz = item.metadata.aantalVragen ===
                        item.metadata.participants.find(p => p.id === this.authService.uid) ?
                            item.metadata.participants.find(p => p.id === this.authService.uid).questions : 0;
                    }

                    if (this.quiz.isComplete) {
                        this.router.navigate(['/play']);
                    }
                }
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

    startQuiz() {
        this.quizService.startQuiz({id: this.quiz.id, isComplete: true}).subscribe(response => {
            console.log(response); // todo notificatie tonen
        });
    }

    progressOfParticipants() {
        if (this.quiz && this.quiz.participants) {
            return (this.quiz.participants.reduce(
                (acc, curVal) => curVal.questions + acc, 0)) / (this.quiz.aantalVragen * this.quiz.participants.length);
        } else {
            return 0;
        }
    }

    progressOfParticipant(participant: ParticipantModel) {
        if (this.quiz) {
            return participant.questions / this.quiz.aantalVragen;
        } else {
            return 0;
        }
    }
}
