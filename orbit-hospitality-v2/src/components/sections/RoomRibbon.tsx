import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { Link } from "react-router-dom";

const rooms = [
  {
    id: "white-lotus",
    title: "White Lotus",
    image: "/projects/White lotus/6-2.jpg",
    price: "Luxury",
    desc: "A serene escape.",
  },
  {
    id: "peace-lily",
    title: "Peace Lily",
    image: "/projects/Peace Lily/1-3.jpg",
    price: "Premium",
    desc: "Nature's embrace.",
  },
  {
    id: "tulip-villa",
    title: "Tulip Villa",
    image: "/projects/Tulip Villa/4.jpg",
    price: "Exclusive",
    desc: "Modern elegance.",
  },
  {
    id: "orchid-suite",
    title: "Orchid Suite",
    image: "/projects/Tulip Villa/7.jpg",
    price: "Elite",
    desc: "Ultimate comfort.",
  },
];

const RoomRibbon = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-orbit-dark">
      {/* Sticky Container - Now using Flex Col to separate Header and Carousel */}
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* Header - Static (no longer absolute) with ample padding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-20 px-8 md:px-24 z-20 flex-shrink-0"
        >
          <h2 className="text-5xl md:text-8xl font-serif font-bold text-white mb-6">
            Our Collection
          </h2>
          <div className="h-1 w-32 bg-orbit-gold mb-12" />
        </motion.div>

        {/* Carousel Container - Takes remaining height */}
        <div className="flex-grow flex items-center">
          <motion.div
            style={{ x }}
            className="flex gap-8 md:gap-16 pl-[8vw] items-center"
          >
            {rooms.map((room, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, y: 100, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 15,
                  delay: index * 0.1, // Stagger effect
                }}
                className="relative flex-shrink-0"
              >
                <Link
                  to={`/project/${room.id}`}
                  className="relative w-[280px] md:w-[450px] h-[45vh] md:h-[55vh] block group perspective-1000"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-full h-full rounded-[2rem] overflow-hidden relative shadow-2xl border border-white/10"
                  >
                    <img
                      src={room.image}
                      alt={room.title}
                      className="w-full h-full object-cover md:grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />

                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 bg-gradient-to-t from-black/90 to-transparent">
                      <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {room.title}
                      </h3>
                      <p className="text-orbit-gold text-lg md:text-xl font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {room.desc}
                      </p>
                    </div>
                  </motion.div>

                  <span className="absolute -top-16 -left-8 text-[10rem] font-serif font-bold text-white/10 stroke-text-gold pointer-events-none select-none z-0">
                    0{index + 1}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RoomRibbon;
