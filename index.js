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
console.log(chosenWord.toString());



// function playGame() {
//     console.log("MIDNIGHT HANGMAN");
//     let chosenWord = new Word(chosenWordLetters);
//     let display = "";
//     chosenWord.letterArray.forEach(letter => {
//              display += letter.character + " ";
//         });
//     console.log(display);
//     inquirer.prompt([{
        
//     }]).then(function(answers) {

//     })
// }

// playGame();