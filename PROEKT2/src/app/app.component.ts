import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule]
})
export class AppComponent implements OnInit {
  ball = { x: 300, y: 200, vx: 3, vy: 2, size: 20 }; //inicijalna pozicija na topka - sredina na 600x400
  playerPaddle = { x: 20, y: 150, width: 10, height: 70, speed: 10 }; //na nasata palka
  computerPaddle = { x: 570, y: 150, width: 10, height: 70, speed: 1.7 }; //na komp palka
  canvasWidth = 600; // w
  canvasHeight = 400; // h

  playerScore = 0; //inicijalni poeni
  computerScore = 0;
  maxScore = 11;

  gameOver = false; // na pocetok ne e gameOver
  winner: string | null = null;

  ngOnInit() {
    this.startGame();
  }

  onKeydown(event: KeyboardEvent) {
    if (this.gameOver) return;
    let yCurr = this.playerPaddle.y;
    let diff = this.playerPaddle.speed; 
    if (event.key === 'ArrowUp') {
      if(yCurr-diff>=0) //y-oskata e pozitivna nadolu, pa za da se dvizime nagore fakticki namaluvame y-koord
        this.playerPaddle.y = yCurr-diff; //ako pridvizuvanje za diff nagore pak e vo ramki na prozorecot, dvizi
      else
        this.playerPaddle.y = 0; //inaku sme stignale do vrvot
    }
    if (event.key === 'ArrowDown') {
      if(yCurr+diff<=this.canvasHeight-this.playerPaddle.height) //najdolu sto moze da se dvizime e razlikata 
      {//megju visinata na cel canvas i vrvnata tocka na palkata
        this.playerPaddle.y = yCurr+diff; //ako ne sme stignale i ako pritiskame dolnoto kopce, se dvizime nadolu
      }
      else{
        this.playerPaddle.y = this.canvasHeight-this.playerPaddle.height; //inaku najdolu sme dzabe stiskas kopceto :)
      }
    }
  }

  startGame() {
    const gameLoop = () => {
      this.updateGame();
      if (!this.gameOver) {
        requestAnimationFrame(gameLoop);
      }
    };

    gameLoop();
  }

  updateGame() {
    if (this.gameOver) return;

    this.ball.x += this.ball.vx;
    this.ball.y += this.ball.vy;

    if (this.ball.y <= 0 || this.ball.y >= this.canvasHeight - this.ball.size) {
      this.ball.vy*=(-1);
    }

    // sudir so nasata palka
    if (
      this.ball.x <= this.playerPaddle.x + this.playerPaddle.width + 3 &&
      this.ball.y >= this.playerPaddle.y - 3 &&
      this.ball.y <= this.playerPaddle.y + this.playerPaddle.height + 3 &&
      this.ball.vx < 0
    ) {
      this.ball.vx*=(-1);
      this.ball.x+=2*this.ball.vx
    }

    // topka se udira so palkata na kompjuterot
    if (
      this.ball.x + this.ball.size >= this.computerPaddle.x-3 && //x koordinata (desniot rab na topkata da e na rab so palka)
      this.ball.y >= this.computerPaddle.y - 3 && 
      this.ball.y <= this.computerPaddle.y + this.computerPaddle.height + 3 && //y-koord da e vo interval na y na palka
      this.ball.vx > 0
    ) {
      this.ball.vx *= (-1);
      this.ball.x+=2*this.ball.vx;
    }

    // topkata e najlevo (poen za komp) ili najdesno (poen za nas)
    if (this.ball.x <= 0) {
      this.computerScore++;
      this.checkWin();
      this.resetBall();
    } else if (this.ball.x >= this.canvasWidth) {
      this.playerScore++;
      this.checkWin();
      this.resetBall();
    }

    // kompjuterskata palka
    if (this.computerPaddle.y + this.computerPaddle.height / 2 < this.ball.y) { //ako e nad topkata nadolu
      this.computerPaddle.y = Math.min(this.computerPaddle.y + this.computerPaddle.speed, this.canvasHeight - this.computerPaddle.height);
    } else if (this.computerPaddle.y + this.computerPaddle.height / 2 > this.ball.y) { //inaku obratno
      this.computerPaddle.y = Math.max(this.computerPaddle.y - this.computerPaddle.speed, 0);
    }
  }

  async resetBall() {
    this.ball.x = this.canvasWidth / 2;
    this.ball.y = this.canvasHeight / 2;
    this.ball.vx = Math.random() > 0.5 ? 3 : -3; //50% sansa za desno - levo
    this.ball.vy = Math.random() > 0.5 ? 2 : -2; //50% sansa za nadolu - nagore 
  
    await new Promise(resolve => setTimeout(resolve, 1000));  //ova e slucaj koga nekoj kje score-ne, 1 sekunda pred da trgne
  }

  checkWin() {
    if (this.playerScore === this.maxScore) {
      this.gameOver = true;
      this.winner = 'Player';
    } else if (this.computerScore === this.maxScore) {
      this.gameOver = true;
      this.winner = 'Computer';
    }
  }
}
