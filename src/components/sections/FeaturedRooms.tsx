import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { projects } from "../../data/projects";
import { useState, useEffect } from "react";

// Duplicate content to create a seamless "loop" feel.
// We have 3 real projects, so let's duplicate them 6 times to get 18 items.
const displayProjects = [
  ...projects,
  ...projects,
  ...projects,
  ...projects,
  ...projects,
  ...projects,
];

const FeaturedRooms = () => {
  const targetRef = useRef(null);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const x = useTransform(smoothProgress, [0, 1], ["1%", "-80%"]);

  return (
    <section
      ref={targetRef}
      id="rooms"
      className={`relative bg-orbit-dark ${isMobile ? "h-auto py-20" : "h-[500vh]"}`}
    >
      <div
        className={`${isMobile ? "" : "sticky top-0 h-screen flex items-center overflow-hidden"}`}
      >
        {/* Header */}
        <div
          className={`z-10 pointer-events-none px-6 mb-8 ${isMobile ? "relative" : "absolute top-4 left-5 md:left-10"}`}
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-2 drop-shadow-md"
          >
            Featured <span className="text-orbit-gold">Stays</span>
          </motion.h2>
          <p className="text-gray-400 text-lg ml-1">
            {isMobile
              ? "Swipe to explore"
              : "Scroll to explore our collections"}
          </p>
        </div>

        {/* Content Container */}
        <motion.div
          style={isMobile ? {} : { x }}
          className={`flex gap-6 items-center ${isMobile ? "overflow-x-auto snap-x snap-mandatory px-6 pb-12 w-full no-scrollbar" : "pl-4"}`}
        >
          {displayProjects.map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              className={`group relative flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl cursor-pointer
                ${isMobile ? "w-[85vw] h-[60vh] snap-center" : "w-[45vw] h-[65vh] mt-16"}
              `}
              onClick={() => navigate(`/project/${project.id}`)}
            >
              <img
                src={project.heroImage}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

              <div className="absolute bottom-0 p-6 md:p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base mb-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 md:delay-100 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex justify-end items-center">
                  <button className="bg-white text-orbit-dark px-6 py-2 md:px-8 md:py-3 rounded-full text-sm font-bold md:opacity-0 group-hover:opacity-100 transition-all duration-500 md:delay-200 hover:bg-orbit-gold hover:text-white transform md:translate-y-4 group-hover:translate-y-0">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
