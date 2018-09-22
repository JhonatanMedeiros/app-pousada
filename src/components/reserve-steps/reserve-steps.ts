// Angular Imports
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

// External Libs
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'reserve-steps',
  templateUrl: 'reserve-steps.html'
})
export class ReserveStepsComponent implements OnInit {

  stepList: { name: string, active: boolean }[] = [];

  translate$: Subscription;

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

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
    this.fillListSteps();
  }

  isActive(): void {
    this.stepList.forEach((value, index) => {
      value.active = index < this._activeStep;
    });
  }

  selectStep(step: number): void {
    this._activeStep = step;
    this.isActive();
    this.onSelectStep.emit(this._activeStep);
  }

  fillListSteps(): void {
    this.translate$ = this.translateService.stream(
      [
        'pages.reserve.stay', 'pages.reserve.bedrooms', 'pages.reserve.done'
      ]).subscribe(v => {
      this.stepList = [
        { name: v['pages.reserve.stay'], active: false },
        { name: v['pages.reserve.bedrooms'], active: false },
        { name: v['pages.reserve.done'], active: false }
      ];
      this.isActive();
    });
  }

}
