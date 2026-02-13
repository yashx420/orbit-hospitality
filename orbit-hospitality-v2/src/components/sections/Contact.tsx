import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-32 bg-orbit-dark relative overflow-hidden rounded-b-[3rem]"
    >
      {/* Background Elements - Crazier & Slower */}
      <motion.div
        animate={{
          scale: [1, 1.5, 0.8, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, 90, 180, 270, 360],
          x: [0, 100, -50, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-orbit-gold/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 0.9, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [360, 270, 180, 90, 0],
          x: [0, -80, 40, 0],
          y: [0, 60, -30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Mesh/Grid Effect */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }} // Slower duration
          >
            <span className="text-orbit-gold font-sans uppercase tracking-[0.2em] text-sm font-bold mb-4 block">
              Get in Touch
            </span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">
              Let's Plan Your <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-orbit-gold to-yellow-200">
                  Next Stay
                </span>
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="absolute bottom-2 left-0 h-3 bg-orbit-gold/30 -z-10 -rotate-2"
                />
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 leading-relaxed max-w-md">
              Whether you have a question about amenities, availability, or just
              want to say hello, we are here to help you around the clock.
            </p>

            <div className="space-y-8">
              {[
                { icon: Phone, text: "+91 74117 47404", label: "Call Us" },
                { icon: Mail, text: "info@orbithotels.in", label: "Email Us" },
                {
                  icon: MapPin,
                  text: "VHBCS Layout, Bangalore",
                  label: "Visit Us",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.2, duration: 1 }} // Slower stagger
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-6 group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-orbit-gold/20 transition-colors duration-500 border border-white/10 group-hover:border-orbit-gold/50 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-orbit-gold/20"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <item.icon className="text-orbit-gold w-6 h-6 relative z-10" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="text-white text-lg font-medium group-hover:text-orbit-gold transition-colors duration-300">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 30 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }} // Slower 3D reveal
            className="perspective-1000"
          >
            <div className="bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group hover:shadow-orbit-gold/10 transition-shadow duration-700">
              {/* animated border gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-orbit-gold/0 via-orbit-gold/10 to-orbit-gold/0 translate-x-[-100%] group-hover:animate-shine pointer-events-none" />

              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Send size={150} className="text-white transform rotate-12" />
              </div>

              <form className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 uppercase tracking-wider font-semibold">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-orbit-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orbit-gold transition-colors focus:bg-orbit-dark/70"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 uppercase tracking-wider font-semibold">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-orbit-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orbit-gold transition-colors focus:bg-orbit-dark/70"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400 uppercase tracking-wider font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full bg-orbit-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orbit-gold transition-colors focus:bg-orbit-dark/70"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400 uppercase tracking-wider font-semibold">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-orbit-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orbit-gold transition-colors focus:bg-orbit-dark/70 resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-orbit-gold to-yellow-600 text-orbit-dark font-bold uppercase tracking-widest py-4 rounded-xl hover:shadow-lg hover:shadow-orbit-gold/20 transition-all duration-300 flex items-center justify-center space-x-2 group"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
