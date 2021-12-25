'use strict';

//Yaz library
const yaz = {
    select: function (selector){
        return document.querySelector(selector);
    },

    setText: function (selector, value){
        this.select(selector).textContent = value;
    }
}

//Variables
let randNumber, guessedNumber, score, isOver, highscore = 0;

//Generate random number
function genRand(){
    randNumber = Math.trunc(Math.random()*40) + 1;
};

//Style page
function stylePage(message, bodyColor, numberWidth, numberValue){
    yaz.setText('.message', message);
    yaz.select('body').style.backgroundColor = bodyColor;
    yaz.select('.number').style.width = numberWidth;
    yaz.setText('.number', numberValue);
}

//Check
function check(){
    //input Number
    guessedNumber = Number(yaz.select('.guess').value);
        
    //if player doesn't input a number
    if(!guessedNumber && !isOver){
        yaz.setText('.message', 'Not a valid number!')
    }
    //if player wins 
    else if (guessedNumber === randNumber && !isOver){
        stylePage('That is correct!', '#60b347', '30rem', randNumber);
        isOver = true;
        if (score > highscore){
            highscore = score;
            yaz.setText('.highscore', highscore);
        }
    } 
    //if player doesn't get it right
    else if (!isOver){
        //if player doesn't lose
        yaz.setText('.message', guessedNumber > randNumber ? 'Try a lower number...' : 'Try a higher number...');
        score--;
        yaz.setText('.score', score);

        //if player loses
        if(score <= 0){
            stylePage('You lose!', 'red', '30rem', randNumber);
            isOver = true;
        } 
    }
}

//Game Initials
function initial(){
    genRand();
    stylePage('Start guessing...', '#222', '15rem', '?');
    score = 7;
    yaz.setText('.score', score);
    isOver = false;
    yaz.select('.guess').value = '';
    console.log(randNumber);
}

//Start of game
initial();

//When clicking 'Enter'
document.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
        check();
    }
});

//when clicking 'R'
document.addEventListener('keydown', function(e){
    if(e.key === 'r'){
        initial();
    }
});

//when clicking 'Check'
yaz.select('.check').addEventListener('click', check);

//when clicking 'Again'
yaz.select('.again').addEventListener('click', initial);