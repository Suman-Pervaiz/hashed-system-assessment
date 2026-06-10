'use client'
import { useRef, useState, useEffect } from 'react' 
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { categories } from "@/app/constants"
import Image from 'next/image'

const VenueCategories = () => {
  const scrollRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0) 

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0].offsetWidth + 16;
      const totalCards = categories.length;

      let newIndex = currentIndex + direction;

      if (newIndex < 0) {
        newIndex = totalCards - 1; 
      } else if (newIndex >= totalCards) {
        newIndex = 0;
      }

      setCurrentIndex(newIndex);
      scrollRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: 'smooth',
      });
    }
  }

  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0].offsetWidth + 16;
      scrollRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);


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

      {/* carousel + arrows */}
      <div className="relative">
        
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2 no-scrollbar"
        >
          {categories.map((cat, index) => (
            <div
              key={cat.name}
             
              className="relative shrink-0 rounded-2xl overflow-hidden cursor-pointer group h-[400px]
                         w-[calc(100vw-2rem)]
                         md:w-[calc(50%-8px)]
                         lg:w-[301px]"
            >  
              {/* Image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            
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

       {/* Arrows on bottom right */}
        <div className="absolute bottom-[-50px] right-0 flex gap-2 mt-4 md:mt-0">
          <button
            onClick={() => scroll(-1)}
            className="w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronLeft size={18} className="text-gray-700" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronRight size={18} className="text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default VenueCategories;
