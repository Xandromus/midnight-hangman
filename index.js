let inquirer = require("inquirer");
let Word = require("./word.js");
let Letter = require("./letter.js");
let colors = require('colors');

let chosenWordLetters;
let guessedLetters;
let guessesCount;
let gameOver;

let breads = ["brioche", "rye", "marble rye", "sourdough", "white", "wheat", "pumpernickel", "focaccia"];
let random;
let randomWord;

let chosenWord;
let index;

function playGame() {
    guessesCount = 10;
    chosenWordLetters = [];
    guessedLetters = [];
    gameOver = false;
    random = Math.floor(Math.random() * breads.length);
    randomWord = breads[random];
    for (let i = 0; i < randomWord.length; i++) {
        chosenWordLetters.push(new Letter(randomWord.charAt(i)));
    }

    chosenWord = new Word(chosenWordLetters);
    gameQuery();
}

function gameQuery() {
    if (gameOver === false) {
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
                            if (answer.length === 1) {
                                return true;
                            }
                            return "Please enter only one letter";
                        }
                        return "Please enter an alphabetic character.";
                    }
                }
            ]).then(function (userGuess) {
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
                    gameOver = true;
                    console.log("\nThe word was:\n");
                    chosenWord.toString();
                    console.log(colors.white.bold.bgBlue("\n " + "-".repeat(8) + " " + "\n YOU WON! " + "\n " + "-".repeat(8) + " \n"));
                    index = breads.indexOf(randomWord);
                    breads.splice(index, 1);
                }

                gameQuery();

            });
        } else {
            gameOver = true;
            console.log("\nThe word was: \n\n" + randomWord);
            console.log(colors.white.bold.bgMagenta("\n " + "-".repeat(9) + " " + "\n YOU LOST! " + "\n " + "-".repeat(9) + " \n"));
            gameQuery();
        }
    } else {
        if (!breads.length) {
            console.log("You've guessed all of the breads! Great job!");
            return;
        } else {
            inquirer.prompt([
                {
                    type: "confirm",
                    name: "again",
                    message: "Would you like to play again?"
                }
            ]).then(function (input) {
                let playAgain = input.again;
                if (playAgain) {
                    playGame();
                } else {
                    return;
                }
            });
        }
    }
}

console.log(colors.red.bold.bgWhite("\n " + "-".repeat(16) + " " + "\n m|dn|ght hangman ".trap + "\n " + "-".repeat(16) + " "));
console.log(colors.white.bold.bgBlue("\n " + "-".repeat(27) + " " + "\n BREADS OF THE WORLD EDITION " + "\n " + "-".repeat(27) + " "));
playGame();