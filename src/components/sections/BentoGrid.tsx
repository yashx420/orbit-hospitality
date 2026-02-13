import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { Wifi, MapPin, ShieldCheck, PartyPopper } from "lucide-react";

// --- 3D Tilt Component ---
const TiltCard = ({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative hover:z-20 transition-all duration-500 ease-out ${className}`}
      onClick={onClick}
    >
      {/* Dynamic Glow Border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {children}
    </motion.div>
  );
};

// --- Explosive Text Component ---
const ExplosiveText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const letters = text.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      scale: 2,
      filter: "blur(10px)",
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-wrap justify-center ${className}`}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index} className="origin-center">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

const BentoGrid = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Stagger effect for cards
      },
    },
  };

  // Fly-in variants
  const itemVariants: Variants = {
    hidden: {
      y: 50,
      opacity: 0,
      scale: 0.8,
      rotateX: -30,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      } as const,
    },
  };

  return (
    <section
      id="about"
      className="py-32 bg-orbit-dark px-4 md:px-12 perspective-2000 relative overflow-hidden"
    >
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-orbit-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-4"
          >
            <span className="text-orbit-gold uppercase tracking-[0.3em] text-sm font-medium border border-orbit-gold/30 px-4 py-2 rounded-full backdrop-blur-sm">
              Experience Excellence
            </span>
          </motion.div>

          <div id="services" className="scroll-mt-32 mb-6">
            <ExplosiveText
              text="Designed for Comfort"
              className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50"
            />
          </div>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-transparent via-orbit-gold to-transparent mx-auto"
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 h-auto md:h-[900px]"
        >
          {/* Main Feature - Large Image */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 md:row-span-2 h-full"
          >
            <TiltCard className="relative rounded-[2rem] overflow-hidden group min-h-[400px] cursor-pointer h-full border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
              <img
                src="/5.jpg"
                alt="Interior"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                style={{ transform: "translateZ(-50px)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
              <motion.div
                className="absolute bottom-10 left-10 text-white max-w-md"
                style={{ transform: "translateZ(50px)" }}
              >
                <div className="w-12 h-1 bg-orbit-gold mb-6 origin-left transition-all duration-500 group-hover:w-24" />
                <h3 className="text-4xl font-serif font-bold mb-4 text-white group-hover:text-orbit-gold transition-colors">
                  Luxury Interiors
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed group-hover:text-white transition-colors">
                  Thoughtfully designed spaces that blend comfort with modern
                  elegance, creating a sanctuary for relaxation.
                </p>
              </motion.div>
            </TiltCard>
          </motion.div>

          {/* Feature Card Helper */}
          <TiltFeatureCard
            icon={Wifi}
            title="High Speed Wifi"
            description="Seamless connectivity throughout the property for all your digital needs."
            variants={itemVariants}
            delay={0.1}
          />

          <TiltFeatureCard
            icon={ShieldCheck}
            title="24/7 Security"
            description="Round-the-clock security personnel and surveillance for your safety."
            variants={itemVariants}
            delay={0.2}
          />

          {/* Dining - Wide */}
          <motion.div variants={itemVariants} className="md:col-span-2 h-full">
            <TiltCard className="relative rounded-[2rem] overflow-hidden group bg-gradient-to-br from-orbit-gold/90 to-orbit-gold/70 backdrop-blur-md min-h-[250px] flex items-center p-10 cursor-pointer h-full border border-white/20 shadow-lg">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[80px] rounded-full pointer-events-none" />

              <div
                className="relative z-10"
                style={{ transform: "translateZ(40px)" }}
              >
                <h3 className="text-4xl font-serif font-bold text-black mb-4">
                  Gourmet Breakfast
                </h3>
                <p className="text-black/80 text-lg font-medium max-w-md leading-relaxed">
                  Start your day with a delicious, complimentary gourmet spread
                  designed to energize your morning.
                </p>
              </div>
            </TiltCard>
          </motion.div>

          <TiltFeatureCard
            icon={MapPin}
            title="Prime Location"
            description="Strategically located near Manyata Tech Park and key city hubs."
            variants={itemVariants}
            delay={0.3}
          />

          <TiltFeatureCard
            icon={PartyPopper}
            title="Event Rentals"
            description="Premium venues available for birthdays, weddings, and special events."
            variants={itemVariants}
            delay={0.4}
          />
        </motion.div>
      </div>
    </section>
  );
};

const TiltFeatureCard = ({
  icon: Icon,
  title,
  description,
  variants,
  delay,
}: any) => (
  <motion.div variants={variants} className="h-full">
    <TiltCard className="bg-white/5 backdrop-blur-md rounded-[2rem] p-8 flex flex-col justify-between group hover:bg-white/10 transition-all duration-500 cursor-pointer h-full border border-white/10 hover:border-orbit-gold/30 shadow-xl relative overflow-hidden">
      {/* Background Shine */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div style={{ transform: "translateZ(30px)" }}>
        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-orbit-gold transition-colors duration-500">
          <Icon
            size={28}
            className="text-orbit-gold group-hover:text-black transition-colors duration-500"
          />
        </div>
      </div>
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10">
        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-orbit-gold transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 group-hover:text-gray-200 leading-relaxed transition-colors">
          {description}
        </p>
      </div>
    </TiltCard>
  </motion.div>
);

export default BentoGrid;
