import { useEffect, useState } from "react";

import NoteInput from "./components/NoteInput";
import Body from "./layout/Body";
import Header from "./layout/Header";
import { getInitialData, showFormattedDate } from "./utils";
import NoteList from "./components/NoteList";

function App() {
  const [activeNotes, setActiveNotes] = useState([]);
  const [archiveNotes, setArchiveNotes] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const initData = await getInitialData();
      setActiveNotes(initData);
    };
    fetch();
  }, []);

  const activeNotesSearch = activeNotes.filter((item) => {
    return item.title.toLowerCase().includes(query.toLowerCase());
  });

  const archiveNotesSearch = archiveNotes.filter((item) => {
    return item.title.toLowerCase().includes(query.toLowerCase());
  });

  const searchHandler = (e) => {
    setQuery(e.target.value);
  };

  const deleteNote = (id) => {
    const newActiveNotes = activeNotes.filter((note) => note.id !== id);
    const newArchiveNotes = archiveNotes.filter((note) => note.id !== id);
    setActiveNotes(newActiveNotes);
    setArchiveNotes(newArchiveNotes);
  };

  const archiveNote = (id) => {
    const noteToArchive = activeNotes.find((note) => note.id === id);
    const noteToUnarchive = archiveNotes.find((note) => note.id === id);

    if (noteToArchive) {
      noteToArchive.archive = true;
      const newActiveNotes = activeNotes.filter((note) => note.id !== id);
      setActiveNotes(newActiveNotes);
      setArchiveNotes([...archiveNotes, noteToArchive]);
    } else if (noteToUnarchive) {
      noteToUnarchive.archive = false;
      const newArchiveNotes = archiveNotes.filter((note) => note.id !== id);
      setArchiveNotes(newArchiveNotes);
      setActiveNotes([...activeNotes, noteToUnarchive]);
    }
  };

  return (
    <>
      <Header searchHandler={searchHandler} />
      <Body>
        <NoteInput activeNotes={activeNotes} setActiveNotes={setActiveNotes} />
        <NoteList notes={activeNotesSearch} text={"Active Notes"} deleteHandler={deleteNote} archiveHandler={archiveNote} />
        <NoteList notes={archiveNotesSearch} text={"Archive Notes"} deleteHandler={deleteNote} archiveHandler={archiveNote} />
      </Body>
    </>
  );
}

export default App;
