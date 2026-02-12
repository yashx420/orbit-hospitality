import { useRef, useState, useEffect } from "react";
import { motion, useInView, useSpring } from "framer-motion";

const stats = [
  { value: 10, label: "Years of Excellence", suffix: "+" },
  { value: 120, label: "Dedicated Staff", suffix: "+" },
  { value: 50, label: "Luxury Rooms", suffix: "+" },
  { value: 5, label: "Happy Clients", suffix: "k+" },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const springValue = useSpring(0, { duration: 2000 }); // Duration 2s
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <span
      ref={ref}
      className="text-5xl md:text-7xl font-serif font-bold text-orbit-gold block mb-2"
    >
      {displayValue}
      {suffix}
    </span>
  );
};

const Stats = () => {
  return (
    <section className="py-20 bg-orbit-gray/10 border-y border-white/5 relative overflow-hidden">
      {/* Background shine */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-shine pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="p-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-gray-400 uppercase tracking-widest text-xs md:text-sm font-semibold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
