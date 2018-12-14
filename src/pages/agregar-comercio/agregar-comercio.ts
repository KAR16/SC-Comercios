import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeolocationService } from '../../services/geolocation.service';
import { Geolocation } from '@ionic-native/geolocation';
import { ComercioService } from '../../services/comercios.service';

import swal from 'sweetalert';

@IonicPage()
@Component({
  selector: 'page-agregar-comercio',
  templateUrl: 'agregar-comercio.html',
})
export class AgregarComercioPage {

  Comercios = [];

  newComercio = {
    id: Date.now(),
    nombre: "",
    coordenadas: [],
    telefono: null,
    comentario: "",
    direccion:"",
    image: "assets/imgs/pollo-campero.png"
  };

  myPosition: any = {};

  //model;
  shouldGeolocate: boolean = false;
  shouldSend: boolean = true;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public geolocator: GeolocationService, 
    private geolocation: Geolocation,
    public comercioService: ComercioService) {

      //this.Comercios = comercioService.getComercio();
      comercioService.getComercio().subscribe(comercios => {
        console.log(comercios);
        
        this.Comercios = comercios;
        //this.users.push(usuarios);
        //console.log(this.users);
        
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarComercioPage');
    console.log(this.Comercios);
    
  }

  getLocation(){

    console.log("Hola");

    if (this.shouldGeolocate) {
      console.log("Coordenadas Activas");
      this.geolocation.getCurrentPosition()
    .then(position => {
      this.myPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      this.newComercio.coordenadas.push(this.myPosition);
      console.log(this.myPosition);
    })
    .catch(error=>{
      console.log(error);
    })
    
    }else{
      this.myPosition = {};
    }
    

    /*if(this.shouldGeolocate){
      this.shouldSend = false;
      this.geolocator.get().then((resultado)=>{
        this.model.setCoords(resultado.coords)
        console.log(this.model)
        this.shouldSend = true;
      }).catch((err)=> {
        console.log(err)
      })

    }else{
      this.model.cleanCoords();
      //TO DO
      // this.shouldSend = false;
    }*/
   
  }

  addCommerce(){
    
    if (this.newComercio.nombre == "" || this.newComercio.telefono == null || this.newComercio.direccion == "" || this.newComercio.comentario == "") {
      swal("¡Atención!", "Complete los campos.", "warning");
    }else{

      if(this.Comercios.length != 0){
        console.log("El array no está vacío");

        for (let index = 0; index < this.Comercios.length; index++) {
          console.log(this.Comercios[index].nombre);

          if (this.newComercio.nombre == this.Comercios[index].nombre) {
            swal("¡Error!", "Nombre de comercio ya existente.", "error");
            break;
          }else if (index == this.Comercios.length - 1){

            this.newComercio.telefono = parseInt(this.newComercio.telefono);
            this.comercioService.createComercio(this.newComercio);
            
            swal("¡Excelente!", "Usuario creado éxitosamente.", "success");
            
            this.newComercio = {
              id: Date.now(),
              nombre: "",
              coordenadas: [],
              telefono: null,
              comentario: "",
              direccion:"",
              image: "assets/imgs/pollo-campero.png"
            };
            this.shouldGeolocate = false;
            console.log(this.Comercios);
            break;
          }
          
        }
        
      }else{
        this.newComercio.telefono = parseInt(this.newComercio.telefono);
        this.comercioService.createComercio(this.newComercio);
            
        swal("¡Excelente!", "Usuario creado éxitosamente.", "success");
        
        this.newComercio = {
          id: Date.now(),
          nombre: "",
          coordenadas: [],
          telefono: null,
          comentario: "",
          direccion:"",
          image: "assets/imgs/pollo-campero.png"
        };
        this.shouldGeolocate = false;
        console.log(this.Comercios);
      }

    }

  }

}
