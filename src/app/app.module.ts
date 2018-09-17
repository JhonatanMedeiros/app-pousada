// Angular Imports
import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

// Ionic Imports
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// External Libs
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { Facebook } from '@ionic-native/facebook'
import { GooglePlus } from '@ionic-native/google-plus';
import { CalendarModule } from 'ion2-calendar';

// Config
import { firebaseConfig, ionicModuleConfig } from '../config';

import { MyApp } from './app.component';

// Modules
import { ComponentsModule } from '../components/components.module';

// Provider
import { AuthenticationProvider } from '../providers/authentication/authentication';

// Pages
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ReservePage } from '../pages/reserve/reserve';
import { AdminPage } from '../pages/admin/admin';
import { AdminBedroomDetailPage } from '../pages/admin-bedroom-detail/admin-bedroom-detail';
import { AdminBedroomPage } from '../pages/admin-bedroom/admin-bedroom';


const PAGES_COMPONENTS = [
  HomePage,
  TabsPage,
  AboutPage,
  ContactPage,
  LoginPage,
  SignupPage,
  ReservePage,
  AdminPage,
  AdminBedroomPage,
  AdminBedroomDetailPage,
];

@NgModule({
  declarations: [
    MyApp,
    ...PAGES_COMPONENTS
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(MyApp, ionicModuleConfig),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    NgxErrorsModule,
    ComponentsModule,
    CalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ...PAGES_COMPONENTS
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: LOCALE_ID, useValue: 'pt' },
    AuthenticationProvider,
    AngularFireAuth,
    Facebook,
    GooglePlus
  ]
})
export class AppModule {}
