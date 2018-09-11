// Angular Imports
import { NgModule } from '@angular/core';

// Ionic Imports
import { IonicModule } from 'ionic-angular';

// Components
import { ReserveStepsComponent } from './reserve-steps/reserve-steps';

@NgModule({
	declarations: [ReserveStepsComponent],
	imports: [IonicModule],
	exports: [ReserveStepsComponent]
})
export class ComponentsModule {}
