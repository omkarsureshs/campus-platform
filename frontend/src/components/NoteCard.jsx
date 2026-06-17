import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function NoteCard({
  note,
  index,
  deleteNote,
  editNote,
  togglePin,
}) {

  return (

    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
      }}
      className={`
  rounded-3xl
  p-6
  transition-all
  duration-300
  hover:-translate-y-1

  ${
    note.pinned
      ? `
        border border-yellow-500/30
        bg-yellow-500/[0.05]
        shadow-[0_0_50px_rgba(234,179,8,0.12)]
      `
      : `
        border border-white/10
        bg-white/[0.03]
        hover:border-white/20
        hover:bg-white/[0.05]
        shadow-[0_0_40px_rgba(255,255,255,0.03)]
      `
  }
`}
    >

      <h2 className="text-2xl md:text-3xl font-semibold mb-4 font-['Space_Grotesk']">
        {note.title}
      </h2>

      <div
  className="
    prose
    prose-invert
    max-w-none
    leading-relaxed

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
    {note.content}
  </ReactMarkdown>

<div className="flex flex-wrap gap-2 mt-5">

  {note.tags?.map((tag, index) => (

    <span
      key={index}
      className="
        px-3
        py-1
        text-xs
        rounded-full
        bg-white/10
        border border-white/10
        text-gray-300
        hover:bg-white/20
        transition
      "
    >
      #{tag}
    </span>

  ))}

</div>
</div>

      <p className="text-xs text-gray-600 mt-6">
        {new Date(note.created_at).toLocaleDateString()}
      </p>
<button
  onClick={() => togglePin(note.id)}
  className="
    mt-4
    mr-4
    text-sm
    text-yellow-400
    hover:text-yellow-300
    transition
  "
>
  {note.pinned ? "📌 Pinned" : "📍 Pin"}
</button>
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

  );

}

export default NoteCard;