// get targeted item's id to transfer
const onDragStart = event => {
    // grab id to transfer
    event
        .dataTransfer
        .setData('text/plain', event.target.id);

    event
        .currentTarget
        .style
        .backgroundColor = 'yellow';
}

// allow to dragover
const onDragOver = event => {
    event.preventDefault();
}

// pass and append the data in dropzone
const onDrop = event => {
    event.preventDefault();
    
    //save grabbed id from the datatranser
    const id = event.dataTransfer.getData('text');

    const draggableElement = document.getElementById(id);
    const dropZone = event.target;

    dropZone.appendChild(draggableElement);

    event.dataTransfer.clearData();
}
