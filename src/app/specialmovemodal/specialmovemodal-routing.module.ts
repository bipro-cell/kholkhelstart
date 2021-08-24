import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialmovemodalPage } from './specialmovemodal.page';

const routes: Routes = [
  {
    path: '',
    component: SpecialmovemodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialmovemodalPageRoutingModule {}
