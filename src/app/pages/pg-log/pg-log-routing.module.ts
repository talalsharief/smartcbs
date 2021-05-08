import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PgLogPage } from './pg-log.page';

const routes: Routes = [
  {
    path: '',
    component: PgLogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PgLogPageRoutingModule {}
