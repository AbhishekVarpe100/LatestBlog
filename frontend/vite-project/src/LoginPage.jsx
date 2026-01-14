import { motion } from "framer-motion";

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white/20 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/30"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-lg">
          Welcome Back
        </h2>

        <div className="flex flex-col space-y-4">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-md focus:outline-none focus:ring-4 focus:ring-purple-500 placeholder-gray-600"
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-md focus:outline-none focus:ring-4 focus:ring-purple-500 placeholder-gray-600"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-purple-600 text-white text-lg rounded-xl shadow-lg hover:bg-purple-700 transition-all duration-300"
          >
            Login
          </motion.button>
        </div>

        <p className="text-center text-white mt-6">
          Don't have an account? <span className="underline cursor-pointer">Sign Up</span>
        </p>
      </motion.div>
    </div>
  );
}

export default LoginPage;
