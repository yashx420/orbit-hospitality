import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getSectionPath = (id: string) => {
    return location.pathname === "/" ? `#${id}` : `/#${id}`;
  };

  const scrollToSection = (e: React.MouseEvent, path: string) => {
    const isHash = path.startsWith("#") || path.includes("/#");
    if (isHash && location.pathname === "/") {
      e.preventDefault();
      const id = path.includes("#") ? path.split("#")[1] : path;
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navLinks = [
    { name: "About", path: getSectionPath("about") },
    {
      name: "Properties",
      path: "/properties/all",
      dropdown: [
        { name: "All Properties", path: "/properties/all" },
        { name: "Villas", path: "/properties/villas" },
        { name: "Hotels", path: "/properties/hotels" },
        { name: "Service Apartments", path: "/properties/service-apartments" },
      ],
    },
    { name: "Services", path: getSectionPath("services") },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: getSectionPath("contact") },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-orbit-dark/80 backdrop-blur-md py-4 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo_full.png"
            alt="Orbit Hotels"
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {link.dropdown ? (
                <Link
                  to={link.path}
                  className="text-white hover:text-orbit-gold transition-colors duration-300 text-sm uppercase tracking-widest flex items-center gap-1"
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  to={link.path}
                  onClick={(e) => scrollToSection(e, link.path)}
                  className="text-white hover:text-orbit-gold transition-colors duration-300 text-sm uppercase tracking-widest"
                >
                  {link.name}
                </Link>
              )}

              {/* Dropdown */}
              {link.dropdown && (
                <AnimatePresence>
                  {activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-orbit-dark/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl overflow-hidden py-2"
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-orbit-dark/95 backdrop-blur-lg border-t border-white/10"
          >
            <div className="flex flex-col items-center py-8 space-y-6">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col items-center">
                  <Link
                    to={link.path}
                    onClick={(e) => {
                      scrollToSection(e, link.path);
                      if (!link.dropdown) setIsMobileMenuOpen(false);
                    }}
                    className="text-white text-lg hover:text-orbit-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="flex flex-col items-center mt-2 space-y-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-gray-400 text-sm"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
