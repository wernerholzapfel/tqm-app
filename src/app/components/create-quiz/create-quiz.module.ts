import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateQuizComponent} from './create-quiz.component';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [CreateQuizComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class CreateQuizModule { }
