import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';
import {CreateQuestionComponent} from './create-question.component';



@NgModule({
  declarations: [CreateQuestionComponent],
  imports: [
    CommonModule,
      IonicModule,
      ReactiveFormsModule
  ]
})
export class CreateQuestionModule { }
