'use client'

import { useState } from 'react'
import { Search, MapPin, Calendar, Users, Building2, Sparkles } from 'lucide-react'

// Unsplash images — tum baad mein apni images se replace karna
const heroImages = [
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1400&q=80', // party/celebration
  'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=1400&q=80', // venue
  'https://images.unsplash.com/photo-1519671282429-b8c78e8c7f2a?w=1400&q=80', // event
]

const tabs = ['Venue', 'Vendors']

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('Venue')
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <section className="relative w-full h-[520px] md:h-[600px] overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Navbar goes on top */}
      {/* Hero content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        {/* Heading */}
        <h1 className="text-white font-bold text-3xl md:text-5xl leading-tight max-w-xl mb-8">
          Celebrate in venues<br />big and small
        </h1>

        {/* Search card */}
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-[#FF5037] text-white'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab === 'Venue' ? <Building2 size={15} /> : <Sparkles size={15} />}
                {tab}
              </button>
            ))}
          </div>

          {/* Search fields */}
          <div className="flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {/* Where */}
            <div className="flex-1 flex items-center gap-3 px-5 py-4">
              <MapPin size={16} className="text-gray-400 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Where</span>
                <span className="text-sm font-medium text-gray-700">Dubai, UAE</span>
              </div>
            </div>

            {/* When */}
            <div className="flex-1 flex items-center gap-3 px-5 py-4">
              <Calendar size={16} className="text-gray-400 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">When</span>
                <span className="text-sm font-medium text-gray-700">Anytime</span>
              </div>
            </div>

            {/* Guests */}
            <div className="flex-1 flex items-center gap-3 px-5 py-4">
              <Users size={16} className="text-gray-400 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Guests</span>
                <span className="text-sm font-medium text-gray-700">10–20</span>
              </div>
            </div>

            {/* Search button */}
            <div className="flex items-center px-4 py-3">
              <button className="flex items-center gap-2 bg-[#FF5037] hover:bg-[#e04430] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 w-full md:w-auto justify-center">
                <Search size={16} />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-6">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-6 bg-[#FF5037]' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection;
