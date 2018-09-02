import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  template: `
    <ion-tabs>
      <ion-tab [root]="tab1Root" tabTitle="Agendamento" tabIcon="calendar"></ion-tab>
      <ion-tab [root]="tab2Root" tabTitle="Sobre" tabIcon="information-circle"></ion-tab>
      <ion-tab [root]="tab3Root" tabTitle="Contato" tabIcon="call"></ion-tab>
    </ion-tabs>
  `
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() { }
}
