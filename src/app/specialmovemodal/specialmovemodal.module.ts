import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialmovemodalPageRoutingModule } from './specialmovemodal-routing.module';

import { SpecialmovemodalPage } from './specialmovemodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecialmovemodalPageRoutingModule
  ],
  declarations: [SpecialmovemodalPage]
})
export class SpecialmovemodalPageModule {}
