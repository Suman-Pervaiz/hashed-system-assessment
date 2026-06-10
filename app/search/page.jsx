'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import {
  Search, SlidersHorizontal, ChevronLeft, ChevronRight,
  MapPin, Users, Maximize2, Car, BadgeCheck, Heart, Share2,
  X, LayoutGrid, Film, Warehouse, Image, Utensils,
  Building2, Briefcase, Home, Music, UsersRound
} from 'lucide-react'
import { Modal, Slider, Switch, RangeSlider } from '@mantine/core'

// ── Category tabs data ──
const categories = [
  { id: 'all', label: 'All Spaces', icon: LayoutGrid },
  { id: 'photo', label: 'Photo Studio', icon: Image },
  { id: 'film', label: 'Film Studio', icon: Film },
  { id: 'warehouse', label: 'Warehouse', icon: Warehouse },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'restaurant', label: 'Restaurant', icon: Utensils },
  { id: 'apartment', label: 'Apartment', icon: Home },
  { id: 'office', label: 'Office Space', icon: Briefcase },
  { id: 'venue', label: 'Venue', icon: Building2 },
  { id: 'party', label: 'Private Party', icon: Music },
  { id: 'meeting', label: 'Meeting', icon: UsersRound },
]

// ── Venue cards data ──
const allVenues = [
  { id: 1, name: 'High-Spec Room in Trendy Home Clapham/Stockwell', location: 'London, SW1', price: '$50/hour', guests: '300+', sqft: '2,000 sq ft', parking: 'Free parking', extra: '+25 more', verified: true, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80', category: 'photo' },
  { id: 2, name: 'High-Spec Room in Trendy Home Clapham/Stockwell', location: 'London, SW1', price: '$50/hour', guests: '300+', sqft: '2,000 sq ft', parking: 'Free parking', extra: '+25 more', verified: true, image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=400&q=80', category: 'photo' },
  { id: 3, name: 'Downtown Loft', location: 'New York, USA', price: '$50/hour', guests: '300+', sqft: '2,000 sq ft', parking: 'Free parking', extra: '+25 more', verified: true, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80', category: 'photo', highlighted: true },
  { id: 4, name: 'High-Spec Room in Trendy Home Clapham/Stockwell', location: 'London, SW1', price: '$50/hour', guests: '300+', sqft: '2,000 sq ft', parking: 'Free parking', extra: '+25 more', verified: true, image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80', category: 'party' },
  { id: 5, name: 'High-Spec Room in Trendy Home Clapham/Stockwell', location: 'London, SW1', price: '$50/hour', guests: '300+', sqft: '2,000 sq ft', parking: 'Free parking', extra: '+25 more', verified: true, image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80', category: 'photo' },
  { id: 6, name: 'High-Spec Room in Trendy Home Clapham/Stockwell', location: 'London, SW1', price: '$50/hour', guests: '300+', sqft: '2,000 sq ft', parking: 'Free parking', extra: '+25 more', verified: true, image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=80', category: 'photo' },
]

// ── Filter tag chip ──
function FilterChip({ label, onRemove }) {
  return (
    <span className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
      {label}
      <button onClick={onRemove} className="hover:text-red-500 transition-colors">
        <X size={11} />
      </button>
    </span>
  )
}

// ── Single venue card ──
function VenueCard({ venue }) {
  const [liked, setLiked] = useState(false)

  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group ${venue.highlighted ? 'ring-2 ring-[#FF5037]' : ''}`}>
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img src={venue.image} alt={venue.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Verified badge */}
        {venue.verified && (
          <span className="absolute top-3 left-3 flex items-center gap-1 bg-[#FF5037] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
            <BadgeCheck size={10} /> Verified
          </span>
        )}

        {/* Actions */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          <button className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm">
            <Share2 size={11} className="text-gray-600" />
          </button>
          <button onClick={() => setLiked(!liked)} className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm">
            <Heart size={11} className={liked ? 'fill-[#FF5037] text-[#FF5037]' : 'text-gray-600'} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 mb-1.5">{venue.name}</h3>
        <div className="flex items-center gap-1 text-[#FF5037] text-xs mb-3">
          <MapPin size={11} /><span>{venue.location}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400 text-[11px] mb-1">
          <span className="flex items-center gap-1"><Users size={10} />{venue.guests}</span>
          <span className="flex items-center gap-1"><Maximize2 size={10} />{venue.sqft}</span>
          <span className="flex items-center gap-1"><Car size={10} />{venue.parking}</span>
        </div>
        <p className="text-[11px] text-gray-400 mb-4">{venue.extra}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900">From <span className="text-[#FF5037]">{venue.price}</span></span>
          <button className={`text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ${venue.highlighted ? 'bg-[#FF5037] text-white hover:bg-[#e04430]' : 'text-[#FF5037] border border-[#FF5037] hover:bg-[#FF5037] hover:text-white'}`}>
            View details
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Filter Modal ──
const venueTypes = ['Office Space', 'Meeting', 'Private Party', 'Villa', 'Bar', 'Loft', 'Appartment', 'Ballroom', 'Restaurant', 'Studio', 'House', 'Gallery']
const occasions = ['Wedding', 'Reception', 'Ceremony', 'Engagement', 'Birthday', 'Babyshower', 'Concert/Performance', 'Brand Launch', 'Fashion Show', 'Corporate Event', 'Conference', 'Pop-up']

function FilterModal({ opened, onClose }) {
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedOccasions, setSelectedOccasions] = useState([])
  const [capacityRange, setCapacityRange] = useState([10, 1500])
  const [priceRange, setPriceRange] = useState([10, 30000])
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  const toggleItem = (list, setList, item) => {
    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])
  }

  const clearAll = () => {
    setSelectedTypes([])
    setSelectedOccasions([])
    setCapacityRange([10, 1500])
    setPriceRange([10, 30000])
    setVerifiedOnly(false)
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<span className="font-bold text-lg text-gray-900">Filters</span>}
      centered
      radius="lg"
      size="md"
      styles={{
        header: { borderBottom: '1px solid #f3f4f6', paddingBottom: '12px' },
        body: { padding: '20px' },
      }}
    >
      <div className="flex flex-col gap-7">
        {/* Venue Type */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Venue Type</h4>
          <div className="flex flex-wrap gap-2">
            {venueTypes.map(t => (
              <button
                key={t}
                onClick={() => toggleItem(selectedTypes, setSelectedTypes, t)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${selectedTypes.includes(t) ? 'bg-[#FF5037] text-white border-[#FF5037]' : 'bg-white text-gray-700 border-gray-200 hover:border-[#FF5037] hover:text-[#FF5037]'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Capacity */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">Capacity</h4>
          <p className="text-xs text-gray-500 mb-4">Showing venues for {capacityRange[0]} - {capacityRange[1]} guests</p>
          <RangeSlider
            min={10} max={1500}
            value={capacityRange}
            onChange={setCapacityRange}
            color="#FF5037"
            styles={{ thumb: { borderColor: '#FF5037' }, bar: { backgroundColor: '#FF5037' } }}
          />
        </div>

        {/* Price per hour */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">Price per hour (AED)</h4>
          <div className="flex justify-between text-xs text-gray-500 mb-4">
            <span>AED {priceRange[0].toLocaleString()}.00</span>
            <span>AED {priceRange[1].toLocaleString()}.00</span>
          </div>
          <RangeSlider
            min={10} max={30000}
            value={priceRange}
            onChange={setPriceRange}
            color="#FF5037"
            styles={{ thumb: { borderColor: '#FF5037' }, bar: { backgroundColor: '#FF5037' } }}
          />
        </div>

        {/* Event / Occasion */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Event / Occasion</h4>
          <div className="flex flex-wrap gap-2">
            {occasions.map(o => (
              <button
                key={o}
                onClick={() => toggleItem(selectedOccasions, setSelectedOccasions, o)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${selectedOccasions.includes(o) ? 'bg-[#FF5037] text-white border-[#FF5037]' : 'bg-white text-gray-700 border-gray-200 hover:border-[#FF5037] hover:text-[#FF5037]'}`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        {/* Verified Only */}
        <div className="flex items-center justify-between py-2 border-t border-gray-100">
          <div>
            <p className="font-semibold text-gray-900 text-sm">Verified Only</p>
            <p className="text-xs text-gray-500">Show only verified venues</p>
          </div>
          <Switch
            checked={verifiedOnly}
            onChange={(e) => setVerifiedOnly(e.currentTarget.checked)}
            color="#FF5037"
          />
        </div>

        {/* Footer buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <button onClick={clearAll} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Clear All
          </button>
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl bg-[#FF5037] hover:bg-[#e04430] text-white text-sm font-semibold transition-colors">
            Apply Filters
          </button>
        </div>
      </div>
    </Modal>
  )
}

// ── Main Search Page ──
const SearchPage = () => {
  const [activeCategory, setActiveCategory] = useState('photo')
  const [keyword, setKeyword] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState(['Verified', '2,000+ m²', '10-20 guests', 'Parking', 'Kitchen'])
  const tabsRef = useRef(null)

  const scrollTabs = (dir) => tabsRef.current?.scrollBy({ left: dir * 200, behavior: 'smooth' })

  const filteredVenues = activeCategory === 'all'
    ? allVenues
    : allVenues.filter(v => v.category === activeCategory)

  const isEmpty = filteredVenues.length === 0

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ── Top Navbar (search mode) ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <path d="M4 6L16 26L28 6H20L16 14L12 6H4Z" fill="#FF5037" />
            </svg>
            <span className="font-bold text-xl text-gray-900">venuze</span>
          </Link>

          {/* Search bar in header */}
          <div className="flex-1 max-w-lg mx-auto">
            <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-sm divide-x divide-gray-200 overflow-hidden">
              <div className="flex-1 px-4 py-2 text-sm text-gray-700 truncate">London, UK</div>
              <div className="px-4 py-2 text-sm text-gray-700">Anytime</div>
              <div className="px-4 py-2 text-sm text-gray-700">10-20 Guests</div>
              <button className="px-3 py-2 bg-[#FF5037] flex items-center justify-center">
                <Search size={16} className="text-white" />
              </button>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 shrink-0 ml-auto">
            <button className="flex items-center gap-1.5 text-[#FF5037] text-sm font-semibold border border-[#FF5037] px-4 py-2 rounded-full hover:bg-[#FF5037] hover:text-white transition-all duration-200">
              Add your listing
              <ChevronRight size={14} />
            </button>
            <button className="flex items-center gap-1 text-sm font-medium text-gray-700 border border-gray-200 px-3 py-2 rounded-full hover:bg-gray-50">
              EN <ChevronRight size={13} />
            </button>
            <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
              <Users size={16} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Keyword search bar */}
        <div className="border-t border-gray-100 px-4 py-2.5 flex items-center justify-between max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 flex-1">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Add keywords..."
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              className="text-sm text-gray-700 placeholder:text-gray-400 outline-none bg-transparent flex-1"
            />
          </div>
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#FF5037] transition-colors"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        {/* Category tabs */}
        <div className="border-t border-gray-100 relative">
          <div className="max-w-screen-xl mx-auto px-8 relative">
            <button onClick={() => scrollTabs(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-50 rounded-full shadow-sm border border-gray-100">
              <ChevronLeft size={16} className="text-gray-600" />
            </button>
            <div ref={tabsRef} className="flex overflow-x-auto no-scrollbar gap-1 py-2">
              {categories.map(cat => {
                const Icon = cat.icon
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl shrink-0 transition-all duration-200 min-w-[72px] ${isActive ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isActive ? 'bg-[#FF5037]' : 'bg-gray-100'}`}>
                      <Icon size={18} className={isActive ? 'text-white' : 'text-gray-500'} />
                    </div>
                    <span className={`text-[11px] font-medium whitespace-nowrap ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>{cat.label}</span>
                  </button>
                )
              })}
            </div>
            <button onClick={() => scrollTabs(1)} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-50 rounded-full shadow-sm border border-gray-100">
              <ChevronRight size={16} className="text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Body: cards + map ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left — results */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-5">
          {/* Results count + active filter chips */}
          {!isEmpty && (
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="text-sm text-gray-600 font-medium shrink-0">
                <strong>3,456</strong> photo studios near London
              </span>
              {activeFilters.map(f => (
                <FilterChip key={f} label={f} onRemove={() => setActiveFilters(prev => prev.filter(x => x !== f))} />
              ))}
              <button className="text-xs text-gray-400 flex items-center gap-1 hover:text-gray-600">
                Sort by: Recommended <ChevronRight size={12} />
              </button>
            </div>
          )}

          {/* Empty state */}
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              {/* SVG illustration */}
              <svg width="160" height="120" viewBox="0 0 160 120" fill="none">
                <rect x="20" y="20" width="100" height="70" rx="6" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1.5" />
                <rect x="30" y="30" width="60" height="5" rx="2.5" fill="#d1d5db" />
                <rect x="30" y="40" width="45" height="4" rx="2" fill="#e5e7eb" />
                <rect x="30" y="50" width="50" height="4" rx="2" fill="#e5e7eb" />
                <circle cx="115" cy="55" r="22" fill="#fee2e2" />
                <circle cx="115" cy="55" r="16" fill="#fca5a5" />
                <path d="M108 48l14 14M122 48l-14 14" stroke="#FF5037" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="48" cy="85" r="12" fill="#fee2e2" />
                <path d="M44 89l4-4 4 4M48 85v-4" stroke="#FF5037" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="35" y="93" width="26" height="10" rx="3" fill="#fca5a5" />
                <rect x="38" y="95" width="20" height="2" rx="1" fill="#FF5037" fillOpacity="0.5" />
                <rect x="38" y="99" width="14" height="2" rx="1" fill="#FF5037" fillOpacity="0.3" />
              </svg>
              <p className="text-base font-semibold text-gray-900">No data found for your search.</p>
              <p className="text-sm text-gray-500 text-center max-w-xs">Explore other options or clear filters to see more results.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredVenues.map(v => <VenueCard key={v.id} venue={v} />)}
            </div>
          )}
        </div>

        {/* Right — Map placeholder (real map integration would need API key) */}
        <div className="hidden lg:block w-[420px] xl:w-[500px] shrink-0 sticky top-0 h-[calc(100vh-180px)] overflow-hidden rounded-2xl m-4 shadow-sm">
          <div className="relative w-full h-full bg-gray-100 overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
              alt="Map"
              className="w-full h-full object-cover opacity-80"
            />
            {/* Map pin overlay — Downtown Loft popup */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-2 w-44">
              <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&q=80" alt="" className="w-full h-20 object-cover rounded-lg mb-2" />
              <p className="text-xs font-semibold text-gray-900">Downtown Loft</p>
              <p className="text-[10px] text-gray-500 flex items-center gap-1"><MapPin size={9} />New York, USA</p>
            </div>
            {/* Venuze map pins */}
            {[
              { top: '55%', left: '38%' },
              { top: '60%', left: '55%' },
              { top: '68%', left: '45%' },
              { top: '52%', left: '62%' },
            ].map((pos, i) => (
              <div key={i} className="absolute" style={{ top: pos.top, left: pos.left }}>
                <div className="w-8 h-8 rounded-full bg-[#FF5037] flex items-center justify-center shadow-md">
                  <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
                    <path d="M4 6L16 26L28 6H20L16 14L12 6H4Z" fill="white" />
                  </svg>
                </div>
              </div>
            ))}
            {/* Expand button */}
            <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-lg shadow flex items-center justify-center hover:bg-gray-50">
              <Maximize2 size={14} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal opened={filterOpen} onClose={() => setFilterOpen(false)} />
    </div>
  )
}
export default SearchPage
