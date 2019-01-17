import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//Vistas
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AgregarComercioPage } from '../pages/agregar-comercio/agregar-comercio';
import { DetalleComercioPage } from '../pages/detalle-comercio/detalle-comercio';
import { EditarComercioPage } from '../pages/editar-comercio/editar-comercio';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { UserPage} from '../pages/user/user';

import { GeolocationService } from '../services/geolocation.service';
import { ComercioService } from '../services/comercios.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Imports de Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environment/environment';

//Servicios
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

//Google Maps Import
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

//Social Providers
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { TwitterConnect } from '@ionic-native/twitter-connect';

//Launch Navigator
import { LaunchNavigator } from '@ionic-native/launch-navigator';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    AgregarComercioPage,
    EditarComercioPage,
    LoginPage,
    RegisterPage,
    UserPage,
    DetalleComercioPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    AgregarComercioPage,
    EditarComercioPage,
    LoginPage,
    RegisterPage,
    UserPage,
    DetalleComercioPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    GeolocationService,
    ComercioService,
    AngularFireDatabase,
    AuthService,
    UserService,
    Facebook,
    GooglePlus,
    TwitterConnect,
    LaunchNavigator,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
