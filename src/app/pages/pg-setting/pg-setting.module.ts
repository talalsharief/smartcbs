import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PgSettingPageRoutingModule } from './pg-setting-routing.module';

import { PgSettingPage } from './pg-setting.page';
import { CpSettingComponent } from 'src/app/components/cp-setting/cp-setting.component';
import { CpTabsComponent } from 'src/app/components/cp-tabs/cp-tabs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PgSettingPageRoutingModule
  ],
  declarations: [PgSettingPage,
  CpSettingComponent,CpTabsComponent]
})
export class PgSettingPageModule {}
