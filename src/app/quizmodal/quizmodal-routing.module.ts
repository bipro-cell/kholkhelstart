import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizmodalPage } from './quizmodal.page';

const routes: Routes = [
  {
    path: '',
    component: QuizmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizmodalPageRoutingModule {}
