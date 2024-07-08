class Note {
  constructor(note, id, priority = "normal") {
    this.id = id;
    this.note = note;
    this.priority = priority;
  }
}

class NoteEditor {
  constructor() {
    this.Notes = JSON.parse(localStorage.getItem("Notes")) || [];
    this.loadNotes();
  }

  addNote(note) {
    const id = this.Notes.length ? this.Notes[this.Notes.length - 1].id + 1 : 1;
    const tarea = new Note(note, id);
    this.Notes.push(tarea);
    this.guardaNotes();
    this.loadNotes();
  }

  guardaNotes() {
    localStorage.setItem("Notes", JSON.stringify(this.Notes));
  }

  loadNotes() {
    const $lista = document.getElementById("task-list");
    $lista.innerHTML = "";
    this.Notes.forEach((note) => {
      const item = document.createElement("li");
      item.textContent = note.note;
  
      // Establecer color basado en la prioridad
      if (note.priority === "high") {
        item.style.backgroundColor = "yellow";
      } else {
        item.style.backgroundColor = "lightgreen";
      }
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        this.deleteNote(note.id);
      });
  
      const editButton = document.createElement("button");
      editButton.textContent = "Editar";
      editButton.addEventListener("click", (e) => {
        e.stopPropagation();
        this.editNote(note.id);
      });
  
      // Cambiar prioridad al hacer clic en el elemento
      item.addEventListener("click", () => {
        if (note.priority === "normal") {
          note.priority = "high";
          item.style.backgroundColor = "yellow";
        } else {
          note.priority = "normal";
          item.style.backgroundColor = "lightgreen";
        }
        this.guardaNotes(); // Guardar los cambios de prioridad en localStorage
      });
  
      item.appendChild(deleteButton);
      item.appendChild(editButton);
      $lista.appendChild(item);
    });
  }

  editNote(id) {
    let newNote = this.Notes.find((note) => note.id === id);
    if (newNote) {
      newNote.note = prompt("cual es la nueva nota?");
    } else {
      console.error("dsfdsfsd");
    }
    this.guardaNotes();
    this.loadNotes();
  }

  deleteNote(id) {
    this.Notes = this.Notes.filter((note) => note.id !== id);
    this.guardaNotes();
    this.loadNotes();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const noteManager = new NoteEditor();

  document.getElementById("add-task").addEventListener("click", () => {
    const newNote = document.getElementById("new-task").value;
    if (newNote) {
      noteManager.addNote(newNote);
      document.getElementById("new-task").value = "";
    }
  });
});
