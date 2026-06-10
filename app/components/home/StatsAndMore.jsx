
'use client'


import { Rating } from '@mantine/core';
import Image from 'next/image';
import {stats, destinations, testimonials} from "@/app/constants"


const StatsAndMore = () => {
  
  return (
    <>
      <section className="py-16 px-4 md:px-8 bg-[#FFF7E8]">
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

          {/* Testimonials Cards */}
          <div className="flex flex-col md:flex-row gap-5 justify-center md:justify-between px-4">
            {testimonials.map((t) => (
              <div
                key={t.name}
          
                className="flex-1 min-w-0 md:max-w-[48%] bg-white h-[200px]  rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start gap-4 shadow-sm" 
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover shrink-0 border-4 border-white shadow-md" 
                />
                <div className="text-center md:text-left mt-3 md:mt-0"> 
                  <p className="text-base text-gray-600 leading-relaxed mb-3">{t.text}</p> 
                  <p className="text-base font-bold text-gray-900 mb-1">{t.name}</p> 
                  <div className="flex justify-center md:justify-start">
  <Rating value={t.rating} size="lg" readOnly />
</div>
                </div>
              </div>
            ))}
          </div>
          
          
        </div>
        
      </section>
  
      {/* Destinations  */}
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

      {/* Turn Your Venue CTA */}
  
            <section className="py-8 px-4 md:px-8 bg-white relative z-10"> 
              <div className="max-w-7xl mx-auto -mb-20 md:-mb-32"> 
                <div
                  className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative"
                  style={{ background: 'linear-gradient(135deg, #FF786A 0%, #FF4F37 60%, #FFC331 100%)' }}
                >
                  <div className="max-w-sm">
                    <h3 className="text-white font-bold text-2xl md:text-3xl leading-tight mb-2">
                     Turn Your Venue into a Destination
                    </h3>
                    <p className="text-white/80 text-sm mb-6">
                     List your space on Venuze and unlock new revenue opportunities. Reach clients looking for venues just like yours.
                    </p>
                    <button className="bg-black text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors">
                     List Your Venue
                    </button>
                  </div>
      
                  
                  <div className="w-48 h-32 md:w-64 md:h-44 flex items-center justify-center opacity-90">
        <Image
          src="/assets/images/group.png"
          alt="Group"
          width={300}
          height={200}
          className="w-full h-full object-contain"
        />
      </div>
      
                
                </div>
              </div>
            </section>
    </>
  )
}
export default StatsAndMore;