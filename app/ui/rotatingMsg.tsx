"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const words = [
  { lang: "English", text: "Welcome" },
  { lang: "Spanish", text: "Bienvenidos" },
  { lang: "Portuguese", text: "Bemvindos" },
  { lang: "French", text: "Bienvenue" },
  { lang: "Arabic", text: "مرحبا" },
  { lang: "Chinese", text: "欢迎" },
];

export default function RotatingWelcome() {
  const [index, setIndex] = useState(0);
  // Add a visible state to ensure proper mounting
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visible after component mounts
    setIsVisible(true);
    
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % words.length),
      3000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center my-6 min-h-[100px]">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.h1
            key={words[index].text}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold text-creoSkin-400 z-10 relative"
          >
            {words[index].text}
          </motion.h1>
        )}
      </AnimatePresence>
    </div>
  );
}
