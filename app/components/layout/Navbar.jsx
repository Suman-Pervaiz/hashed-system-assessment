'use client'

import { useState } from 'react'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import { Menu, X, ChevronDown, Globe, User } from 'lucide-react'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        {/* Venuze "V" logo — orange chevron shape */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M4 6L16 26L28 6H20L16 14L12 6H4Z" fill="#FF5037" />
        </svg>
        <span className="text-white font-bold text-xl tracking-tight">venuze</span>
      </Link>

      {/* Desktop right side */}
      <div className="hidden md:flex items-center gap-3">
        {/* Add your listing button */}
        <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm transition-all duration-200">
          Add your listing
          <ChevronDown size={14} />
        </button>

        {/* Language */}
        <button className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-3 py-2 rounded-full border border-white/20 backdrop-blur-sm transition-all duration-200">
          <Globe size={14} />
          EN
          <ChevronDown size={12} />
        </button>

        {/* User icon */}
        <button onClick={() => router.push('/login')} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 cursor-pointer">
          <User size={16} className="text-white" />
        </button>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md p-6 flex flex-col gap-4 md:hidden">
          <a href="#" className="text-white text-sm font-medium">Add your listing</a>
          <a href="#" className="text-white text-sm font-medium">EN</a>
          <a href="#" className="text-white text-sm font-medium">Login</a>
        </div>
      )}
    </nav>
  )
}

export default Navbar;
