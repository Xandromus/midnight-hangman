let inquirer = require("inquirer");
let Word = require("./word.js");
let Letter = require("./letter.js");

let guessedLetters = [];
let guessesCount = 10;

let breads = ["brioche", "rye", "marble rye", "sourdough", "white", "wheat", "pumpernickel", "focaccia"];
let random = Math.floor(Math.random() * breads.length);
let randomWord = breads[random];

randomWord.forEach(element => {
    
});

let chosenWord = new Word();