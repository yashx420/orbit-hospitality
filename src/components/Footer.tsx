import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

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
                <a
                  href="#about"
                  className="hover:text-orbit-gold transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-orbit-gold transition-colors"
                >
                  Amenities
                </a>
              </li>
              <li>
                <a
                  href="#rooms"
                  className="hover:text-orbit-gold transition-colors"
                >
                  Properties
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-orbit-gold transition-colors"
                >
                  Contact
                </a>
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
                  296, 7th Main Rd, VHBCS Layout, Nagavara, Bangalore-560045
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

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Orbit Hotels. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-orbit-gold transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-orbit-gold transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-orbit-gold transition-colors"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
