'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const vendors = [
  { name: 'Caterers', image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80' },
  { name: 'Decorators', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80' },
  { name: 'Photographers', image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=80' },
  { name: 'Entertainment', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80' },
  { name: 'Florists', image: 'https://images.unsplash.com/photo-1487530811015-780f6b80f6d3?w=400&q=80' },
]

const steps = [
  {
    n: '1',
    title: 'Search & filter',
    desc: 'Browse our curated collection of venues and event professionals. Use smart filters, high-quality visuals, and authentic reviews to find options that fit your needs, style, and budget.',
  },
  {
    n: '2',
    title: 'Compare & message',
    desc: 'Communicate directly with venue hosts and service providers. Request tailored quotes, discuss requirements, and design every detail of your event or project with confidence.',
  },
  {
    n: '3',
    title: 'Book & add services',
    desc: 'Secure your choices with ease through our protected booking system. With clear agreements, secure payments, and ongoing support, you can move forward knowing everything is handled.',
  },
]

const howItWorksImages = [
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&q=80',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&q=80',
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=300&q=80',
  'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=300&q=80',
]

const VendorsSection = () => {
  const scrollRef = useRef(null)
  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 280, behavior: 'smooth' })

  return (
    <>
      {/* ── Vendors ── */}
      <section className="py-16 px-4 md:px-8 bg-[#FDF1D2]">
        <div className="max-w-7xl mx-auto">
          {/* Heading — outlined box */}
          <div className="border-2 border-gray-800 rounded-xl p-6 text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Complete Your Event with our Trusted Vendors
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
              Venues are just the beginning. Discover caterers, decorators, photographers,
              entertainment, and more all in one place, ready to bring your event project to life.
            </p>
          </div>

          {/* Vendor carousel */}
          <div className="relative">
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-2 no-scrollbar"
            >
              {vendors.map((v) => (
                <div
                  key={v.name}
                  className="relative shrink-0 w-52 md:w-60 h-56 rounded-2xl overflow-hidden cursor-pointer group"
                >
                  <img
                    src={v.image}
                    alt={v.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <p className="absolute bottom-4 left-4 text-white font-bold text-base">{v.name}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => scroll(-1)}
              className="absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 z-10"
            >
              <ChevronLeft size={18} className="text-gray-700" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 z-10"
            >
              <ChevronRight size={18} className="text-gray-700" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Grow Your Business CTA ── */}
      <section className="py-8 px-4 md:px-8 bg-[#FDF1D2]">
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative"
            style={{ background: 'linear-gradient(135deg, #FF786A 0%, #FF4F37 60%, #FFC331 100%)' }}
          >
            <div className="max-w-sm">
              <h3 className="text-white font-bold text-2xl md:text-3xl leading-tight mb-2">
                Grow Your Business with Venuze
              </h3>
              <p className="text-white/80 text-sm mb-6">
                Showcase your services to thousands of event organizers and creators searching for
                talent like yours.
              </p>
              <button className="bg-black text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors">
                Join as a Vendor
              </button>
            </div>

            {/* Decorative illustration placeholder */}
            <div className="w-48 h-32 md:w-64 md:h-44 flex items-center justify-center opacity-90">
              <svg viewBox="0 0 200 140" fill="none" className="w-full h-full">
                <rect x="20" y="40" width="160" height="80" rx="8" fill="white" fillOpacity="0.2" />
                <rect x="40" y="60" width="60" height="8" rx="4" fill="white" fillOpacity="0.6" />
                <rect x="40" y="74" width="40" height="6" rx="3" fill="white" fillOpacity="0.4" />
                <circle cx="160" cy="50" r="20" fill="white" fillOpacity="0.15" />
                <circle cx="160" cy="50" r="12" fill="white" fillOpacity="0.25" />
                <path d="M152 50l6 6 10-12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Dashed arrow decoration */}
            <div className="absolute right-64 top-1/2 -translate-y-1/2 hidden md:block">
              <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
                <path d="M0 15 Q30 5 55 15" stroke="white" strokeWidth="1.5" strokeDasharray="4 3" strokeOpacity="0.5" fill="none" />
                <path d="M50 10L55 15L50 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Your Path to the Perfect Venue ── */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Your Path to the Perfect Venue
            </h2>
            <p className="text-gray-500 text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
              Planning an event, production, or gathering shouldn&apos;t feel complicated. Our
              streamlined process connects you with the right venues and trusted professionals,
              taking the stress out of logistics so you can focus on what matters most — making it
              a success.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Image collage */}
            <div className="relative w-full md:w-80 h-64 shrink-0">
              <img
                src={howItWorksImages[0]}
                alt=""
                className="absolute top-0 left-0 w-36 h-36 object-cover rounded-2xl"
              />
              <img
                src={howItWorksImages[1]}
                alt=""
                className="absolute top-0 right-0 w-36 h-36 object-cover rounded-2xl"
              />
              <img
                src={howItWorksImages[2]}
                alt=""
                className="absolute bottom-0 left-0 w-36 h-36 object-cover rounded-2xl"
              />
              <img
                src={howItWorksImages[3]}
                alt=""
                className="absolute bottom-0 right-0 w-36 h-36 object-cover rounded-2xl"
              />
              {/* Center icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center z-10">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="4" y="6" width="20" height="16" rx="2" stroke="#FF5037" strokeWidth="1.5" />
                  <path d="M4 10h20" stroke="#FF5037" strokeWidth="1.5" />
                  <path d="M9 6V4M19 6V4" stroke="#FF5037" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-8 flex-1">
              {steps.map((step) => (
                <div key={step.n} className="flex gap-5 items-start">
                  <div className="w-9 h-9 shrink-0 rounded-full bg-[#FF5037] flex items-center justify-center text-white font-bold text-sm">
                    {step.n}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-1">{step.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default VendorsSection;
