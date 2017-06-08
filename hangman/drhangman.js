const express = require('express')
const app = express()
const underscore = require('underscore')


var guess_word = "hangman"
var guess_needed = underscore.uniq(guess_word.split('')).length //Length of unique letters 
var guess_word_length = guess_word.length //Total length of word
var total_guesses = 0
var guess_corrects = []
var guess_incorrects = []



function printHangman(){ // This is a really gross way to make an ascii hangman
  guess_counts = guess_incorrects.length
  console.log("\n")
  console.log("   _________________")
  if(guess_counts > 0){ 
  console.log("   |      |")
  }else{ 
  console.log("   |")}
  if(guess_counts > 1){
  console.log("   |      O")
  }else{ console.log("   |")}
  if(guess_counts == 3){
  console.log("   |      |")
  }else if(guess_counts == 4) { 
  console.log("   |     /|")
  }else if(guess_counts > 4){ 
  console.log("   |     /|\\")
  }else{ 
  console.log("   |")}
  if(guess_counts == 6){
  console.log("   |     /")
  } else if(guess_counts>6) {
  console.log("   |     / \\")
  } else{
  console.log("   |")}
  console.log("   |")
  console.log("___|____________________")
}

function printWord(){
  console.log()
  console.log()

  for(var x = 0; x<guess_word_length; x++){
    if(guess_corrects.includes(guess_word[x])){
      process.stdout.write(guess_word[x])
    } else {
      process.stdout.write('_')
    }
  }
  console.log()
}

function gameOver() {
  if (guess_incorrects.length > 6) {
    console.log("YOU LOST! BETTER LUCK NEXT TIME")
    return true
  }
  if (guess_corrects.length == guess_needed) {
    console.log("YOU WON!! Congratulations")
    return true
  }

  return false
} 

console.log("The word you're guessing is "+guess_word_length+" letters long\n")
console.log("There are "+guess_needed+" number of unique letters")

var stdin = process.openStdin();

console.log("Enter a single letter guess")
printHangman()
printWord()
stdin.addListener("data", function(d) {

    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 
    letter = d.toString().toLowerCase().trim()
    if(letter.length == 0){
      console.log("You entered nothing. Guesses need to  be one letter")
    } else {
    if(letter.length > 1){
      console.log("You entered more then one letter. Guesses can only be one letter")
     } else{
      if((guess_corrects.includes(letter)) || (guess_incorrects.includes(letter))){
       console.log("You've already guessed "+ letter+" please try another letter")
      }else{

        total_guesses++
        console.log("You entered " + letter)
        index = guess_word.indexOf(letter)
        if(index == -1){
          console.log("INCORRECT! " + letter + " isn't in the word")
          guess_incorrects.push( letter)
        } else {
          console.log("SUCCESS! " + letter + " is in the word")
          guess_corrects.push(letter)
        }
      }  
     } }
      process.stdout.write('\033c');
      printHangman()
      printWord()
      
      console.log("You've made "+total_guesses+" number of guesses")
      if(guess_corrects.length > 0) {
        console.log("Your correct guesses are " + guess_corrects)
      }
      if(guess_incorrects.length > 0) {
        console.log("Your incorrect guesses are " + guess_incorrects)
      }
      if(gameOver()) {
        process.exit()
      }
      
  });
