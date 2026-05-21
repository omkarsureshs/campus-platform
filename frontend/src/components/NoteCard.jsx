import { motion } from "framer-motion";

function NoteCard({
  note,
  index,
  deleteNote,
  editNote,
}) {

  return (

    <motion.div
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

  );

}

export default NoteCard;