import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommentPage } from '../comment/comment.page';
import { PostdetailsPage } from './post-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: PostdetailsPage
      }
    ])
  ],
  declarations: [PostdetailsPage,CommentPage],
  entryComponents:[CommentPage]
})
export class PostdetailsPageModule {}
