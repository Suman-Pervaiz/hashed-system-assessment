
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import useUserStore from '@/store/userStore'

const LoginPage = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const setUser = useUserStore.getState().setUser;

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // validation
    if (!email || !password) {
      setError('Email aur password required hain')
      setLoading(false)
      return
    }

    // simple test credentials
    if (email === 'sumanpervaiz10@gmail.com' && password === '123456') {
      // fake token (assessment friendly)
      const token = `eyJ${Math.random().toString(36).substring(2)}.${Date.now()}`

      // save in cookie (IMPORTANT for middleware)
      document.cookie = `token=${token}; path=/`

       setUser({
    email: email,
    name: "Suman Pervaiz", // optional
  });

      router.push('/dashboard')
    } else {
      setError('Invalid credentials')
    }

    setLoading(false)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Section - Image */}
      <div className="w-2/3 hidden md:block relative">
        <img
          src="https://images.pexels.com/photos/1036329/pexels-photo-1036329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // Venue image from Pexels
          alt="Event Venue"
          className="w-full h-full object-cover"
        />
        
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/3 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            {/* Venuze Logo in a circle, similar to the hockey review logo */}
            <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center shadow-lg">
              <img src="https://i.imgur.com/Yh3pD3L.png" alt="Venuze Logo" className="h-8 filter invert" />
            </div>
          </div>

          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Login</h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FF5037] focus:border-[#FF5037] sm:text-sm"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FF5037] focus:border-[#FF5037] sm:text-sm"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                {/* Optional: Eye icon for password visibility toggle */}
                {/* <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>
                </div> */}
              </div>
            </div>

           

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#FF5037] hover:bg-[#e6472e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5037] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage