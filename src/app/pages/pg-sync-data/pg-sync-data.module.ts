import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PgSyncDataPageRoutingModule } from './pg-sync-data-routing.module';

import { PgSyncDataPage } from './pg-sync-data.page';
import { CpSyncDataComponent } from 'src/app/components/cp-sync-data/cp-sync-data.component';
import { CpTabsComponent } from 'src/app/components/cp-tabs/cp-tabs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PgSyncDataPageRoutingModule
  ],
  declarations: [PgSyncDataPage,
  CpSyncDataComponent,CpTabsComponent]
})
export class PgSyncDataPageModule {}
