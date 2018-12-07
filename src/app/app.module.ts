import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from '@ionic/storage';
import { Vibration } from '@ionic-native/vibration';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {OficinaPage, CitaPage, ComentarioPage, LoginPage, PerfilPage} from '../pages/index.paginas';
import { OficinasProvider } from '../providers/oficinas/oficinas';
import { UsuariosProvider } from '../providers/usuarios/usuarios';
import { NoticiasProvider } from '../providers/noticias/noticias';
import { ControlCitasProvider } from '../providers/control-citas/control-citas';

import { CalendarModule } from "ion2-calendar";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OficinaPage,
    CitaPage,
    ComentarioPage,
    LoginPage,
    PerfilPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    CalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    OficinaPage,
    CitaPage,
    ComentarioPage,
    LoginPage,
    PerfilPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpModule,
    Vibration,
    OficinasProvider,
    UsuariosProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: LOCALE_ID, useValue: "es-MX"},
    NoticiasProvider,
    ControlCitasProvider
  ]
})
export class AppModule {}
