import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PgSettingPage } from './pg-setting.page';

const routes: Routes = [
  {
    path: '',
    component: PgSettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PgSettingPageRoutingModule {}
