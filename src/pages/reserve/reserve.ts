// Angular Imports
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Page Imports
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// Models
import { BedRoom } from '../../models/bedRoom';

@IonicPage()
@Component({
  selector: 'page-reserve',
  templateUrl: 'reserve.html',
})
export class ReservePage {

  activeStep: number = 0;

  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      dateStart: ['', Validators.compose([Validators.required])],
      dateEnd: ['', Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() { }

  submitForm(): void {
    this.activeStep = 2
  }

  selectRoom(bedroom: BedRoom): void {
    this.activeStep = 3
  }

}
