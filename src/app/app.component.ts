// Angular Imports
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

// Ionic Imports
import { AlertController, App, LoadingController, MenuController, Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// External Libs
import { User } from 'firebase';
import { TranslateService } from '@ngx-translate/core';

// Page Imports
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ReservePage } from '../pages/reserve/reserve';
import { AdminPage } from '../pages/admin/admin';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { ConfigurationPage } from '../pages/configuration/configuration';

// Providers Imports
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { TranslateStorageProvider } from '../providers/translate-storage/translate-storage';

@Component({
  templateUrl: 'app.component.html'
})
export class MyApp implements OnInit, OnDestroy {

  user: User;

  rootPage: any;

  menuList: any[] = [];

  translate$: Subscription;

  @ViewChild(Nav) nav: Nav;

  constructor(
    private app: App,
    private platform: Platform,
    private menu: MenuController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private translateService: TranslateService,
    private auth: AuthenticationProvider,
    private translateServiceStorage: TranslateStorageProvider
  ) {
    this.loadTranslate();
    this.initializeApp();
  }

  ngOnInit(): void {
    // listen to the service worker promise in index.html to see if there has been a new update.
    // condition: the service-worker.js needs to have some kind of change - e.g. increment CACHE_VERSION.
    if (window['isUpdateAvailable']) {
      window['isUpdateAvailable']
        .then(isAvailable => {
          if (isAvailable) {
            const toast = this.toastCtrl.create({
              message: 'Nova atualização disponível! Recarregue o aplicativo para ver as últimas alterações.',
              position: 'bottom',
              showCloseButton: true
            });
            toast.present();
          }
        });
    }
  }

  ngOnDestroy(): void {
    if (this.translate$) {
      this.translate$.unsubscribe();
    }
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

  loadTranslate(): void {
    this.translateServiceStorage.getLocalization();

    this.translate$ = this.translateService.stream(
      [
        'menu.home', 'menu.room-reserve', 'menu.administration', 'menu.configuration', 'menu.contact', 'menu.about', 'menu.exit'
      ]).subscribe(v => {
        this.menuList = [
          { name: v['menu.home'], page: HomePage, icon: 'home' },
          { name: v['menu.room-reserve'], page: ReservePage, icon: 'calendar' },
          { name: v['menu.administration'], page: AdminPage, icon: 'briefcase' },
          { name: v['menu.configuration'], page: ConfigurationPage, icon: 'settings' },
          { name: v['menu.about'], page: AboutPage, icon: 'information-circle' },
          { name: v['menu.contact'], page: ContactPage, icon: 'call' },
          { name: v['menu.exit'], page: LoginPage, icon: 'log-out' }
        ]
      });
  }
}
