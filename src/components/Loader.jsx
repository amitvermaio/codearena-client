import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0d0d0d] z-50">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <h1 className="text-3xl font-semibold text-white tracking-wide">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
            CodeArena
          </span>
        </h1>
        <motion.div
          className="mt-4 h-[3px] w-40 bg-gradient-to-r from-sky-400 via-emerald-400 to-sky-400 rounded-full mx-auto"
          animate={{ scaleX: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        />
        <p className="text-sm text-gray-400 mt-3 tracking-wide">Loading...</p>
      </motion.div>
    </div>
  );
};

export default Loader;
