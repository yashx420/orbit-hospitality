import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Coffee, Bed, Mail, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const FloatingNav = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show on scroll up, hide on scroll down (unless at very top)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Story", icon: User, path: "#about" },
    { name: "Amenities", icon: Coffee, path: "#services" },
    { name: "Stays", icon: Bed, path: "#rooms" },
    { name: "Contact", icon: Mail, path: "#contact" },
  ];

  return (
    <>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            className="fixed inset-0 bg-orbit-dark/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-white p-2"
            >
              <X size={32} />
            </button>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white text-3xl font-serif hover:text-orbit-gold transition-colors"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Dock */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : 100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:flex w-fit"
      >
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 flex items-center space-x-2 shadow-2xl">
          <Link to="/" className="mr-6">
            <img
              src="/logo.png"
              alt="Orbit"
              className="h-8 w-auto opacity-90 hover:opacity-100 transition-opacity"
            />
          </Link>
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className="group relative p-3 rounded-full hover:bg-white/10 transition-colors"
            >
              <item.icon
                size={20}
                className="text-gray-300 group-hover:text-white transition-colors"
              />
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.name}
              </span>
            </a>
          ))}
        </div>
      </motion.div>

      {/* Mobile Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40 md:hidden"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="bg-orbit-gold text-black p-4 rounded-full shadow-lg"
        >
          <Menu size={24} />
        </button>
      </motion.div>
    </>
  );
};

export default FloatingNav;
