import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const { addNote } = useContext(noteContext);
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""});
    props.showAlert("Added succesfully", "success")
  };
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form>
        <h3>Add a note</h3>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="name"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value={note.title}
            onChange={onchange}
            minLength={5}
            required
            // onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            rows="4"
            type="name"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onchange}
            minLength={5}
            required
            // onChange={(e) => setNote({ ...note, description: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="name"
            className="form-control w-25"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onchange}
            minLength={5}
            // onChange={(e) => setNote({ ...note, tag: e.target.value })}
          />
        </div>
        <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add note
        </button>
      </form>
    </>
  );
};

export default AddNote;
