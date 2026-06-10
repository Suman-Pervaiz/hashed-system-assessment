
'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { howItWorksImages, steps, vendorstwo } from "@/app/constants"



const VendorsSection = () => {
  const scrollRef = useRef(null)
  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })

  return (
    <>
      {/* vendors*/}
      <section className="py-16 px-4 md:px-8 bg-[#FDF1D2]">
        <div className="max-w-7xl mx-auto">

          <div className="p-6 text-center mb-10">
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
              className="flex gap-4 overflow-x-auto scroll-smooth pb-2 no-scrollbar justify-center md:justify-start" // Added justify-center for smaller screens
            >
              {vendorstwo.map((v) => (
                <div
                  key={v.name}
                  className="relative shrink-0 w-[301px] h-[400px] rounded-[20px] overflow-hidden cursor-pointer group" // Applied card specifications

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


            <div className="absolute bottom-[-50px] right-0 flex gap-2 mt-4 md:mt-0">
              <button
                onClick={() => scroll(-1)} // This will do nothing as scroll() is empty
                className="w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center transition-colors z-10
                         opacity-50 cursor-not-allowed"
                disabled
              >
                <ChevronLeft size={18} className="text-gray-700" />
              </button>
              <button
                onClick={() => scroll(1)}
                className="w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center transition-colors z-10
                         opacity-50 cursor-not-allowed"
                disabled
              >
                <ChevronRight size={18} className="text-gray-700" />
              </button>
            </div>
          </div>{/*  Grow Your Business CTA */}
          <section className="py-8 px-4 md:px-8 bg-[#FDF1D2] relative z-10">
            <div className="max-w-7xl mx-auto -mb-20 md:-mb-32">
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


                <div className="w-48 h-32 md:w-64 md:h-44 flex items-center justify-center opacity-90">
                  <Image
                    src="/assets/images/group.png"
                    alt="Group"
                    width={300}
                    height={200}
                    className="w-full h-full object-contain"
                  />
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
        </div>
      </section>



      {/* Your Path Section*/}
      <section className="py-16 px-4 md:px-8 bg-white relative z-0"> {/* Added relative and z-0 */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-20">
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
            <div className="relative w-full md:w-[320px] h-[320px] shrink-0 grid grid-cols-2 grid-rows-2 gap-4">
              <img
                src={howItWorksImages[0]}
                alt=""
                className="w-full h-full object-cover rounded-2xl"
              />
              <img
                src={howItWorksImages[1]}
                alt=""
                className="w-full h-full object-cover rounded-2xl"
              />
              <img
                src={howItWorksImages[2]}
                alt=""
                className="w-full h-full object-cover rounded-2xl"
              />
              <img
                src={howItWorksImages[3]}
                alt=""
                className="w-full h-full object-cover rounded-2xl"
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