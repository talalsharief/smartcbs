import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Default Home Comment by Aleena 
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/pg-login/pg-login.module').then( m => m.PgLoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/pg-home/pg-home.module').then( m => m.PgHomePageModule)
  },
  {
    path: 'log',
    loadChildren: () => import('./pages/pg-log/pg-log.module').then( m => m.PgLogPageModule)
  },
  {
    path: 'syncdata',
    loadChildren: () => import('./pages/pg-sync-data/pg-sync-data.module').then( m => m.PgSyncDataPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./pages/pg-setting/pg-setting.module').then( m => m.PgSettingPageModule)
  },
  {
    path: 'addmeterreading',
    loadChildren: () => import('./pages/pg-add-meter-reading/pg-add-meter-reading.module').then( m => m.PgAddMeterReadingPageModule)
  },
  {
    path: 'meterreading',
    loadChildren: () => import('./pages/pg-meter-reading/pg-meter-reading.module').then( m => m.PgMeterReadingPageModule)
  },
  {
    path: 'meterfeedback',
    loadChildren: () => import('./pages/pg-meter-feedback/pg-meter-feedback.module').then( m => m.PgMeterFeedbackPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
