# Midnight Hangman

Midnight Hangman is a command line node game that asks users to guess letters in a given word with a limited number of guesses, a la hangman. It is called Midnight Hangman because of the black command line screen.


## Description

Midnight Hangman randomly selects one of 8 items in an array and displays it to the user using underscores. The user has 10 chances to guess all of the letters in each word. If the user runs out of guesses, they are prompted to either play again or quit. If the user guesses all of the letters in the selected word correctly, they are given the same prompt, but that word is removed from the array of words. Once the user has correctly entered all of the items in the array, the game ends.

The word and letter displays and checks are handled by requiring two additional files whic contain the Word and Letter constructor classes.


## Concepts Used

- JavaScript constructors
- JavaScript classes
- Node require and module exports


## Future Development

Expansion of this game could include adding additional arrays of words that the user could play through. Completion of all of the arrays could result in a champion status being given. Finally, these arrays could be chosen with a random number and be accessed either:

    1. from the arrays being written directly into the app.

    2. from .txt files accessed using fs.readFile. This would add additional modularity to the game and easily allow others to add arrays of words without touching the code


## Node Packages Used

- inquirer
- dotenv


## Authors

- **Xander Rapstine** - [Xander Rapstine](https://github.com/Xandromus)