import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SaveGameService } from 'src/app/services/save-game.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  countdown: number = 3;
  winner: any;
  loser: any;
  draw: boolean = false;

  playerSaveData: any;
  opponentSaveData: any;

  conditions: any = {
    Rock: { losesAgainst: 'Paper', winsAgainst: 'Scissors' },
    Paper: { losesAgainst: 'Scissors', winsAgainst: 'Rock' },
    Scissors: { losesAgainst: 'Rock', winsAgainst: 'Paper' }
  }

  @Input() results: any;
  @Output() onRematch = new EventEmitter<any>();

  constructor(private saveGameService: SaveGameService, private router: Router) { }

  ngOnInit(): void {
    this.getSaveData();
    this.calculateResults();
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(interval);
      }
    }, 1000)
  }

  getSaveData() {
    this.playerSaveData = this.saveGameService.getSaveGame(this.results.playerName);
    this.opponentSaveData = this.saveGameService.getSaveGame(this.results.opponentName);
  }

  calculateResults() {
    if (this.conditions[this.results.playerChoice].winsAgainst === this.results.opponentChoice) {
      this.winner = { name: this.results.playerName, choice: this.results.playerChoice }
      this.loser = { name: this.results.opponentName, choice: this.results.opponentChoice }
      this.playerSaveData.wins++;
      this.opponentSaveData.losses++;
    } else if (this.conditions[this.results.opponentChoice].winsAgainst === this.results.playerChoice) {
      this.loser = { name: this.results.playerName, choice: this.results.playerChoice }
      this.winner = { name: this.results.opponentName, choice: this.results.opponentChoice }
      this.opponentSaveData.wins++;
      this.playerSaveData.losses++;
    } else {
      this.draw = true;
      this.playerSaveData.draws++;
      this.opponentSaveData.draws++;
    }
    this.saveGame();
  }

  saveGame() {
    this.playerSaveData && this.saveGameService.saveGame(this.results.playerName, this.playerSaveData)
    this.opponentSaveData && this.saveGameService.saveGame(this.results.opponentName, this.opponentSaveData)
  }

  startNewGame() {
    this.router.navigate(['/']);
  }

  startRematch() {
    this.onRematch.emit();
  }


}
