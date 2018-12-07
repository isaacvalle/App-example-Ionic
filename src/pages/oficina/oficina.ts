import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

import {ComentarioPage, CitaPage} from '../index.paginas';


@Component({
  selector: 'page-oficina',
  templateUrl: 'oficina.html',
})
export class OficinaPage {

  datosOficina:any;

  paginaComentario:any = ComentarioPage;
  paginaCita:any = CitaPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {
    this.datosOficina = this.navParams.get('oficina');
    console.log(this.datosOficina)

  }

  menuActive(){
    this.menuCtrl.enable(true, 'users');
  }

}
