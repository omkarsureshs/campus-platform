import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Notes() {

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
const [content, setContent] = useState("");

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

      setNotes(response.data.notes);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const addNote = async (e) => {

  e.preventDefault();

  try {

    const token = localStorage.getItem("token");

    const response = await axios.post(
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

    setNotes([response.data.note, ...notes]);

    setTitle("");
    setContent("");

  } catch (error) {

    console.error(error);

  }

};

  if (loading) {
    return (
      <div className="text-white text-xl">
        Loading notes...
      </div>
    );
  }

  return (

    <div>

      {/* Heading */}
      <div className="mb-10">

        <h1 className="text-5xl font-bold font-['Space_Grotesk']">
          Notes
        </h1>

        <p className="text-gray-500 mt-2">
          Your personal knowledge space
        </p>

      </div>

      {/* Empty State */}
      {notes.length === 0 && (

        <div className="border border-white/10 rounded-3xl p-10 text-center">

          <h2 className="text-2xl font-semibold mb-3">
            No notes yet
          </h2>

          <p className="text-gray-500">
            Start creating your first note.
          </p>

        </div>

      )}
        <form
  onSubmit={addNote}
  className="
    border border-white/10
    rounded-3xl
    p-6
    mb-10
    bg-white/[0.02]
  "
>

  <h2 className="text-2xl font-semibold mb-6">
    Create Note
  </h2>

  <div className="space-y-4">

    <input
      type="text"
      placeholder="Note title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="
        w-full
        bg-black
        border border-white/10
        rounded-2xl
        px-4
        py-3
        outline-none
        focus:border-white/30
        transition
      "
    />

    <textarea
      placeholder="Write something..."
      value={content}
      onChange={(e) => setContent(e.target.value)}
      rows="5"
      className="
        w-full
        bg-black
        border border-white/10
        rounded-2xl
        px-4
        py-3
        outline-none
        focus:border-white/30
        transition
        resize-none
      "
    />

    <button
      type="submit"
      className="
        bg-white
        text-black
        px-6
        py-3
        rounded-2xl
        font-medium
        hover:opacity-80
        transition
      "
    >
      Create Note
    </button>

  </div>

</form>
      {/* Notes Grid */}
      <div className="grid grid-cols-3 gap-6">

        {notes.map((note, index) => (

          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="
              border border-white/10
              bg-white/[0.02]
              rounded-3xl
              p-6
              hover:bg-white/[0.04]
              transition
            "
          >

            <h2 className="text-2xl font-semibold mb-3">
              {note.title}
            </h2>

            <p className="text-gray-400 leading-relaxed">
              {note.content}
            </p>

          </motion.div>

        ))}

      </div>

    </div>
  );
}

export default Notes;