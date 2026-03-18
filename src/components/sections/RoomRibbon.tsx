import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
              <CollectionCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CollectionCard = ({ item, index }: { item: any; index: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotate = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 2]), {
    stiffness: 150,
    damping: 20,
  });

  function onMouseMove(e: React.MouseEvent<any>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="min-w-[75vw] sm:min-w-0 snap-center"
    >
      <div onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
        <Link to={`/properties/${item.id}`} className="block group">
          <motion.div
            style={{ rotate }}
            className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl transition-[border-color,box-shadow] duration-500 group-hover:border-orbit-gold/40 group-hover:shadow-orbit-gold/10"
          >
            {/* Static Background Image */}
            <motion.img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 1 : -1 }}
              transition={{ duration: 0.6 }}
            />

            {/* Glare/Shine Effect */}
            <motion.div
              className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: useTransform(
                  [mouseX, mouseY],
                  ([x, y]: any) =>
                    `radial-gradient(circle at ${50 + x * 100}% ${
                      50 + y * 100
                    }%, rgba(255,255,255,0.1) 0%, transparent 60%)`,
                ),
              }}
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-20" />

            {/* Content */}
            <div className="absolute inset-0 p-8 md:p-10 z-30 flex flex-col justify-end">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.4 }}
              >
                <div className="h-1 w-12 bg-orbit-gold mb-4 group-hover:w-20 transition-all duration-500 origin-left" />
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 group-hover:text-orbit-gold transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-base md:text-lg font-light italic overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-500">
                  {item.desc}
                </p>
              </motion.div>
            </div>

            {/* Card Number */}
            <span className="absolute top-6 right-8 text-6xl font-serif font-bold text-white/[0.05] pointer-events-none z-0">
              0{index + 1}
            </span>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default RoomRibbon;
