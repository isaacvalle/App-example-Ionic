import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {LoadingController, AlertController } from 'ionic-angular';

import {URL_SERVER} from '../../config/url.servicios';

@Injectable()
export class ControlCitasProvider {

  // baseURL:string = "http://192.168.0.109/sindicato/agenda.php";
  // baseURL2:string = "http://192.168.0.109/sindicato/reservacionCita.php";
  // baseURL3:string = "http://192.168.0.109/sindicato/citasAgendadas.php";

  constructor(public http: Http,
              public alertCtrl: AlertController) {
  }

  //FUNCION QUE TRAE ARRAY DE HORAS PARA LA AGENDA
  agendaHorarios() {
    return this.http.get(URL_SERVER + "agenda.php")
    .map(res => res.json())
  }

  //FUNCION QUE GRABA EN LA BASE DE DATOS UNA CITA CON LOS DATOS CORRESPONDIENTES
  registroCita(id_encargado, id_usuario, id_horario, fecha, estado) {
    let body       : string = "&id_encargado=" + id_encargado + "&id_usuario=" + id_usuario + "&id_horario=" + id_horario + "&fecha=" + fecha + "&estado=" + estado,
        type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers    : any     = new Headers({ 'Content-Type': type}),
        options    : any     = new RequestOptions({ headers: headers }),
        url        : any     = URL_SERVER + "reservacionCita.php";

    return this.http.post(url, body, options).map(res => res.json())
  }

  //FUNCION QUE TRAE TODAS LAS CITAS ACTIVAS POR ENCARGADO DE UNA FECHA ESPECIFICA
  comprobarAgenda(id_encargado, fecha) {
    let body       : string = "&id_encargado=" + id_encargado + "&fecha=" + fecha,
        type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers    : any     = new Headers({ 'Content-Type': type}),
        options    : any     = new RequestOptions({ headers: headers }),
        url        : any     = URL_SERVER + "citasAgendadas.php";

    return this.http.post(url, body, options).map(res => res.json())
  }

  //FUNCION QUE TRAE TODAS LAS CITAS ACTIVAS POR USUARIO DE UNA FECHA ESPECIFICA
  proximasCitas(id_usuario, fecha) {
    let body       : string = "&id_usuario=" + id_usuario + "&fecha=" + fecha,
        type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers    : any     = new Headers({ 'Content-Type': type}),
        options    : any     = new RequestOptions({ headers: headers }),
        url        : any     = URL_SERVER + "proximasCitas.php";

    return this.http.post(url, body, options).map(res => res.json())
  }

  //FUNCION PARA CANCERLAR LAS CITAS


}
