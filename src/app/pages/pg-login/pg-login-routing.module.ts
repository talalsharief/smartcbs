import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PgLoginPage } from './pg-login.page';

const routes: Routes = [
  {
    path: '',
    component: PgLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PgLoginPageRoutingModule {}
