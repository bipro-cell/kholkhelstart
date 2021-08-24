import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { AssociatedPeoplePage } from './associated-people.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: AssociatedPeoplePage
      }
    ])
  ],
  declarations: [AssociatedPeoplePage]
})
export class AssociatedPeoplePageModule {}
