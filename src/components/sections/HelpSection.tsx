import { motion, type Variants } from "framer-motion";
import { MessageSquare, HelpCircle, HeadphonesIcon, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const helpItems = [
  {
    icon: MessageSquare,
    title: "Common Questions",
    description:
      "Find answers to frequently asked questions about bookings, check-in, and more",
    link: "/contact",
  },
  {
    icon: HelpCircle,
    title: "Booking Help",
    description:
      "Learn about cancellation policies, payment options, and reservation changes",
    link: "/contact",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description:
      "Get assistance anytime with our dedicated customer support team",
    link: "/contact",
  },
  {
    icon: Mail,
    title: "Contact Us",
    description:
      "Reach out directly via email or phone for personalized assistance with your queries",
    link: "/contact",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

const HelpSection = () => {
  return (
    <section className="hidden xl:block relative py-32 bg-orbit-dark overflow-hidden font-sans border-t border-orbit-gold/10">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center bg-fixed opacity-10 mix-blend-luminosity" />
      <div className="absolute inset-0 bg-gradient-to-b from-orbit-dark via-orbit-dark/90 to-orbit-dark" />

      {/* Animated glowing orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orbit-gold/20 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-xl">
            Need <span className="text-orbit-gold italic">Help?</span>
          </h2>
          <p className="text-gray-300 text-xl font-light tracking-wide max-w-2xl mx-auto">
            We're here to help! Find answers to your questions or get in touch
            with our support team.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex justify-center gap-6 lg:gap-8 mb-20"
        >
          {helpItems.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{
                y: -15,
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(212, 175, 55, 0.15)",
                borderColor: "rgba(212, 175, 55, 0.5)",
              }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 flex flex-col items-center text-center w-full max-w-[320px] transition-all duration-300 group cursor-pointer relative overflow-hidden"
            >
              {/* Hover sweep effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-orbit-gold/0 via-orbit-gold/5 to-orbit-gold/0 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out" />

              <div className="w-20 h-20 rounded-2xl bg-orbit-gold/10 border border-orbit-gold/20 flex items-center justify-center mb-8 group-hover:bg-orbit-gold group-hover:border-orbit-gold transition-colors duration-500 shadow-inner relative z-10">
                <item.icon className="w-10 h-10 text-orbit-gold group-hover:text-orbit-dark transition-colors duration-500" />
              </div>

              <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-orbit-gold transition-colors duration-300 relative z-10">
                {item.title}
              </h3>

              <p className="text-gray-400 leading-relaxed font-light text-[15px] relative z-10">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center"
        >
          <Link
            to="/contact"
            className="group relative px-12 py-5 bg-transparent border border-orbit-gold text-orbit-gold rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.5)]"
          >
            <span className="relative z-10 group-hover:text-orbit-dark transition-colors duration-300">
              Visit Help Center
            </span>
            <div className="absolute inset-0 bg-orbit-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HelpSection;
