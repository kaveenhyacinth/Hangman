const TeamOne = document.querySelector("#team-1");
const TeamTwo = document.querySelector("#team-2");
const scoreOne = document.querySelector("#score-1");
const scoreTwo = document.querySelector("#score-2");
const livesLeft = document.querySelector("#guesses");
const rounds = document.querySelector("#rounds");
const dropzoneDiv = document.querySelector("#dropzone");
const origin = document.querySelector("#origin");
const wrongDropZone = document.querySelector("#dropzone-wrong");
const blanksContainer = document.querySelector("#blanks");

var originClone = origin.cloneNode(true);
var wrongDropzoneClone = wrongDropZone.cloneNode(true);
var dropzoneClone = dropzoneDiv.cloneNode(true);

var isFirstTime = true;
var isTeamOne = true;
var lives = 5;
var roundsCount = 0;
var Score1 = 0;
var Score2 =0;

var wordToGuess;
var numberOfBlanks;
var guessRun;
var Team1, Team2;


/* get team name | get secret word to guess | generate blanks */
window.onload = () => {

    Team1 = prompt("Enter First Team's Name");
    Team2 = prompt("Enter Second Team's Name");

    getSecretWord();

    alert("Drag and drop letters to guess the secret word");

    TeamOne.innerText = Team1.toUpperCase();
    TeamTwo.innerText = Team2.toUpperCase();

    generateBlanks();

    // debugging...
    console.log("onLoad is running");
    console.log(wordToGuess.toUpperCase());
    console.log(isTeamOne);
    console.log(wordToGuess.length);
}

/*=== Drag and drop start ===*/

// grab the secret word
const getSecretWord = () => {
    if(isTeamOne) {
        wordToGuess = prompt(`Hey ${Team1.toUpperCase()}, please enter your secret word`);
    } else {
        wordToGuess = prompt(`Hey ${Team2.toUpperCase()}, please enter your secret word`);
    }

    wordToGuess = wordToGuess.toUpperCase();

    // increase round by 1
    roundsCount++;
    rounds.innerHTML = roundsCount;
}

// generate blanks according to secret word
const generateBlanks = () => {

    /* Count the length of the entered secret word */
    numberOfBlanks = wordToGuess.length;
    guessRun = wordToGuess.length;

    for(let i=0; i < numberOfBlanks; i++) {
        blanksContainer.innerHTML += `<div id='blank-${i}' class='blank'>__</div>`;
    }
}

// get targeted item's id to transfer
const onDragStart = event => {
    // grab id to transfer
    event
        .dataTransfer
        .setData('text/plain', event.target.id);

    event
        .currentTarget
        .style
        .backgroundColor = '#F7C81E';

    event
        .currentTarget
        .style
        .color = '#000';

    // debugging...
    console.log("onDragStart is running");
}

// allow to dragover
const onDragOver = event => {
    event.preventDefault();

    // debugging...
    console.log("onDragOver is running");
}

// pass and append the data in dropzone
const onDrop = event => {
    event.preventDefault();

    // clear dropzone default text on the first attempt
    if(isFirstTime === true) {
        dropzoneDiv.innerText = "";
        isFirstTime = false;
    }
    
    // save grabbed id from the datatranser
    const id = event.dataTransfer.getData('text');

    const draggableElement = document.getElementById(id);
    const dropZone = event.target;

    draggableElement.style.backgroundColor = "#559C7F";
    draggableElement.style.color = "#FFF";

    dropZone.appendChild(draggableElement);

    var guessLetter = draggableElement.innerText;

    var indexArray = guessChecker(wordToGuess, guessLetter, id);

    if(indexArray != -1) {
        replaceBlanks(indexArray, guessLetter);
    }

    findSessionWinner();

    // debugging
    console.log("onDrop is running");
    console.log(guessLetter);
    console.log(guessChecker(wordToGuess, guessLetter));

    event.dataTransfer.clearData();
}

/*=== Drag and drop end ===*/

// Check whether word has the guessed letter
const guessChecker = (word, guess, id) => {

    if(word.includes(guess)) {
        return guessLetterIndexes(word, guess);
    } else {
        const wrongLetter = document.getElementById(id);

        if(wrongDropZone.innerText === "Wrong Guesses Goes Here...") {
            wrongDropZone.innerText = "";
        }

        wrongLetter.style.backgroundColor = "#EB6E48";
        wrongLetter.style.color = "#FFF";
        wrongDropZone.appendChild(wrongLetter);

        lives -= 1;
        livesLeft.innerText = `0${lives}`;

        return -1;
    }

    // debugging...
    console.log("guessChecker is running");
}

// Get the indexes which contains the guessed letter
const guessLetterIndexes = (word, guess) => {
    var indices = [];

    for(let i=0; i < word.length; i++) {
        if(word[i] === guess) {
            indices.push(i);
        }
    }

    // debugging...
    console.log("guessLetterIndexes is running");

    return indices;
}

// replace guess letters with blanks
const replaceBlanks = (indexArray, guess) => {

    for(let i=0; i < indexArray.length; i++) {
        const replace = document.querySelector(`#blank-${indexArray[i]}`);

        var stringToReplace = replace.innerText;
        var resultToReplace = stringToReplace.replace("__", guess);
        replace.innerText = resultToReplace;

        guessRun -= 1;

        // debugging...
        console.log("replaceBlanks is running");
        console.log(replace.innerText);
    }
}

// find the winner
const findSessionWinner = () => {

    var sessionLead = isTeamOne ? Team1 : Team2;
    var sessionRunner = isTeamOne ? Team2 : Team1;

    if(lives === 0) {
        var winMsg = `🎉 ${sessionLead} has won 🎉`;
        scoreUpdater(sessionLead);
        alert(winMsg.toUpperCase());
        newSession();
    } else if(guessRun === 0) {
        var winMsg = `🎉 ${sessionRunner} has won 🎉`;
        scoreUpdater(sessionRunner);
        alert(winMsg.toUpperCase());
        newSession();
    }

    // debugging...
    console.log("findSessionWinner is running");
    console.log(`lead: ${ssessionLead} and runner: ${sessionRunner}`);
}

// Score updater
const scoreUpdater = (Lead) => {
    if(Lead == Team1) {
        Score1++;
        scoreOne.innerHTML = `0${Score1}`;
    } else if(Lead == Team2) {
        Score2++;
        scoreTwo.innerHTML = `0${Score2}`;
    }

    // debugging...
    console.log("scoreUpdater is running");
    console.log(`Score1: ${Score1} and Score2: ${Score2}`);
}

// clean the current session
const cleanSession = () => {
    blanksContainer.innerHTML = "";
    lives = 5;
    isFirstTime = true;
    isTeamOne = !isTeamOne;
    wordToGuess = "";
    numberOfBlanks = guessRun = 0;

    origin.innerHTML = originClone.innerHTML;
    wrongDropZone.innerHTML = wrongDropzoneClone.innerHTML;
    dropzoneDiv.innerHTML = dropzoneClone.innerHTML;

    livesLeft.innerText = `0${lives}`;
}

// open a new session
const newSession = () => {
    cleanSession();
    getSecretWord();
    generateBlanks();
}
