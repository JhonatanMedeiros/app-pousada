import { Component } from '@angular/core';

@Component({
  selector: 'reserve-steps',
  templateUrl: 'reserve-steps.html'
})
export class ReserveStepsComponent {

  text: string;

  constructor() {
    console.log('Hello ReserveStepsComponent Component');
    this.text = 'Hello World';
  }

}
