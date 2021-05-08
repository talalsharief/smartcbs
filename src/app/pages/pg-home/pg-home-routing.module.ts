import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PgHomePage } from './pg-home.page';

const routes: Routes = [
  {
    path: '',
    component: PgHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PgHomePageRoutingModule {}
