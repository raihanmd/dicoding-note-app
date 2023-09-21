import React from "react";

export default function Header({ searchHandler }) {
  return (
    <div className="note-app__header">
      <h1>Raihanmd Note</h1>
      <form>
        <input type="text" placeholder="Search by title or body or date..." onChange={searchHandler} />
      </form>
    </div>
  );
}
