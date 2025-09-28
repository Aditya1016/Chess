import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from '@repo/store/userAtom';
import { motion } from 'framer-motion';

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL ?? 'http://localhost:3000';

const Login = () => {
  const navigate = useNavigate();
  const guestName = useRef<HTMLInputElement>(null);
  const [, setUser] = useRecoilState(userAtom);

  const google = () => window.open(`${BACKEND_URL}/auth/google`, '_self');
  const github = () => window.open(`${BACKEND_URL}/auth/github`, '_self');

  const loginAsGuest = async () => {
    const response = await fetch(`${BACKEND_URL}/auth/guest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name: guestName.current?.value || '' }),
    });
    const user = await response.json();
    setUser(user);
    navigate('/game/random');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center h-screen text-textMain bg-gradient-to-br from-green-100 to-green-200"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-10 text-center text-green-600 drop-shadow-xl"
      >
        Enter the Game World
      </motion.h1>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-bgAuxiliary2 rounded-xl shadow-2xl p-8 flex flex-col md:flex-row gap-8 md:gap-12"
      >
        {/* OAuth Buttons */}
        <div className="flex flex-col justify-center gap-4 md:gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center px-6 py-3 rounded-lg cursor-pointer bg-white shadow-md hover:shadow-lg transition-all duration-300"
            onClick={google}
          >
            <img src="google.svg" alt="" className="w-6 h-6 mr-3" />
            <span className="font-semibold text-gray-700">Sign in with Google</span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center px-6 py-3 rounded-lg cursor-pointer bg-white shadow-md hover:shadow-lg transition-all duration-300"
            onClick={github}
          >
            <img src="github.svg" alt="" className="w-6 h-6 mr-3" />
            <span className="font-semibold text-gray-700">Sign in with Github</span>
          </motion.div>
        </div>

        {/* Guest Login */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center justify-center w-full mb-4 gap-2">
            <div className="flex-1 h-px bg-gray-400 rounded-full"></div>
            <span className="text-gray-500 font-semibold px-2">OR</span>
            <div className="flex-1 h-px bg-gray-400 rounded-full"></div>
          </div>

          <motion.input
            whileFocus={{ scale: 1.02, borderColor: '#34D399' }}
            transition={{ duration: 0.2 }}
            type="text"
            ref={guestName}
            placeholder="Username"
            className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-64 focus:outline-none text-gray-700 focus:ring-2 focus:ring-green-400 transition-all duration-300"
          />

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#10B981' }}
            transition={{ duration: 0.2 }}
            className="bg-green-500 text-white px-6 py-2 rounded-md font-semibold shadow-md hover:shadow-lg transition-all duration-300 w-full md:w-64"
            onClick={loginAsGuest}
          >
            Enter as Guest
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
