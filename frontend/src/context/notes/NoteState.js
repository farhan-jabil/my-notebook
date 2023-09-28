import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "my-notebook-backend-beryl.vercel.app"
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  // Fetch Note
  const fetchNote = async () => {

    //API CALL
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setNotes(json)
  }

  // Add Note
  const addNote = async (title, description, tag) => {

    //API CALL
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}),
    });
    const note = await response.json();
    setNotes([...notes, note])
  }

  // Delete Note
  const deleteNote = async (id) => {

    //API CALL
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = response.json();

    //Logic for delete
    const newNotes = notes.filter((note)=>{return id !== note._id});
    setNotes(newNotes);
  }

  // Update Note
  const editNote = async (id, title, description, tag) => {

    //API CALL
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    console.log(json)
  
    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic for edit
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }
  return (
    <NoteContext.Provider value={{ notes, fetchNote , addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState; // Export NoteContext along with NoteState
