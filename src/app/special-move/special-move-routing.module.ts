import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialMovePage } from './special-move.page';

const routes: Routes = [
  {
    path: '',
    component: SpecialMovePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialMovePageRoutingModule {}
