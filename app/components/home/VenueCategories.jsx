'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const categories = [
  {
    name: 'Celebration Venues',
    count: 37,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80',
  },
  {
    name: 'Private Party Venues',
    count: 37,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&q=80',
  },
  {
    name: 'Corporate Meetings',
    count: 37,
    image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=400&q=80',
  },
  {
    name: 'Creative Studios',
    count: 37,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=80',
  },
  {
    name: 'Rooftop Venues',
    count: 24,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
  },
]

const VenueCategories = () => {
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 280, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Find The Best Venue For Any Occasion
        </h2>
        <p className="text-gray-500 mt-3 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Explore venues by category, from timeless ballrooms and rooftops with a view to modern
          studios and outdoor gardens, discover spaces designed to inspire unforgettable experiences.
        </p>
      </div>

      {/* Carousel + arrows */}
      <div className="relative">
        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2 no-scrollbar"
        >
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="relative shrink-0 w-52 md:w-64 h-64 md:h-72 rounded-2xl overflow-hidden cursor-pointer group"
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Venue count badge */}
              <span className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
                {cat.count} Venues
              </span>

              {/* Name at bottom */}
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-bold text-base leading-snug">{cat.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={() => scroll(-1)}
          className="absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
        >
          <ChevronLeft size={18} className="text-gray-700" />
        </button>
        <button
          onClick={() => scroll(1)}
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
        >
          <ChevronRight size={18} className="text-gray-700" />
        </button>
      </div>
    </section>
  )
}

export default VenueCategories;
