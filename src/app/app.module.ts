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
import { NgCircleProgressModule } from 'ng-circle-progress';

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
     AppRoutingModule,
       // Specify ng-circle-progress as an import
       NgCircleProgressModule.forRoot({
        // set defaults here
        backgroundStrokeWidth: 0,
        backgroundPadding: 7,
        space:-12,
        toFixed: 0,
        outerStrokeWidth: 14,
        outerStrokeColor: '#808080',
        innerStrokeWidth: 14,
        innerStrokeColor: '#e7e8ea',
        animationDuration: 500,
        animation: true,
        startFromZero: false,
        responsive: true,
        showUnits: true,
        showTitle: true,
        showSubtitle: false,
        showImage: false,
        renderOnClick: false,
        subtitleFontSize:"20"
        
        
      })
    ],
     
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
