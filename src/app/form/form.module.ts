import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { FormPage } from './form.page';
import{LoaderComponentComponent} from '../loader-component/loader-component.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreModule,
    RecaptchaModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: FormPage
      }
    ])
  ],
  declarations: [FormPage,LoaderComponentComponent],
  entryComponents:[]
})
export class FormPageModule {}
