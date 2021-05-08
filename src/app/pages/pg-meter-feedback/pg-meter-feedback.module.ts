import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PgMeterFeedbackPageRoutingModule } from './pg-meter-feedback-routing.module';

import { PgMeterFeedbackPage } from './pg-meter-feedback.page';
import { CpMeterFeedbackComponent } from 'src/app/components/cp-meter-feedback/cp-meter-feedback.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PgMeterFeedbackPageRoutingModule
  ],
  declarations: [PgMeterFeedbackPage,
  CpMeterFeedbackComponent]
})
export class PgMeterFeedbackPageModule {}
