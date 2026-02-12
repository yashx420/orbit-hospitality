import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden z-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Parallax */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop')",
            filter: "brightness(0.5)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-orbit-dark/30 via-orbit-dark/50 to-orbit-dark" />
      </motion.div>

      {/* Hero Content with 3D Tilt */}
      <div className="relative z-10 container mx-auto px-6 text-center perspective-1000">
        <motion.div
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            y: textY,
            transformStyle: "preserve-3d",
          }}
          className="inline-block"
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-orbit-gold font-sans uppercase tracking-[0.3em] mb-4 text-sm md:text-base font-semibold"
            style={{ transform: "translateZ(50px)" }}
          >
            Welcome to Paradise
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-2xl"
            style={{ transform: "translateZ(100px)" }}
          >
            Experience <br />
            <span className="italic text-white/90">Luxury Living</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-2xl mx-auto text-gray-200 text-lg md:text-xl mb-12 font-light"
            style={{ transform: "translateZ(75px)" }}
          >
            Embark on a journey of relaxation and elegance at Orbit Hotels.
            Where every stay is a memory crafted with perfection.
          </motion.p>

          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "#c5a059",
              color: "#000",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-orbit-gold text-orbit-gold uppercase tracking-widest font-bold text-sm md:text-base transition-colors duration-300"
            style={{ transform: "translateZ(120px)" }}
          >
            Explore Rooms
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 z-20"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-orbit-gold to-transparent" />
        <span className="text-orbit-gold text-xs uppercase tracking-widest">
          Scroll
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;
