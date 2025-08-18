import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface Card {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-flipping-game',
  imports: [CommonModule],
  templateUrl: './flipping-game.component.html',
  styleUrl: './flipping-game.component.scss'
})

export class FlippingGameComponent {

  cards: Card[] = [];
  flippedCards: Card[] = [];
  isChecking: boolean = false;
  moves: number = 0;
  timer: number = 0;
  totalScore: number = 0;
  levelScore: number = 0;
  interval: any;
  gameWon: boolean = false;
  highScores: {
    score: any; level: number, time: number, moves: number 
  }[] = [];
  showIntro: boolean = true;
  gameOver: boolean = false;

  // Infinite Level System
  currentLevel: number = 1;

  // Emoji pool (can be replaced with icons/images later)
  cardValues = [
    '🍕', '🚀', '🐱', '🎮', '🌟', '🎵', '💎', '🔥',
    '🐶', '🦊', '🐼', '🧠', '🍔', '🦄', '🥇', '🎲',
    '🐙', '👾', '🧩', '💡', '📱', '🏆', '🎯', '🪐'
  ];

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    console.log("Game Initialized");
    this.showIntro = true;
    this.loadHighScores();
  }

  // Dynamic difficulty
  get pairsForLevel(): number {
    return Math.min(4 + this.currentLevel, this.cardValues.length);
  }

  get timeForLevel(): number {
    return Math.max(15, 60 - (this.currentLevel * 2));
  }

  countdown: number = this.timeForLevel;

  startGame() {
    this.gameOver = false;
    this.gameWon = false;
    console.log("Starting Level:", this.currentLevel);
    this.showIntro = false;
    this.countdown = this.timeForLevel;
    this.moves = 0;
    this.gameWon = false;
    this.cards = this.generateCards(this.pairsForLevel);

    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.interval);
        this.endGame(false);
      }
    }, 1000);
  }

  shuffle(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  generateCards(pairs: number): Card[] {
    const selected = this.shuffle(this.cardValues).slice(0, pairs);
    const deck = this.shuffle([...selected, ...selected]).map((value, index) => ({
      id: index,
      value,
      flipped: false,
      matched: false
    }));
    return deck;
  }

  flipCard(card: Card) {
    if (this.isChecking || card.flipped || card.matched) return;

    card.flipped = true;
    this.flippedCards.push(card);
    this.moves++;

    if (this.flippedCards.length === 2) {
      this.isChecking = true;
      setTimeout(() => this.checkMatch(), 800);
    }
  }

  checkMatch() {
    const [card1, card2] = this.flippedCards;
    if (card1.value === card2.value) {
      card1.matched = true;
      card2.matched = true;
    } else {
      card1.flipped = false;
      card2.flipped = false;
    }

    this.flippedCards = [];
    this.isChecking = false;

    if (this.cards.every(card => card.matched)) {
      this.winGame();
    }
  }

  winGame() {
    this.gameWon = true;
    clearInterval(this.interval);
    // Calculate score
    this.levelScore = (this.countdown * 10) + (this.currentLevel * 100) - (this.moves * 5);
    if (this.levelScore < 0) this.levelScore = 0; // prevent negative scores

    this.totalScore += this.levelScore;

    this.saveHighScore();
  }

  endGame(won: boolean) {
    clearInterval(this.interval);
    this.gameOver = true;
    this.gameWon = false;
    this.gameWon = won;

      if (!won) {
        this.cards.forEach(card => card.flipped = true);

        this.snackBar.open('Time\'s up! Game Over.', 'Close', {
          duration: 3000,
          panelClass: ['game-over-snackbar']
        });
      }
  }

  nextLevel() {
    this.currentLevel++;
    this.gameWon = false;
    this.startGame();
  }

  restartGame() {
    console.log("Restarting game from level 1...");
    this.currentLevel = 1;
    this.totalScore = 0;
    this.levelScore = 0;
    this.showIntro = true;
    this.gameWon = false;
    clearInterval(this.interval);
  }

  saveHighScore() {
    const newScore = {
    level: this.currentLevel,
    time: this.countdown,
    moves: this.moves,
    score: this.totalScore
    };
    
    this.highScores.push(newScore);
    this.highScores.sort((a, b) => b.score - a.score); // highest score first
    localStorage.setItem('highScores', JSON.stringify(this.highScores));
  }

  loadHighScores() {
    const storedScores = localStorage.getItem('highScores');
    if (storedScores) {
      this.highScores = JSON.parse(storedScores);
    }
  }

}
