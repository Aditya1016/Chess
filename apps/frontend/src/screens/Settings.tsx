import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";

export const Settings = () => {
  return (
    <div className="max-w-full mt-4 px-4 md:px-8 text-gray-100">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold mb-6 text-white drop-shadow-md"
      >
        Settings
      </motion.h2>

      <div className="flex flex-col md:flex-row mt-8 gap-8 md:gap-16">
        {/* Sidebar Links */}
        <div className="flex flex-col gap-4 md:w-48">
          <motion.div
            whileHover={{ x: 5 }}
            className="flex gap-2 items-center px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-300 cursor-pointer"
          >
            <Link to="themes" className="flex gap-2 items-center w-full">
              <img src="/theme.svg" className="w-8 h-8" alt="icon" />
              <span className="font-medium text-white">Themes</span>
            </Link>
          </motion.div>
        </div>

        {/* Content Outlet */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 bg-gray-800 p-6 rounded-xl shadow-md min-h-[400px] text-white"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};
