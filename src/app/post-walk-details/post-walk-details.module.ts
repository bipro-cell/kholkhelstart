import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { PostwalkdetailsPage } from './post-walk-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: PostwalkdetailsPage
      }
    ])
  ],
  declarations: [PostwalkdetailsPage]
})
export class PostwalkdetailsPageModule {}
