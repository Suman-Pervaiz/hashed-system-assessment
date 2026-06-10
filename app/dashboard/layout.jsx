'use client'

import { useState } from 'react'
import {MantineProvider} from '@mantine/core'
import { useRouter, usePathname } from 'next/navigation'
import {
  LayoutDashboard, Users, Building2, Settings,
  LogOut, Menu, X, Bell, ChevronRight
} from 'lucide-react'


const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Users', icon: Users, href: '/dashboard/users' },
//   { label: 'Venues', icon: Building2, href: '/dashboard/venues' },
//   { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
]
 const SidebarContent = ({ navItems,
  pathname,
  router,
  setSidebarOpen,
  handleLogout}) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <path d="M4 6L16 26L28 6H20L16 14L12 6H4Z" fill="#FF5037" />
        </svg>
        <span className="font-bold text-lg text-gray-900">venuze</span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <button
              key={item.href}
              onClick={() => { router.push(item.href); setSidebarOpen(false) }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left ${
                isActive
                  ? 'bg-[#FF5037] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={18} />
              {item.label}
              {isActive && <ChevronRight size={14} className="ml-auto" />}
            </button>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-6 border-t border-gray-100 pt-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all duration-200 w-full"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  )
const DashboardLayout = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC'
    router.push('/login')
  }


 

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-white border-r border-gray-100 shrink-0">
        {/* <SidebarContent /> */}
        <SidebarContent
  navItems={navItems}
  pathname={pathname}
  router={router}
  setSidebarOpen={setSidebarOpen}
  handleLogout={handleLogout}
/>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-56 bg-white h-full shadow-xl">
            {/* <SidebarContent /> */}
            <SidebarContent
  navItems={navItems}
  pathname={pathname}
  router={router}
  setSidebarOpen={setSidebarOpen}
  handleLogout={handleLogout}
/>
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                {navItems.find(n => n.href === pathname)?.label ?? 'Dashboard'}
              </h1>
              <p className="text-xs text-gray-500">Welcome back!</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
              <Bell size={17} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF5037] rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#FF5037] flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
            <MantineProvider>

          {children}
            </MantineProvider>
        </main>
      </div>
    </div>
  )
}
export default DashboardLayout;
