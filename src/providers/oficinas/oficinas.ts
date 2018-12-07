import {Http} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import {URL_SERVER} from '../../config/url.servicios';


@Injectable()
export class OficinasProvider {

  url:any = URL_SERVER + "oficinas.php";

  oficinas:any = [];

  constructor(public http: Http) {
    console.log('Hello OficinasProvider Provider');
    
    this.cargar_oficinas();
  }


  cargar_oficinas(){
    this.http.get(this.url).map(res => res.json()).subscribe(data =>
    {
      this.oficinas = data;
    });

  }

}
