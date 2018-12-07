import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {OficinaPage, LoginPage, PerfilPage} from '../pages/index.paginas';

import {OficinasProvider, UsuariosProvider} from '../providers/index.providers';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private _op: OficinasProvider, private _up: UsuariosProvider) {
    platform.ready().then(() => {

      this._op.cargar_oficinas();

      this._up.cargar_storage().then(()=>{

        if(this._up.token){
          this._up.mostrar_loading();
          this.rootPage = HomePage;
        }else{
          this.rootPage = LoginPage;
        }

      });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(oficina) {
    if(oficina.page == 'HomePage'){
      this.nav.setRoot(HomePage);
    }else if(oficina.page == 'PerfilPage'){
      this.nav.setRoot(PerfilPage);
    }else{
      this.nav.setRoot(OficinaPage, {oficina: oficina});
    }
  }

}
