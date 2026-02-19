/**
 * Design: Warm Minimalism — "Soft Landing"
 * Japandi-inspired warm minimalism with organic touches.
 * Palette: cream, charcoal, terracotta accent
 * Fonts: DM Serif Display (display), DM Sans (body)
 */

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background flex items-center justify-center">
      {/* Organic blob decorations */}
      <motion.div
        className="absolute top-[-8%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, oklch(0.70 0.12 30 / 0.4), transparent 70%)",
        }}
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[-10%] left-[-8%] w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, oklch(0.60 0.16 30 / 0.3), transparent 70%)",
        }}
        animate={{
          y: [0, -15, 0],
          x: [0, 12, 0],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-[40%] left-[60%] w-[200px] h-[200px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, oklch(0.80 0.08 75 / 0.5), transparent 70%)",
        }}
        animate={{
          y: [0, 10, 0],
          x: [0, -8, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        <motion.h1
          className="font-serif text-7xl sm:text-8xl md:text-9xl text-charcoal tracking-tight leading-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Hi World
        </motion.h1>

        {/* Hand-drawn underline accent */}
        <motion.div
          className="mx-auto mt-4"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        >
          <svg
            viewBox="0 0 200 12"
            className="w-40 sm:w-52 mx-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 8 C 30 2, 60 10, 100 6 S 170 2, 198 7"
              stroke="oklch(0.60 0.16 30)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </motion.div>

        <motion.p
          className="mt-8 text-lg sm:text-xl text-warm-gray font-light max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
        >
          A warm little corner of the internet, ready to become something
          wonderful.
        </motion.p>
      </div>
    </div>
  );
}
