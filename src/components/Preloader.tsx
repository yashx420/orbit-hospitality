import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // We want to wait for the complete page load including all raw images and assets
    const handleLoad = () => {
      // Add a tiny artificial delay so the glowing animation has time to be seen
      // even if assets load from cache instantly.
      setTimeout(() => setIsLoading(false), 800);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-orbit-dark overflow-hidden"
          >
            <div className="relative flex flex-col items-center">
              {/* Spinning outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-32 h-32 -m-8 rounded-full border border-t-orbit-gold border-r-orbit-gold/30 border-b-transparent border-l-transparent"
              />

              {/* Inner glowing core */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 w-16 h-16 bg-orbit-gold/20 blur-xl rounded-full"
              />

              {/* Logo text */}
              <h1 className="text-4xl font-serif font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 relative z-10">
                ORBIT
              </h1>
              <p className="text-orbit-gold/60 text-xs tracking-[0.3em] uppercase mt-2 font-light relative z-10">
                Hospitality
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hide the actual content completely from rendering visual artifacts until loaded */}
      {!isLoading && children}
    </>
  );
};

export default Preloader;
