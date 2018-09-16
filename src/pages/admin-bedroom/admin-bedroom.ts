// Angular Imports
import { Component } from '@angular/core';

// Ionic Imports
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// Models
import { BedRoom } from '../../models/bedRoom';

@IonicPage()
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

  selectCard(bedRoom: BedRoom): void {
    console.log(bedRoom);
  }

}
