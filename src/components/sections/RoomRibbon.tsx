import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const collections = [
  {
    id: "serviced-apartments",
    title: "Serviced Apartments",
    image: "/projects/white-lotus/6-2.jpg",
    desc: "Comfort & Convenience",
  },
  {
    id: "hotels",
    title: "Hotels",
    image:
      "/orbit-serviced-apartments/orbit-celosia-luxe-_2bhk_hebbal_10-min-from-aster/orbit-hotel-41.jpg",
    desc: "Premium Urban Luxury",
  },
  {
    id: "party-venues",
    title: "Party Venues",
    image:
      "/orbit-party-venue/white-lotus-penthouse_openterrace_3bhk_ac_bbq_/hall.jpeg",
    desc: "Celebrate in Style",
  },
  {
    id: "villas",
    title: "Villas",
    image: "/projects/tulip-villa/1-2.jpg",
    desc: "Luxury Private Stays",
  },
];

const RoomRibbon = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      checkScroll();
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth * 0.8
          : scrollLeft + clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section
      id="collection"
      className="relative py-24 bg-orbit-dark overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 text-center md:text-left">
              Our <span className="text-orbit-gold">Collection</span>
            </h2>
            <div className="h-1.5 w-32 bg-orbit-gold mx-auto md:mx-0" />
          </motion.div>
        </div>

        <div className="relative group/scroll">
          {/* Navigation Arrows - Mobile Only - Side Positioned */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-r-xl bg-orbit-dark/40 backdrop-blur-md border border-white/10 md:hidden transition-all ${
              canScrollLeft
                ? "text-orbit-gold opacity-100"
                : "text-gray-600 opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll Left"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-l-xl bg-orbit-dark/40 backdrop-blur-md border border-white/10 md:hidden transition-all ${
              canScrollRight
                ? "text-orbit-gold opacity-100"
                : "text-gray-600 opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll Right"
          >
            <ChevronRight size={24} />
          </button>

          <div
            ref={scrollRef}
            className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 overflow-x-auto sm:overflow-x-visible pb-8 sm:pb-0 hide-scrollbar snap-x snap-mandatory scroll-smooth px-4 sm:px-0"
          >
            {collections.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                className="min-w-[75vw] sm:min-w-0 snap-center"
              >
                <Link
                  to={`/properties/${item.id}`}
                  className="relative aspect-[4/5] block group overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl transition-all duration-500 hover:border-orbit-gold/30"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-10">
                    <div className="h-1 w-12 bg-orbit-gold mb-4 origin-left transition-all duration-500 group-hover:w-20" />
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 group-hover:text-orbit-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-base md:text-lg font-light italic opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {item.desc}
                    </p>
                  </div>

                  <span className="absolute top-6 right-8 text-6xl font-serif font-bold text-white/[0.03] pointer-events-none select-none z-0">
                    0{index + 1}
                  </span>

                  {/* Decorative glow on hover */}
                  <div className="absolute -inset-px rounded-[2.5rem] border border-orbit-gold/0 group-hover:border-orbit-gold/20 transition-colors duration-500 pointer-events-none" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomRibbon;
