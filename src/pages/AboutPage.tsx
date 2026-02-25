import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, Shield, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "50+", label: "Luxury Properties" },
  { value: "10k+", label: "Happy Guests" },
  { value: "4.9", label: "Average Rating" },
];

const values = [
  {
    icon: <Star className="w-6 h-6 text-orbit-gold" />,
    title: "Uncompromising Quality",
    description:
      "Every property in our portfolio is meticulously selected and maintained to the highest standards of luxury.",
  },
  {
    icon: <Shield className="w-6 h-6 text-orbit-gold" />,
    title: "Absolute Privacy",
    description:
      "We understand the value of discretion. Our properties offer the perfect sanctuary away from the public eye.",
  },
  {
    icon: <Clock className="w-6 h-6 text-orbit-gold" />,
    title: "24/7 Concierge",
    description:
      "Our dedicated team is available around the clock to cater to your every need and preference.",
  },
  {
    icon: <Users className="w-6 h-6 text-orbit-gold" />,
    title: "Personalized Service",
    description:
      "We tailor every aspect of your stay to your unique preferences, ensuring an unforgettable experience.",
  },
];

const AboutPage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      <SEO
        title="About Orbit Hospitality - Redefining Luxury Stays"
        description="Discover the story behind Orbit Hospitality. We blend modern luxury with traditional warmth across our premium villas, hotels, and serviced apartments in Bangalore."
      />

      <div className="bg-orbit-dark min-h-screen pb-16 overflow-hidden">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
          <motion.div
            style={{ y, opacity }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-orbit-dark/70 via-orbit-dark/50 to-orbit-dark z-10" />
            <img
              src="/projects/peace-lily/1-3.jpg"
              alt="Orbit Hospitality Luxury Property"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="relative z-20 container mx-auto px-6 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-orbit-gold font-sans uppercase tracking-[0.3em] text-sm md:text-base font-semibold block mb-4"
            >
              The Orbit Legacy
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6"
            >
              Redefining <br className="hidden md:block" />
              <span className="italic font-light">Hospitality</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-24 h-1 bg-orbit-gold mx-auto"
            />
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-24 relative z-20 bg-orbit-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="prose prose-lg prose-invert mx-auto text-center"
              >
                <p className="text-xl md:text-2xl font-serif text-gray-200 leading-relaxed mb-8">
                  "At Orbit Hotels, we believe that every journey should be a
                  memorable experience. Established with a vision to offer
                  exquisite accommodations, we blend modern luxury with
                  traditional warmth."
                </p>
                <p className="text-gray-400">
                  Since our inception in 2013, Orbit Hospitality has set the
                  gold standard for premium stays in Bangalore. What began as a
                  single luxury service apartment has blossomed into an
                  exclusive portfolio of sophisticated high-end villas, grand
                  party venues, and meticulously appointed hotels.
                </p>
                <p className="text-gray-400 mt-4">
                  We don't just offer a place to stay; we curate sanctuaries.
                  From our private lawns and open terrace penthouses to our
                  smart home integrations and impeccable 24/7 service, every
                  detail is crafted for the discerning traveler who appreciates
                  the finer things in life.
                </p>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/10 mt-16">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-5xl font-serif font-bold text-orbit-gold mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm uppercase tracking-wider text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Visual Break / Image Grid */}
        <section className="py-12 bg-orbit-dark relative z-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-[400px] rounded-2xl overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop"
                  alt="Luxury Interior Details"
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-[400px] rounded-2xl overflow-hidden hidden md:block"
              >
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
                  alt="Hotel Lobby"
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="h-[400px] rounded-2xl overflow-hidden hidden lg:block"
              >
                <img
                  src="https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?q=80&w=2062&auto=format&fit=crop"
                  alt="Premium Suite"
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 md:py-24 bg-orbit-dark relative z-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-serif font-bold text-white mb-6"
              >
                Our Core Values
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                className="w-16 h-1 bg-orbit-gold mx-auto"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-orbit-gold/10 rounded-full flex items-center justify-center mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 relative z-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-orbit-gold/20 via-orbit-gold/10 to-transparent border border-orbit-gold/20 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                  Experience the Extraordinary
                </h2>
                <p className="text-gray-300 text-lg max-w-xl">
                  Ready to discover your perfect getaway? Browse our exclusive
                  collection of properties and book your stay today.
                </p>
              </div>
              <Link
                to="/properties/all"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-orbit-dark bg-orbit-gold rounded-full overflow-hidden transition-all hover:scale-105 shrink-0"
              >
                <span className="relative flex items-center gap-2">
                  View Properties
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
