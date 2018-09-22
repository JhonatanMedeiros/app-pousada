// Angular Imports
import { Component } from '@angular/core';

// Services
import { TranslateStorageProvider } from '../../providers/translate-storage/translate-storage';

@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html',
})
export class ConfigurationPage {

  language: string = this.translateStorageService.current_lang;

  constructor(private translateStorageService: TranslateStorageProvider) { }

  changeLanguage(): void {
    this.translateStorageService.saveLocalization(this.language);
  }

}
