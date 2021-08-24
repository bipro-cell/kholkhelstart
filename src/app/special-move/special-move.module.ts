import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialMovePageRoutingModule } from './special-move-routing.module';

import { SpecialMovePage } from './special-move.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecialMovePageRoutingModule
  ],
  declarations: [SpecialMovePage]
})
export class SpecialMovePageModule {}
