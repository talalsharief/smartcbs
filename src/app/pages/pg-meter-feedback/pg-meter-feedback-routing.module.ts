import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PgMeterFeedbackPage } from './pg-meter-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: PgMeterFeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PgMeterFeedbackPageRoutingModule {}
