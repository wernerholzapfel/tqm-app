import {Component, OnInit} from '@angular/core';
import {IonRouterOutlet, ModalController} from '@ionic/angular';
import {JoinQuizComponent} from '../../components/join-quiz/join-quiz.component';
import {CreateQuizComponent} from '../../components/create-quiz/create-quiz.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    constructor(private modalController: ModalController,
                private routerOutlet: IonRouterOutlet,
                private router: Router) {
    }

    ngOnInit() {
    }

    async join() {
        const modal = await this.modalController.create({
            component: JoinQuizComponent,
            swipeToClose: true,
            presentingElement: this.routerOutlet.nativeEl,
            componentProps: {}
        });

        modal.onDidDismiss().then((event) => {
            if (event.data) {
                this.router.navigate(['/quiz']);
            }
        });

        return await modal.present();
    }

    async create() {
        const modal = await this.modalController.create({
            component: CreateQuizComponent,
            swipeToClose: true,
            presentingElement: this.routerOutlet.nativeEl,
            componentProps: {}
        });

        modal.onDidDismiss().then((event) => {
            if (event.data) {
                this.router.navigate(['/quiz']);
            }
        });

        return await modal.present();

    }
}
