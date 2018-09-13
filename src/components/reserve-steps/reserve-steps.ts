import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'reserve-steps',
  templateUrl: 'reserve-steps.html'
})
export class ReserveStepsComponent implements OnInit {

  @Input() stepList: { name: string, active: boolean }[] = [
    { name: 'Estadia', active: false },
    { name: 'Quartos', active: false },
    { name: 'Finalizar', active: false }
  ];

  @Input() activeStep: number = 1;

  @Output() onSelectStep: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    this.isActive();
  }

  isActive(): void {
    this.stepList.forEach((value, index) => {
      value.active = index + 1 < this.activeStep;
    });
  }

  selectStep(step: number): void {
    this.activeStep = step;
    this.isActive();
    this.onSelectStep.emit(this.activeStep);
  }

}
