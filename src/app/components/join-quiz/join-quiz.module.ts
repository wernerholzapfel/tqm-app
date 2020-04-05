import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JoinQuizComponent} from './join-quiz.component';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [JoinQuizComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class JoinQuizModule { }
