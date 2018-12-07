import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {UsuariosProvider} from '../../providers/index.providers';


@Component({
  selector: 'page-comentario',
  templateUrl: 'comentario.html',
})
export class ComentarioPage {

  datosOficina:any;
  comentario:string;

  idEncargado:number;
  idUsuario:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _up: UsuariosProvider) {
    this.datosOficina = this.navParams.get("datosOficina");
    console.log(this.datosOficina);

    this.idEncargado = Number(this.datosOficina.id);
    this.idUsuario = Number(this._up.id_usuario);
  }

  enviarComentario(){
    this._up.enviarComentario(this.idUsuario, this.idEncargado, this.comentario).subscribe(() => {
      this.navCtrl.pop();
    });
  }


}
