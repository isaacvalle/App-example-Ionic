import {Http, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import {URL_SERVER} from '../../config/url.servicios';

@Injectable()
export class NoticiasProvider {
  baseURL:any = URL_SERVER + "noticias.php";

  crearNoticia:any[] = [];

  diaNombre:any [] = ["Domingo","Lunes","Martes","Miécoles","Jueves","Vienes","Sábado"];
  mesNames: any[] = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

  constructor(public http: Http) {
    // console.log('Hello NoticiasProvider Provider');
  }

  mostrarNoticias() {
    this.http.get(this.baseURL)
    .map(res => res.json())
    .subscribe(data =>
    {
      this.crearNoticia = data;

      let formatoFecha:any = [];

      for (let i = 0; i < data.length; i++) {
        formatoFecha.push(this.fechaPreview(data[i].fecha));
        this.crearNoticia[i]["fecha"] = formatoFecha[i];
        this.crearNoticia[i]["substr"] = this.crearNoticia[i].cuerpo.substring(0, 200);
        this.crearNoticia[i]["boton"] = "... Ver más";
      }
      console.log(this.crearNoticia)
    });
  }

  fechaPreview(fecha) {
    //let fecha = "2018-05-03";
    let nuevaFecha = new Date(fecha + " ");
    let dia = nuevaFecha.getDate();
    let mes = nuevaFecha.getMonth();
    let fecha_convertida = dia +" " + this.mesNames[mes] + ".";
    return fecha_convertida;
  }

}
