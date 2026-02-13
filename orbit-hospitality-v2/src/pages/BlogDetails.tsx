import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { blogs } from "../data/blogs";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";

import SEO from "../components/SEO";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = blogs.find((b) => b.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-orbit-dark flex items-center justify-center text-white">
        <SEO
          title="Article Not Found"
          description="The requested article could not be found."
        />
        <div className="text-center">
          <h2 className="text-3xl font-serif mb-4">Article Not Found</h2>
          <button
            onClick={() => navigate("/blogs")}
            className="text-orbit-gold hover:underline"
          >
            Back to Journal
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-orbit-dark min-h-screen text-white font-sans pb-20">
      <SEO title={blog.title} description={blog.excerpt} image={blog.image} />
      {/* Hero Image */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-orbit-dark via-black/50 to-transparent" />

        <div className="absolute top-24 left-6 md:left-12">
          <button
            onClick={() => navigate("/blogs")}
            className="flex items-center gap-2 text-white/80 hover:text-orbit-gold transition-colors bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            All Articles
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-orbit-dark/80 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl mb-12"
          >
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6 uppercase tracking-wider font-semibold">
              <span className="flex items-center gap-2 text-orbit-gold">
                <Calendar className="w-4 h-4" /> {blog.date}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" /> {blog.author}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> {blog.readTime}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">
              {blog.title}
            </h1>

            <div className="border-t border-white/10 pt-6 flex justify-between items-center">
              <span className="text-lg italic text-gray-400">
                "{blog.excerpt}"
              </span>
              <button className="text-orbit-gold hover:text-white transition-colors">
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="prose prose-lg prose-invert max-w-none text-gray-300"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Footer Call to Action */}
          <div className="mt-20 border-t border-white/10 pt-16 text-center">
            <h3 className="text-3xl font-serif text-white mb-6">
              Experience It Yourself
            </h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Ready to witness the future of hospitality? Book your stay at one
              of our flagship properties today.
            </p>
            <button
              onClick={() => navigate("/properties/villas")}
              className="bg-orbit-gold text-white font-bold py-4 px-10 rounded-full transition hover:bg-white hover:text-orbit-dark hover:scale-105 transform duration-300 shadow-lg shadow-orbit-gold/20"
            >
              Explore Properties
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogDetails;
