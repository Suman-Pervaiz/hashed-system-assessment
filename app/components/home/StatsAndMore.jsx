'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight, Star, MapPin } from 'lucide-react'

const stats = [
  { value: '1,500+', label: 'Venues Vetted & Approved', color: 'bg-[#FF5037]' },
  { value: '7,500+', label: 'Events Successfully Hosted', color: 'bg-[#FF5037]' },
  { value: '35+', label: 'Cities Across the Region', color: 'bg-orange-400' },
  { value: '4.9★', label: 'Average Host Rating', color: 'bg-[#FFC331]' },
]

const testimonials = [
  {
    name: 'Michael Carter',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 5,
  },
  {
    name: 'Ayesha M.',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5,
  },
]

const destinations = [
  {
    name: 'New York, USA',
    tagline: 'Coastal energy, modern Venue',
    popular: 'Rooftop',
    price: '$50 per hour',
    venues: 24,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&q=80',
  },
  {
    name: 'London, UK',
    tagline: 'Coastal energy, modern Venue',
    popular: 'Rooftop',
    price: '$25 per hour',
    venues: 108,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&q=80',
  },
  {
    name: 'Dubai, UAE',
    tagline: 'Coastal energy, modern Venue',
    popular: 'Rooftop',
    price: '$50 per hour',
    venues: 17,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&q=80',
  },
]

const StatsAndMore = () => {
  const testimonialRef = useRef(null)
  const scrollT = (dir) => testimonialRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })

  return (
    <>
      {/* ── Stats + Testimonials ── */}
      <section className="py-16 px-4 md:px-8 bg-[#FDF1D2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Trusted by Event Creators Who Demand Excellence
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Join thousands of planners and hosts who love our seamless discovery and booking
              experience.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {stats.map((s) => (
              <div
                key={s.label}
                className={`${s.color} text-white rounded-xl p-5 text-center`}
              >
                <p className="text-2xl font-extrabold">{s.value}</p>
                <p className="text-xs mt-1 opacity-90">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="relative">
            <div
              ref={testimonialRef}
              className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar pb-2"
            >
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="shrink-0 w-72 md:w-80 bg-white rounded-2xl p-5 flex gap-4 shadow-sm"
                >
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-2">{t.text}</p>
                    <p className="text-sm font-bold text-gray-900">{t.name}</p>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={12} className="fill-[#FFC331] text-[#FFC331]" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollT(-1)}
              className="absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center z-10"
            >
              <ChevronLeft size={18} className="text-gray-700" />
            </button>
            <button
              onClick={() => scrollT(1)}
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center z-10"
            >
              <ChevronRight size={18} className="text-gray-700" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Destinations ── */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Discover Exceptional Destinations Across the Region
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
              From cosmopolitan cityscapes to cultural treasures, explore where celebrations come
              alive with local flavor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {destinations.map((d) => (
              <div
                key={d.name}
                className="relative h-64 md:h-72 rounded-2xl overflow-hidden cursor-pointer group"
              >
                <img
                  src={d.image}
                  alt={d.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Badge */}
                <span className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1 rounded-full">
                  {d.venues} Venues
                </span>

                {/* Info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg">{d.name}</h3>
                  <p className="text-white/70 text-xs">{d.tagline}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-white/70 text-xs">
                      Popular: <span className="text-white">{d.popular}</span>
                    </p>
                    <p className="text-white text-xs font-semibold">From {d.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Turn Your Venue CTA ── */}
      <section className="py-8 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ background: 'linear-gradient(135deg, #FF786A 0%, #FF4F37 60%, #FFC331 100%)' }}
          >
            <div className="max-w-sm">
              <h3 className="text-white font-bold text-2xl md:text-3xl leading-tight mb-2">
                Turn Your Venue into a Destination
              </h3>
              <p className="text-white/80 text-sm mb-6">
                List your space on Venuze and unlock new revenue opportunities. Reach clients
                looking for venues just like yours.
              </p>
              <button className="bg-black text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors">
                List Your Venue
              </button>
            </div>

            {/* Decorative illustration */}
            <div className="w-48 h-36 opacity-80">
              <svg viewBox="0 0 180 120" fill="none" className="w-full h-full">
                <rect x="10" y="30" width="120" height="70" rx="6" fill="white" fillOpacity="0.15" />
                <rect x="20" y="45" width="50" height="6" rx="3" fill="white" fillOpacity="0.5" />
                <rect x="20" y="58" width="35" height="5" rx="2.5" fill="white" fillOpacity="0.35" />
                <rect x="80" y="45" width="35" height="40" rx="4" fill="white" fillOpacity="0.2" />
                <circle cx="155" cy="35" r="18" fill="white" fillOpacity="0.1" />
                <circle cx="155" cy="35" r="10" fill="white" fillOpacity="0.2" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default StatsAndMore;
