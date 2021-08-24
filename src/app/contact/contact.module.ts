import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ContactPage } from './contact.page';
import { ContactFormPage } from '../contactform/contactform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContactPage
      }
    ])
  ],
  declarations: [ContactPage,ContactFormPage],
  entryComponents:[ContactFormPage]
})
export class ContactPageModule {}
