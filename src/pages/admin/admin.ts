// Angular Imports
import { Component } from '@angular/core';

// Ionic Imports
import { AlertController, NavController, NavParams } from 'ionic-angular';

// Page Imports
import { LoginPage } from '../login/login';
import { AdminBedroomPage } from '../admin-bedroom/admin-bedroom';

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
    private alertCtrl: AlertController,
    private authService: AuthenticationProvider
  ) {
  }

  ionViewDidLoad() { }

  goToPage(): void {
    this.navCtrl.push(AdminBedroomPage);
  }

  signOut(): void {
    const confirm = this.alertCtrl.create({
      title: 'AVISO',
      message: 'Deseja realmente sair ?',
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Sair',
          handler: () => {
            this.authService.signOut();
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    confirm.present();
  }

}
