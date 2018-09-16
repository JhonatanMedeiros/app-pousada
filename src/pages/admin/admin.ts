// Angular Imports
import { Component } from '@angular/core';

// Ionic Imports
import { NavController, NavParams } from 'ionic-angular';

// Page Imports
import { AdminBedroomPage } from '../admin-bedroom/admin-bedroom';
import { LoginPage } from '../login/login';

// Providers
import { AuthenticationProvider } from '../../providers/authentication/authentication';

@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthenticationProvider
  ) {
  }

  ionViewDidLoad() { }

  goToPage(): void {
    this.navCtrl.push(AdminBedroomPage);
  }

  signOut(): void {
    this.authService.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

}
