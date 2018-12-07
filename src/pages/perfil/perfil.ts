import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

import {UsuariosProvider, ControlCitasProvider} from '../../providers/index.providers';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  imagenUsuario:string = 'https://api.adorable.io/avatar/200/bob';
  misCitas:any;

  user = {
    id: null,
    name: null,
    imageUrl: null,
    ctrlNumber: null
  };

  fecha:any = new Date();
  date:any;

  diaName:any [] = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
  mesNames: any[] = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private menuCtrl: MenuController,
              private _uP: UsuariosProvider,
              private _ctrlCitas: ControlCitasProvider) {

    this.user.id = Number(this._uP.id_usuario);
    this.user.name = this._uP.nombre;
    this.user.imageUrl = this.imagenUsuario;
    this.user.ctrlNumber = Number(this._uP.num_control);

    this.date = this.fecha.getFullYear() + "-"+("0" + (this.fecha.getMonth() + 1)).slice(-2)+"-"+("0" + (this.fecha.getDate())).slice(-2);

    console.log('id:', this.user.id);
    console.log('fecha:', this.date);
    this._ctrlCitas.proximasCitas(this.user.id, this.date).subscribe((data:any) => {
      this.misCitas = data;

      for(let i = 0; i < data.length; i++) {
        this.misCitas[i]["fechacard"] = this.fechaPreview(data[i].fecha);
      }
      console.log("A la verga", data)
    });
  }

  ionViewDidLoad() {
    // console.log('id:', this.user.id);
    // console.log('nombre:', this.user.name);
    // console.log('numCrtl:', this.user.ctrlNumber);
    // console.log('fecha:', this.date);
  }

  fechaPreview(fecha) {
    //let fecha = "2018-05-03";
    let nuevaFecha = new Date(fecha + " ");
    let diaSemana = nuevaFecha.getDay();
    let anio = nuevaFecha.getFullYear();
    let dia = nuevaFecha.getDate();
    let mes = nuevaFecha.getMonth();
    let fecha_convertida = {  diaSema: this.diaName[diaSemana],
      anio: anio,
      dia: dia,
      mes: this.mesNames[mes]
    };
    // this.diaName[diaSemana] + " " + dia + " de " + this.mesNames[mes] + " de " + anio;
    return fecha_convertida;
  }

  menuActive(){
    this.menuCtrl.enable(true, 'users');
  }

}
