// Angular Imports
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Ionic Imports
import { IonicPage, MenuController, NavController, NavParams } from 'ionic-angular';

// Page Imports
import { SignupPage } from '../signup/signup';

// Providers
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  loginError: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private authService: AuthenticationProvider,
    private fb: FormBuilder
  ) {

    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ionViewDidLoad() {
    // this.menuCtrl.enable(false);
  }

  viewDidLeave(){
    this.navCtrl.pop();
  }

  goToSignup(): void {
    this.navCtrl.push(SignupPage)
  }



  /** Functions **/

  login() {
    let data = this.loginForm.value;

    if (!data.email) {
      return;
    }

    let credentials = {
      email: data.email,
      password: data.password
    };
    this.authService.signInWithEmail(credentials)
      .then(
        () => this.navCtrl.setRoot(HomePage),
        error => this.loginError = error.message
      );
  }

  loginInWithFacebook() {
    this.authService.signInWithFacebook()
      .then(res => this.navCtrl.setRoot(HomePage))
      .catch(error => console.log(error.message));
  }

  loginWithGoogle() {
    this.authService.nativeGoogleLogin()
      .then(res => this.navCtrl.setRoot(HomePage))
      .catch(error => console.log(error.message));
  }




}
