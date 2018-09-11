// Angular Imports
import { NgModule } from '@angular/core';

// Ionic Imports
import { IonicModule } from 'ionic-angular';

// Components
import { ReserveStepsComponent } from './reserve-steps/reserve-steps';
import { BedroomCardComponent } from './bedroom-card/bedroom-card';

const components = [
  ReserveStepsComponent,
  BedroomCardComponent
];

@NgModule({
	declarations: [...components],
	imports: [IonicModule],
	exports: [...components]
})
export class ComponentsModule {}
