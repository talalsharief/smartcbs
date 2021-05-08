import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PgLogPageRoutingModule } from './pg-log-routing.module';

import { PgLogPage } from './pg-log.page';
import { CpLogComponent } from 'src/app/components/cp-log/cp-log.component';
import { CpTabsComponent } from 'src/app/components/cp-tabs/cp-tabs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PgLogPageRoutingModule
  ],
  declarations: [PgLogPage,
  CpLogComponent,CpTabsComponent]
})
export class PgLogPageModule {}
