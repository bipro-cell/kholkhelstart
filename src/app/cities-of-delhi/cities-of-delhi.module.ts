import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgPipesModule } from 'ngx-pipes';
import { CitiesOfDelhiPage } from './cities-of-delhi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CitiesOfDelhiPage
      }
    ]),
    NgPipesModule
  ],
  declarations: [CitiesOfDelhiPage]
})
export class CitiesOfDelhiPageModule {}
