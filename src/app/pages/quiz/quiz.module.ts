import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {QuizPageRoutingModule} from './quiz-routing.module';

import {QuizPage} from './quiz.page';
import {CreateQuestionComponent} from '../../components/create-question/create-question.component';
import {CreateQuestionModule} from '../../components/create-question/create-question.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        QuizPageRoutingModule,
        CreateQuestionModule
    ],
    declarations: [QuizPage],
    entryComponents: [CreateQuestionComponent]

})
export class QuizPageModule {
}
