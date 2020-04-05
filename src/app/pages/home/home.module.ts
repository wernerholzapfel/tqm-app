import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {HomePageRoutingModule} from './home-routing.module';

import {HomePage} from './home.page';
import {JoinQuizComponent} from '../../components/join-quiz/join-quiz.component';
import {CreateQuizComponent} from '../../components/create-quiz/create-quiz.component';
import {CreateQuizModule} from '../../components/create-quiz/create-quiz.module';
import {JoinQuizModule} from '../../components/join-quiz/join-quiz.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        CreateQuizModule,
        JoinQuizModule
    ],
    declarations: [HomePage],
    entryComponents: [JoinQuizComponent, CreateQuizComponent]
})
export class HomePageModule {
}
