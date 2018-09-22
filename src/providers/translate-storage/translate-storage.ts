// Angular Imports
import { Injectable } from '@angular/core';

// Ionic
import { Storage } from '@ionic/storage';

// External Libs
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TranslateStorageProvider {

  private keyStorage: string = 'langKey';
  private CURRENT_BROWSER_LANG: string;

  public current_lang: string;

  constructor(private storage: Storage, private translateService: TranslateService) {
    this.CURRENT_BROWSER_LANG = this.translateService.getBrowserLang();
  }

  saveLocalization(language: string): void {
    this.translateService.use(language);
    this.storage.set(this.keyStorage, language);
    this.current_lang = language;
  }

  getLocalization(): Promise<any> {
    this.translateService.setDefaultLang('en');
    return new Promise<any>((resolve, reject) => {
      this.storage.get(this.keyStorage)
        .then((v: string) => {
          if (v) {
            this.current_lang = v;
            this.translateService.use(v);
          } else {
            this.translateService.use(this.CURRENT_BROWSER_LANG);
            this.saveLocalization(this.CURRENT_BROWSER_LANG)
          }
          return resolve(v)
        })
        .catch(e => reject(e))
    })
  }

}
