import { Component, ViewChild } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { FirebaseUserModel } from '../../services/user.model';
import { LoginPage } from '../login/login';
import { ComercioService } from '../../services/comercios.service';


@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})

export class UserPage{

  user: FirebaseUserModel = new FirebaseUserModel();
  usuarios = [];
  usuarioByID = {};

  @ViewChild('myNav') nav: NavController;
  constructor(
    public navCtrl: NavController,
    public userService: UserService,
    public authService: AuthService,
    public comercioService: ComercioService,
    public appCtrl: App
  ) {}

  ionViewWillLoad(){
    console.log("Entre a pagina usuario...");

    //Usuario Eval
    /*this.comercioService.getUsers().subscribe(usuarios => {
      console.log(usuarios);
      this.usuarios = usuarios;
      for (let index = 0; index < this.usuarios.length; index++) {
        console.log(this.usuarios[index]);

        if (this.usuarios[index].uid == 12458963547896252) {
          this.usuarioByID = this.usuarios[index];
        }
      }
    });*/


    this.userService.getCurrentUser()
    .then(user => {
      this.user = user;
      console.log(this.user);
    }, err => console.log(err))

  }




  logout(provider){
    console.log("Cerrando redes...");

    this.authService.doLogout(provider)
    .then((res) => {
      console.log(res);
      this.appCtrl.getRootNav().push(LoginPage);
      //this.navCtrl.pop();
    }, (error) => {
      console.log("Logout error", error);
    });
  }

  cerrarSesion(){
    console.log("Cerrando...");

    this.appCtrl.getRootNav().push(LoginPage);
  }
}
