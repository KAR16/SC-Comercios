import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    public formBuilder: FormBuilder
  ) {}

  ionViewWillLoad(){
    this.loginForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      console.log(res);
      this.navCtrl.push(TabsPage);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

  tryFacebookLogin(){
    this.authService.doFacebookLogin()
    .then((res) => {
      this.navCtrl.push(TabsPage);
    }, (err) => {
      this.errorMessage = err.message;
    });
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then((res) => {
      this.navCtrl.push(TabsPage);
    }, (err) => {
      this.errorMessage = err.message;
    });
  }

  tryTwitterLogin(){
    this.authService.doTwitterLogin()
    .then((res) => {
      this.navCtrl.push(TabsPage);
    }, (err) => {
      this.errorMessage = err.message;
    });
  }

  goRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }

  loginUser(){
    this.navCtrl.push(TabsPage);
  }

}
