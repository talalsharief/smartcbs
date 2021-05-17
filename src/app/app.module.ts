import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlertModalComponent } from './components/popup/alert-modal/alert-modal.component';
import { Keyboard } from '@ionic-native/keyboard/ngx'
@NgModule({
  declarations: [AppComponent,
  AlertModalComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
     IonicModule.forRoot(), 
     AppRoutingModule],
     
  providers: [
    HttpClient,
    Keyboard,
    { provide: RouteReuseStrategy,
     useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
