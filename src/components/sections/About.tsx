import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="py-24 bg-orbit-dark relative overflow-hidden"
    >
      {/* Decorative Background Text */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.03 }}
          transition={{ duration: 1.5 }}
          className="text-[80px] sm:text-[120px] md:text-[200px] font-serif font-bold text-white whitespace-nowrap opacity-5"
        >
          OUR STORY
        </motion.div>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <div className="relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-orbit-gold font-sans uppercase tracking-[0.2em] text-sm font-semibold"
          >
            About Orbit Hotels
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mt-4 mb-6 leading-tight"
          >
            Redefining Hospitality <br />
            <span className="text-gray-300">Since 2013</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-200 text-lg leading-relaxed mb-8"
          >
            At Orbit Hotels, we believe that every journey should be a memorable
            experience. Established with a vision to offer exquisite
            accommodations, we blend modern luxury with traditional warmth. From
            private villas to open terrace penthouses, our properties are
            designed to be your sanctuary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-24 h-1 bg-orbit-gold mb-8 origin-left"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white border-b border-orbit-gold pb-1 hover:text-orbit-gold transition-colors"
          >
            Read More About Us
          </motion.button>
        </div>

        {/* Image Composition */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
              alt="Luxury Lobby"
              className="w-full h-[350px] md:h-[500px] object-cover rounded-lg shadow-2xl filter brightness-75 hover:brightness-100 transition-all duration-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -bottom-10 -left-10 z-20 hidden md:block"
          >
            <img
              src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop"
              alt="Interior Detail"
              className="w-64 h-64 object-cover rounded-lg shadow-xl border-4 border-orbit-dark"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
