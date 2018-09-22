// Angular Imports
import { NgModule } from '@angular/core';

// Ionic Imports
import { IonicModule } from 'ionic-angular';

// External Libs
import { TranslateModule } from '@ngx-translate/core';

// Components
import { ReserveStepsComponent } from './reserve-steps/reserve-steps';
import { BedroomCardComponent } from './bedroom-card/bedroom-card';

const components = [
  ReserveStepsComponent,
  BedroomCardComponent
];

@NgModule({
	declarations: [...components],
	imports: [IonicModule, TranslateModule.forChild()],
	exports: [...components]
})
export class ComponentsModule {}
