import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-winscreen',
  templateUrl: './winscreen.component.html',
  styleUrls: ['./winscreen.component.scss'],
})
export class WinscreenComponent {
  @Input() winningPlayer!: 'X' | 'O';
}
