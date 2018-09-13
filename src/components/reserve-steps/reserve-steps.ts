import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

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

  @Input() activeStep: number = 0;

  @Output() onSelectStep: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.isActive();
  }

  ngOnChanges() {
   this.isActive();
  }

  isActive(): void {
    this.stepList.forEach((value, index) => {
      value.active = index < this.activeStep;
    });
  }

  selectStep(step): void {
    if (this.activeStep === step) {
      this.activeStep--
    } else if (step < this.activeStep) {
      this.activeStep = step - 1
    } else {
      this.activeStep = step;
    }
    this.isActive();
    this.onSelectStep.emit(this.activeStep);
  }

}
