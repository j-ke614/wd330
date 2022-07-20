let notes = [];
let selectedNote = null;
let isNewNote = true;
let lastId = 0;
let showSidebar = true;

window.addEventListener('DOMContentLoaded', event => {
  
  add.onclick = () => {
    reset();
    noteinput.focus();
  };
  
  save.onclick = event => {
    if (noteinput.value.length > 1) {
      let newNote = { id: lastId, text: noteinput.value };
      let li = document.createElement('li');
      li.className = `note-${newNote.id}`;
      deselectEls();
      li.classList.add('selected');
      li.innerHTML = newNote.text;
      notelist.appendChild(li);
      notes.push(newNote);
      selectedNote = newNote;
      isNewNote = false;
      lastId++;
      noteinput.focus();
    }
  };
  
  removenote.onclick = event => {
    if (selectedNote) {
      // remove note from array
      notes.splice(notes.indexOf(selectedNote), 1);
      // remove el from DOM
      let noteEl = document.getElementsByClassName(`note-${selectedNote.id}`)[0];
      noteEl.remove();
      reset();
    }
  };
  
  notelist.onclick = event => {
    if (event.target.tagName === 'LI') {
      let li = event.target;
      let index = li.className[li.className.length - 1];
      selectedNote = notes.filter(note => note.id === +index)[0];
      deselectEls();
      event.target.classList.add('selected');
      noteinput.value = selectedNote.text;
      noteinput.focus();
    }
  }
  
  toggle.onclick = event => {
    let container = document.getElementsByClassName('container')[0];
    showSidebar = !showSidebar;
    showSidebar ? container.classList.add('active') : container.classList.remove('active');
  };
  
});

function reset() {
  deselectEls();
  selectedNote = null;
  isNewNote = true;
  noteinput.value = '';
}

function deselectEls() {
  if (selectedNote) {
   let selectedElem = document.getElementsByClassName('selected')[0];
   selectedElem.classList.remove('selected');
  }
}
