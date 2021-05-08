import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PgAddMeterReadingPageRoutingModule } from './pg-add-meter-reading-routing.module';

import { PgAddMeterReadingPage } from './pg-add-meter-reading.page';
import { CpAddMeterReadingComponent } from 'src/app/components/cp-add-meter-reading/cp-add-meter-reading.component';
import { CpTabsComponent } from 'src/app/components/cp-tabs/cp-tabs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PgAddMeterReadingPageRoutingModule
  ],
  declarations: [PgAddMeterReadingPage,
  CpAddMeterReadingComponent,CpTabsComponent]
})
export class PgAddMeterReadingPageModule {}
