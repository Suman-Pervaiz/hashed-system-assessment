'use client'

import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Users, Maximize2, Car, BadgeCheck, Heart, Share2 } from 'lucide-react'

const filterTabs = ['ROOFTOP', 'GALLERY', 'RESTAURANT', 'OUTDOOR', 'STUDIO', 'TERRACE', 'BALLROOM']

const venues = [
  {
    id: 1,
    name: 'High-Spec Room in Trendy Home Clapham/Stockwell',
    location: 'London, SW1',
    price: '$50/hour',
    guests: '300+',
    sqft: '1,593 sq ft',
    parking: 'Free parking',
    extra: '+26 more',
    verified: true,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80',
  },
  {
    id: 2,
    name: 'High-Spec Room in Trendy Home Clapham/Stockwell',
    location: 'London, SW1',
    price: '$50/hour',
    guests: '280+',
    sqft: '2,400 sq ft',
    parking: 'Free parking',
    extra: '+20 more',
    verified: true,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
  },
  {
    id: 3,
    name: 'High-Spec Room in Trendy Home Clapham/Stockwell',
    location: 'London, SW1',
    price: '$50/hour',
    guests: '300+',
    sqft: '2,900 sq ft',
    parking: 'Free parking',
    extra: '+26 more',
    verified: true,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
  },
  {
    id: 4,
    name: 'High-Spec Room in Trendy Home Clapham/Stockwell',
    location: 'London, SW1',
    price: '$50/hour',
    guests: '300+',
    sqft: '2,000 sq ft',
    parking: 'Free parking',
    extra: '+36 more',
    verified: true,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80',
  },
]

function VenueCard({ venue }) {
  const [liked, setLiked] = useState(false)

  return (
    <div className="shrink-0 w-64 md:w-72 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {venue.verified && (
            <span className="flex items-center gap-1 bg-[#FF5037] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
              <BadgeCheck size={10} />
              Verified
            </span>
          )}
        </div>

        {/* Action icons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <Share2 size={12} className="text-gray-600" />
          </button>
          <button
            onClick={() => setLiked(!liked)}
            className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <Heart
              size={12}
              className={liked ? 'text-[#FF5037] fill-[#FF5037]' : 'text-gray-600'}
            />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 mb-2">
          {venue.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-[#FF5037] text-xs mb-3">
          <MapPin size={11} />
          <span>{venue.location}</span>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 text-gray-500 text-[11px] mb-4">
          <span className="flex items-center gap-1">
            <Users size={11} />
            {venue.guests}
          </span>
          <span className="flex items-center gap-1">
            <Maximize2 size={11} />
            {venue.sqft}
          </span>
          <span className="flex items-center gap-1">
            <Car size={11} />
            {venue.parking}
          </span>
        </div>

        {/* Extra amenities */}
        <p className="text-[11px] text-gray-400 mb-4">{venue.extra}</p>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900">
            From{' '}
            <span className="text-[#FF5037]">{venue.price}</span>
          </span>
          <button className="text-[11px] font-semibold text-[#FF5037] border border-[#FF5037] px-3 py-1.5 rounded-lg hover:bg-[#FF5037] hover:text-white transition-all duration-200">
            View details
          </button>
        </div>
      </div>
    </div>
  )
}

const FeaturedVenues = () => {
  const [activeFilter, setActiveFilter] = useState('GALLERY')
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' })
  }

  return (
    <section
      className="py-16 px-4 md:px-8"
      style={{ background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
          Featured Venues
        </h2>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                activeFilter === tab
                  ? 'bg-[#FF5037] text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Venue cards carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-2 no-scrollbar"
          >
            {venues.map((v) => (
              <VenueCard key={v.id} venue={v} />
            ))}
          </div>

          <button
            onClick={() => scroll(-1)}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
          >
            <ChevronLeft size={18} className="text-gray-700" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
          >
            <ChevronRight size={18} className="text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedVenues;
