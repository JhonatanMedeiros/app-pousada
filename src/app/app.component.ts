// Angular Imports
import { Component, ViewChild } from '@angular/core';

// Ionic Imports
import { App, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Page Imports
import { TabsPage } from '../pages/tabs/tabs';
import { ContactPage } from '../pages/contact/contact';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { ReservePage } from '../pages/reserve/reserve';

// Providers Imports
import { AuthenticationProvider } from '../providers/authentication/authentication';

@Component({
  template: `    
    <ion-menu [content]="content">
      <ion-header>
        <ion-toolbar>
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

  // rootPage: any = TabsPage;
  rootPage: any = LoginPage;

  menuList: any[] = [
    { name: 'Login', page: LoginPage },
    { name: 'Signup', page: SignupPage },
    { name: 'Home', page: HomePage },
  ];

  @ViewChild(Nav) nav: Nav;

  constructor(
    private app: App,
    private platform: Platform,
    private menu: MenuController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
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
      this.isAuth();
    });
  }

  isAuth(): void {
    this.rootPage = ReservePage;
    /*
    this.auth.afAuth.authState
      .subscribe(
        user => {
          if (user) {
            // this.rootPage = HomePage;
          } else {
            // this.rootPage = LoginPage;
          }
        },
        () => {
          this.rootPage = LoginPage;
        }
      );*/
  }

  openPage(menu) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(menu.page);
  }
}
