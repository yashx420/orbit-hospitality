import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "Raakaa Mukherjee",
    rating: 5,
    text: "We got this hotel after searching 2-3 other hotels in the area. The rooms are premium, the staff is extremely helpful including the manager. They really helped us in so many ways going out of the way.",
  },
  {
    name: "Bahar Uddin",
    rating: 5,
    text: "The rooms here are incredibly spacious and comfortable, perfect for our family getaway. The kids loved the extra space to play, and the staff was so friendly and accommodating. Definitely a place we'll return to.",
  },
  {
    name: "Mammuu K.",
    rating: 5,
    text: "I had a great experience at Orbit Hotel in Bangalore. The staff was friendly and professional, the rooms were clean and well-maintained, and the location was convenient for both business and travel. The amenities were modern, and the in-house dining was impressive. Overall, a comfortable and pleasant stay — highly recommended",
  },
];

const ReviewCard = ({
  review,
  idx,
}: {
  review: (typeof reviews)[0];
  idx: number;
}) => (
  <motion.div
    key={idx}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: idx * 0.1 }}
    className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 rounded-[2rem] flex flex-col justify-between hover:border-orbit-gold/40 transition-colors group relative overflow-hidden h-full"
  >
    <Quote className="absolute -bottom-8 -right-8 w-40 h-40 text-orbit-gold/5 group-hover:text-orbit-gold/10 transition-colors -rotate-12" />

    <div className="relative z-10">
      <div className="flex items-center gap-1 mb-6">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-orbit-gold text-orbit-gold" />
        ))}
      </div>

      <p className="text-gray-300 text-lg leading-relaxed italic mb-8">
        "{review.text}"
      </p>
    </div>

    <div className="relative z-10 mt-auto pt-6 border-t border-white/10">
      <p className="font-serif font-bold text-xl text-white">{review.name}</p>
      <div className="flex items-center gap-2 mt-2 text-sm text-gray-400 font-medium">
        <span className="w-2 h-2 rounded-full bg-green-500" />
        Verified Guest
      </div>
    </div>
  </motion.div>
);

const Testimonials = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const handlePrev = () => {
    setCurrentReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  return (
    <section className="bg-orbit-dark py-24 relative overflow-hidden text-white font-sans border-t border-orbit-gold/10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[500px] bg-orbit-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <p className="text-orbit-gold font-bold tracking-[0.2em] uppercase text-sm">
            Guest Experiences
          </p>
          <h2 className="text-5xl font-serif font-bold text-white">
            What Our Guests Say
          </h2>
        </motion.div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 items-stretch">
          {reviews.map((review, idx) => (
            <ReviewCard key={idx} review={review} idx={idx} />
          ))}
        </div>

        {/* Mobile: Single card carousel with arrows */}
        <div className="md:hidden">
          <div className="relative min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full"
              >
                <ReviewCard review={reviews[currentReview]} idx={0} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-orbit-dark transition-all active:scale-90"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-3">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentReview(idx)}
                  className={`rounded-full transition-all duration-300 ${
                    idx === currentReview
                      ? "w-8 h-3 bg-orbit-gold"
                      : "w-3 h-3 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-orbit-dark transition-all active:scale-90"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
