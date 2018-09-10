// Angular Imports
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Ionic Imports
import { IonicPage, MenuController, NavController, NavParams } from 'ionic-angular';

// Page Imports
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

// Provider Imports
import { AuthenticationProvider } from '../../providers/authentication/authentication';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupError: string;
  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private authService: AuthenticationProvider,
    private fb: FormBuilder,
  ) {

    this.form = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      name: ['', Validators.compose([])]
    });
  }

  ionViewDidLoad() {
    // this.menuCtrl.enable(false);
  }

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
    this.authService.signUp(credentials).then(
      () => this.navCtrl.setRoot(HomePage),
      error => this.signupError = error.message
    );
  }

}
