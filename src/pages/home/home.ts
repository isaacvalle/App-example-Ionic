import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { NoticiasProvider } from "../../providers/noticias/noticias";
import {UsuariosProvider} from '../../providers/index.providers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private menuCtrl: MenuController,
              private _up: UsuariosProvider,
              private _notiP: NoticiasProvider) {

  }

  ionViewDidLoad() {
    this._notiP.mostrarNoticias();
  }

  readMore(i) {
    this._notiP.crearNoticia[i].substr = this._notiP.crearNoticia[i].cuerpo;
    this._notiP.crearNoticia[i].boton = "";
  }

  menuActive(){
    this.menuCtrl.enable(true, 'users');
  }

}
