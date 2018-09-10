// Angular Imports
import { Component } from '@angular/core';

// Ionic Imports
import { MenuController, NavController } from 'ionic-angular';

// Providers Imports
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    private nav: NavController,
    private menu: MenuController,
    private auth: AuthenticationProvider
  ) { }

  login() {
    this.menu.close();
    this.auth.signOut();
    this.nav.setRoot(LoginPage);
  }

  logout() {
    this.menu.close();
    this.auth.signOut();
    this.nav.setRoot(HomePage);
  }

}
