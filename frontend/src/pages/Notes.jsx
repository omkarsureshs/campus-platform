import { useEffect, useState } from "react";
import axios from "axios";

function Notes() {

  const [notes, setNotes] = useState([]);

  useEffect(() => {

    fetchNotes();

  }, []);

  const fetchNotes = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/notes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      setNotes(response.data.notes);

    } catch (error) {

      console.error(error);

    }

  };

  return (
    <div>

      <h1 className="text-5xl font-bold mb-10 font-['Space_Grotesk']">
        My Notes
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {notes.map((note) => (
          <div
            key={note.id}
            className="
              bg-white/5
              backdrop-blur-lg
              border border-white/10
              p-6
              rounded-3xl
            "
          >

            <h2 className="text-2xl font-bold mb-3">
              {note.title}
            </h2>

            <p className="text-gray-400">
              {note.content}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Notes;