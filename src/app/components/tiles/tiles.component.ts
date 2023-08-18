import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss'],
})
export class TilesComponent {
  @Input() coords!: { x: number; y: number };
  @Input() content: string = '';

  @Output() onClickTile: EventEmitter<{ x: number; y: number }> =
    new EventEmitter();

  setTile() {
    this.onClickTile.emit(this.coords);
  }

  constructor(private gs: GameService) {}
}
