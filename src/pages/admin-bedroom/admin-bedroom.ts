// Angular Imports
import { Component } from '@angular/core';

// Ionic Imports
import { NavController, NavParams } from 'ionic-angular';

// Pages
import { AdminBedroomDetailPage } from '../admin-bedroom-detail/admin-bedroom-detail';

// Models
import { BedRoom } from '../../models/bedRoom';

@Component({
  selector: 'page-admin-bedroom',
  templateUrl: 'admin-bedroom.html',
})
export class AdminBedroomPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() { }

  newBedRoom(): void {
    this.navCtrl.push(AdminBedroomDetailPage);
  }

  selectCard(bedRoom: BedRoom): void {
    this.navCtrl.push(AdminBedroomDetailPage);
  }

}
