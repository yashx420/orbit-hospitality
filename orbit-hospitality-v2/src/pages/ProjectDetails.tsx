import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import { ArrowLeft, MapPin, BedDouble, Bath, CheckCircle } from "lucide-react";

import SEO from "../components/SEO";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find project by id (slug)
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-orbit-dark flex items-center justify-center text-white">
        <SEO
          title="Project Not Found"
          description="The requested project could not be found."
        />
        <div className="text-center">
          <h2 className="text-3xl font-serif mb-4">Project Not Found</h2>
          <button
            onClick={() => navigate("/")}
            className="text-orbit-gold hover:underline"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-orbit-dark min-h-screen text-white font-sans">
      <SEO
        title={project.title}
        description={`Explore ${project.title}, a premium ${project.category} by Orbit Hospitality in ${project.location}. Featuring ${project.bedrooms} bedrooms and world-class amenities.`}
        image={project.heroImage}
      />
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={project.heroImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-orbit-dark via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="container mx-auto"
          >
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-white/80 hover:text-orbit-gold transition-colors mb-4 md:mb-6 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Properties
            </button>

            <h1 className="text-4xl md:text-7xl font-serif font-bold text-white mb-4">
              {project.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-base md:text-lg text-gray-300">
              <span className="flex items-center gap-2">
                <MapPin className="text-orbit-gold w-5 h-5" />
                {project.location}
              </span>
              <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-orbit-gold/50" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column: Info */}
          <div className="lg:col-span-2 space-y-12">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-8 md:gap-12 border-b border-white/10 pb-8 md:pb-12"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orbit-gold/10 flex items-center justify-center text-orbit-gold">
                  <BedDouble className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">
                    Bedrooms
                  </p>
                  <p className="text-2xl font-serif">{project.bedrooms}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orbit-gold/10 flex items-center justify-center text-orbit-gold">
                  <Bath className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">
                    Bathrooms
                  </p>
                  <p className="text-2xl font-serif">{project.bathrooms}</p>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif font-bold mb-6 text-white">
                Oasis of Luxury
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {project.description}
              </p>
            </motion.div>

            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-serif font-bold mb-8 text-white">
                Gallery
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.slice(0, 4).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${project.title} view ${idx + 1}`}
                    className="rounded-lg object-cover w-full h-64 hover:scale-[1.02] transition-transform duration-500 cursor-pointer"
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Amenities */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 p-8 rounded-2xl border border-white/10 sticky top-32 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-serif font-bold mb-6 text-white border-b border-white/10 pb-4">
                Amenities
              </h3>
              <ul className="space-y-4">
                {project.amenities.map((amenity, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <CheckCircle className="w-5 h-5 text-orbit-gold flex-shrink-0 mt-0.5" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>

              <a
                href="tel:+917411747404"
                className="block w-full text-center mt-8 bg-orbit-gold text-white font-bold py-4 rounded-full transition hover:bg-white hover:text-orbit-dark"
              >
                Book This Property
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
