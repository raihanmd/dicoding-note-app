import React from "react";

import NoteItem from "./NoteItem";

export default function NoteList({ notes, text, deleteHandler, archiveHandler }) {
  if (notes.length === 0)
    return (
      <>
        <h2>{text}</h2>
        <p className="notes-list__empty-message">Note not found.</p>
      </>
    );

  return (
    <>
      <h2>{text}</h2>
      <div className="notes-list">
        {notes?.map((note) => (
          <NoteItem note={note} key={note?.id} deleteHandler={deleteHandler} archiveHandler={archiveHandler} />
        ))}
      </div>
    </>
  );
}
