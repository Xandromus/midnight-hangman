let inquirer = require("inquirer");
let Word = require("./word.js");
let Letter = require("./letter.js");
let colors = require('colors');

let chosenWordLetters = [];
let guessedLetters = [];
let guessesCount = 10;

let breads = ["brioche", "rye", "marble rye", "sourdough", "white", "wheat", "pumpernickel", "focaccia"];
let random = Math.floor(Math.random() * breads.length);
let randomWord = breads[random];

for (let i = 0; i < randomWord.length; i++) {
    chosenWordLetters.push(new Letter(randomWord.charAt(i)));
}

let chosenWord = new Word(chosenWordLetters);

function playGame() {
    if (guessesCount > 0) {
    console.log("\n" + "-".repeat(30) + "\nYou have " + colors.white.bold.bgRed(" " + guessesCount + " ") + " guesses remaining.\n");
    chosenWord.toString();
    console.log("\n");
    
    inquirer.prompt([
        {
            name: "guess",
            message: "Guess a letter.",
            validate: answer => {
                let pass = answer.match(
                    /^[A-Za-z]+$/
                );
                if (pass) {
                    if (answer.length === 1){
                        return true;
                    }
                    return "Please enter only one letter";
                }
                return "Please enter an alphabetic character.";
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
            if (randomWord.indexOf(guessedLetter) === -1) {
                console.log(colors.white.bold.bgRed("\n " + "-".repeat(10) + " " + "\n INCORRECT! " + "\n " + "-".repeat(10) + " "));
            guessesCount--;
            } else {
                console.log(colors.white.bold.bgGreen("\n " + "-".repeat(8) + " " + "\n CORRECT! " + "\n " + "-".repeat(8) + " "));
            }
        }
        
        if (chosenWord.completedWord()) {
            console.log("\nThe word was:\n");
            chosenWord.toString();
            console.log(colors.white.bold.bgBlue("\n " + "-".repeat(8) + " " + "\n YOU WON! " + "\n " + "-".repeat(8) + " "));
            return;
        }

        playGame();

    });
} else {
    console.log("\nThe word was: \n\n" + randomWord);
    console.log(colors.white.bold.bgMagenta("\n " + "-".repeat(9) + " " + "\n YOU LOST! " + "\n " + "-".repeat(9) + " "));
}
}

console.log(colors.red.bold.bgWhite("\n " + "-".repeat(16) + " " + "\n M|dn|ght hangMan ".trap + "\n " + "-".repeat(16) + " "));
playGame();