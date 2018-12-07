import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {HomePage} from '../index.paginas';

import {UsuariosProvider} from '../../providers/index.providers';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  numControl:string = "";
  password:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private _up: UsuariosProvider) {
  }

  ingresar(){
    this._up.ingresar(this.numControl, this.password).subscribe(() => {
      if(this._up.activo()){
        this.navCtrl.setRoot(HomePage);
      }
    });
  }

}
