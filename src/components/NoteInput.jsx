import React, { useRef, useState } from "react";
import { generateId } from "../utils/generateId";

export default function NoteInput({ activeNotes, setActiveNotes }) {
  const [limit, setLimit] = useState(50);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);

  const addNoteHandler = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();
    const id = generateId();
    const newNote = {
      id,
      title: titleRef.current.value,
      body: bodyRef.current.value,
      archived: false,
      createdAt: currentDate,
    };
    setActiveNotes([...activeNotes, newNote]);
    titleRef.current.value = null;
    bodyRef.current.value = null;
    setLimit(50);
  };

  return (
    <div className="note-input">
      <h2 className="note-input__title">Add Note</h2>
      <form className="note-input__body" onSubmit={addNoteHandler}>
        <p className="note-input__title__char-limit">Limit: {limit}</p>
        <input
          ref={titleRef}
          type="text"
          placeholder="Some epic Title..."
          onChange={(e) => {
            if (e.target.value.length > 50) {
              return;
            }
            setLimit(50 - e.target.value.length);
          }}
          maxLength={50}
          required
        />
        <textarea ref={bodyRef} type="text" placeholder="Your notes goes here..." required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
