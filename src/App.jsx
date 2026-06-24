import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const addAssignment = () => {
    if (title.trim() === "" || dueDate.trim() === "") return;
    const newAssignment = {
      id: Date.now(),
      title,
      dueDate,
      submitted: false,
    };
    setAssignments([...assignments, newAssignment]);
    setTitle("");
    setDueDate("");
  };

  const toggleSubmission = (id) => {
    setAssignments(
      assignments.map((a) =>
        a.id === id ? { ...a, submitted: !a.submitted } : a
      )
    );
  };

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  return (
    <div className="tracker">
      <h1>College Assistant - Assignment Tracker</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addAssignment}>Add</button>
      </div>

      <ul className="list">
        {assignments.map((a) => (
          <li key={a.id} className={a.submitted ? "submitted" : ""}>
            <div>
              <strong>{a.title}</strong> <span>(Due: {a.dueDate})</span>
            </div>
            <div className="actions">
              <button onClick={() => toggleSubmission(a.id)}>
                {a.submitted ? "Unsubmit" : "Mark Submitted"}
              </button>
              <button className="delete" onClick={() => deleteAssignment(a.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}