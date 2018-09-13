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

  // @Input() activeStep: number = 1;
  _activeStep: number;
  get activeStep(): number {
    return this._activeStep;
  }

  @Input('activeStep')
  set activeStep(value: number) {
    this._activeStep = value;
    this.isActive();
  }

  @Output() onSelectStep: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    this.isActive();
  }

  isActive(): void {
    this.stepList.forEach((value, index) => {
      value.active = index + 1 < this._activeStep;
    });
  }

  selectStep(step: number): void {
    this._activeStep = step;
    this.isActive();
    this.onSelectStep.emit(this._activeStep);
  }

}
