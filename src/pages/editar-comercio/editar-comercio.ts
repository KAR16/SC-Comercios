import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeolocationService } from '../../services/geolocation.service';
import { Geolocation } from '@ionic-native/geolocation';
import { ComercioService } from '../../services/comercios.service';

@IonicPage()
@Component({
  selector: 'page-editar-comercio',
  templateUrl: 'editar-comercio.html',
})
export class EditarComercioPage {

  Comercios = [];

  editComercio;

  myPosition: any = {};
  shouldGeolocate: boolean = false;
  shouldSend: boolean = true;

  constructor(public navCtrl: NavController, 
    public params: NavParams, 
    public geolocator: GeolocationService, 
    private geolocation: Geolocation,
    public comercioService: ComercioService) {

      this.editComercio = params.data;

      if (this.editComercio.coordenadas[0]) {
        this.shouldGeolocate = true;
      }

      console.log(params.data);
      console.log(params.data.item);
      
      
      console.log(this.editComercio);
      

      comercioService.getComercio().subscribe(comercios => {
        console.log(comercios);
        
        this.Comercios = comercios;
        //this.users.push(usuarios);
        //console.log(this.users);
        
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarComercioPage');

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
      this.editComercio.coordenadas.push(this.myPosition);
      console.log(this.myPosition);
    })
    .catch(error=>{
      console.log(error);
    })
    
    }else{
      this.myPosition = {};
      this.editComercio.coordenadas = [];
    }
  }

  editarCommerce(){
    
    if (this.editComercio.nombre == "" || this.editComercio.telefono == null || this.editComercio.direccion == "" || this.editComercio.comentario == "") {
      swal("¡Atención!", "Complete los campos.", "warning");
    }else{

      if(this.Comercios.length != 0){
        console.log("El array no está vacío");

        for (let index = 0; index < this.Comercios.length; index++) {
          console.log(this.Comercios[index].nombre);

          if ((this.editComercio.nombre == this.Comercios[index].nombre) && (this.editComercio.id != this.Comercios[index].id)) {
            swal("¡Error!", "Nombre de comercio ya existente.", "error");
            break;
          }else if (index == this.Comercios.length - 1){

            this.editComercio.telefono = parseInt(this.editComercio.telefono);
            this.comercioService.editComercioData(this.editComercio);
            
            swal("¡Excelente!", "Comercio Actualizado.", "success");
            
            /*this.editComercio = {
              id: Date.now(),
              nombre: "",
              coordenadas: [],
              telefono: null,
              comentario: "",
              direccion:"",
              image: "assets/imgs/pollo-campero.png"
            };
            this.shouldGeolocate = false;
            console.log(this.Comercios);*/
            break;
          }
          
        }
        
      }else{
        this.editComercio.telefono = parseInt(this.editComercio.telefono);
        this.comercioService.createComercio(this.editComercio);
            
        swal("¡Excelente!", "Comercio Actualizado.", "success");
        
        /*this.editComercio = {
          id: Date.now(),
          nombre: "",
          coordenadas: [],
          telefono: null,
          comentario: "",
          direccion:"",
          image: "assets/imgs/pollo-campero.png"
        };
        this.shouldGeolocate = false;
        console.log(this.Comercios);*/
      }

    }

  }

}
