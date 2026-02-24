import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { projects } from "../data/projects";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(
    null,
  );
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<
    string | null
  >(null);
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

  const getSubDropdown = (categoryFilter: string) => {
    return projects
      .filter((p) => p.category.toLowerCase().includes(categoryFilter))
      .map((p) => ({ name: p.title, path: `/project/${p.id}` }));
  };

  const navLinks = [
    { name: "About", path: getSectionPath("about") },
    {
      name: "Properties",
      path: "/properties/all",
      dropdown: [
        { name: "All Properties", path: "/properties/all" },
        {
          name: "Service Apartments",
          path: "/properties/service-apartments",
          subDropdown: getSubDropdown("service apartments"),
        },
        {
          name: "Hotels",
          path: "/properties/hotels",
          subDropdown: getSubDropdown("hotels"),
        },
        {
          name: "Party Venues",
          path: "/properties/party-venues",
          subDropdown: getSubDropdown("party venues"),
        },
        {
          name: "Villas",
          path: "/properties/villas",
          subDropdown: getSubDropdown("villas"),
        },
      ],
    },
    { name: "Services", path: getSectionPath("services") },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full w-[95%] max-w-5xl ${
        isScrolled
          ? "top-4 bg-orbit-dark/90 backdrop-blur-md shadow-lg border border-white/10 px-4 md:px-6 py-3"
          : "top-6 bg-transparent px-4 md:px-6 py-4"
      }`}
    >
      <div className="flex justify-between items-center gap-4 md:gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src="/logo.png"
            alt="Orbit Hotels"
            className="h-10 w-auto object-contain"
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

              {link.dropdown && (
                <AnimatePresence>
                  {activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-orbit-dark/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl py-2"
                    >
                      {link.dropdown.map((item) => (
                        <div
                          key={item.name}
                          className="relative group/sub"
                          onMouseEnter={() => setActiveSubDropdown(item.name)}
                          onMouseLeave={() => setActiveSubDropdown(null)}
                        >
                          <Link
                            to={item.path}
                            className="px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors flex justify-between items-center"
                          >
                            <span>{item.name}</span>
                            {item.subDropdown &&
                              item.subDropdown.length > 0 && (
                                <ChevronRight className="w-4 h-4 opacity-50" />
                              )}
                          </Link>

                          {/* Nested Dropdown */}
                          {item.subDropdown && item.subDropdown.length > 0 && (
                            <AnimatePresence>
                              {activeSubDropdown === item.name && (
                                <motion.div
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 10 }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute top-0 left-full ml-1 w-64 bg-orbit-dark/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl py-2 max-h-[60vh] overflow-y-auto custom-scrollbar"
                                >
                                  {item.subDropdown.map((subItem) => (
                                    <Link
                                      key={subItem.name}
                                      to={subItem.path}
                                      className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                                    >
                                      {subItem.name}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          )}
                        </div>
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
                    <div className="flex flex-col items-center mt-2 space-y-2 w-full">
                      {link.dropdown.map((item) => (
                        <div
                          key={item.name}
                          className="flex flex-col items-center w-full"
                        >
                          <div className="flex items-center justify-center w-full relative">
                            <Link
                              to={item.path}
                              onClick={() => {
                                if (
                                  !item.subDropdown ||
                                  item.subDropdown.length === 0
                                ) {
                                  setIsMobileMenuOpen(false);
                                }
                              }}
                              className="text-gray-400 text-sm py-2"
                            >
                              {item.name}
                            </Link>
                            {/* Toggle Sub-dropdown button */}
                            {item.subDropdown &&
                              item.subDropdown.length > 0 && (
                                <button
                                  onClick={() =>
                                    setExpandedMobileCategory(
                                      expandedMobileCategory === item.name
                                        ? null
                                        : item.name,
                                    )
                                  }
                                  className="absolute right-8 text-gray-400 p-2"
                                >
                                  <motion.div
                                    animate={{
                                      rotate:
                                        expandedMobileCategory === item.name
                                          ? 180
                                          : 0,
                                    }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <ChevronDown className="w-4 h-4" />
                                  </motion.div>
                                </button>
                              )}
                          </div>

                          {/* Mobile Nested Sub-dropdown */}
                          <AnimatePresence>
                            {item.subDropdown &&
                              expandedMobileCategory === item.name && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden flex flex-col items-center space-y-2 mt-1 w-full bg-white/5 rounded-lg py-2"
                                >
                                  {item.subDropdown.map((subItem) => (
                                    <Link
                                      key={subItem.name}
                                      to={subItem.path}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="text-gray-500 text-xs py-1 hover:text-orbit-gold transition-colors"
                                    >
                                      {subItem.name}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                          </AnimatePresence>
                        </div>
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
