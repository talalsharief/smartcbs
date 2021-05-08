import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PgMeterReadingPageRoutingModule } from './pg-meter-reading-routing.module';

import { PgMeterReadingPage } from './pg-meter-reading.page';
import { CpMeterReadingComponent } from 'src/app/components/cp-meter-reading/cp-meter-reading.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PgMeterReadingPageRoutingModule
  ],
  declarations: [PgMeterReadingPage,
  CpMeterReadingComponent]
})
export class PgMeterReadingPageModule {}
