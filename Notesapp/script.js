// Create Note

function createNote() {

    const noteTitle = document.getElementById('note-title').value;
    const noteText = document.getElementById('note-text').value;
   
    if (noteText.trim() && noteTitle.trim() !== '') {
        const note = {
        id: new Date().getTime(),
        title: noteTitle,
        text: noteText
        };

        const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
        existingNotes.push(note);

        localStorage.setItem('notes', JSON.stringify(existingNotes));

        document.getElementById('note-title').value = '';
        document.getElementById('note-text').value = '';
        
        displayNotes();
    }
}


// Display Notes
 

function displayNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach(note => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <span id="title">${note.title}</span>
        <span>${note.text}</span>
        <div id="noteBtns-container">
            <button id="editBtn" onclick="editNote(${note.id})"><i class="fa-solid fa-pen"></i></button>
            <button id="deleteBtn" onclick="deleteNote(${note.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
        notesList.appendChild(listItem);
        
    });
}

//  * Edit Note

// function strikethroughNote(noteId) {
// const notes = document.querySelector("#notes-list").addEventListener("dblclick", () => { 
//     const notes = JSON.parse(localStorage.getItem('notes')) || [];
//     const noteToEdit = notes.find(note => note.id == noteId);
//     const noteText = document.getElementById('note-text').value;
//     noteText.getAttribute(textattribute.strikethrough);
//     })
// }


function editNote(noteId) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteToEdit = notes.find(note => note.id == noteId);
    const noteText = noteToEdit ? noteToEdit.text : '';
    const noteTitle = noteToEdit ? noteToEdit.title : '';
    const editingPopup = document.createElement("div");
    
    editingPopup.innerHTML = `
    <div id="editing-container" data-note-id="${noteId}">
        <h1>Edit Note</h1>
        <textarea id="note-title" placeholder="Title">${noteTitle}</textarea>
        <textarea id="note-text" placeholder="Note description">${noteText}</textarea>
        <div id="btn-container">
            <button id="submitBtn" onclick="updateNote()">Done</button>
            <button id="closeBtn" onclick="closeEditPopup()">Cancel</button>
        </div>
    </div>
    `;

    document.body.appendChild(editingPopup);
}

function closeEditPopup() {
    const editingPopup = document.getElementById("editing-container");

    if(editingPopup) {
        editingPopup.remove();
    }
}

// Update Note

function updateNote() {
    const noteTitle = document.getElementById('note-title').value.trim();
    const noteText = document.getElementById('note-text').value.trim();
    const editingPopup = document.getElementById('editing-container');

    if (noteText && noteTitle !== '') {
        const noteId = editingPopup.getAttribute('data-note-id');
        let notes = JSON.parse(localStorage.getItem('notes')) || [];

        // Find the note to update
        const updatedNotes = notes.map(note => {
            if (note.id == noteId) {
                return { id: note.id, title: noteTitle, text: noteText };
            }
            return note;
        });

        // Update the notes in local storage
        localStorage.setItem('notes', JSON.stringify(updatedNotes));

        // Close the editing popup
        editingPopup.remove();

        // Refresh the displayed notes
        displayNotes();
    }
}


//  Delete Note 
 
function deleteNote(noteId) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.id !== noteId);

    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

displayNotes();