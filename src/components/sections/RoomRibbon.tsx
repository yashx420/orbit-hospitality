import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
  return (
    <section
      id="collection"
      className="relative py-24 bg-orbit-dark overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 text-center md:text-left">
            Our <span className="text-orbit-gold">Collection</span>
          </h2>
          <div className="h-1.5 w-32 bg-orbit-gold mx-auto md:mx-0" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
    </section>
  );
};

export default RoomRibbon;
