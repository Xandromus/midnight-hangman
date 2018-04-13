// variable declarations for required packages and classes
let inquirer = require("inquirer");
let Word = require("./word.js");
let Letter = require("./letter.js");
let colors = require('colors');

// global variables
let chosenWordLetters;
let guessedLetters;
let guessesCount;
let gameOver;
// array of words to be guessed
let breads = ["brioche", "rye", "marble rye", "sourdough", "white", "wheat", "pumpernickel", "focaccia"];
let random;
let randomWord;
let chosenWord;
let index;

// function for the game to begin
function playGame() {

    // initialize variables
    guessesCount = 10;
    chosenWordLetters = [];
    guessedLetters = [];
    gameOver = false;

    // determine the random word chosen from the array
    random = Math.floor(Math.random() * breads.length);
    randomWord = breads[random];

    // push each character in random word as a Letter class instance into the chosenWordLetters array
    for (let i = 0; i < randomWord.length; i++) {
        chosenWordLetters.push(new Letter(randomWord.charAt(i)));
    }

    // create Word class instance with chosenWordLetters array as an argument
    chosenWord = new Word(chosenWordLetters);

    // begin the game query to prompt user for guesses
    gameQuery();
}

// game query function to prompt user for guesses
function gameQuery() {
    // check to see if gameOver is set to true/user has completed guessing word
    if (gameOver === false) {
        // check to see if user still has guesses available for each word
        if (guessesCount > 0) {
            console.log("-".repeat(32) + "\nYou have " + colors.white.bold.bgRed(" " + guessesCount + " ") + " guesses remaining.\n");

            // display random word as a series of underscores that updates as user guesses correct letters
            chosenWord.toString();

            // prompt user to guess a letter from the chosen word. Validate to get alphabetic characters and only one letter at a time
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
                            return "Please enter only one letter.";
                        }
                        return "Please enter an alphabetic character.";
                    }
                }
            ]).then(function (userGuess) {
                // variable to hold user input
                let guessedLetter = userGuess.guess.toLowerCase();

                // initialize variable to hold boolean value of whether the user input has been guessed or not 
                let isGuessed = false;

                // check array of already guessed letters to see if user input has been guessed, updating isGuessed status as needed
                guessedLetters.forEach(previousGuess => {
                    if (guessedLetter === previousGuess) {
                        isGuessed = true;
                    }
                });

                // if user input has already been guessed, prompt user to try again
                if (isGuessed) {
                    console.log("\033c");
                    console.log("You already entered this letter. Please try again.\n");
                } else {
                    // otherwise, push it into array of already guessed letters
                    guessedLetters.push(guessedLetter);

                    // pass user input into function to check if it is in chosen word
                    chosenWord.isGuessedLetter(guessedLetter);

                    // if user input isn't in the chosen word, show incorrect status
                    if (randomWord.indexOf(guessedLetter) === -1) {
                        console.log("\033c");
                        console.log(colors.white.bold.bgRed(" " + "-".repeat(10) + " " + "\n INCORRECT! " + "\n " + "-".repeat(10) + " \n"));
                        guessesCount--;
                    } else {
                        // if it is, show correct status
                        console.log("\033c");
                        console.log(colors.white.bold.bgGreen(" " + "-".repeat(8) + " " + "\n CORRECT! " + "\n " + "-".repeat(8) + " \n"));
                    }
                }

                // check to see if word has been completed by user
                if (chosenWord.completedWord()) {

                    // set gameOver status to true and provide user with winning status
                    gameOver = true;
                    console.log("\033c");
                    console.log(colors.white.bold.bgBlue(" " + "-".repeat(8) + " " + "\n YOU WON! " + "\n " + "-".repeat(8) + " "));
                    console.log("\nThe word was:\n");
                    chosenWord.toString();

                    // remove chosen word from array
                    index = breads.indexOf(randomWord);
                    breads.splice(index, 1);
                }

                // recursively run game query function at the end of each guess
                gameQuery();
            });
        } else {
            // if user runs out of guesses, set gameOver status to true and provide user with losing status
            gameOver = true;
            console.log("\033c");
            console.log(colors.white.bold.bgMagenta(" " + "-".repeat(9) + " " + "\n YOU LOST! " + "\n " + "-".repeat(9) + " "));
            console.log("\nThe word was: \n\n" + randomWord + "\n");

            // recursively run game query function
            gameQuery();
        }
    } else {
        // if game round is over (from win or loss), check to see if user has guessed all words in array
        if (!breads.length) {
            // is user has guessed all words, provide final win message and end game
            console.log("You've guessed all of the breads! Great job!");
            return;
        } else {
            // otherwise, ask user if they would like to play again
            inquirer.prompt([
                {
                    type: "confirm",
                    name: "again",
                    message: "Would you like to play again?",
                    default: true
                }
            ]).then(function (input) {
                let playAgain = input.again;
                // if user answers yes, start game function again
                if (playAgain) {
                    console.log("\033c");
                    playGame();
                } else { // otherwise, end game
                    console.log("\033c");
                    return;
                }
            });
        }
    }
}

// opening message for game
console.log("\033c");
console.log(colors.red.bold.bgWhite(" " + "-".repeat(16) + " " + "\n m|dn|ght hangman ".trap + "\n " + "-".repeat(16) + " "));
console.log(colors.white.bold.bgBlue("\n " + "-".repeat(27) + " " + "\n BREADS OF THE WORLD EDITION " + "\n " + "-".repeat(27) + " \n"));

// initial function call to start game
playGame();