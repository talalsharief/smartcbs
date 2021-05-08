import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PgMeterReadingPage } from './pg-meter-reading.page';

const routes: Routes = [
  {
    path: '',
    component: PgMeterReadingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PgMeterReadingPageRoutingModule {}
