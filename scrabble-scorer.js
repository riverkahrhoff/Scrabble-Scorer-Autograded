// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   word = input.question("Let's play some scrabble! Enter a word: ")
   return word
};

let newPointStructure = transform(oldPointStructure);

let simpleScorer = function(word) {
   return word.length
};


let vowelBonusScorer = function(word) {
   let vowels = ["a", "e", "i", "o", "u"]
   let score = 0
   for (i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         score = score + 3
      } else {
         score = score + 1
      }
   }
   return score
}

let scrabbleScorer = function(word) {
  word = word.toLowerCase();
	let letterPoints = 0;
	for (let i = 0; i < word.length; i++) {
	  for (letter in newPointStructure) {
		 if (letter == (word[i])) {
			letterPoints += newPointStructure[letter]
		 }
 
	  }
	}
	return letterPoints;
};

let scoringAlgorithms = [
  {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scoringFunction: simpleScorer
 },
 {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scoringFunction: vowelBonusScorer
 },
 {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scoringFunction: scrabbleScorer
 }];
 
 function scorerPrompt() {
   scorerIndex = input.question(`
 Which scoring algorithm would you like to use?
 
 0 - Simple: One point per character
 1 - Vowel Bonus: Vowels are worth 3 points
 2 - Scrabble: Uses scrabble point system
 Enter 0, 1, or 2: `)
   if (scorerIndex < 0 || scorerIndex > 3) {
     console.log("\nERROR: invalid input");
     scorerPrompt();
   } else {
     return console.log(`\nScore for "${word}': ${scoringAlgorithms[scorerIndex].scoringFunction(word)}`);
   }
 }
 

function transform(pointStruct) {
  let newPointStruct = {};
  newPointStruct[" "] = 0;
  for (pointValue in pointStruct) {
    for (let i = 0; i < pointStruct[pointValue].length; i++) {
      let newKey = String(pointStruct[pointValue][i].toLowerCase());
      newPointStruct[newKey] = Number(pointValue);
    }
  }
  return newPointStruct;
}


function runProgram() {
   initialPrompt();
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
