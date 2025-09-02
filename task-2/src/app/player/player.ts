import { Component, Input } from '@angular/core';
import { GameService, Player } from '../game';

@Component({
  selector: 'app-player',
  standalone: true,
  templateUrl: './player.html',
  styleUrl: './player.css'
})
export class PlayerComponent {
  @Input() player!: Player;
  @Input() opponent!: Player;

  constructor(private game: GameService) {}

  shootSelf() { this.game.shootSelf(this.player); }
  shootOpponent() { this.game.shootOpponent(this.player, this.opponent); }
}
