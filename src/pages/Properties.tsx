import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import { MapPin, BedDouble, Bath, ArrowRight } from "lucide-react";

import SEO from "../components/SEO";

const Properties = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  // Capitalize category for display (e.g., "villas" -> "Villas")
  const title = category
    ? category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "Properties";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  // Filter projects by category
  const displayProjects = projects.filter(
    (p) =>
      p.category.toLowerCase().replace(" ", "-") === category?.toLowerCase(),
  );

  return (
    <div className="bg-orbit-dark min-h-screen text-white font-sans pt-24">
      <SEO
        title={`${title} Collection`}
        description={`Discover our handpicked collection of luxury ${title.toLowerCase()} at Orbit Hospitality. Experience absolute luxury and comfort in every stay.`}
      />
      {/* Header */}
      <div className="container mx-auto px-6 mb-12 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-orbit-gold font-sans uppercase tracking-[0.2em] text-xs md:text-sm font-bold block mb-4">
            Orbit Hospitality
          </span>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-white mb-6">
            Our <span className="text-orbit-gold">{title}</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Discover our handpicked collection of {title.toLowerCase()}. Each
            property is a masterpiece of design and comfort.
          </p>
        </motion.div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 gap-12 md:gap-20">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center"
            >
              {/* Image Side */}
              <div
                className={`relative overflow-hidden rounded-2xl h-[300px] sm:h-[400px] lg:h-[500px] cursor-pointer ${index % 2 === 1 ? "lg:order-2" : ""}`}
                onClick={() => navigate(`/project/${project.id}`)}
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

                {/* Floating Badge */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-xs md:text-sm font-medium">
                  {project.category}
                </div>
              </div>

              {/* Content Side */}
              <div
                className={`space-y-4 md:space-y-6 ${index % 2 === 1 ? "lg:order-1 lg:text-right" : ""}`}
              >
                <h2
                  className="text-3xl md:text-4xl font-serif font-bold text-white cursor-pointer hover:text-orbit-gold transition-colors"
                  onClick={() => navigate(`/project/${project.id}`)}
                >
                  {project.title}
                </h2>

                <div
                  className={`flex flex-wrap gap-4 md:gap-6 text-gray-300 ${index % 2 === 1 ? "lg:justify-end" : ""}`}
                >
                  <span className="flex items-center gap-2 text-sm md:text-base">
                    <MapPin className="text-orbit-gold w-4 h-4" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-2 text-sm md:text-base">
                    <BedDouble className="text-orbit-gold w-4 h-4" />
                    {project.bedrooms} Beds
                  </span>
                  <span className="flex items-center gap-2 text-sm md:text-base">
                    <Bath className="text-orbit-gold w-4 h-4" />
                    {project.bathrooms} Baths
                  </span>
                </div>

                <p className="text-gray-400 text-base md:text-lg leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div
                  className={`pt-2 md:pt-4 ${index % 2 === 1 ? "flex lg:justify-end" : ""}`}
                >
                  <button
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="flex items-center gap-3 text-white border-b border-orbit-gold pb-1 hover:text-orbit-gold group transition-colors"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Properties;
