import React from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";

export default function Home(props) {
  return (
    <>
      <AddNote showAlert={props.showAlert}></AddNote>
      <Notes showAlert={props.showAlert}></Notes>
    </>
  );
}
