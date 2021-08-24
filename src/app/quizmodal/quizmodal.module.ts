import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizmodalPageRoutingModule } from './quizmodal-routing.module';

import { QuizmodalPage } from './quizmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizmodalPageRoutingModule
  ],
  declarations: [QuizmodalPage]
})
export class QuizmodalPageModule {}
