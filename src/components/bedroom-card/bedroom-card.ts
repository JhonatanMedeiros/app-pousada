// Angular Imports
import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Input() config: { showBtnRerve: boolean } = { showBtnRerve: false };

  @Output() onSelectCard: EventEmitter<BedRoom> = new EventEmitter<BedRoom>();

  @Output() onReserveRoom: EventEmitter<BedRoom> = new EventEmitter<BedRoom>();

  constructor() { }

  reserve(room: BedRoom) {
    this.onReserveRoom.emit(room);
  }

  cardDetail(room: BedRoom): void {
    this.onSelectCard.emit(room);
  }
}
