// Angular Imports
import { NgModule } from '@angular/core';

// Ionic Imports
import { IonicPageModule } from 'ionic-angular';

// Pages
import { ReservePage } from './reserve';

@NgModule({
  declarations: [
    ReservePage,
  ],
  imports: [
    IonicPageModule.forChild(ReservePage),
  ],
})
export class ReservePageModule {}
