import { Injectable } from "@angular/core";
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { FirebaseUserModel } from './user.model';
import { environment } from '../environment/environment';
import { UserService } from '../services/user.service';


@Injectable()
export class AuthService {

  /*newUser = {
    id: "",
    nombre: "",
    telefono: null,
    email: "",
    providerID:"",
    profilePicture: ""
  };*/

  newUser = {};

  constructor(
    public afAuth: AngularFireAuth,
    public fb: Facebook,
    public googlePlus: GooglePlus,
    public tw : TwitterConnect,
    public platform: Platform,
    public userService: UserService
  ){}

  doRegister(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(res => {
       resolve(res);
     }, err => reject(err))
   })
  }

  doLogin(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(res => {
       resolve(res);
     }, err => reject(err))
   })
  }

  doLogout(provider){
   return new Promise((resolve, reject) => {
     if(firebase.auth().currentUser){
       this.afAuth.auth.signOut();
       if (provider == "google.com") {
        this.googlePlus.logout();
       }
       resolve('cerrar sesion');
     }
     else {
       reject('error');
     }
   });
  }

  doGoogleLogin(){
     return new Promise<FirebaseUserModel>((resolve, reject) => {
       if (this.platform.is('cordova')) {
         this.googlePlus.login({
           'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
           'webClientId': environment.googleWebClientId, // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
           'offline': true
         }).then((response) => {
           const googleCredential = firebase.auth.GoogleAuthProvider.credential(response.idToken);
           firebase.auth().signInWithCredential(googleCredential)
           .then((user) => {
             resolve();
           });
         },(err) => {
           reject(err);
         });
       }
       else{
         this.afAuth.auth
         .signInWithPopup(new firebase.auth.GoogleAuthProvider())
         .then((user) => {
           console.log(user);
           this.userService.createUser(user.user.providerData[0]);
            resolve()
         },(err) => {
          reject(err);
        })
       }
     })
   }

  doFacebookLogin(){
    return new Promise<FirebaseUserModel>((resolve, reject) => {
      if (this.platform.is('cordova')) {
        console.log("Entré a cordova...");
        
        //["public_profile"] is the array of permissions, you can add more if you need
        this.fb.login(["public_profile"])
        .then((response) => {
          console.log(response);
          
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
          firebase.auth().signInWithCredential(facebookCredential)
            .then(user => resolve());
        }, err => reject(err)
        );
      }
      else {
        console.log("Entré a otro dispositivo...");
        
        this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(result => {
          //Voy a crear el usuario
          this.userService.createUser(result.user.providerData[0]);
          //Default facebook img is too small and we need a bigger image
          var bigImgUrl = "https://graph.facebook.com/" + result.additionalUserInfo.profile + "/picture?height=500";
          // update profile to save the big fb profile img.
          firebase.auth().currentUser.updateProfile({
            displayName: result.user.displayName,
            photoURL: bigImgUrl
          }).then(res => resolve()
          ,(err) => {
            reject(err);
          });
        },(err) => {
          reject(err);
        })
      }
      console.log(this.platform.platforms());
    })
  }

  doTwitterLogin(){
    return new Promise<FirebaseUserModel>((resolve, reject) => {
      // if we are in a mobile device we use the twitter native plugin

      if (this.platform.is('cordova')) {
        this.tw.login()
          .then((response) => {
            const twitterCredential = firebase.auth.TwitterAuthProvider.credential(response.token, response.secret);
            firebase.auth().signInWithCredential(twitterCredential)
            .then(
              user => resolve(),
              error => reject(error)
            );
          },
          err => {
            console.log(err);
            reject(err);
          }
        );
      }
      else {
        this.afAuth.auth
        .signInWithPopup(new firebase.auth.TwitterAuthProvider())
        .then(result => {
          //Default twitter img is just 48x48px and we need a bigger image https://developer.twitter.com/en/docs/accounts-and-users/user-profile-images-and-banners
          var bigImgUrl = (result.user.photoURL).replace('_normal', '_400x400');

          // update profile to save the big tw profile img.
          firebase.auth().currentUser.updateProfile({
            displayName: result.user.displayName,
            photoURL: bigImgUrl
          }).then(res => resolve(),(err) => {
            reject(err);
          });
        },(err) => {
          reject(err);
        })
      }
    })
  }
}
