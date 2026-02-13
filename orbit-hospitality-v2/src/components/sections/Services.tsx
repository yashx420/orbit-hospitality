import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Wifi, MapPin, Coffee, Shield, PartyPopper, Star } from "lucide-react";
import type { MouseEvent } from "react";

const services = [
  {
    icon: Wifi,
    title: "High Speed Wifi",
    desc: "Seamless connectivity throughout the property for all your digital needs.",
  },
  {
    icon: MapPin,
    title: "Prime Location",
    desc: "Strategically located near Manyata Tech Park and key city hubs.",
  },
  {
    icon: Coffee,
    title: "Gourmet Breakfast",
    desc: "Start your day with a delicious, complimentary gourmet spread.",
  },
  {
    icon: Shield,
    title: "24/7 Security",
    desc: "Round-the-clock security personnel and surveillance for your safety.",
  },
  {
    icon: PartyPopper,
    title: "Event Rentals",
    desc: "Premium venues available for birthdays, weddings, and special events.",
  },
  {
    icon: Star,
    title: "Luxury Interiors",
    desc: "Thoughtfully designed spaces that blend comfort with modern elegance.",
  },
];

const ServiceCard = ({
  icon: Icon,
  title,
  desc,
  index,
}: {
  icon: any;
  title: string;
  desc: string;
  index: number;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative border border-white/10 bg-orbit-gray/30 p-8 rounded-2xl overflow-hidden backdrop-blur-sm"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(212, 175, 55, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10">
        <div className="bg-gradient-to-br from-orbit-gold/20 to-transparent w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-orbit-gold/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
          <Icon className="text-orbit-gold w-8 h-8 group-hover:text-white transition-colors duration-300" />
        </div>

        <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-orbit-gold transition-colors duration-300">
          {title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
          {desc}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orbit-gold/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  );
};

const Services = () => {
  return (
    <section
      id="services"
      className="py-24 bg-orbit-dark relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orbit-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-orbit-gold font-sans uppercase tracking-[0.2em] text-sm font-bold block mb-4"
          >
            World Class Amenities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white"
          >
            Designed for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orbit-gold to-yellow-200">
              Luxury
            </span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-orbit-gold mx-auto mt-6 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
