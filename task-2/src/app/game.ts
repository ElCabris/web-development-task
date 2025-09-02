import { Injectable } from '@angular/core';

class Bullet {
  constructor(public type: 'real' | 'blank') { }
}

export class Player {
  constructor(public name: string, public lives: number) { }
  getShot(bullet: Bullet) {
    if (bullet.type === 'real') this.lives--;
  }
  isAlive() { return this.lives > 0; }
}

class Gun {
  constructor(public blankBullets: number, public realBullets: number) { }
  areThereBullets() { return this.blankBullets + this.realBullets > 0; }
  shoot(): Bullet | null {
    if (!this.areThereBullets()) return null;
    let prob = this.blankBullets / (this.blankBullets + this.realBullets);
    if (Math.random() > prob) { this.realBullets--; return new Bullet('real'); }
    else { this.blankBullets--; return new Bullet('blank'); }
  }
}

class Dealer {
  turn: Player;
  constructor(public player1: Player, public player2: Player, public gun: Gun) {
    this.turn = this.player1;
  }
  changeTurn() {
    this.turn = (this.turn === this.player1) ? this.player2 : this.player1;
  }
  playerShootsPlayer(target: Player) {
    let bullet = this.gun.shoot();
    if (!bullet) return null;
    let before = target.lives;
    target.getShot(bullet);
    this.changeTurn();
    return { hit: before > target.lives, bulletType: bullet.type };
  }
}

@Injectable({ providedIn: 'root' })
export class GameService {
  player1!: Player;
  player2!: Player;
  dealer!: Dealer;
  log: string[] = [];

  initGame(p1Name: string, p2Name: string, lives: number, maxBullets: number) {
    this.player1 = new Player(p1Name, lives);
    this.player2 = new Player(p2Name, lives);

    const realBullets = Math.floor(Math.random() * (maxBullets + 1));
    const blankBullets = maxBullets - realBullets;
    const gun = new Gun(blankBullets, realBullets);

    this.dealer = new Dealer(this.player1, this.player2, gun);
    this.logMessage(`Se crearon ${blankBullets} balas de salva y ${realBullets} balas reales`);
  }

  logMessage(msg: string) {
    this.log.unshift(msg);
  }

  isGameOver(): boolean {
    return !(this.player1.isAlive() && this.player2.isAlive() && this.dealer.gun.areThereBullets());
  }

  endGame() {
    let winner =
      this.player1.lives > this.player2.lives ? this.player1.name :
        this.player2.lives > this.player1.lives ? this.player2.name : 'Empate';
    this.logMessage(`🏆 Fin del juego. Ganador: ${winner}`);
  }

  shootSelf(player: Player) {
    if (this.dealer.turn !== player) { alert(`Aún no es turno de ${player.name}`); return; }
    let result = this.dealer.playerShootsPlayer(player);
    if (!result) { this.logMessage('⚠ No hay más balas.'); return; }
    this.logMessage(`${player.name} se disparó y salió bala ${result.bulletType}`);
    if (this.isGameOver()) this.endGame();
  }

  shootOpponent(shooter: Player, target: Player) {
    if (this.dealer.turn !== shooter) { alert(`Aún no es turno de ${shooter.name}`); return; }
    let result = this.dealer.playerShootsPlayer(target);
    if (!result) { this.logMessage('⚠ No hay más balas.'); return; }
    this.logMessage(`${shooter.name} disparó a ${target.name} y salió bala ${result.bulletType}`);
    if (this.isGameOver()) this.endGame();
  }
}
