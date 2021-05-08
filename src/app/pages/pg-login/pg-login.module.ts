import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PgLoginPageRoutingModule } from './pg-login-routing.module';

import { PgLoginPage } from './pg-login.page';
import { CpLoginComponent } from 'src/app/components/cp-login/cp-login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PgLoginPageRoutingModule
  ],
  declarations: [
    PgLoginPage,
    CpLoginComponent
  ]
})
export class PgLoginPageModule { }
