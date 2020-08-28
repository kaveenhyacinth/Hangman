const TeamOne = document.querySelector("#team-1");
const TeamTwo = document.querySelector("#team-2");
const dropzoneDiv = document.querySelector("#dropzone");
const blanksContainer = document.querySelector("#blanks");

var isFirstTime = true;
var isTeamOne = true;

var wordToGuess;
var numberOfBlanks;

window.onload = () => {

    var Team1 = prompt("Enter Team 1 Name");
    var Team2 = prompt("Enter Team 2 Name");

    if(isTeamOne) {
        wordToGuess = prompt(`Team ${Team1.toUpperCase()} please enter a secret word to guess`);
        isTeamOne = !isTeamOne;
    }

    TeamOne.innerText = Team1.toUpperCase();
    TeamTwo.innerText = Team2.toUpperCase();

    numberOfBlanks = countBlanks(wordToGuess);

    for(let i=0; i < numberOfBlanks; i++) {
        blanksContainer.innerHTML += "<div class='blank'>__</div>";
    }

    // debug wordToGuess and round status
    console.log(wordToGuess.toUpperCase());
    console.log(isTeamOne);
    console.log(countBlanks(wordToGuess));
}

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

    if(isFirstTime === true) {
        // clear dropzone default text
        dropzoneDiv.innerText = "";
        isFirstTime = false;
    }
    
    
    // save grabbed id from the datatranser
    const id = event.dataTransfer.getData('text');

    const draggableElement = document.getElementById(id);
    const dropZone = event.target;

    dropZone.appendChild(draggableElement);

    event.dataTransfer.clearData();
}

/*=== Drag and drop end ===*/