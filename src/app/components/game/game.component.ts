import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {

  constructor(private userService: UserService) { }

  words: string[] = ['sole', 'casa', 'pane', 'amore', 'mare', 'porta', 'oro', 'cane', 'mela', 'vino', 'roma', 'luna', 'riso', 'sale', 'vita', 'seta', 'sano', 'polo', 'dito', 'gara', 'vita', 'mano', 'pelo', 'tappo', 'piuma', 'cielo', 'tubo', 'muro', 'neve', 'vento', 'pepe', 'togo', 'lago', 'arco', 'fore', 'rana', 'pomo', 'nota', 'zeta', 'musa', 'roba', 'baba', 'piro', 'taco', 'bari', 'rete', 'sera', 'bici', 'cosa', 'brio', 'fuso'];
  //array of words to use in the game
  scrambledWord = ''; //memorize the scrambled word
  userInput = ''; //input of the user
  score = 0; //actual score 
  gameOver = false; //to end the game
  currentWorld = '';  //word to scramble
  correctWordsCoutn: number = 0;  //counter of the correct words
  highScore: number = 0;  //memorize the highscore
  originalWord: string = ''; // test variable save the non scrambled word

  ngOnInit() {
    this.userService.getHighScore().subscribe(highScore => {  //when the game launch i get the actual user highscore 
      this.highScore = highScore;
    });
    this.generateWord();  //generate the word
  }

  generateWord() {    //take a casual word from the array
    const randomIndex = Math.floor(Math.random() * this.words.length);
    const word = this.words[randomIndex];
    this.originalWord = word;// testing
    this.currentWorld = word; //correct word
    this.scrambledWord = this.shuffleWord(word); //scrambled word
  }

  shuffleWord(word: string) { //the string word is scrambled
    let shuffledWord = '';
    const wordArray = word.split(''); //array of char splitted from the word
    while (wordArray.length > 0) {  //until wordArray is empty
      const randomIndex = Math.floor(Math.random() * wordArray.length); //generate a random index
      const randomChar = wordArray.splice(randomIndex, 1)[0]; // i take a random char from wordArray and i replace it with 0
      shuffledWord += randomChar; //char added to the scrambled word
    }
    return shuffledWord; //return the shuffled word
  }

  checkWord() { //check if the answer is right
    if (this.userInput === this.currentWorld) { //if the answer is right...
      this.score++; //increment the actual score
      this.userInput = ''; //input become blank
      this.generateWord(); //generate another scrambled word
    } else {
      if (this.score > this.highScore) { //if the score is bigger than the last highscore
        this.highScore = this.score;
        this.userService.updateHighScore(this.score); //update the highscore on the database
      } else if (this.score === 0 && this.highScore !== 0) {
        this.userService.updateHighScore(this.highScore);
      }
      this.gameOver = true; //set the gamover to true to restart the game
    }
  }


  restartGame() { //when is called
    this.score = 0; //score reset
    this.userInput = ''; //input reset
    this.gameOver = false; //gameover turn to false
    this.generateWord(); //generate another scrambled word
  }

}