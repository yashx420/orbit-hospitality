import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Navigation,
  Send,
  Wifi,
  Car,
  Tv,
  Snowflake,
  Coffee,
  Utensils,
  Droplets,
  Grid,
  Fan,
  Wind,
  Trees,
  Flame,
  Bed,
  Refrigerator,
  Zap,
} from "lucide-react";
import SEO from "../components/SEO";
import { projects } from "../data/projects";

// Extract unique amenities for the ticker
const allAmenities = Array.from(new Set(projects.flatMap((p) => p.amenities)));

const getAmenityIcon = (amenity: string) => {
  const lower = amenity.toLowerCase();
  if (lower.includes("wi-fi") || lower.includes("wifi")) return Wifi;
  if (lower.includes("parking")) return Car;
  if (lower.includes("tv")) return Tv;
  if (lower.includes("ac") || lower.includes("air conditioning"))
    return Snowflake;
  if (lower.includes("coffee") || lower.includes("tea")) return Coffee;
  if (lower.includes("kitchen") || lower.includes("dining")) return Utensils;
  if (
    lower.includes("water") ||
    lower.includes("pool") ||
    lower.includes("shower") ||
    lower.includes("geyser")
  )
    return Droplets;
  if (lower.includes("balcony") || lower.includes("terrace")) return Grid;
  if (lower.includes("fan")) return Fan;
  if (lower.includes("ventilation")) return Wind;
  if (lower.includes("garden") || lower.includes("lawn")) return Trees;
  if (
    lower.includes("bbq") ||
    lower.includes("barbeque") ||
    lower.includes("fire")
  )
    return Flame;
  if (
    lower.includes("bed") ||
    lower.includes("blanket") ||
    lower.includes("pillow")
  )
    return Bed;
  if (lower.includes("refrigerator") || lower.includes("fridge"))
    return Refrigerator;
  if (
    lower.includes("power") ||
    lower.includes("electricity") ||
    lower.includes("inverter")
  )
    return Zap;
  return null;
};

// Only keep amenities that have a specific mapped icon
const filteredAmenities = allAmenities.filter(
  (a) => getAmenityIcon(a) !== null,
);
const topAmenities = filteredAmenities.slice(0, 15);

const AmenitiesTicker = () => {
  return (
    <div className="w-full bg-orbit-gold/5 py-8 overflow-hidden relative border-y border-orbit-gold/10 scroll-m-0">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-orbit-dark to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-orbit-dark to-transparent z-10" />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 45, repeat: Infinity }}
        className="flex gap-6 w-max items-center px-4"
      >
        {[...topAmenities, ...topAmenities].map((amenity, idx) => {
          const Icon = getAmenityIcon(amenity);
          if (!Icon) return null;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-orbit-gold shadow-lg backdrop-blur-sm whitespace-nowrap"
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-base font-semibold tracking-wide text-white">
                {amenity}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-orbit-dark text-white font-sans min-h-dvh">
      <SEO
        title="Contact Us | Orbit Hospitality"
        description="Get in touch with Orbit Hospitality — questions, bookings, and support."
      />

      {/* Epic Parallax Hero */}
      <section className="relative h-[60dvh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-orbit-dark/70 via-orbit-dark/50 to-orbit-dark" />

        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 drop-shadow-2xl"
          >
            Get in <span className="text-orbit-gold italic">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light tracking-wide"
          >
            We're here to craft your perfect stay. Reach out to our dedicated
            concierge 24/7.
          </motion.p>
        </div>
      </section>

      {/* Amenities Ticker */}
      <AmenitiesTicker />

      {/* Main Content: Split Grid Form & Map */}
      <main className="container mx-auto px-6 py-24 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 xl:gap-24 items-start">
          {/* Left: Massive Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-2xl p-10 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-orbit-gold/20 blur-[120px] rounded-full pointer-events-none" />

            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-10 relative z-10">
              Send us a message
            </h2>

            <form className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm text-gray-400 uppercase tracking-[0.2em] font-bold">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-orbit-dark/60 border border-white/10 rounded-2xl px-6 py-5 text-xl text-white focus:outline-none focus:border-orbit-gold/50 transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm text-gray-400 uppercase tracking-[0.2em] font-bold">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-orbit-dark/60 border border-white/10 rounded-2xl px-6 py-5 text-xl text-white focus:outline-none focus:border-orbit-gold/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm text-gray-400 uppercase tracking-[0.2em] font-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full bg-orbit-dark/60 border border-white/10 rounded-2xl px-6 py-5 text-xl text-white focus:outline-none focus:border-orbit-gold/50 transition-colors"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm text-gray-400 uppercase tracking-[0.2em] font-bold">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="w-full bg-orbit-dark/60 border border-white/10 rounded-2xl px-6 py-5 text-xl text-white focus:outline-none focus:border-orbit-gold/50 transition-colors resize-none custom-scrollbar"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-orbit-gold to-yellow-600 text-orbit-dark font-bold text-xl uppercase tracking-[0.2em] py-6 rounded-2xl hover:shadow-[0_0_40px_rgba(234,179,8,0.3)] transition-all duration-300 flex items-center justify-center space-x-3 mt-4 group"
              >
                <span>Submit Request</span>
                <Send className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
              </motion.button>
            </form>
          </motion.div>

          {/* Right: Info & Map Blocks */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Direct Contact Grids */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <a
                href="tel:+917411747404"
                className="bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:border-orbit-gold/40 transition-colors group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-orbit-gold/10 blur-[50px] group-hover:bg-orbit-gold/20 transition-colors" />
                <div className="p-4 bg-orbit-gold/10 text-orbit-gold rounded-2xl w-max mb-6 group-hover:bg-orbit-gold group-hover:text-orbit-dark transition-all duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <h4 className="text-sm text-gray-400 font-bold uppercase tracking-[0.2em] mb-2">
                  Call Us
                </h4>
                <p className="text-white text-2xl font-serif">
                  +91 74117 47404
                </p>
              </a>

              <a
                href="mailto:info@orbithotels.in"
                className="bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:border-orbit-gold/40 transition-colors group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-orbit-gold/10 blur-[50px] group-hover:bg-orbit-gold/20 transition-colors" />
                <div className="p-4 bg-orbit-gold/10 text-orbit-gold rounded-2xl w-max mb-6 group-hover:bg-orbit-gold group-hover:text-orbit-dark transition-all duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <h4 className="text-sm text-gray-400 font-bold uppercase tracking-[0.2em] mb-2">
                  Email Us
                </h4>
                <p className="text-white text-2xl font-serif truncate">
                  info@orbithotels.in
                </p>
              </a>
            </div>

            {/* Massive Map */}
            <div className="bg-white/5 rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col h-[500px] xl:h-[600px] relative">
              <div className="absolute inset-0 w-full h-full">
                <iframe
                  title="White Lotus by Orbit Hotels"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.95383181816!2d77.6171376!3d13.0377198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae170d6d0fd39b%3A0xec7c96670948fca5!2sWhite%20Lotus%20by%20Orbit%20Hotels!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  className="w-full h-full border-0 select-none grayscale-[40%] contrast-[1.1] filter"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-orbit-dark/95 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 shadow-2xl flex items-start gap-5">
                  <div className="p-4 bg-orbit-gold/10 text-orbit-gold rounded-2xl shrink-0 mt-1">
                    <Navigation className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-serif font-bold text-white mb-2">
                      Office Headquarters
                    </h4>
                    <p className="text-gray-300 text-base leading-relaxed">
                      White Lotus by Orbit Hotels
                      <br />
                      3rd Floor, 296, 7th Main Rd, Vyalikaval HBCS Layout,
                      <br />
                      Nagavara, Bengaluru, Karnataka 560045
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
