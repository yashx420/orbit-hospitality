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
  const [expandedMobileSubCategory, setExpandedMobileSubCategory] = useState<
    string | null
  >(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Prevent scrolling when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

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
    { name: "About", path: "/about" },
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
    <>
      <nav
        className={`fixed inset-x-0 mx-auto z-50 transition-all duration-300 rounded-full w-[95%] max-w-5xl ${
          isScrolled
            ? "top-4 bg-orbit-dark/90 backdrop-blur-md shadow-lg border border-white/10 px-4 md:px-6 py-3"
            : "top-6 bg-transparent border border-transparent px-4 md:px-6 py-4"
        }`}
      >
        <div className="flex justify-between items-center gap-4 md:gap-8">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center shrink-0"
          >
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
                    <motion.div
                      animate={{
                        rotate: activeDropdown === link.name ? 180 : 0,
                      }}
                    >
                      <ChevronDown className="w-4 h-4 ml-0.5" />
                    </motion.div>
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

                            {/* Nested Desktop Dropdown */}
                            {item.subDropdown &&
                              item.subDropdown.length > 0 && (
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
              className="text-white relative z-[60]"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={28} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={28} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Redesigned Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-orbit-dark/98 backdrop-blur-2xl md:hidden overflow-y-auto pt-32 pb-24 px-6"
          >
            <div className="flex flex-col space-y-6 max-w-sm mx-auto">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="flex flex-col border-b border-white/10 pb-4"
                >
                  <div className="flex items-center justify-between w-full">
                    {link.dropdown ? (
                      <button
                        onClick={() =>
                          setExpandedMobileCategory(
                            expandedMobileCategory === link.name
                              ? null
                              : link.name,
                          )
                        }
                        className="text-3xl font-serif text-white hover:text-orbit-gold transition-colors flex items-center gap-3 w-full text-left"
                      >
                        {link.name}
                        <motion.div
                          animate={{
                            rotate:
                              expandedMobileCategory === link.name ? 180 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-6 h-6 text-orbit-gold" />
                        </motion.div>
                      </button>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={(e) => {
                          scrollToSection(e, link.path);
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-3xl font-serif text-white hover:text-orbit-gold transition-colors w-full"
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>

                  {/* 1st Level Mobile Dropdown (Properties Categories) */}
                  <AnimatePresence>
                    {link.dropdown && expandedMobileCategory === link.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden flex flex-col space-y-4 mt-6 pl-4 border-l border-orbit-gold/30"
                      >
                        {link.dropdown.map((item) => (
                          <div key={item.name} className="flex flex-col">
                            {item.subDropdown && item.subDropdown.length > 0 ? (
                              <button
                                onClick={() =>
                                  setExpandedMobileSubCategory(
                                    expandedMobileSubCategory === item.name
                                      ? null
                                      : item.name,
                                  )
                                }
                                className="text-xl text-gray-300 hover:text-white transition-colors flex items-center justify-between w-full text-left"
                              >
                                {item.name}
                                <motion.div
                                  animate={{
                                    rotate:
                                      expandedMobileSubCategory === item.name
                                        ? 180
                                        : 0,
                                  }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <ChevronDown className="w-5 h-5 opacity-50" />
                                </motion.div>
                              </button>
                            ) : (
                              <Link
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-xl text-gray-300 hover:text-white transition-colors w-full inline-block"
                              >
                                {item.name}
                              </Link>
                            )}

                            {/* 2nd Level Mobile Dropdown (Actual Projects) */}
                            <AnimatePresence>
                              {item.subDropdown &&
                                expandedMobileSubCategory === item.name && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden flex flex-col space-y-3 mt-4 pl-4 border-l border-white/10"
                                  >
                                    {item.subDropdown.map((subItem) => (
                                      <Link
                                        key={subItem.name}
                                        to={subItem.path}
                                        onClick={() =>
                                          setIsMobileMenuOpen(false)
                                        }
                                        className="text-lg text-gray-500 hover:text-orbit-gold transition-colors py-1 shrink-0"
                                      >
                                        {subItem.name}
                                      </Link>
                                    ))}
                                  </motion.div>
                                )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Bottom Contact / Decor on Mobile Menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 text-center border-t border-white/10 pt-8"
            >
              <img
                src="/logo.png"
                alt="Orbit Hotels"
                className="h-12 w-auto mx-auto mb-4 opacity-50"
              />
              <p className="text-gray-500 text-sm font-serif">
                Redefining Hospitality Since 2013
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
