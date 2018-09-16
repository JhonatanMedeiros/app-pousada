// Angular Imports
import { Component, ViewChild } from '@angular/core';

// Ionic Imports
import { App, LoadingController, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Page Imports
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { AdminPage } from '../pages/admin/admin';

// Providers Imports
import { AuthenticationProvider } from '../providers/authentication/authentication';


@Component({
  template: `    
    <ion-menu [content]="content">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Pages</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-list>
          <button menuClose ion-item *ngFor="let menu of menuList" (click)="openPage(menu)">
            {{menu.name}}
          </button>
        </ion-list>
      </ion-content>

    </ion-menu>

    <ion-nav #content [root]="rootPage"></ion-nav>
  `
})
export class MyApp {

  rootPage: any;

  menuList: any[] = [
    { name: 'Login', page: LoginPage },
    { name: 'Signup', page: SignupPage },
    { name: 'Home', page: HomePage },
    { name: 'Admin', page: AdminPage },
  ];

  @ViewChild(Nav) nav: Nav;

  constructor(
    private app: App,
    private platform: Platform,
    private menu: MenuController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loadingCtrl: LoadingController,
    private auth: AuthenticationProvider
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.rootPage = HomePage
      // this.isAuth();
    });
  }

  isAuth(): void {

    const loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    loading.present();

    this.auth.afAuth.authState
      .subscribe(
        user => {
          loading.dismiss();
          if (user) {
            this.rootPage = HomePage;
          } else {
            this.rootPage = LoginPage;
          }
        },
        () => {
          loading.dismiss();
          this.rootPage = LoginPage;
        }
      );
  }

  openPage(menu) {
    this.nav.setRoot(menu.page);
  }
}
