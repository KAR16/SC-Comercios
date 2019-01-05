import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AgregarComercioPage } from '../agregar-comercio/agregar-comercio'
import { Geolocation } from '@ionic-native/geolocation';
import { ComercioService } from '../../services/comercios.service';
import { Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent, CameraPosition, MarkerOptions } from '@ionic-native/google-maps';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
//declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  agregarComercio = AgregarComercioPage;
  Comercios = [];

  //map : any;
  //infoWindow: any;

  //Código de Tutorial 1
  map: GoogleMap;
  myPosition: any = {};

  markers: any[] = [
    {
      position:{
        latitude: 14.6301445,
        longitude: -90.51221559999999,
      },
      title:'Plaza Barrios, zona 1, Guatemala',
      icon: 'assets/imgs/marker-green.png'
    },
    {
      position:{
        latitude: 14.64010215592896,
        longitude: -90.50802111625671,
      },
      title:'Parque Colón, zona 1, Guatemala',
      icon: 'assets/imgs/marker-blue.png'
    },
    {
      position:{
        latitude: -17.391398,
        longitude: -66.2407904,
      },
      title:'Point 3',
      icon: 'www/assets/imgs/marker-green.png'
    },
    {
      position:{
        latitude: -17.3878887,
        longitude: -66.223664,
      },
      title:'Point 4',
      icon: 'www/assets/imgs/marker-blue.png'
    },
  ];

  @ViewChild('myNav') nav: NavController;
  constructor(
    private navCtrl: NavController, 
    private geolocation: Geolocation, 
    private googleMaps: GoogleMaps, 
    public comercioService: ComercioService,
    private launchNavigator: LaunchNavigator){

      //Guardo los datos locales
      //this.comercios = comercioService.getComercio();
      comercioService.getComercio().subscribe(comercios => {
        console.log(comercios);
        
        this.Comercios = comercios;
        //this.users.push(usuarios);
        //console.log(this.users);
        
      });
      console.log(this.Comercios);
      
      
      //Para Browser
      /*let that = this;
      setTimeout(function() {
        that.googleMap();
      }, 2000);*/

  }

  /*googleMap(){
    let that = this;

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 20    });

    this.infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        that.infoWindow.setPosition(pos);
        that.infoWindow.setContent('Location found.');
        that.infoWindow.open(that.map);
        that.map.setCenter(pos);
      }, function() {
        this.handleLocationError(true, that.infoWindow, that.map.getCenter(), that.map);
      });
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, that.infoWindow, that.map.getCenter(), that.map);
    }
  }

  handleLocationError(browserHasGeolocation, infoWindow, pos, map) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }*/

  ionViewDidLoad(){
    this.getCurrentPosition();
  }

  getCurrentPosition(){
    this.geolocation.getCurrentPosition()
    .then(position => {
      this.myPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      this.loadMap();
    })
    .catch(error=>{
      console.log(error);
    })
  }

  loadMap(){
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    this.map = this.googleMaps.create(element);

    // create CameraPosition
    let position: CameraPosition<any> = {
      target: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
      zoom: 20,
      tilt: 30
    };

    this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      console.log('Map is ready!');

      // move the map's camera to position
      this.map.moveCamera(position);

      let markerOptions: MarkerOptions = {
        position: this.myPosition,
        title: "Mi Ubicación",
        icon: 'assets/imgs/marker-pink.png'
      };

      this.addMarker(markerOptions);

      this.markers.forEach(marker=>{
        this.addMarker(marker);
      });
      
    });
  }

  addMarker(options){
    let markerOptions: MarkerOptions = {
      position: new LatLng(options.position.latitude, options.position.longitude),
      title: options.title
    };
    this.map.addMarker(markerOptions);
  }

  

  //Código de Tutorial 2
  /*@ViewChild('map') mapElement: ElementRef;
  private map:GoogleMap;
  private location:LatLng;
  private locations: Array<any> = [];

  constructor(private platform: Platform, private googleMaps: GoogleMaps) {
    this.location = new LatLng(42.346903, -71.135101);

    //Add cluster locations
    this.locations.push({position: {lat: 42.346903, lng: -71.135101}});
    this.locations.push({position: {lat: 42.342525, lng: -71.145943}});
    this.locations.push({position: {lat: 42.345792, lng: -71.138167}});
    this.locations.push({position: {lat: 42.320684, lng: -71.182951}});
    this.locations.push({position: {lat: 42.359076, lng: -71.0645484}});
    this.locations.push({position: {lat: 42.36, lng: -71.1}});
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      let element = this.mapElement.nativeElement;
      this.map = this.googleMaps.create(element);
  
      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        let options = {
          target: this.location,
          zoom: 8
        };
  
        this.map.moveCamera(options);
        setTimeout(() => {this.addMarker()}, 2000);
        //setTimeout(() => {this.addCluster()}, 500);
      });
    });
  }

  	
addMarker() {
  this.map.addMarker({
    title: 'My Marker',
    icon: 'blue',
    animation: 'DROP',
    position: {
      lat: this.location.lat,
      lng: this.location.lng
    }
  })
  .then(marker => {
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('Marker Clicked');
    });
  });
}*/

/*addCluster() {
  this.map.addMarkerCluster({
    markers: this.locations,
    icons: [
      {min: 2, max: 100, url: "./assets/icon/blue-dot.png", anchor: {x: 16, y: 16}}
    ]
  })
  .then((markerCluster) => {
    markerCluster.on(GoogleMapsEvent.CLUSTER_CLICK).subscribe((cluster: any) => {
      console.log('click 2');
      alert('cluster was clicked.');
    });
  });
}*/

goToComerce(location){
  if (location != "vacio") {
    var coords = location.latitude.toString() + "," + location.longitude.toString();
    console.log(coords);
    this.launchNavigator.navigate(coords);
  }
  
}

}
