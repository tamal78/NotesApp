const addTitle = document.getElementById("addTitle");
const addText = document.getElementById("addText");
const addNoteButton = document.getElementById("addNote");
const notesDiv = document.getElementById("notes");
const delnotesDiv = document.getElementById("deletednotes");
const arcnotesDiv = document.getElementById("archivednotes");
const mynotesbtn = document.getElementById("mynotes");
const archnotesbtn = document.getElementById("archnotes");
const delnotesbtn = document.getElementById("delnotes");
const saveButton = document.getElementById("save");

showNotes();
function addNotes() {
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notes = [];
  } else {
    notes = JSON.parse(notes);
  }

  if (addText.value == "") {
    alert("Add your note");
    return;
  }

  const noteObj = {
    title: addTitle.value,
    text: addText.value,
  };
  addTitle.value = "";
  addText.value = "";
  notes.push(noteObj);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function showNotes() {
  let notesHTML = "";
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    return;
  } else {
    notes = JSON.parse(notes);
  }
  for (let i = 0; i < notes.length; i++) {
    notesHTML += `<div class="note">
                    <button class="editNote" id=${i} onclick="editNote(${i})">Edit</button>
                    <button class="deleteNote" id=${i} onclick="deleteNote(${i})">Delete</button>
                    <button class="archiveNote" id=${i} onclick="archiveNote(${i})">Archive</button>
                    <span class="title">${
                      notes[i].title === "" ? "Note" : notes[i].title
                    }</span>
                    <div class="text">${notes[i].text}</div>
                </div>
        `;
  }
  notesDiv.innerHTML = notesHTML;
  delnotesDiv.innerHTML = "";
  arcnotesDiv.innerHTML = "";
}

function editNote(ind) {
  saveButton.style.display = "inline";
  let notes = localStorage.getItem("notes");
  notes = JSON.parse(notes);
  addTitle.value = `${notes[ind].title}`;
  addText.value = `${notes[ind].text}`;
  addText.setSelectionRange(addText.value.length, addText.value.length);
  addText.focus();
  saveButton.addEventListener("click", function () {
    notes[ind].title = addTitle.value;
    notes[ind].text = addText.value;
    localStorage.setItem("notes", JSON.stringify(notes));
    saveButton.style.display = "none";
    addTitle.value = "";
    addText.value = "";
    showNotes();
  });
}

function deleteNote(ind) {
  let notes = localStorage.getItem("notes");
  let delnotes = localStorage.getItem("delnotes");
  if (notes === null) {
    return;
  } else {
    notes = JSON.parse(notes);
  }
  if (delnotes === null) {
    delnotes = [];
  } else {
    delnotes = JSON.parse(delnotes);
  }
  delnotes.push(notes[ind]);
  localStorage.setItem("delnotes", JSON.stringify(delnotes));
  notes.splice(ind, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function deleteArc(ind) {
  let arcnotes = localStorage.getItem("arcnotes");
  let delnotes = localStorage.getItem("delnotes");
  if (arcnotes === null) {
    return;
  } else {
    arcnotes = JSON.parse(arcnotes);
  }
  if (delnotes === null) {
    delnotes = [];
  } else {
    delnotes = JSON.parse(delnotes);
  }
  delnotes.push(arcnotes[ind]);
  localStorage.setItem("delnotes", JSON.stringify(delnotes));
  arcnotes.splice(ind, 1);
  localStorage.setItem("arcnotes", JSON.stringify(arcnotes));
  showarcnotes();
}

function archiveNote(ind) {
  let notes = localStorage.getItem("notes");
  let arcnotes = localStorage.getItem("arcnotes");
  if (notes === null) {
    return;
  } else {
    notes = JSON.parse(notes);
  }
  if (arcnotes === null) {
    arcnotes = [];
  } else {
    arcnotes = JSON.parse(arcnotes);
  }
  arcnotes.push(notes[ind]);
  localStorage.setItem("arcnotes", JSON.stringify(arcnotes));
  notes.splice(ind, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function perDelete(ind) {
  let notes = localStorage.getItem("delnotes");
  if (notes === null) {
    return;
  } else {
    notes = JSON.parse(notes);
  }
  notes.splice(ind, 1);
  localStorage.setItem("delnotes", JSON.stringify(notes));
  showdelNotes();
}

function showdelNotes() {
  let notesHTML = "";
  let delnotes = localStorage.getItem("delnotes");
  if (delnotes === null) {
    return;
  } else {
    delnotes = JSON.parse(delnotes);
  }
  for (let i = 0; i < delnotes.length; i++) {
    notesHTML += `<div class="note">
                    <button class="deleteNote" id=${i} onclick="perDelete(${i})">Permanently Delete</button>
                    <span class="title">${
                      delnotes[i].title === "" ? "Note" : delnotes[i].title
                    }</span>
                    <div class="text">${delnotes[i].text}</div>
                </div>
        `;
  }
  delnotesDiv.innerHTML = notesHTML;
  notesDiv.innerHTML = "";
  arcnotesDiv.innerHTML = "";
}

function showarcnotes() {
  let notesHTML = "";
  let arcnotes = localStorage.getItem("arcnotes");
  if (arcnotes === null) {
    return;
  } else {
    arcnotes = JSON.parse(arcnotes);
  }
  for (let i = 0; i < arcnotes.length; i++) {
    notesHTML += `<div class="note">
                    <button class="deleteNote" id=${i} onclick="deleteArc(${i})">Move to Delete</button>
                    <span class="title">${
                      arcnotes[i].title === "" ? "Note" : arcnotes[i].title
                    }</span>
                    <div class="text">${arcnotes[i].text}</div>
                </div>
        `;
  }
  arcnotesDiv.innerHTML = notesHTML;
  notesDiv.innerHTML = "";
  delnotesDiv.innerHTML = "";
}

addNoteButton.addEventListener("click", addNotes);
mynotesbtn.addEventListener("click", showNotes);
delnotesbtn.addEventListener("click", showdelNotes);
archnotesbtn.addEventListener("click", showarcnotes);
