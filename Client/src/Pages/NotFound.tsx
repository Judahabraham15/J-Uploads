
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome } from "react-icons/fi";


const NotFound = () => {
  return (
    <motion.section
      className="flex flex-col items-center justify-center min-h-screen w-full relative p-10 "
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="relative flex items-center justify-center">
       
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-[200px] font-bold font-sans tracking-tight sm:text-[350px] md:text-[400px] lg:text-[410px] text-center select-none pointer-events-none"
          style={{
            background: "linear-gradient(180deg, #ffffff 20%, #2563eb 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
          }}
        >
          404
        </motion.span>

        <motion.div
          className="absolute z-20 text-center top-1/2 md:top-3/5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl text-white font-semibold font-plus"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Whoa!
          </motion.h1>

          <motion.h2
            className="text-[28px] sm:text-[32px] md:text-[42px] font-medium text-gray-200 mb-2 font-plus"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            That didn’t work out.
          </motion.h2>

          <motion.p
            className="text-gray-400 text-center mb-5 sm:text-lg max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            The page you’re trying to reach doesn’t exist or might be under maintenance.
          </motion.p>

          <Link to={"/"}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              animate={{ y: 0 }}
              className=" bg-blue-700 text-white px-7 py-3 rounded-xl  flex items-center gap-2 mx-auto cursor-pointer font-plus hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] transition-shadow duration-300"
            >
              
             <FiHome size={18}/> Go To Homepage
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default NotFound;
