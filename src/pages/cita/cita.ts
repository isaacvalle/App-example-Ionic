import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import {UsuariosProvider, ControlCitasProvider} from '../../providers/index.providers';
import { CalendarComponentOptions } from 'ion2-calendar';
import * as moment from 'moment';

@Component({
  selector: 'page-cita',
  templateUrl: 'cita.html',
})
export class CitaPage {

  //VARIABLES UTILIZADAS PARA EL MANEJO DE DATOS
  datosCita:any;
  idEncargado:number;
  idUsuario:number;
  idCita:number = null;
  idHora:any;
  estado:number = 1;
  pressed:any = false;
  horarios:any;
  fecha:any = new Date();

  //VARIABLES USADAS PARA CONF DEL CALENDARIO
  date:any;
  type:'string';
  options:CalendarComponentOptions = {
    pickMode: 'single',
    monthPickerFormat: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
    weekdays: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
    disableWeeks: [0, 6]
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              private _up: UsuariosProvider,
              private _citasEncargado: ControlCitasProvider) {
    this.datosCita = this.navParams.get("datosOficina");

    this.date = this.fecha.getFullYear() + "-"+("0" + (this.fecha.getMonth() + 1)).slice(-2)+"-"+("0" + (this.fecha.getDate())).slice(-2);
    console.log(this.date);
    this.idEncargado = Number(this.datosCita.id);
    this.idUsuario = Number(this._up.id_usuario);
    console.log("ID encargado: ", this.idEncargado)
    console.log("ID usuario: ", this.idUsuario)

    //CONF DE MOMENT JS PARA EL IDIOMA ESPAÑOL
    moment.updateLocale('ES', {
      monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    });

    //OBSERBABLE EN EL CUAL SE ADICIONA EL COLOR DEL BOTON Y EL ESTADO DE LA CITA
    this._citasEncargado.agendaHorarios().subscribe(data =>{
      this.horarios = data;
      // console.log(this.horarios)
      for(let i = 0; i < this.horarios.length; i++) {
        this.horarios[i]["estado"] = 0;
        this.horarios[i]["color"] = "primary";
      }
    });

    //OBSERVABLE EN DONDE SE COMPARAN LAS CITAS EN BD CON LA LISTA DE HORARIOS PARA INHABILITAR BOTONES EN FUNCION DE DISPONIBILIDAD
    this._citasEncargado.comprobarAgenda(this.idEncargado, this.date).subscribe((data:any) => {
      for(let cita of this.horarios.length) {
        // console.log(cita)
        for(let estado of data) {
          if(cita.horario == estado.horario) {
            cita.estado = 1;
          }
        }
      }
    });
  }

  ionViewDidEnter() {
    console.log(this.horarios);
  }

  //EVENTO DEL CALENDARIO PAR CAMBIAR DE DIA, SE LLAMAN NUEVAMENTE LAS DOS FUNCIONES PREVIAS
  onChange($event) {
    this.date = JSON.stringify(this.date).substring(1, 11);
    console.log(this.date);

    this._citasEncargado.agendaHorarios().subscribe(data =>{
      this.horarios = data;

      this._citasEncargado.comprobarAgenda(this.idEncargado, this.date).subscribe((data:any) => {
        for(let cita of this.horarios) {
          // console.log(cita)
          for(let estado of data) {
            if(cita.horario == estado.horario) {
              cita.estado = 1;
            }
          }
        }
      });
    });

    console.log(this.horarios)
  }

  //FUNCION QUE AL SELECCIONAR UN BOTON DE CITA, GUARDA LOS DATOS CORRESPONDIENTES EN VARIABLES
  botonCita(citas) {
    this.idCita = citas.id;
    this.idHora = citas.horario;

    console.log("cita numero " + this.idCita + " a las " + this.idHora + " horas")
    console.log("Con fecha de " + this.date)
    console.log("Con el index " + citas.index)

    this.pressed = true;

    for(let i=0; i < this.horarios.length; i++) {
      if(this.horarios[i].id == citas.id) {
        this.horarios[i].color = "danger";
      }else {
        this.horarios[i].color = "primary";
      }
    }
  }

  //FUNCION PARA EL BOTON 'ACEPTAR' QUE ENVIA LOS DATOS PARA EL REGISTRO DE LA CITA EN LA BD
  eligeCita() {
    if(this.idCita && this.pressed) {
      let alerta = this.alertCtrl.create({
        title: 'Reservar cita',
        subTitle: 'Desea reservar la cita de ' + this.idHora + 'hrs. con el director ' + this.datosCita.encargado + '?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Confirmar',
            handler: () => {
              this._citasEncargado.registroCita(this.idEncargado, this.idUsuario, this.idCita, this.date, this.estado).subscribe((data:any) => {
                console.log(data);
              });
              // console.log("funciona!")
            }
          }
        ]
      });
        alerta.present();
    }else {
      let toast = this.toastCtrl.create({
        message: 'Debes seleccionar un horario para poder continuar.',
        showCloseButton: true,
        closeButtonText: 'Ok',
        position: 'middle'
      });
      toast.present();
    }
  }
}
