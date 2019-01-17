import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AgregarComercioPage } from '../agregar-comercio/agregar-comercio';
import { EditarComercioPage } from '../editar-comercio/editar-comercio';
import { ComercioService } from '../../services/comercios.service';
import { UserService } from '../../services/user.service';
import { FirebaseUserModel } from '../../services/user.model';

//Sweet Alert
/*import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'*/

import swal from 'sweetalert';

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

      this.comerciosByUser = [];

      //Método para usuario Eval
      /*for (let index = 0; index < this.listadoComercio.length; index++) {
        // if (this.listadoComercio[index].idUsuario == this.user.id) {
        //   this.comerciosByUser.push(this.listadoComercio[index]);
        // }
        console.log(index);

        if (this.listadoComercio[index].idUsuario == "12458963547896252") {
          console.log(this.listadoComercio[index], index);

          this.comerciosByUser.push(this.listadoComercio[index]);
        }
      }*/

    //Método para Current Users
      this.userService.getCurrentUser()
    .then(user => {
      this.user = user;
      console.log(this.user.id);
      this.comerciosByUser = [];
      for (let index = 0; index < this.listadoComercio.length; index++) {
        if (this.listadoComercio[index].idUsuario == this.user.id) {
          this.comerciosByUser.push(this.listadoComercio[index]);
        }
      }

    }, err => console.log(err))

     });
  }

  editarComercio(comercio){
    console.log(comercio);
    this.navCtrl.push(EditarComercioPage, comercio);
  }

  eliminarComercio(comercio){
    let sweetAlert = swal({
      title: "¿Desea eliminar el comercio?",
      text:"El comercio está apunto de ser eliminado.",
      icon: "warning",
      buttons: {
        cancel: {
          text: "Cancelar",
          value: null,
          visible: true,
          className: ""
        },
        confirm: {
          text: "Confirmar",
          value: true,
          visible: true,
          className: "",
        }
      },
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("¡El comercio ha sido eliminado!", {
          icon: "success",
        });
        this.comercioService.deleteComercio(comercio);
      }
    });
    return sweetAlert;
  }

}
