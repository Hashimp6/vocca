import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12" id="about-us">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold mb-4">About Us</h3>
            <div className="flex items-center bg-white p-2 rounded">
              <img
                src="../../../public/vocca.svg"
                alt="Company Logo"
                className="h-8 w-8 filter-white"
              />
            </div>
            <p className="text-sm">
              We are committed to providing our customers with the best shopping
              experience possible. Our collection features the latest trends and
              timeless classics.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                className="hover:text-white transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>87 rosedale road NN27QE</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <a
                  href="tel:+1234567890"
                  className="hover:text-white transition-colors"
                >
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <a
                  href="mailto:support@example.com"
                  className="hover:text-white transition-colors"
                >
                  vocca@2024@example.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {year} Your Company Name. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                to="/terms"
                className="text-sm hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/privacy"
                className="text-sm hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/cookies"
                className="text-sm hover:text-white transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
