import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PgHomePageRoutingModule } from './pg-home-routing.module';
import { NgCircleProgressModule } from 'ng-circle-progress';


import { PgHomePage } from './pg-home.page';
import { CpHomeComponent } from 'src/app/components/cp-home/cp-home.component';
import { CpTabsComponent } from 'src/app/components/cp-tabs/cp-tabs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PgHomePageRoutingModule,
    NgCircleProgressModule
  ],
  declarations: [
    PgHomePage,
  CpHomeComponent,
  CpTabsComponent
]
})
export class PgHomePageModule {}
