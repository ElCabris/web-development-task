import { Component, OnInit } from '@angular/core';
import { GameService, Player } from '../game';
import { PlayerComponent } from '../player/player';
import { LogComponent } from '../log/log';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [PlayerComponent, LogComponent],
  templateUrl: './game.html',
  styleUrl: './game.css'
})
export class GameComponent implements OnInit {
  constructor(public game: GameService) {}

  ngOnInit() {
    const lives = parseInt(prompt('Vidas iniciales:') || '3');
    const p1Name = prompt('Nombre del jugador 1') || 'Jugador 1';
    const p2Name = prompt('Nombre del jugador 2') || 'Jugador 2';
    const maxBullets = parseInt(prompt('Número máximo de balas') || '6');
    this.game.initGame(p1Name, p2Name, lives, maxBullets);
  }

  get p1(): Player { return this.game.player1; }
  get p2(): Player { return this.game.player2; }
}
