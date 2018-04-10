let inquirer = require("inquirer");
let Word = require("./word.js");
let Letter = require("./letter.js");

let chosenWordLetters = [];
let guessedLetters = [];
let guessesCount = 10;

let breads = ["brioche", "rye", "marble rye", "sourdough", "white", "wheat", "pumpernickel", "focaccia"];
let random = Math.floor(Math.random() * breads.length);
let randomWord = breads[random];

for (let i = 0; i < randomWord.length; i++) {
    chosenWordLetters.push(new Letter(randomWord.charAt(i)));
}
console.log(chosenWordLetters);
let chosenWord = new Word(chosenWordLetters);
console.log(chosenWord);




function playGame() {
    if (guessesCount > 0) {
    console.log("You have " + guessesCount + " guesses remaining.");
    chosenWord.toString();
    
    inquirer.prompt([
        {
            name: "guess",
            message: "Guess a letter.",
            validate: answer => {
                if(isNaN(parseInt(answer))){
                    if(answer.length === 1){
                        return true;
                    }
                    return "Enter one letter";
                }
                return "Enter a letter";
            }       
        }
]).then(function(userGuess) {
        let guessedLetter = userGuess.guess.toLowerCase();

        let isGuessed = false;
        guessedLetters.forEach(previousGuess => {
            if (guessedLetter === previousGuess) {
                isGuessed = true;
            }
        });

        if (isGuessed) {
            console.log("You already entered this letter. Please try again.");
        } else {
            guessedLetters.push(guessedLetter);
            chosenWord.isGuessedLetter(guessedLetter);
            guessesCount--;
        }
        console.log(chosenWord);
        
        if (chosenWord.completedWord()) {
            console.log("You win!");
            return;
        }

        playGame();

    });
} else {
    console.log("You lose!");
}
}

console.log("MIDNIGHT HANGMAN");
playGame();