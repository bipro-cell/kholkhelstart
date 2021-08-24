import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import{ModalPage} from '../modal/modal.page';
import { HomePage } from './home.page';
import{ChatComponent} from '../chat/chat.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
  ],
  declarations: [HomePage,ModalPage,ChatComponent],
  entryComponents:[ModalPage]
})
export class HomePageModule {}
