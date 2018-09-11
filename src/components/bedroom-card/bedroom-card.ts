// Angular Imports
import { Component, Input } from '@angular/core';

// Models
import { BedRoom } from '../../models/bedRoom';

@Component({
  selector: 'bedroom-card',
  templateUrl: 'bedroom-card.html'
})
export class BedroomCardComponent {

  @Input() bedRoomList: BedRoom[] = [
    { name: 'Quarto 1', description: 'Capacidade para 4 pessoas, TV, cama box de casal, sala com uma 1 cama box de solteiro com cama auxiliar...'},
    { name: 'Quarto 2', description: 'Capacidade para 4 pessoas, TV, cama box de casal, sala com uma 1 cama box de solteiro com cama auxiliar...'},
    { name: 'Quarto 3', description: 'Capacidade para 4 pessoas, TV, cama box de casal, sala com uma 1 cama box de solteiro com cama auxiliar...'},
    { name: 'Quarto 4', description: 'Capacidade para 4 pessoas, TV, cama box de casal, sala com uma 1 cama box de solteiro com cama auxiliar...'},
    { name: 'Quarto 5', description: 'Capacidade para 4 pessoas, TV, cama box de casal, sala com uma 1 cama box de solteiro com cama auxiliar...'}
  ];

  constructor() { }

  reserve(room: BedRoom) {
    console.log(room);
  }
}
