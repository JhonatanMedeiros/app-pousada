// Angular Imports
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { ReservePage } from '../pages/reserve/reserve';
import { AdminBedroomPage } from '../pages/admin-bedroom/admin-bedroom';
import { AdminBedroomDetailPage } from '../pages/admin-bedroom-detail/admin-bedroom-detail';

const COMPONENTS = [
  HomePage,
  TabsPage,
  LoginPage,
  SignupPage,
  AboutPage,
  ContactPage,
  ReservePage,
  AdminBedroomPage,
  AdminBedroomDetailPage
];

@NgModule({
  declarations: [
    MyApp,
    ...COMPONENTS,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(MyApp, ionicModuleConfig),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    NgxErrorsModule,
    ComponentsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ...COMPONENTS
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticationProvider,
    AngularFireAuth,
    Facebook,
    GooglePlus
  ]
})
export class AppModule {}
