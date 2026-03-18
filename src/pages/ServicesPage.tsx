import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, TrendingUp, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Services from "../components/sections/Services"; // Reuse existing services
import { useProjects } from "../hooks/useProjects";
import { getAmenityIcon } from "../utils/amenityIcons";
import { CheckCircle2, Loader2 } from "lucide-react";

const AmenitiesTicker = () => {
  const { projects } = useProjects();

  const allAmenities = Array.from(
    new Set(projects.flatMap((p) => p.amenities)),
  );
  const topAmenities = allAmenities.slice(0, 15);

  if (topAmenities.length === 0) return null;

  return (
    <div className="w-full bg-orbit-gold/5 py-8 md:py-12 overflow-hidden relative border-y border-orbit-gold/10 scroll-m-0">
      <div className="container mx-auto px-4 md:px-6 mb-8 text-center">
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
          Our Top <span className="text-orbit-gold">Amenities</span>
        </h3>
      </div>
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-orbit-dark to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-orbit-dark to-transparent z-10" />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 45, repeat: Infinity }}
        className="flex gap-6 w-max items-center px-4"
      >
        {[...topAmenities, ...topAmenities].map((amenity, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 md:gap-3 bg-white/5 border border-white/10 px-6 py-4 md:px-8 md:py-5 rounded-2xl text-orbit-gold shadow-lg backdrop-blur-sm whitespace-nowrap"
          >
            {getAmenityIcon(
              amenity,
              "w-5 h-5 md:w-6 md:h-6 flex-shrink-0 text-orbit-gold",
            )}
            <span className="text-base md:text-lg font-semibold tracking-wide text-white">
              {amenity}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const ListYourProperty = () => {
  const [formState, setFormState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/info@orbithotels.in",
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        setFormState("success");
        form.reset();
        setTimeout(() => setFormState("idle"), 5000); // Reset after 5s
      } else {
        setFormState("error");
      }
    } catch (error) {
      setFormState("error");
    }
  };

  return (
    <section className="py-16 md:py-24 bg-orbit-dark relative overflow-hidden z-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <span className="text-orbit-gold font-sans uppercase tracking-[0.2em] text-xs md:text-sm font-bold block mb-3 md:mb-4">
              Partner With Us
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight">
              List Your <span className="text-orbit-gold">Luxury Property</span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed">
              Unlock the true potential of your real estate. We provide premium
              hospitality management, ensuring your property is flawlessly
              maintained while optimizing revenue through our elite guest
              network.
            </p>

            <div className="space-y-6 mb-10">
              {[
                {
                  title: "Maximized Revenue",
                  desc: "Dynamic pricing and data-driven occupancy strategies for the highest possible yields.",
                  icon: TrendingUp,
                },
                {
                  title: "Elite Guest Network",
                  desc: "Strategic marketing to a verified network of corporate and premium travelers.",
                  icon: Star,
                },
                {
                  title: "End-to-End Management",
                  desc: "From 24/7 concierge and professional styling to tenant acquisition and maintenance.",
                  icon: ShieldCheck,
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-orbit-gold/10 flex items-center justify-center shrink-0 border border-orbit-gold/20">
                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-orbit-gold" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm md:text-base text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 font-bold text-orbit-dark bg-orbit-gold rounded-full overflow-hidden transition-all hover:scale-105"
            >
              <span className="relative flex items-center gap-2 text-sm md:text-base">
                Contact Us
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>

          {/* Right: Image / Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            <div className="absolute -inset-4 bg-orbit-gold/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-t from-orbit-dark/95 via-orbit-dark/40 to-transparent z-10" />
              <img
                src="/projects/tulip-villa/1-2.jpg"
                alt="Luxury Property Management"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 p-6 md:p-8 z-20 flex flex-col justify-end">
                <div className="bg-orbit-dark/70 backdrop-blur-xl rounded-3xl p-4 md:p-8 border border-white/20 shadow-2xl relative overflow-hidden transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-orbit-gold/10 to-transparent pointer-events-none" />

                  <div className="relative z-10">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                        Get Started
                      </h3>
                      <p className="text-sm md:text-base text-gray-300">
                        Leave your details and we'll be in touch!
                      </p>
                    </div>

                    {formState === "success" ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-8 text-center"
                      >
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 border border-green-500/30">
                          <CheckCircle2 className="w-8 h-8 text-green-400" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">
                          Thank You!
                        </h4>
                        <p className="text-gray-300">
                          Your details have been received. Our team will contact
                          you shortly.
                        </p>
                      </motion.div>
                    ) : (
                      <form
                        onSubmit={handleSubmit}
                        className="space-y-3 md:space-y-4"
                      >
                        {/* FormSubmit Configuration */}
                        <input
                          type="hidden"
                          name="_subject"
                          value="New Property Listing Inquiry!"
                        />
                        <input type="hidden" name="_template" value="box" />
                        <input
                          type="text"
                          name="_honey"
                          style={{ display: "none" }}
                        />

                        <div className="grid grid-cols-2 gap-2 md:gap-4">
                          <input
                            type="text"
                            name="First Name"
                            placeholder="First Name"
                            required
                            disabled={formState === "submitting"}
                            className="w-full bg-white/10 text-white placeholder:text-gray-400 px-4 py-2.5 md:py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-orbit-gold focus:bg-white/20 transition-all disabled:opacity-50 text-sm md:text-base"
                          />
                          <input
                            type="text"
                            name="Last Name"
                            placeholder="Last Name"
                            required
                            disabled={formState === "submitting"}
                            className="w-full bg-white/10 text-white placeholder:text-gray-400 px-4 py-2.5 md:py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-orbit-gold focus:bg-white/20 transition-all disabled:opacity-50 text-sm md:text-base"
                          />
                        </div>

                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          required
                          disabled={formState === "submitting"}
                          className="w-full bg-white/10 text-white placeholder:text-gray-400 px-4 py-2.5 md:py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-orbit-gold focus:bg-white/20 transition-all disabled:opacity-50 text-sm md:text-base"
                        />

                        <input
                          type="tel"
                          name="Phone"
                          placeholder="Phone Number"
                          required
                          disabled={formState === "submitting"}
                          className="w-full bg-white/10 text-white placeholder:text-gray-400 px-4 py-2.5 md:py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-orbit-gold focus:bg-white/20 transition-all disabled:opacity-50 text-sm md:text-base"
                        />

                        <div className="relative">
                          <select
                            name="Property Category"
                            required
                            defaultValue=""
                            disabled={formState === "submitting"}
                            className="w-full bg-white/10 text-white px-4 py-2.5 md:py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-orbit-gold focus:bg-white/20 transition-all disabled:opacity-50 appearance-none text-sm md:text-base"
                          >
                            <option
                              value=""
                              disabled
                              className="bg-orbit-dark text-gray-400"
                            >
                              Select Property Category
                            </option>
                            <option
                              value="Villas"
                              className="bg-orbit-dark text-white"
                            >
                              Villas
                            </option>
                            <option
                              value="Hotels"
                              className="bg-orbit-dark text-white"
                            >
                              Hotels
                            </option>
                            <option
                              value="Serviced Apartments"
                              className="bg-orbit-dark text-white"
                            >
                              Serviced Apartments
                            </option>
                            <option
                              value="Other"
                              className="bg-orbit-dark text-white"
                            >
                              Other
                            </option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </div>
                        </div>

                        <input
                          type="text"
                          name="Location"
                          placeholder="Property Location (City/Area)"
                          required
                          disabled={formState === "submitting"}
                          className="w-full bg-white/10 text-white placeholder:text-gray-400 px-4 py-2.5 md:py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-orbit-gold focus:bg-white/20 transition-all disabled:opacity-50 text-sm md:text-base"
                        />

                        {formState === "error" && (
                          <p className="text-red-400 text-sm text-center">
                            Something went wrong. Please try again.
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={formState === "submitting"}
                          className="w-full bg-gradient-to-r from-orbit-gold to-yellow-600 text-orbit-dark font-bold py-3 md:py-4 rounded-xl hover:shadow-lg hover:shadow-orbit-gold/20 transition-all duration-300 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 text-sm md:text-base"
                        >
                          {formState === "submitting" ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Submit Details
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ServicesPage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Our Services - Orbit Hospitality"
        description="Explore the world-class services and amenities offered by Orbit Hospitality. Partner with us to list your luxury property for premium management."
      />
      <div className="bg-orbit-dark min-h-screen">
        {/* Parallax Hero */}
        <section className="relative h-[60dvh] md:h-[70vh] flex items-center justify-center overflow-hidden">
          <motion.div
            style={{ y, opacity }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-orbit-dark/80 via-orbit-dark/50 to-orbit-dark z-10" />
            <img
              src="/orbit-villas/tulip-villa-by-orbit-hospitality/hall.jpg"
              alt="Orbit Hospitality Services"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="relative z-20 container mx-auto px-4 md:px-6 text-center mt-20 md:mt-16">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-tight mb-4 md:mb-6"
            >
              Elevated{" "}
              <span className="italic font-light text-orbit-gold">Living</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light"
            >
              Discover unparalleled hospitality, top-tier amenities, and premium
              property management services.
            </motion.p>
          </div>
        </section>

        {/* Existing Services Component */}
        <div className="relative z-20 bg-orbit-dark">
          <Services />
        </div>

        {/* Top Amenities Ticker */}
        <AmenitiesTicker />

        {/* List Your Property Section */}
        <ListYourProperty />
      </div>
    </>
  );
};

export default ServicesPage;
