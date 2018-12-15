import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AgregarComercioPage } from '../agregar-comercio/agregar-comercio';
import { EditarComercioPage } from '../editar-comercio/editar-comercio';
import { ComercioService } from '../../services/comercios.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  agregarComercio = AgregarComercioPage;
  //editarComercio = EditarComercioPage;
  Comercios = [];

  @ViewChild('myNav') nav: NavController;
  constructor(public navCtrl: NavController, 
    public navParams : NavParams, 
    public comercioService: ComercioService) {

    //Guardo los datos locales
    //this.comercios = comercioService.getComercio();
    comercioService.getComercio().subscribe(comercios => {
      console.log(comercios);
      
      this.Comercios = comercios;
      //this.users.push(usuarios);
      //console.log(this.users);
      
    });
    console.log(this.Comercios);
  }

  ionViewDidLoad(){
    console.log(this.Comercios);
  }

  editarComercio(comercio){
    console.log(comercio);
    
    this.navCtrl.push(EditarComercioPage, comercio);
  }

}
