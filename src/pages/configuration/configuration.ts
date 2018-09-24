// Angular Imports
import { Component } from '@angular/core';

// Services
import { TranslateStorageProvider } from '../../providers/translate-storage/translate-storage';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html',
})
export class ConfigurationPage {

  language: string;

  currency: string = 'brl';

  constructor(
    private translateStorageService: TranslateStorageProvider,
    private alertCtrl: AlertController
  ) {
    this.language = this.translateStorageService.current_lang;
  }

  changeLanguage(): void {
    this.translateStorageService.saveLocalization(this.language);
    this.showAlert();
  }

  changeCurrency(): void {
    switch (this.language) {
      case 'pt': {
        this.currency = 'brl';
        break;
      }
      case 'en': {
        this.currency = 'usd';
        break;
      }
    }
  }

  showAlert(): void {
    let alert = this.alertCtrl.create({
      title: 'Alterar moeda',
      message: 'Deseja alterar para a moeda local ?',
      buttons: [
        { text: 'Cancelar',  role: 'cancel' },
        { text: 'Ok', handler: () => this.changeCurrency() }
      ]
    });
    alert.present();
  }

}
