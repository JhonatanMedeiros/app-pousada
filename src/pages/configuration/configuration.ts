// Angular Imports
import { Component } from '@angular/core';

// Ionic Imports
import { NavController, NavParams } from 'ionic-angular';

// External Libs
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html',
})
export class ConfigurationPage {

  language: string = this.translateService.currentLang;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private translateService: TranslateService
  ) { }

  changeLanguage(): void {
    this.translateService.use(this.language);
  }

}
