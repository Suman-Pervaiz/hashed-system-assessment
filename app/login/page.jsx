'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import useUserStore from '@/store/userStore'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Eye, EyeOff } from 'lucide-react'

const LoginPage = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const setUser = useUserStore.getState().setUser

  const handleLogin = (e) => {
  e.preventDefault()
  setError('')
  setLoading(true)

  if (!email || !password) {
    toast.error('Please enter email and password')
    setLoading(false)
    return
  }

  if (email === 'sumanpervaiz10@gmail.com' && password === '123456') {
    const token = `eyJ${Math.random().toString(36).substring(2)}.${Date.now()}`
    document.cookie = `token=${token}; path=/`

    setUser({
      email: email,
      name: "Suman Pervaiz",
    })

    toast.success('Successfully LoggedIn!')

    setTimeout(() => {
      router.push('/dashboard')
      setLoading(false)
    }, 3000)

  } else {
    toast.error('Invalid credentials')
    setLoading(false)
  }
}

  return (
    <div className="flex h-screen bg-gray-100">
      <ToastContainer position="top-right" />

      {/* Left Image */}
      <div className="w-2/3 hidden md:block relative">
        <Image
          src="/assets/images/loginpic.jpg"
          alt="Venuze Logo"
          width={300}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/3 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center">
              <Image
                src="/assets/images/venuzelogo.png"
                alt="Venuze Logo"
                width={300}
                height={300}
                className="h-8 filter invert"
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">

          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FF5037] focus:border-[#FF5037]"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

       
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FF5037] focus:border-[#FF5037]"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              <div
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>

            {/* Error text ui fallbackk */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 rounded-md text-lg font-medium text-white bg-[#FF5037] hover:bg-[#e6472e] cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage