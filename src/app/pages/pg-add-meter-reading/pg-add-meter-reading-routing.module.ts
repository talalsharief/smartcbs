import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PgAddMeterReadingPage } from './pg-add-meter-reading.page';

const routes: Routes = [
  {
    path: '',
    component: PgAddMeterReadingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PgAddMeterReadingPageRoutingModule {}
