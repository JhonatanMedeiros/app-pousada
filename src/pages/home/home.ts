// Angular Imports
import { Component } from '@angular/core';

// Ionic Imports
import { AlertController, MenuController, NavController } from 'ionic-angular';

// Page
import { LoginPage } from '../login/login';

// Providers Imports
import { AuthenticationProvider } from '../../providers/authentication/authentication';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    private nav: NavController,
    private menu: MenuController,
    private alertCtrl: AlertController,
    private auth: AuthenticationProvider
  ) { }

  login(): void {
    this.menu.close();
    this.auth.signOut();
    this.nav.setRoot(LoginPage);
  }

  logout(): void {
    const confirm = this.alertCtrl.create({
      title: 'AVISO',
      message: 'Deseja realmente sair ?',
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Sair',
          handler: () => {
            this.menu.close();
            this.auth.signOut();
            this.nav.setRoot(LoginPage);
          }
        }
      ]
    });

    confirm.present();
  }

}
