import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'reserve-steps',
  templateUrl: 'reserve-steps.html'
})
export class ReserveStepsComponent implements OnInit, OnChanges {

  @Input() stepList: any[] = [
    { name: 'Estadia', active: false },
    { name: 'Quartos', active: false },
    { name: 'Finalizar', active: false }
  ];

  @Input() activeStep: number = 2;

  constructor() { }

  ngOnInit() {
    this.isActive();
  }

  ngOnChanges() {
   this.isActive();
  }

  isActive(): void {
    this.stepList.forEach((value, index) => {
      if (index < this.activeStep) {
        value.active = true;
      }
    });
  }

}
