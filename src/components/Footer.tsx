import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-orbit-dark border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <img
              src="/logo_half.png"
              alt="Orbit Hotels"
              className="h-14 w-auto"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Redefining hospitality with luxury accommodations and exceptional
              service. Your comfort is our priority.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-orbit-gold transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-orbit-gold transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/properties/all"
                  className="hover:text-orbit-gold transition-colors"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-orbit-gold transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orbit-gold shrink-0" />
                <span>
                  3rd Floor, 296, 7th Main Rd, Vyalikaval HBCS Layout, Nagavara,
                  Bengaluru, Karnataka 560045
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orbit-gold shrink-0" />
                <span>+91 74117 47404</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orbit-gold shrink-0" />
                <span>info@orbithotels.in</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-gray-400 text-sm">
              Subscribe for exclusive offers and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white/5 border border-white/10 px-4 py-2 text-white w-full focus:outline-none focus:border-orbit-gold"
              />
              <button className="bg-orbit-gold text-orbit-dark px-4 py-2 font-bold hover:bg-white transition-colors">
                GO
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row-reverse justify-between items-center gap-8 md:gap-4 text-sm">
          {/* Social Links - Visible on both, but more prominent on mobile */}
          <div className="flex justify-center md:justify-end space-x-8 md:space-x-6">
            <a
              href="https://www.facebook.com/profile.php?id=61561974802868"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:text-orbit-gold hover:border-orbit-gold transition-all"
            >
              <Facebook size={24} className="md:w-5 md:h-5" />
            </a>
            <a
              href="https://www.instagram.com/orbit_hotels_/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:text-orbit-gold hover:border-orbit-gold transition-all"
            >
              <Instagram size={24} className="md:w-5 md:h-5" />
            </a>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-4 text-center md:text-left text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} Orbit Hotels. All rights
              reserved.
            </p>
            <span className="hidden md:block">|</span>
            <p>
              Powered by{" "}
              <a
                href="https://kevnitdigital.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orbit-gold transition-colors"
              >
                Kevnit Digital Solutions
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
