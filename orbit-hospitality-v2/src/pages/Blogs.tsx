import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { blogs } from "../data/blogs";
import { Calendar, Clock, ArrowRight } from "lucide-react";

import SEO from "../components/SEO";

const Blogs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-orbit-dark min-h-screen text-white font-sans pt-24 pb-20">
      <SEO
        title="The Orbit Journal"
        description="Dive into our curated collection of articles on design, luxury travel, and the art of modern hospitality. Stories of luxury and life from Orbit Hospitality."
      />
      {/* Hero Section */}
      <div className="container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="text-orbit-gold font-sans uppercase tracking-[0.2em] text-sm font-bold block mb-4">
            The Orbit Journal
          </span>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-white mb-6 md:mb-8">
            Stories of <span className="text-orbit-gold">Luxury</span> & Life
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Dive into our curated collection of articles on design, travel, and
            the art of modern hospitality.
          </p>
        </motion.div>
      </div>

      {/* Featured Blog (First One) */}
      <div className="container mx-auto px-6 mb-24">
        {blogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="group relative rounded-3xl overflow-hidden cursor-pointer"
            onClick={() => navigate(`/blogs/${blogs[0].id}`)}
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
            <img
              src={blogs[0].image}
              alt={blogs[0].title}
              className="w-full h-[60vh] object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 bg-gradient-to-t from-black via-black/60 to-transparent">
              <div className="flex items-center gap-4 text-orbit-gold text-sm font-bold uppercase tracking-wider mb-3">
                <span className="bg-orbit-gold/20 px-3 py-1 rounded-full border border-orbit-gold/30">
                  Featured
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {blogs[0].date}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 group-hover:text-orbit-gold transition-colors">
                {blogs[0].title}
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl line-clamp-2 md:line-clamp-none mb-6">
                {blogs[0].excerpt}
              </p>
              <div className="flex items-center gap-2 text-white font-bold group-hover:translate-x-2 transition-transform">
                Read Abstract
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Blog Grid */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.slice(1).map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col h-full"
              onClick={() => navigate(`/blogs/${blog.id}`)}
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 h-64">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {blog.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {blog.readTime}
                </span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-white mb-3 group-hover:text-orbit-gold transition-colors">
                {blog.title}
              </h3>

              <p className="text-gray-400 line-clamp-3 mb-6 flex-grow">
                {blog.excerpt}
              </p>

              <div className="flex items-center gap-2 text-orbit-gold text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                Read More <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
