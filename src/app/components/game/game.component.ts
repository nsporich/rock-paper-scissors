import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaveGameService, Score } from 'src/app/services/save-game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  score: Score = { wins: 0, losses: 0, draws: 0 };

  playerName: string = this.saveGameService.playerName;
  tempOpponentName: string = '';
  opponentName: string = '';
  player2: boolean = false;

  playerChoice: string | undefined;
  opponentChoice: string | undefined;

  gameActive: boolean = false;

  results: any = {};

  constructor(public saveGameService: SaveGameService, public router: Router) { }

  ngOnInit(): void {
    this.score = this.saveGameService.getSaveGame(this.playerName);

  }

  selectOpponent(selection: string) {
    if (selection === 'Computer') {
      this.opponentName = selection;
      this.saveGameService.setOpponentName('Computer')
      this.opponentChoice = this.randomChoice();
    } else {
      this.player2 = true;
    }
  }

  setOpponentName() {
    this.opponentName = this.tempOpponentName;
    this.saveGameService.setOpponentName(this.opponentName);
  }

  randomChoice() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    return choices[Math.floor(Math.random() * choices.length)]
  }

  select(player: string, choice: string) {
    player === 'Player' ? this.playerChoice = choice : this.opponentChoice = choice;
    if (this.playerChoice && this.opponentChoice) {
      this.playGame();
    }
  }

  playGame() {
    this.gameActive = true;
    this.results = {
      playerName: this.playerName,
      playerChoice: this.playerChoice,
      opponentName: this.opponentName,
      opponentChoice: this.opponentChoice
    }

  }

  rematch() {
    this.gameActive = false;
    this.playerChoice = '';
    this.opponentChoice = this.opponentName === 'Computer' ? this.randomChoice() : '';
    this.results = {};
  }


}
