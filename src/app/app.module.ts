import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlertModalComponent } from './components/popup/alert-modal/alert-modal.component';
import { Keyboard } from '@ionic-native/keyboard/ngx'
import { IonicStorageModule } from '@ionic/storage';
import { AuthguardService } from './services/authguard.service';

@NgModule({
  declarations: [AppComponent,
  AlertModalComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
     IonicModule.forRoot(),
     IonicStorageModule.forRoot(), 
     AppRoutingModule],
     
  providers: [
    HttpClient,
    Keyboard,
    { provide: RouteReuseStrategy,
     useClass: IonicRouteStrategy },
     AuthguardService
    
    ],
  bootstrap: [AppComponent],
})
export class AppModule { }
