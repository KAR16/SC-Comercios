import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AgregarComercioPage } from '../agregar-comercio/agregar-comercio';
import { EditarComercioPage } from '../editar-comercio/editar-comercio';
import { ComercioService } from '../../services/comercios.service';
import { UserService } from '../../services/user.service';
import { FirebaseUserModel } from '../../services/user.model';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  agregarComercio = AgregarComercioPage;
  //editarComercio = EditarComercioPage;
  comerciosByUser = [];
  user: FirebaseUserModel = new FirebaseUserModel();
  listadoComercio = [];

  @ViewChild('myNav') nav: NavController;
  constructor(public navCtrl: NavController,
    public navParams : NavParams,
    public comercioService: ComercioService,
    public userService: UserService) {

    //Guardo los datos locales
    //this.comercios = comercioService.getComercio();
    /*if (this.comerciosByUser.length == 0) {

    }*/
  }

  ionViewDidLoad(){
    console.log('Comercios por Usuario: ', this.comerciosByUser);

    this.comercioService.getComercio().subscribe(comercios => {
      console.log(comercios);
      this.listadoComercio = [];
      this.listadoComercio = comercios;

      // this.comerciosByUser = [];
      // for (let index = 0; index < this.listadoComercio.length; index++) {
      //   // if (this.listadoComercio[index].idUsuario == this.user.id) {
      //   //   this.comerciosByUser.push(this.listadoComercio[index]);
      //   // }
      //   if (this.listadoComercio[index].idUsuario == "12458963547896252") {
      //     this.comerciosByUser.push(this.listadoComercio[index]);
      //   }
      // }

      this.userService.getCurrentUser()
    .then(user => {
      this.user = user;
      console.log(this.user.id);
      this.comerciosByUser = [];
      for (let index = 0; index < this.listadoComercio.length; index++) {
        if (this.listadoComercio[index].idUsuario == this.user.id) {
          this.comerciosByUser.push(this.listadoComercio[index]);
        }
        // if (this.listadoComercio[index].idUsuario == "12458963547896252") {
        //   this.comerciosByUser.push(this.listadoComercio[index]);
        // }
      }

    }, err => console.log(err))
      //this.users.push(usuarios);
      //console.log(this.users);

     });
  }

  editarComercio(comercio){
    console.log(comercio);

    this.navCtrl.push(EditarComercioPage, comercio);
  }

}
