
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import {footerLinks} from "@/app/constants"




const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 ">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left — brand */}
          <div className="md:w-64 shrink-0  mt-24">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-3">
              
  <Image
    src="/assets/images/venuzelogo.png"
    alt="Venuze Logo"
    width={45}
    height={45}
    priority
  />

  <span className="text-white font-bold text-xl tracking-tight">
    venuze
  </span>

              <span className="font-bold text-lg">venuze</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Make it memorable—book the perfect venue and the pros who make it shine.
            </p>
          </div>

          {/* CenterLinkss */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
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

          {/* Right section form */}
          <div className="md:w-64 shrink-0 mt-24">
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
             <button
  disabled
  className="self-end bg-[#FF5037] text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors opacity-70 cursor-not-allowed"
>
  Send
</button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
     
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