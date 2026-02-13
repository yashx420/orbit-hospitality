import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { Wifi, MapPin, Coffee, Shield, Sparkles } from "lucide-react";

// --- Shared Data ---
const features = [
  {
    title: "The Vision",
    desc: "At Orbit Hotels, we don't just host guests; we curate experiences defined by a relentless pursuit of perfection.",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "The Comfort",
    desc: "Indulge in a haven meticulously crafted to elevate your stay. Every detail is designed for your peace of mind.",
    img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop",
  },
  {
    title: "The Location",
    desc: "Strategically located near Manyata Tech Park, we offer the perfect blend of business convenience and leisure.",
    img: "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2070&auto=format&fit=crop",
  },
];

// ==========================================
// DESKTOP IMPLEMENTATION (3D Cards)
// ==========================================

const RevealText = ({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
      className={className}
    >
      {text}
    </motion.h2>
  );
};

const ThreeDCard = ({
  children,
  className,
  index,
}: {
  children: React.ReactNode;
  className?: string;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative perspective-2000 transform-style-3d ${className}`}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ scale: 0.5, opacity: 0, z: -500 }}
        whileInView={{ scale: 1, opacity: 1, z: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 1.5,
        }}
        className="bg-orbit-dark/70 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-14 shadow-2xl relative group overflow-hidden min-h-[500px] flex flex-col justify-center items-center"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-serif font-bold text-white/[0.03] pointer-events-none select-none leading-none z-0">
          0{index + 1}
        </div>
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay z-0" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-orbit-gold/20 rounded-full blur-[100px] pointer-events-none z-0"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-[-10%] left-[-20%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none z-0"
        />
        {/* Decorative Corners */}
        <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-white/20 rounded-tl-3xl pointer-events-none opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
        <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-white/20 rounded-tr-3xl pointer-events-none opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-white/20 rounded-bl-3xl pointer-events-none opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-white/20 rounded-br-3xl pointer-events-none opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />

        <motion.div
          style={{
            background: useTransform(
              mouseXSpring,
              [-0.5, 0.5],
              [
                "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 60%)",
                "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 60%)",
              ],
            ),
          }}
          className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-100"
        />

        <motion.div
          animate={{ z: [0, 40, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative z-20 w-full flex flex-col items-center"
        >
          {children}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/40 pointer-events-none rounded-[2.5rem] z-30 opacity-70" />
      </motion.div>
    </motion.div>
  );
};

const StickySection = ({ feature, index }: { feature: any; index: number }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden border-b border-white/5 perspective-2000"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y, scale }}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          <img
            src={feature.img}
            alt="bg"
            className="w-full h-full object-cover brightness-[0.3]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      </div>

      <ThreeDCard className="w-full max-w-3xl mx-auto" index={index}>
        <div className="text-center w-full">
          <motion.div
            className="inline-block mb-6 relative"
            style={{ transform: "translateZ(60px)" }}
          >
            <Sparkles
              className="absolute -top-5 -left-6 text-orbit-gold animate-pulse"
              size={18}
            />
            <span className="text-orbit-gold text-sm tracking-[0.3em] uppercase font-bold border-b border-orbit-gold pb-2 drop-shadow-[0_0_10px_rgba(235,189,97,0.5)]">
              Chapter 0{index + 1}
            </span>
          </motion.div>

          <div style={{ transform: "translateZ(80px)" }} className="relative">
            <RevealText
              text={feature.title}
              className="text-7xl font-serif font-black mb-6 leading-tight text-white drop-shadow-2xl tracking-tight"
            />
          </div>

          <motion.div
            style={{ transform: "translateZ(50px)" }}
            className="relative px-6 py-6 border-t border-b border-white/10 bg-white/5 backdrop-blur-sm rounded-xl mb-8"
          >
            <p className="text-gray-100 text-lg leading-relaxed font-light drop-shadow-lg">
              {feature.desc}
            </p>
          </motion.div>

          {index === 1 && (
            <motion.div
              style={{ transform: "translateZ(70px)" }}
              className="flex justify-center gap-6 mt-8"
            >
              {[
                { icon: Wifi, label: "Wifi" },
                { icon: Shield, label: "Security" },
                { icon: Coffee, label: "Coffee" },
                { icon: MapPin, label: "Location" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 text-orbit-gold group/icon cursor-pointer"
                >
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/20 group-hover/icon:bg-orbit-gold group-hover/icon:text-black group-hover/icon:scale-110 transition-all duration-300 shadow-lg shadow-white/5 backdrop-blur-sm">
                    <item.icon size={20} />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 group-hover/icon:text-white transition-colors">
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </ThreeDCard>
    </section>
  );
};

// ==========================================
// MOBILE IMPLEMENTATION (Vertical Flow)
// ==========================================

const MobileExperience = () => {
  return (
    <div className="md:hidden bg-orbit-dark pb-10">
      {features.map((feature, index) => (
        <MobileCard key={index} feature={feature} index={index} />
      ))}
    </div>
  );
};

const MobileCard = ({ feature, index }: { feature: any; index: number }) => {
  return (
    <div className="relative w-full min-h-[85vh] flex flex-col justify-end overflow-hidden border-b border-white/10">
      {/* Cinematic Background Image */}
      <motion.div
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src={feature.img}
          alt={feature.title}
          className="w-full h-full object-cover brightness-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-orbit-dark via-orbit-dark/60 to-transparent" />
      </motion.div>

      {/* Content Overlay */}
      <div className="relative z-10 px-6 pb-16 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
        >
          {/* Chapter Label */}
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[1px] w-10 bg-orbit-gold" />
            <span className="text-orbit-gold text-xs tracking-[0.3em] uppercase font-bold">
              Chapter 0{index + 1}
            </span>
          </div>

          {/* Title - Elegant Vertical Typography */}
          <h2 className="text-5xl font-serif font-bold text-white mb-6 leading-[0.9] drop-shadow-xl">
            {feature.title}
          </h2>

          {/* Description */}
          <p className="text-gray-200 text-lg leading-relaxed font-light mb-8 max-w-[90%] drop-shadow-md border-l-2 border-orbit-gold/50 pl-4">
            {feature.desc}
          </p>

          {/* Icons for Comfort Section */}
          {index === 1 && (
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: Wifi, label: "Wifi" },
                { icon: Shield, label: "Safe" },
                { icon: Coffee, label: "Coffee" },
                { icon: MapPin, label: "Loc" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center gap-2"
                >
                  <item.icon size={18} className="text-orbit-gold" />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT (Responsive Switch)
// ==========================================

const Experience = () => {
  return (
    <>
      <div className="hidden md:block bg-orbit-dark">
        {features.map((feature, index) => (
          <StickySection key={index} feature={feature} index={index} />
        ))}
      </div>
      <MobileExperience />
    </>
  );
};

export default Experience;
