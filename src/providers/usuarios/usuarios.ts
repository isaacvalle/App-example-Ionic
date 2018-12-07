import {Http, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Vibration } from '@ionic-native/vibration';

import {URL_SERVER} from '../../config/url.servicios';

import { AlertController, LoadingController, Platform } from 'ionic-angular';


@Injectable()
export class UsuariosProvider {

  token:string;
  id_usuario:string;
  nombre:string;
  num_control:string;


  constructor(public http: Http, private storage: Storage, private vibration: Vibration, public alertCtrl: AlertController, public loadingCtrl: LoadingController, private platform:Platform) {
    console.log('Hello UsuariosProvider Provider');
  }

  activo():boolean{
    if(this.token){
      return true;
    }else{
      return false;
    }
  }

  ingresar(numControl:string, password:string){
    let body       : string = "&numControl=" + numControl + "&password=" + password,
        type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers    : any     = new Headers({ 'Content-Type': type}),
        options    : any     = new RequestOptions({ headers: headers }),
        url        : any     = URL_SERVER+ "login.php";

    return this.http.post(url, body, options).map(res => {

      let data = res.json();

      if(data.error){

        if(this.platform.is("cordova")){
          this.vibration.vibrate(500);
        }

        this.alertCtrl.create({
          title: "Error al ingresar",
          message: data.mensaje,
          buttons: ["Ok"]
        }).present();

      }else{

        this.token = data.token;
        this.id_usuario = data.id_usuario;
        this.nombre = data.nombre;
        this.num_control = data.numControl;

        // Guardar en storage
        this.guardar_storage();
        this.mostrar_loading();

      }

    });
  }

  mostrar_loading(){
    let loader = this.loadingCtrl.create({
      content: "Cargando...",
      spinner: "dots",
      duration: 2000
    });
    loader.present();
  }

  guardar_storage(){

    if(this.platform.is("cordova")){
      //Estamos en el dispositivo

      this.storage.set('token', this.token);
      this.storage.set('id_usuario', this.id_usuario);
      this.storage.set('nombre', this.nombre);
      this.storage.set('num_control', this.num_control);

    }else{
      //Estamos en la computadora

      if(this.token){
        localStorage.setItem("token", this.token);
        localStorage.setItem("id_usuario", this.id_usuario);
        localStorage.setItem("nombre", this.nombre);
        localStorage.setItem("num_control", this.num_control);
      }else{
        localStorage.removeItem("token");
        localStorage.removeItem("id_usuario");
        localStorage.removeItem("nombre");
        localStorage.removeItem("num_control");
      }

    }

  }

  cargar_storage(){

    let promesa = new Promise((resolve, reject) => {
      if(this.platform.is("cordova")){
        //Estamos en el dispositivo

        this.storage.ready().then(()=>{

          this.storage.get("token").then(token => {
            if(token){
              this.token = token;
            }
          })

          this.storage.get("id_usuario").then(id_usuario => {
            if(id_usuario){
              this.id_usuario = id_usuario;
            }
          })

          this.storage.get("nombre").then(nombre => {
            if(nombre){
              this.nombre = nombre;
            }
          })

          this.storage.get("num_control").then(num_control => {
            if(num_control){
              this.num_control = num_control;
            }
            resolve();
          })

        })

      }else{
        //Estamos en la computadora

        if(localStorage.getItem("token")){
          this.token = localStorage.getItem("token");
          this.id_usuario = localStorage.getItem("id_usuario");
          this.nombre = localStorage.getItem("nombre");
          this.num_control = localStorage.getItem("num_control");
        }
        resolve();
      }
    });
    return promesa;

  }


  enviarComentario(id_usuario:number, id_encargado:number, mensaje:string){

    let body       : string = "&id_usuario=" + id_usuario + "&id_encargado=" + id_encargado + "&mensaje=" + mensaje,
        type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers    : any     = new Headers({ 'Content-Type': type}),
        options    : any     = new RequestOptions({ headers: headers }),
        url        : any     = URL_SERVER + "comentario.php";

    return this.http.post(url, body, options).map(res => {

      let data = res.json();
      console.log(data);

      if(data == "ok"){
        this.alertCtrl.create({
          title: "Exito",
          message: "Comentario enviado correctamente",
          buttons: ["Ok"]
        }).present();
      }

    });

  }

}
