// Angular Imports
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Ionic Imports
import {
  AlertController,
  Loading,
  LoadingController,
  MenuController,
  NavController,
  NavParams
} from 'ionic-angular';

// Page Imports
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

// Providers
import { AuthenticationProvider } from '../../providers/authentication/authentication';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  loginError: string;

  loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private authService: AuthenticationProvider,
    private fb: FormBuilder
  ) {

    this.buildForm();

    this.loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

  }

  ionViewDidLoad() {
    // this.menuCtrl.enable(false);
  }

  viewDidLeave(){
    this.navCtrl.pop();
  }

  goToSignupPage(): void {
    this.navCtrl.push(SignupPage)
  }


  buildForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }


  loginWithEmail() {
    let data = this.loginForm.value;

    if (!data.email) { return; }

    let credentials = {
      email: data.email,
      password: data.password
    };

    this.loading.present();
    this.authService.signInWithEmail(credentials)
      .then(res => {
        this.loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      })
      .catch(error => {
        this.loading.dismiss();
        this.showAlert(error.message);
      });
  }

  loginInWithFacebook() {
    this.loading.present();
    this.authService.signInWithFacebook()
      .then(res => {
        this.loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      })
      .catch(error => {
        this.loading.dismiss();
        this.showAlert(error.message);
      });
  }

  loginWithGoogle() {
    this.loading.present();
    this.authService.signInWithGoogle()
      .then(res => {
        this.loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      })
      .catch(error => {
        this.loading.dismiss();
        this.showAlert(error.message);
      });
  }

  showAlert(msg: string) {
    const alert = this.alertCtrl.create({
      title: 'AVISO',
      subTitle: msg,
      buttons: ['OK']
    });

    alert.present();
  }


}
