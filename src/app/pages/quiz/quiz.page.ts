import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {ParticipantModel} from '../../models/participant.model';
import {QUIZ_ID} from '../../constants/storage.contants';
import {Storage} from '@ionic/storage';
import {IonRouterOutlet, ModalController} from '@ionic/angular';
import {CreateQuestionComponent} from '../../components/create-question/create-question.component';
import {QuizService} from '../../services/quiz.service';
import {Router} from '@angular/router';

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
                private router: Router) {
    }

    quiz: { id: string, beschrijving: string, aantalVragen: number, participants: ParticipantModel[] , isComplete: boolean};
    showParticipantList = false;

    ngOnInit() {
        this.storage.get(QUIZ_ID).then((val) => {
            this.db.object<any>(val).valueChanges().subscribe(item => {
                this.quiz = item;
                if (this.quiz.isComplete) {
                    this.router.navigate(['/play']);
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
       this.quizService.startQuiz({...this.quiz, isComplete: true}).subscribe(response => {
           console.log(response); // todo notificatie tonen
       });
    }

    progressOfParticipants() {
        if (this.quiz) {
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
