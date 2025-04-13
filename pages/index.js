import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-white px-6">
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-center text-gray-800"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to TaskFlow
      </motion.h1>

      <motion.p
        className="mt-4 text-lg md:text-xl text-gray-600 text-center max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Organize, manage, and track your tasks efficiently with our seamless and beautiful interface. Stay productive and take control of your day.
      </motion.p>

      
    </div>
  );
}
