// Angular Imports
import { Component } from '@angular/core';

// External Libs
import { CalendarModal, CalendarModalOptions, CalendarResult } from "ion2-calendar";

// Page Imports
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

// Models
import { BedRoom } from '../../models/bedRoom';

@IonicPage()
@Component({
  selector: 'page-reserve',
  templateUrl: 'reserve.html',
})
export class ReservePage {

  activeStep: number = 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
  ) { }

  ionViewDidLoad() { }

  openCalendar() {
    const options: CalendarModalOptions = {
      title: 'Escolha uma data',
      pickMode: 'range',
      closeLabel: 'Cancelar',
      doneLabel: 'CONFIMAR',
      closeIcon: true,
      doneIcon: true,
      weekdays: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      defaultDate: new Date()
    };
    let myCalendar =  this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date: CalendarResult, type: string) => {
      console.log(date);
    })
  }

  selectRoom(bedroom: BedRoom): void {
    this.activeStep = 3
  }

}
