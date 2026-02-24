import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const collections = [
  {
    id: "service-apartments",
    title: "Service Apartments",
    image: "/projects/White lotus/6-2.jpg",
    description:
      "The perfect blend of hotel luxury and home comfort. Ideal for both short and long stays, featuring modern aesthetics and smart home technology.",
  },
  {
    id: "hotels",
    title: "Hotels",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    description:
      "Sophisticated suites and world-class service in the heart of the city. Our luxury hotels offer an unparalleled hospitality experience with premium amenities.",
  },
  {
    id: "party-venues",
    title: "Party Venues",
    image:
      "/Orbit Party Venue/White Lotus Penthouse_OpenTerrace_3BHK_AC_BBQ_/07d027a6-3ae8-4bfd-b61d-ac1e2f57eb1c (1).jpeg",
    description:
      "Celebrate your special moments in style. Premium venues designed for unforgettable gatherings, featuring spacious layouts and top-tier amenities.",
  },
  {
    id: "villas",
    title: "Villas",
    image: "/projects/Tulip Villa/1-2.jpg",
    description:
      "Experience the ultimate privacy and luxury in our handpicked collection of premium villas. Perfect for families and groups who desire a home away from home.",
  },
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

  const x = useTransform(smoothProgress, [0, 1], ["1%", "-65%"]);

  return (
    <section
      ref={targetRef}
      id="rooms"
      className={`relative bg-orbit-dark ${isMobile ? "h-auto py-20" : "h-[400vh]"}`}
    >
      <div
        className={`${isMobile ? "" : "sticky top-0 h-dvh flex items-center overflow-hidden"}`}
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
            Our <span className="text-orbit-gold">Collection</span>
          </motion.h2>
          <p className="text-gray-400 text-lg ml-1">
            {isMobile ? "Swipe to explore" : "Scroll to explore our categories"}
          </p>
        </div>

        {/* Content Container */}
        <motion.div
          style={isMobile ? {} : { x }}
          className={`flex gap-10 items-center ${isMobile ? "overflow-x-auto snap-x snap-mandatory px-6 pb-12 w-full no-scrollbar" : "pl-10"}`}
        >
          {collections.map((item) => (
            <div
              key={item.id}
              className={`group relative flex-shrink-0 overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl cursor-pointer
                ${isMobile ? "w-[90vw] h-[65vh] snap-center" : "w-[65vw] h-[75vh] mt-16"}
              `}
              onClick={() => navigate(`/category/${item.id}`)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />

              <div className="absolute bottom-0 p-8 md:p-12 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-16 h-1.5 bg-orbit-gold mb-6 origin-left transition-all duration-500 group-hover:w-32" />
                <h3 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 group-hover:text-orbit-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-lg md:text-xl mb-8 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 md:delay-100 leading-relaxed max-w-3xl">
                  {item.description}
                </p>
                <div className="flex justify-end items-center">
                  <button className="bg-white text-orbit-dark px-10 py-4 rounded-full text-base font-bold md:opacity-0 group-hover:opacity-100 transition-all duration-500 md:delay-200 hover:bg-orbit-gold hover:text-white transform md:translate-y-8 group-hover:translate-y-0">
                    Explore Now
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
