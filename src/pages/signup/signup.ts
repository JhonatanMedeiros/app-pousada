// Angular Imports
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Ionic Imports
import { AlertController, Loading, LoadingController, NavController } from 'ionic-angular';

// Page Imports
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

// Provider Imports
import { AuthenticationProvider } from '../../providers/authentication/authentication';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  loading: Loading;

  signupError: string;
  form: FormGroup;

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthenticationProvider,
    private fb: FormBuilder,
  ) {

    this.loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    this.form = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      name: ['', Validators.compose([])]
    });
  }

  ionViewDidLoad() { }

  viewDidLeave(){
    this.navCtrl.pop();
  }

  goToLogin() {
    this.navCtrl.push(LoginPage)
  }

  /** Functions **/
  signup() {
    let data = this.form.value;
    let credentials = {
      email: data.email,
      password: data.password
    };
    this.loading.present();
    this.authService.signUp(credentials)
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
