import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard({ user }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [notes, setNotes] = useState([]);

  const token = localStorage.getItem("token");

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/notes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes(response.data.notes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreateNote = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/notes",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setContent("");

      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <h3>Welcome {user.email}</h3>

      <hr />

      <h2>Create Note</h2>

      <form onSubmit={handleCreateNote}>
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <textarea
          placeholder="Note content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Create Note</button>
      </form>

      <hr />

      <h2>Your Notes</h2>

      {notes.map((note) => (
        <div
          key={note.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{note.title}</h3>

          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;