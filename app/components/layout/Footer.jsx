//import { Twitter, Facebook, Instagram } from 'lucide-react'
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


const footerLinks = {
  Venuze: ['About', 'News', 'Careers', 'Investors'],
  Support: ['Listings your venue', 'Listing your service', 'Help center', 'FAQ'],
  Explore: ['Venue types', 'Venue features', 'Service options', 'Locations'],
  'Legal & Privacy': ['Terms of service', 'Payment & refund policy', 'Host agreement', 'Vendor agreement'],
}

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left — brand */}
          <div className="md:w-64 shrink-0">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-3">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path d="M4 6L16 26L28 6H20L16 14L12 6H4Z" fill="#FF5037" />
              </svg>
              <span className="font-bold text-lg">venuze</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Make it memorable—book the perfect venue and the pros who make it shine.
            </p>
          </div>

          {/* Center — links */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="text-sm font-semibold text-white mb-3">{heading}</h4>
                <ul className="flex flex-col gap-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-400 text-xs hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right — contact form */}
          <div className="md:w-64 shrink-0">
            <h4 className="text-sm font-semibold text-white mb-4">Get in Touch</h4>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-500 px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#FF5037] transition-colors"
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-500 px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#FF5037] transition-colors resize-none"
              />
              <button className="self-end bg-[#FF5037] hover:bg-[#e04430] text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaXTwitter  size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaFacebook size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaInstagram size={18} />
            </a>
          </div>
          <p className="text-gray-500 text-xs">© 2026 Venuze. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;