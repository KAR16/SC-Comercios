import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable()
export class ComercioService{

    constructor(public afDB: AngularFireDatabase){}

    comercios = [];

    /*comercios = [
        {id: 1, nombre: "Mc Donalds", coordenadas:[{longitud: 0, latitud: 0}] , telefono: 45858996, comentario:"Primer Comentario", direccion: "16av. 2-41, z1"},
        {id: 2, nombre: "Pollo Campero", coordenadas:[{longitud: 0, latitud: 0}] , telefono: 78962545, comentario:"Segundo Comentario", direccion: "14av. 2-41, z5"},
        {id: 3, nombre: "Bar Las Delicias", coordenadas:[{longitud: 0, latitud: 0}] , telefono: 54203689, comentario:"Tercer Comentario", direccion: "12av. 2-41, z10"},
        {id: 4, nombre: "Mc Donalds", coordenadas:[{longitud: 0, latitud: 0}] , telefono: 86954520, comentario:"Cuarto Comentario", direccion: "19av. 2-41, z8"},
        {id: 5, nombre: "Mc Donalds", coordenadas:[{longitud: 0, latitud: 0}] , telefono: 41528974, comentario:"Quinto Comentario", direccion: "20av. 2-41, z7"},
    ];*/

    public getComercio(){
        //Envío Datos Locales
        //return this.comercios;

        // Envío datos desde Firebase
        return this.afDB.list('comercios/').valueChanges();
    }

    //Método para crear Usuarios
    public createComercio(newComercio){

        //this.comercios.push(newComercio);
        console.log(this.comercios);

        //Instrucción para crear usuario en firebase
        this.afDB.database.ref('comercios/' + newComercio.id).set(newComercio);
    }

    public editComercioData(editComercio){
        console.log(editComercio);

        //Instrucción para editar información y mandarla a firebase
        this.afDB.database.ref('comercios/' + editComercio.id).set(editComercio);
    }

    public deleteComercio(comercio){
        //Instrucción para editar información y mandarla a firebase
        this.afDB.database.ref('comercios/' + comercio.id).remove();
    }

    public getUsers(){
        //Envío Datos Locales
        //return this.comercios;

        // Envío datos desde Firebase
        return this.afDB.list('usuarios/').valueChanges();
    }

    public getUserById(userId){
        //Envío Datos Locales
        //return this.comercios;

        // Envío datos desde Firebase
        return this.afDB.database.ref('usuarios/' + userId);
    }

}
