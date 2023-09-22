import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitems = (props) => {
  const { deleteNote } = useContext(noteContext);
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.note.title}</h5>
          <p className="card-text">
            {props.note.description} <br />
            <p className="mt-3 text-sm">{props.note.tag}</p>
          </p>
          <i
            className="fa-regular fa-pen-to-square"
            onClick={() => {
              props.updateNote(props.note);
            }}
          ></i>
          <i
            className="fa-solid fa-trash-can  mx-3"
            onClick={() => {
              deleteNote(props.note._id);
              props.showAlert("Deleted succesfully", "success")
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitems;
