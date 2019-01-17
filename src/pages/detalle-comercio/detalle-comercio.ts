import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { ComercioService } from '../../services/comercios.service';

import swal from 'sweetalert';


@IonicPage()
@Component({
  selector: 'page-detalle-comercio',
  templateUrl: 'detalle-comercio.html',
})
export class DetalleComercioPage {

  detailComerce;
  shouldSend: boolean = false;
  user;

  comments = [];
  userComment = true;

  //Info de Usuario
  usuarios = [];
  usuarioByID = {
    displayName: "",
    email: "",
    photoURL: "",
    provider: "",
    uid: null
  };

  newComment = {
    idUser: null,
    idComercio: null,
    idComentario: null,
    userName: "",
    profilePhoto: "",
    comentario: "",
    date: null
  }

  constructor(
    public navCtrl: NavController,
    public userService: UserService,
    public comercioService: ComercioService,
    public params: NavParams) {

      //this.ionViewDidLoad();
      this.detailComerce = params.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleComercioPage');
    console.log(this.detailComerce);

    //Método para Acceder Current Users
    this.userService.getCurrentUser()
    .then(user => {
      this.user = user;

      if (this.detailComerce.comentarios[0] != "vacio") {
        for (let index = 0; index < this.detailComerce.comentarios.length; index++) {
          console.log(this.detailComerce.comentarios[index]);
          this.comments.push(this.detailComerce.comentarios[index]);

          if (this.detailComerce.comentarios[index].idUser == this.user.id && this.detailComerce.comentarios[index].idComercio == this.detailComerce.id)  {
            console.log(this.detailComerce.comentarios[index].idUser, " - ", this.user.id);
            console.log(this.detailComerce.comentarios[index].idComercio, " - ", this.detailComerce.id);

            this.userComment = false;
          }
        }
      }else{
        this.shouldSend = true;
      }

      console.log(this.user);
    }, err => console.log(err))


    //Método para Acceder usuario Eval
    /*this.comercioService.getUsers().subscribe(usuarios => {
    console.log(usuarios);
    this.usuarios = usuarios;
    for (let index = 0; index < this.usuarios.length; index++) {
        console.log(this.usuarios[index]);

        if (this.usuarios[index].uid == 12458963547896252) {
          this.usuarioByID = this.usuarios[index];
          console.log(this.usuarioByID);

          if (this.detailComerce.comentarios[0] != "vacio") {
            for (let index = 0; index < this.detailComerce.comentarios.length; index++) {
              console.log(this.detailComerce.comentarios[index]);
              this.comments.push(this.detailComerce.comentarios[index]);

              if (this.detailComerce.comentarios[index].idUser == this.usuarioByID.uid && this.detailComerce.comentarios[index].idComercio == this.detailComerce.id)  {
                console.log(this.detailComerce.comentarios[index].idUser, " - ", this.usuarioByID.uid);
                console.log(this.detailComerce.comentarios[index].idComercio, " - ", this.detailComerce.id);

                this.userComment = false;
              }
            }
          }else{
            this.shouldSend = true;
          }
        }
      }
    });*/

  }

  addComment(){
    if (this.newComment.comentario == "") {
      swal("¡Atención!", "Complete los campos.", "warning");
    }else{
      console.log(this.usuarioByID);

      /*this.userService.getCurrentUser()
    .then(user => {
      this.user = user;*/

      //Llenamos un nuevo comentario con los Current Users
      this.newComment.idComentario = Date.now();
      this.newComment.idUser = this.user.id;
      this.newComment.userName = this.user.name;
      this.newComment.profilePhoto = this.user.image;
      this.newComment.idComercio = this.detailComerce.id;
      this.detailComerce.comentarios.push(this.newComment);
      this.newComment.date = Date.now();
      this.comments.push(this.newComment);
      if (this.detailComerce.comentarios[0] == "vacio") {
        var i = this.detailComerce.comentarios.indexOf("vacio");
        this.detailComerce.comentarios.splice( i, 1 );
      }
      this.comercioService.editComercioData(this.detailComerce);

      //Añadimos nuevo comentario con usuario Eval
      /*this.newComment.idComentario = Date.now();
      this.newComment.idUser = this.usuarioByID.uid;
      this.newComment.userName = this.usuarioByID.displayName;
      this.newComment.profilePhoto = this.usuarioByID.photoURL;
      this.newComment.idComercio = this.detailComerce.id;
      this.newComment.date = Date.now();
      this.detailComerce.comentarios.push(this.newComment);
      this.comments.push(this.newComment);

      if (this.detailComerce.comentarios[0] == "vacio") {
        var i = this.detailComerce.comentarios.indexOf("vacio");
        this.detailComerce.comentarios.splice( i, 1 );
      }
      this.comercioService.editComercioData(this.detailComerce);*/

      swal("¡Excelente!", "Comentario agregado éxitosamente.", "success");
      this.userComment = false;
      //Limpiamos datos
      this.newComment = {
        idUser: null,
        idComercio: null,
        idComentario: null,
        userName: "",
        profilePhoto: "",
        comentario: "",
        date: null
      }

      /*console.log(this.user);
    }, err => console.log(err))*/
    }
  }

}
