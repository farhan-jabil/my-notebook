import React, { useState, useContext, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitems from "./Noteitems";
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, fetchNote, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchNote();
    }
    else{
      navigate("/login")
    }
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (note) => {
    ref.current.click();
    setNote({
      id: note._id,
      etitle: note.title,
      edescription: note.description,
      etag: note.tag,
    });
    // props.showAlert("Updated Succesfully", "success")
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Updated succesfully", "success")
  };

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* modal button for edit */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                ref={refClose}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <h3>Edit note</h3>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="name"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onchange}
                    value={note.etitle}
                    minLength={5}
                    required
                    // onChange={(e) => setNote({ ...note, title: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    rows="4"
                    type="name"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onchange}
                    value={note.edescription}
                    minLength={5}
                    required
                    // onChange={(e) => setNote({ ...note, description: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="name"
                    className="form-control w-25"
                    id="etag"
                    name="etag"
                    onChange={onchange}
                    value={note.etag}
                    minLength={5}
                    // onChange={(e) => setNote({ ...note, tag: e.target.value })}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={note.etitle.length<3 || note.edescription.length<5}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <h3 className="mt-3">Your Notes</h3>
      {notes.length === 0 ? (
        "No Notes"
      ) : (
        <div className="row">
          {notes.map((x) => (
            <Noteitems note={x} key={x._id} showAlert={props.showAlert} updateNote={updateNote}></Noteitems>
          ))}
        </div>
      )}
    </>
  );
};

export default Notes;
