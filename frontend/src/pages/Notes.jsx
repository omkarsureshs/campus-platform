import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AnimatePresence } from "framer-motion";

function Notes() {

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const [editingId, setEditingId] = useState(null);
const [submitting, setSubmitting] = useState(false);
const [searchQuery, setSearchQuery] = useState("");
const [tags, setTags] = useState("");
const [selectedTag, setSelectedTag] =
  useState("");
  const [selectedNote, setSelectedNote] =
  useState(null);
  const [sortBy, setSortBy] =
  useState("pinned");
  const [zoom, setZoom] =
  useState(100);

  useEffect(() => {

    fetchNotes();

  }, []);

  const fetchNotes = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://campus-platform-hp24.onrender.com/api/notes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes(response.data.notes);

    } catch (error) {

      console.error(error);
      toast.error("Something went wrong");

    } finally {

      setLoading(false);

    }

  };

 const addNote = async (e) => {

  e.preventDefault();
setSubmitting(true);
  try {

    const token = localStorage.getItem("token");


    const tagsArray = tags
  .split(",")
  .map((tag) => tag.trim())
  .filter((tag) => tag !== "");

    if (editingId) {

      const response = await axios.put(
        `https://campus-platform-hp24.onrender.com/api/notes/${editingId}`,
        {
          title,
          content,
          tags: tagsArray,
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
      toast.success("Note updated");

    } else {

      const response = await axios.post(
        "https://campus-platform-hp24.onrender.com/api/notes",
        {
          title,
          content,
          tags: tagsArray,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes([response.data.note, ...notes]);
      toast.success("Note created");

    }

    setTitle("");
    setContent("");
    setTags("");

  } catch (error) {

    console.error(error);
    toast.error("Something went wrong");
  }
  finally {

  setSubmitting(false);

}

};

const deleteNote = async (id) => {

  try {

    const token = localStorage.getItem("token");

    await axios.delete(
      `https://campus-platform-hp24.onrender.com/api/notes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNotes(notes.filter((note) => note.id !== id));
    toast.success("Note deleted");

  } catch (error) {

    console.error(error);
    toast.error("Something went wrong");

  }

};

const togglePin = async (id) => {

  try {

    const token = localStorage.getItem("token");

    const response = await axios.patch(
      `https://campus-platform-hp24.onrender.com/api/notes/${id}/pin`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNotes(
      notes.map((note) =>
        note.id === id
          ? response.data.note
          : note
      )
    );

    toast.success("Pin updated");

  } catch (error) {

    console.error(error);
    toast.error("Something went wrong");

  }

};

const editNote = (note) => {

  setTitle(note.title);
  setContent(note.content);
setTags(note.tags.join(", "));
  setEditingId(note.id);

};

const filteredNotes = [...notes]
  .filter((note) => {

    const query =
      searchQuery.toLowerCase();

    const matchesSearch =
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query) ||
      note.tags?.some((tag) =>
        tag.toLowerCase().includes(query)
      );

    const matchesTag =
      selectedTag === "" ||
      note.tags?.includes(selectedTag);

    return (
      matchesSearch &&
      matchesTag
    );

  })
  .sort((a, b) => {

    switch (sortBy) {

      case "newest":
        return (
          new Date(b.created_at) -
          new Date(a.created_at)
        );

      case "oldest":
        return (
          new Date(a.created_at) -
          new Date(b.created_at)
        );

      case "az":
        return a.title.localeCompare(
          b.title
        );

      case "pinned":
      default:

        if (a.pinned === b.pinned)
          return (
            new Date(b.created_at) -
            new Date(a.created_at)
          );

        return a.pinned ? -1 : 1;

    }

  });

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
    hover:border-white/20
hover:bg-white/[0.04]
transition-all
duration-300
  "
>
<div className="text-6xl mb-6">
  🧠
</div>
          <h2 className="text-3xl font-semibold mb-4">
  Your knowledge hub starts here ✨
</h2>

         <p className="text-gray-500 max-w-lg mx-auto leading-relaxed text-lg">
  Capture ideas, organize thoughts, and build your personal
  second brain with beautifully structured notes.
</p>

        </motion.div>

      )}

<div className="mb-8 space-y-4">

  <input
    type="text"
    placeholder="Search notes..."
    value={searchQuery}
    onChange={(e) =>
      setSearchQuery(
        e.target.value
      )
    }
    className="
      w-full
      bg-white/[0.03]
      border border-white/10
      rounded-2xl
      px-5
      py-4
      outline-none
      focus:border-white/20
      focus:bg-white/[0.05]
      transition-all
      duration-300
    "
  />

  <div className="flex flex-wrap gap-2">

    <button
      onClick={() =>
        setSelectedTag("")
      }
      className={`
        px-3 py-1
        rounded-full
        text-sm

        ${
          selectedTag === ""
            ? "bg-white text-black"
            : "bg-white/5 text-gray-400"
        }
      `}
    >
      All
    </button>

    {[...new Set(
      notes.flatMap(
        (note) =>
          note.tags || []
      )
    )].map((tag) => (

      <button
        key={tag}
        onClick={() =>
          setSelectedTag(tag)
        }
        className={`
          px-3 py-1
          rounded-full
          text-sm

          ${
            selectedTag === tag
              ? "bg-white text-black"
              : "bg-white/5 text-gray-400"
          }
        `}
      >
        #{tag}
      </button>

    ))}

  </div>

  <select
  value={sortBy}
  onChange={(e) =>
    setSortBy(e.target.value)
  }
  className="
    bg-white/[0.03]
    border
    border-white/10
    rounded-xl
    px-4
    py-2
    text-sm
    text-white
  "
>

  <option
    value="pinned"
    className="text-black"
  >
    Pinned First
  </option>

  <option
    value="newest"
    className="text-black"
  >
    Newest First
  </option>

  <option
    value="oldest"
    className="text-black"
  >
    Oldest First
  </option>

  <option
    value="az"
    className="text-black"
  >
    A-Z
  </option>

</select>

</div>
<AnimatePresence>

      {searchQuery.trim() === "" && (
        <motion.form
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.25 }}

        
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

  <div className="grid lg:grid-cols-2 gap-6">

  {/* Editor Side */}
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
    <input
  type="text"
  placeholder="Tags (comma separated)"
  value={tags}
  onChange={(e) => setTags(e.target.value)}
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
      placeholder="Write your markdown here..."
      value={content}
      onChange={(e) => setContent(e.target.value)}
      rows="14"
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

  </div>

  {/* Preview Side */}
  <div
    className="
      border border-white/10
      rounded-2xl
      bg-black/40
      p-6
      overflow-auto
      min-h-[350px]
    "
  >

    <p className="text-sm text-gray-500 mb-4">
      Live Preview
    </p>

    <div
      className="
        prose
        prose-invert
        max-w-none

        prose-headings:text-white
        prose-p:text-gray-300
        prose-strong:text-white
        prose-em:text-gray-200
        prose-code:text-blue-300
        prose-li:text-gray-300

        prose-pre:bg-black
        prose-pre:border
        prose-pre:border-white/10
        prose-pre:rounded-2xl
      "
    >

      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content || "Start typing markdown..."}
      </ReactMarkdown>

    </div>

  </div>

</div>
<button
  type="submit"
  disabled={submitting}
  className="
    mt-6
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
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:scale-100
  "
>
  {submitting
    ? "Saving..."
    : editingId
      ? "Update Note"
      : "Create Note"}
</button>

</motion.form>
)}
</AnimatePresence>
{loading ? (

  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

    {[...Array(6)].map((_, index) => (

      <div
        key={index}
        className="
          border border-white/10
          bg-white/[0.03]
          rounded-3xl
          p-6
          animate-pulse
          shadow-[0_0_40px_rgba(255,255,255,0.02)]
        "
      >

        <div className="h-8 bg-white/10 rounded-xl w-2/3 mb-6"></div>

        <div className="space-y-3">

          <div className="h-4 bg-white/10 rounded"></div>
          <div className="h-4 bg-white/10 rounded"></div>
          <div className="h-4 bg-white/10 rounded w-5/6"></div>

        </div>

        <div className="h-3 bg-white/10 rounded w-1/4 mt-8"></div>

      </div>

    ))}

  </div>

) : (

  <>
  
    {filteredNotes.length === 0 ? (

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          border border-white/10
          bg-white/[0.03]
          rounded-3xl
          p-12
          text-center
          mt-8
        "
      >

        <div className="text-5xl mb-5">
          🔍
        </div>

        <h2 className="text-2xl font-semibold mb-3">
          No matching notes found
        </h2>

        <p className="text-gray-500">
          Try searching with different keywords.
        </p>

      </motion.div>

    ) : (

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

        {filteredNotes.map((note, index) => (

          <NoteCard
            key={note.id}
            note={note}
            index={index}
            deleteNote={deleteNote}
            editNote={editNote}
            togglePin={togglePin}
            openNote={(note) => {

  setSelectedNote(note);
  setZoom(100);

}}
          />

        ))}

            </div>

    )}

  </>

)}
<AnimatePresence>

  {selectedNote && (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() =>
        setSelectedNote(null)
      }
      className="
        fixed
        inset-0
        z-[999]
        bg-black/80
        backdrop-blur-md
        flex
        items-center
        justify-center
        p-6
      "
    >

      <motion.div
        initial={{
          scale: 0.95,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0.95,
          opacity: 0,
        }}
        onClick={(e) =>
          e.stopPropagation()
        }
        className="
          w-full
          max-w-5xl
          max-h-[90vh]
          overflow-y-auto
          rounded-3xl
          border
          border-white/10
          bg-[#0b0b0b]
          p-10
        "
      >

        <h1
          className="
            text-5xl
            font-bold
            mb-8
            font-['Space_Grotesk']
          "
        >
          {selectedNote.title}
        </h1>

        <div
          className="
            prose
            prose-invert
            max-w-none
          "
        >

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
          >
            {selectedNote.content}
          </ReactMarkdown>

        </div>

      </motion.div>

    </motion.div>

  )}

</AnimatePresence>
    </div>

  );
}
const downloadNote = () => {

  if (!selectedNote) return;

  const blob = new Blob(
    [selectedNote.content],
    {
      type: "text/markdown",
    }
  );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    `${selectedNote.title}.md`;

  link.click();

  window.URL.revokeObjectURL(url);

};

const printNote = () => {

  window.print();

};

const copyNote = async () => {

  try {

    await navigator.clipboard.writeText(
      selectedNote.content
    );

    toast.success(
      "Copied to clipboard" /*Copy feature*/
    );

  } catch {

    toast.error(
      "Copy failed"
    );

  }

};

export default Notes;