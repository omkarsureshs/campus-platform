import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Notes() {

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const [editingId, setEditingId] = useState(null);

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

    if (editingId) {

      const response = await axios.put(
        `http://localhost:5000/api/notes/${editingId}`,
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

      setNotes(
        notes.map((note) =>
          note.id === editingId
            ? response.data.note
            : note
        )
      );

      setEditingId(null);

    } else {

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

    }

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

const deleteNote = async (id) => {

  try {

    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/notes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNotes(notes.filter((note) => note.id !== id));

  } catch (error) {

    console.error(error);

  }

};

const editNote = (note) => {

  setTitle(note.title);
  setContent(note.content);

  setEditingId(note.id);

};

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

        <motion.div
  initial={{ opacity: 0, scale: 0.96 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.35 }}
  className="
    border border-white/10
    rounded-[32px]
    p-14
    text-center
    bg-white/[0.02]
    shadow-[0_0_50px_rgba(255,255,255,0.02)]
  "
>

          <h2 className="text-2xl font-semibold mb-3">
            No notes yet
          </h2>

          <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
            Start creating your first note.
          </p>

        </motion.div>

      )}
        <form
  onSubmit={addNote}
  className="
  border border-white/10
  bg-white/[0.03]
  rounded-3xl
  p-6
  hover:-translate-y-1
  hover:border-white/20
  hover:bg-white/[0.05]
  transition-all
  duration-300
  shadow-[0_0_40px_rgba(255,255,255,0.03)]
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
        focus:bg-white/[0.03]
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
        hover:scale-[1.02]
        active:scale-[0.98]
hover:opacity-90
        transition
      "
    >
      {editingId ? "Update Note" : "Create Note"}
    </button>

  </div>

</form>
      {/* Notes Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {notes.map((note, index) => (

         <motion.div
  key={note.id}
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.35,
    delay: index * 0.05,
  }}
  className="
    border border-white/10
    bg-white/[0.03]
    rounded-3xl
    p-6
    hover:-translate-y-1
    hover:border-white/20
    hover:bg-white/[0.05]
    transition-all
    duration-300
    shadow-[0_0_40px_rgba(255,255,255,0.03)]
  "
>

  <h2 className="text-3xl font-semibold mb-4 font-['Space_Grotesk']">
    {note.title}
  </h2>

  <p className="text-gray-400 leading-relaxed">
    {note.content}
  </p>

  <p className="text-xs text-gray-600 mt-6">
    {new Date(note.created_at).toLocaleDateString()}
  </p>
<button
  onClick={() => editNote(note)}
  className="
    mt-4
    mr-4
    text-sm
    text-blue-400
    hover:text-blue-300
    hover:translate-x-1
    transition
  "
>
  Edit
</button>
  <button
    onClick={() => deleteNote(note.id)}
    className="
      mt-4
      text-sm
      text-red-400
      hover:text-red-300
      hover:translate-x-1
      transition
    "
  >
    Delete
  </button>

</motion.div>

        ))}

      </div>

    </div>
  );
}

export default Notes;