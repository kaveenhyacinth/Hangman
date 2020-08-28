const TeamOne = document.querySelector("#team-1");
const TeamTwo = document.querySelector("#team-2");
const dropzoneDiv = document.querySelector("#dropzone");
const blanksContainer = document.querySelector("#blanks");

var isFirstTime = true;
var isTeamOne = true;

var wordToGuess;
var numberOfBlanks;

/* get team name | get secret word to guess | generate blanks */
window.onload = () => {

    var Team1 = prompt("Enter Team 1 Name");
    var Team2 = prompt("Enter Team 2 Name");

    if(isTeamOne) {
        wordToGuess = prompt(`Team ${Team1.toUpperCase()} please enter a secret word to guess`);
        isTeamOne = !isTeamOne;
    }

    TeamOne.innerText = Team1.toUpperCase();
    TeamTwo.innerText = Team2.toUpperCase();
    wordToGuess = wordToGuess.toUpperCase();

    numberOfBlanks = countBlanks(wordToGuess);

    for(let i=0; i < numberOfBlanks; i++) {
        blanksContainer.innerHTML += `<div id='blank-${i}' class='blank'>__</div>`;
    }

    // debug wordToGuess and round status
    console.log(wordToGuess.toUpperCase());
    console.log(isTeamOne);
    console.log(countBlanks(wordToGuess));
}

/* Count the length of the entered secret word */
const countBlanks = (word) => {
    return word.length;
}

/*=== Drag and drop start ===*/

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
}

// allow to dragover
const onDragOver = event => {
    event.preventDefault();
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
    dropZone.appendChild(draggableElement);

    var guessLetter = draggableElement.innerText;

    var indexArray = guessChecker(wordToGuess, guessLetter);

    replaceBlanks(indexArray, guessLetter);

    console.log(guessLetter);
    // console.log(wordToGuess);
    // console.log(guessChecker(wordToGuess, guessLetter));

    event.dataTransfer.clearData();
}

/*=== Drag and drop end ===*/

// Check whether word has the guessed letter
const guessChecker = (word, guess) => {

    if(word.includes(guess)) {
        return guessLetterIndexes(word, guess);
    } else {
        // TODO: function when a guess went wrong
    }
}

// Get the indexes which contains the guessed letter
const guessLetterIndexes = (word, guess) => {
    var indices = [];

    for(let i=0; i < word.length; i++) {
        if(word[i] === guess) {
            indices.push(i);
        }
    }

    return indices;
}

// replace guess letters with blanks
const replaceBlanks = (indexArray, guess) => {
    for(let i=0; i < indexArray.length; i++) {
        const replace = document.querySelector(`#blank-${indexArray[i]}`);
        var stringToReplace = replace.innerText;
        var resultToReplace = stringToReplace.replace("__", guess);
        replace.innerText = resultToReplace;
        console.log("replaceBlanks is running");
        console.log(replace.innerText);
    }
}

