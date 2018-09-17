// Angular Imports
import { Component, ViewChild } from '@angular/core';

// Ionic Imports
import { AlertController, App, LoadingController, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// External Libs
import { User } from 'firebase';

// Page Imports
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ReservePage } from '../pages/reserve/reserve';
import { AdminPage } from '../pages/admin/admin';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';

// Providers Imports
import { AuthenticationProvider } from '../providers/authentication/authentication';

@Component({
  templateUrl: 'app.component.html'
})
export class MyApp {

  user: User;

  rootPage: any;

  menuList: any[] = [
    { name: 'Início', page: HomePage, icon: 'home' },
    { name: 'Agendar Quarto', page: ReservePage, icon: 'calendar' },
    { name: 'Aministração', page: AdminPage, icon: 'briefcase' },
    { name: 'Configurações', page: AboutPage, icon: 'settings' },
    { name: 'Sobre', page: AboutPage, icon: 'information-circle' },
    { name: 'Contato', page: ContactPage, icon: 'call' },
    { name: 'Sair', page: LoginPage, icon: 'log-out' }
  ];

  @ViewChild(Nav) nav: Nav;

  constructor(
    private app: App,
    private platform: Platform,
    private menu: MenuController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
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

    const loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    loading.present();

    this.auth.afAuth.authState
      .subscribe(
        user => {
          this.user = user;
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
    if (menu.page) {
      if (menu.page === LoginPage) {
        this.signOutShowConfirm();
        return;
      }
      this.menu.close();
      this.nav.setRoot(menu.page);
    }
  }

  signOutShowConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'AVISO',
      message: 'Deseja realmente sair ?',
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Sair',
          handler: () => {
            this.menu.close();
            this.nav.setRoot(LoginPage);
            this.auth.signOut();
          }
        }
      ]
    });
    confirm.present();
  }
}
