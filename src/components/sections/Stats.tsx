import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap,
} from "framer-motion";

// --- Animated Counter Component ---
const Counter = ({ value }: { value: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });
  // const opacity = useTransform(springValue, [0, 1], [0, 1]); // Simple fade in for non-numeric

  // Extract number if present
  const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  // Update motion value when in view
  if (isInView) {
    motionValue.set(numericValue);
  }

  // Ref specifically for the text content update
  const textRef = useRef<HTMLSpanElement>(null);

  useAnimationFrame(() => {
    if (textRef.current) {
      if (numericValue > 0) {
        textRef.current.textContent = Math.round(
          springValue.get(),
        ).toLocaleString();
      } else {
        // Fallback for non-numeric values if any, though we mostly have numbers
        // textRef.current.textContent = value;
      }
    }
  });

  return (
    <span ref={ref} className="flex items-baseline">
      {numericValue > 0 ? (
        <>
          <span ref={textRef} />
          <span>{suffix}</span>
        </>
      ) : (
        <span>{value}</span>
      )}
    </span>
  );
};

// --- Parallax Text Component ---
interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax overflow-hidden m-0 whitespace-nowrap flex flex-nowrap absolute top-1/2 -translate-y-1/2 left-0 w-full select-none pointer-events-none opacity-5">
      <motion.div
        className="scroller font-serif font-black uppercase text-[15rem] md:text-[25rem] flex whitespace-nowrap flex-nowrap leading-none"
        style={{ x }}
      >
        <span className="block mr-24">{children} </span>
        <span className="block mr-24">{children} </span>
        <span className="block mr-24">{children} </span>
        <span className="block mr-24">{children} </span>
      </motion.div>
    </div>
  );
}

// --- Main Stats Component ---
const Stats = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const stats = [
    { label: "Years of Excellence", value: "10+" },
    { label: "Prime Locations", value: "05" },
    { label: "Luxury Rooms", value: "200+" },
    { label: "Guest Rating", value: "4.9" },
  ];

  return (
    <section
      ref={containerRef}
      className="py-40 bg-orbit-dark relative overflow-hidden flex items-center justify-center min-h-[80vh]"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-orbit-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orbit-gold/10 via-transparent to-transparent opacity-50 blur-3xl animate-pulse" />
      </div>

      {/* Cinematic Background Text */}
      <ParallaxText baseVelocity={-2}>ORBIT HOSPITALITY</ParallaxText>

      {/* Floating Cards Container */}
      <motion.div
        style={{ y }}
        className="relative z-10 container mx-auto px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const StatCard = ({
  stat,
  index,
}: {
  stat: { label: string; value: string };
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98], // Custom spring-like easing
      }}
      whileHover={{
        scale: 1.05,
        translateZ: 20,
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
      }}
      className="relative group perspective-1000"
    >
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl h-full flex flex-col items-center justify-center relative overflow-hidden transform-gpu transition-all duration-500 hover:border-orbit-gold/50 hover:bg-white/10">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-orbit-gold/0 via-orbit-gold/0 to-orbit-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Shine */}
        <div className="absolute -top-full -left-full w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] translate-y-[-100%] group-hover:translate-x-[100%] group-hover:translate-y-[100%] transition-transform duration-700 ease-in-out" />

        <div className="text-6xl md:text-7xl lg:text-8xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-2 relative z-10">
          <Counter value={stat.value} />
        </div>
        <div className="text-sm md:text-base uppercase tracking-[0.2em] text-orbit-gold font-medium relative z-10 text-center">
          {stat.label}
        </div>
      </div>
    </motion.div>
  );
};

export default Stats;
