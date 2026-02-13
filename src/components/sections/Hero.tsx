import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

const images = ["/4.jpg", "/1.jpg", "/2.jpg", "/5.jpg", "/3.jpg"];

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // --- Mouse Parallax Logic ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement
  const springConfig = { damping: 30, stiffness: 200 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Calculate movements for different layers (depth effect)
  // Higher output range = closer to camera (moves more)
  // Lower output range = further away (moves less)
  const titleX = useTransform(mouseXSpring, [-0.5, 0.5], ["-30px", "30px"]);
  const titleY = useTransform(mouseYSpring, [-0.5, 0.5], ["-30px", "30px"]);

  const subtitleX = useTransform(mouseXSpring, [-0.5, 0.5], ["-15px", "15px"]);
  const subtitleY = useTransform(mouseYSpring, [-0.5, 0.5], ["-15px", "15px"]);

  const lineX = useTransform(mouseXSpring, [-0.5, 0.5], ["-50px", "50px"]);
  const lineY = useTransform(mouseYSpring, [-0.5, 0.5], ["-50px", "50px"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseXPct = (e.clientX - rect.left) / width - 0.5;
      const mouseYPct = (e.clientY - rect.top) / height - 0.5;

      mouseX.set(mouseXPct);
      mouseY.set(mouseYPct);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen overflow-hidden bg-orbit-dark perspective-1000" // Added perspective
    >
      {/* Background Video/Image Carousel */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${images[currentIndex]}')`,
              filter: "brightness(0.6)",
            }}
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              scale: { duration: 10, ease: "linear" }, // Slow zoom for each slide
              opacity: { duration: 1 }, // Crossfade
            }}
          />
        </AnimatePresence>

        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-10" />
      </div>

      {/* Central Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          style={{ y: textY, opacity }}
          className="space-y-6 perspective-500"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            style={{ x: lineX, y: lineY }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-[1px] bg-orbit-gold mx-auto"
          />

          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{ x: titleX, y: titleY }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 tracking-tighter drop-shadow-2xl"
          >
            ORBIT
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{ x: subtitleX, y: subtitleY }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-200 font-light tracking-[0.5em] uppercase drop-shadow-lg"
          >
            Hospitality Redefined
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        className="absolute bottom-10 left-0 w-full flex justify-center z-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="w-[30px] h-[50px] border border-white/30 rounded-full flex justify-center p-2">
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-3 bg-orbit-gold rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
