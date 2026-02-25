import { motion } from "framer-motion";
import { CheckCircle2, Mail, Key, Bell, Headphones } from "lucide-react";

const bookingSteps = [
  {
    title: "Instant booking confirmation",
    desc: "Your booking is confirmed as soon as the payment is successful. You will see the confirmation screen with all key details.",
    icon: <CheckCircle2 className="w-6 h-6" />,
  },
  {
    title: "Booking details & invoice",
    desc: "We email you the itinerary, invoice and property details so you can easily share or refer to them later.",
    icon: <Mail className="w-6 h-6" />,
  },
  {
    title: "Check-in instructions",
    desc: "Before arrival, you receive access and check-in instructions, Wi-Fi details and house rules for a smooth stay.",
    icon: <Key className="w-6 h-6" />,
  },
  {
    title: "Stay reminders",
    desc: "We send timely reminders about your upcoming stay, check-in time and any special notes you should know.",
    icon: <Bell className="w-6 h-6" />,
  },
  {
    title: "24/7 guest support",
    desc: "If you need anything before or during your stay, Orbit Guest Support is available round the clock.",
    icon: <Headphones className="w-6 h-6" />,
  },
];

const BookingFlow = () => {
  return (
    <section className="bg-orbit-dark py-24 relative overflow-hidden text-white font-sans border-t border-orbit-gold/10">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">
            After you book with Orbit
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            A clear, guest-friendly flow so you always know what happens next
            after confirming your stay.
          </p>
        </motion.div>

        <div className="space-y-10 max-w-3xl">
          {bookingSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-orbit-gold">
                  {step.icon}
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">
                  {step.title}
                </h4>
                <p className="text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingFlow;
