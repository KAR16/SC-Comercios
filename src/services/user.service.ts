import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import * as firebase from 'firebase/app';
import { FirebaseUserModel } from './user.model';

import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class UserService {

  constructor(public afDB: AngularFireDatabase){}


  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function(user){
        let userModel = new FirebaseUserModel();
        if (user) {
          if(user.providerData[0].providerId == 'password'){
            //use a default image
            userModel.image = 'http://dsi-vd.github.io/patternlab-vd/images/fpo_avatar.png';
            userModel.name = user.providerData[0].displayName;
            userModel.provider = user.providerData[0].providerId;
            userModel.email = user.providerData[0].email;
            userModel.id = user.providerData[0].uid;
            return resolve(userModel);
          }
          else{
            console.log(user);
            
            userModel.image = user.providerData[0].photoURL;
            userModel.name = user.providerData[0].displayName;
            userModel.provider = user.providerData[0].providerId;
            userModel.email = user.providerData[0].email;
            userModel.id = user.providerData[0].uid;
            return resolve(userModel);
          }
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  createUser(newUser){
    
    console.log(newUser);

    this.afDB.database.ref('usuarios/' + newUser.uid).set(newUser);
    
  }
}
