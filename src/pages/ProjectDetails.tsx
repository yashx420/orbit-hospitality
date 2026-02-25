import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import {
  ArrowLeft,
  MapPin,
  BedDouble,
  Bath,
  X,
  ChevronLeft,
  ChevronRight,
  Grid,
  CheckCircle2,
  Mail,
  Key,
  Bell,
  Headphones,
} from "lucide-react";
import { getAmenityIcon } from "../utils/amenityIcons";

import SEO from "../components/SEO";

// Reusable Image Loader Component Component
const ImageWithLoader = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-white/5"
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxImageLoaded, setLightboxImageLoaded] = useState(false);
  const [isAmenitiesExpanded, setIsAmenitiesExpanded] = useState(false);

  // Find project by id (slug)
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (project) {
        setLightboxImageLoaded(false);
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }
    },
    [project],
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (project) {
        setLightboxImageLoaded(false);
        setCurrentImageIndex((prev) =>
          prev === 0 ? project.images.length - 1 : prev - 1,
        );
      }
    },
    [project],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, handleNext, handlePrev]);

  if (!project) {
    return (
      <div className="min-h-dvh bg-orbit-dark flex items-center justify-center text-white">
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

  const handleOpenLightbox = (index: number) => {
    setLightboxImageLoaded(false);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-orbit-dark min-h-dvh text-white font-sans">
      <SEO
        title={project.title}
        description={`Explore ${project.title}, a premium ${project.category} by Orbit Hospitality in ${project.location}. Featuring ${project.bedrooms} bedrooms and world-class amenities.`}
        image={project.heroImage}
      />

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center backdrop-blur-sm"
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-orbit-gold transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20 z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="absolute top-6 left-6 text-gray-400 text-sm font-medium z-50">
              {currentImageIndex + 1} / {project.images.length}
            </div>

            <div className="relative w-full max-w-6xl h-full max-h-[85vh] flex items-center justify-center px-4 md:px-16">
              <button
                onClick={handlePrev}
                className="absolute left-4 md:left-8 text-white hover:text-orbit-gold p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-40 hidden md:flex"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <div className="relative w-full h-full flex items-center justify-center">
                {!lightboxImageLoaded && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 md:inset-8 bg-white/5 rounded-2xl"
                  />
                )}
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: lightboxImageLoaded ? 1 : 0,
                    scale: lightboxImageLoaded ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.3 }}
                  src={project.images[currentImageIndex]}
                  alt={`${project.title} view ${currentImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain select-none"
                  onLoad={() => setLightboxImageLoaded(true)}
                />
              </div>

              <button
                onClick={handleNext}
                className="absolute right-4 md:right-8 text-white hover:text-orbit-gold p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-40 hidden md:flex"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            {/* Mobile Controls */}
            <div className="absolute bottom-6 flex gap-4 md:hidden z-50">
              <button
                onClick={handlePrev}
                className="text-white hover:text-orbit-gold p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="text-white hover:text-orbit-gold p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-32 pb-8 container mx-auto px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/80 hover:text-orbit-gold transition-colors mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Properties
        </button>

        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
          {project.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300 mb-8">
          <span className="flex items-center gap-2 font-medium">
            <MapPin className="text-orbit-gold w-4 h-4" />
            {project.location}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-orbit-gold/50" />
          <span className="text-white/80">{project.category}</span>
        </div>

        {/* Gallery Collage */}
        <div className="relative rounded-2xl overflow-hidden group">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[40vh] md:h-[60vh]">
            {/* Main Image */}
            <div
              className="md:col-span-2 md:row-span-2 relative cursor-pointer overflow-hidden h-full group/main bg-white/5"
              onClick={() => handleOpenLightbox(0)}
            >
              <ImageWithLoader
                src={project.heroImage || (project.images[0] as string)}
                alt="Main view"
                className="w-full h-full object-cover group-hover/main:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover/main:bg-black/0 transition-colors pointer-events-none" />
            </div>

            {/* Sub Images Grid */}
            {project.images.slice(1, 5).map((img, idx) => (
              <div
                key={idx}
                className="hidden md:block relative cursor-pointer overflow-hidden h-full group/sub bg-white/5"
                onClick={() => handleOpenLightbox(idx + 1)}
              >
                <ImageWithLoader
                  src={img as string}
                  alt={`View ${idx + 2}`}
                  className="w-full h-full object-cover group-hover/sub:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover/sub:bg-black/0 transition-colors pointer-events-none" />
              </div>
            ))}
          </div>

          <button
            onClick={() => handleOpenLightbox(0)}
            className="absolute bottom-4 right-4 bg-white text-orbit-dark font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors active:scale-95 shadow-lg"
          >
            <Grid className="w-4 h-4" />
            Show all photos
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
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
              className="border-b border-white/10 pb-8 md:pb-12"
            >
              <h2 className="text-3xl font-serif font-bold mb-6 text-white">
                Oasis of Luxury
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                {project.description}
              </p>
            </motion.div>

            {/* Amenities Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-serif font-bold mb-8 text-white">
                What this place offers
              </h3>
              <div className="space-y-6">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                  {project.amenities
                    .slice(
                      0,
                      isAmenitiesExpanded ? project.amenities.length : 8,
                    )
                    .map((amenity, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-4 text-gray-300 group hover:text-white transition-colors"
                      >
                        <div className="text-orbit-gold mt-1 group-hover:scale-110 transition-transform">
                          {getAmenityIcon(amenity)}
                        </div>
                        <span className="text-lg">{amenity}</span>
                      </motion.li>
                    ))}
                </ul>

                {project.amenities.length > 8 && (
                  <button
                    onClick={() => setIsAmenitiesExpanded(!isAmenitiesExpanded)}
                    className="px-8 py-3.5 border border-white/20 rounded-xl font-bold text-white hover:bg-white hover:text-orbit-dark hover:border-white transition-all active:scale-95 shadow-lg flex items-center gap-2"
                  >
                    {isAmenitiesExpanded
                      ? "Show less"
                      : `Show all ${project.amenities.length} amenities`}
                  </button>
                )}
              </div>

              {/* Booking Flow Section */}
              <div className="mt-20 pt-12 border-t border-white/10">
                <h2 className="text-3xl font-serif font-bold mb-4 text-white">
                  After you book with Orbit
                </h2>
                <p className="text-gray-400 text-lg mb-10 max-w-2xl">
                  A clear, guest-friendly flow so you always know what happens
                  next after confirming your stay.
                </p>

                <div className="space-y-10">
                  {[
                    {
                      title: "Instant booking confirmation",
                      desc: "Your booking is confirmed as soon as the payment is successful. You will see the confirmation screen with all key details.",
                      icon: <CheckCircle2 className="w-6 h-6" />,
                    },
                    {
                      title: "Booking details & invoice",
                      desc: "We email you the itinerary, invoice and property details so you can easily share or refer to them later.",
                      icon: <Mail className="w-6 h-6" />,
                    },
                    {
                      title: "Check-in instructions",
                      desc: "Before arrival, you receive access and check-in instructions, Wi-Fi details and house rules for a smooth stay.",
                      icon: <Key className="w-6 h-6" />,
                    },
                    {
                      title: "Stay reminders",
                      desc: "We send timely reminders about your upcoming stay, check-in time and any special notes you should know.",
                      icon: <Bell className="w-6 h-6" />,
                    },
                    {
                      title: "24/7 guest support",
                      desc: "If you need anything before or during your stay, Orbit Guest Support is available round the clock.",
                      icon: <Headphones className="w-6 h-6" />,
                    },
                  ].map((step, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-6 max-w-3xl"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-orbit-gold">
                          {step.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2">
                          {step.title}
                        </h4>
                        <p className="text-gray-400 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Pricing & Booking */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 p-8 rounded-2xl border border-white/10 sticky top-32 backdrop-blur-sm"
            >
              <div className="space-y-4 mb-8">
                <div className="flex flex-col border-b border-white/10 pb-4">
                  <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                    Location
                  </span>
                  <span className="text-white">{project.location}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                    Property Type
                  </span>
                  <span className="text-white">{project.category}</span>
                </div>
              </div>

              <a
                href="tel:+917411747404"
                className="block w-full text-center bg-orbit-gold text-white font-bold py-4 rounded-full transition hover:bg-white hover:text-orbit-dark shadow-lg hover:shadow-xl"
              >
                Book This Property
              </a>

              <div className="mt-6 text-sm text-gray-400 text-center">
                Contact us directly for the best rates and availability.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
