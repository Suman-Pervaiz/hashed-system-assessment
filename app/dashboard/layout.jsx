
'use client'

import '@mantine/core/styles.css'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { useState } from 'react'
import { MantineProvider } from '@mantine/core'
import { useRouter, usePathname } from 'next/navigation'

import useUserStore from '@/store/userStore'

import {
  LayoutDashboard,
  Menu,
  ChevronDown,
  LogOut
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
]
const SidebarContent = ({ navItems, pathname, router, setSidebarOpen, handleLogout }) => (
  <div className="flex flex-col h-full">

    {/* Logo */}
    <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
      <span className="font-bold text-lg text-gray-900">venuze</span>
    </div>

    {/* Nav */}
    <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
      {navItems.map(item => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <button
            key={item.href}
            onClick={() => { router.push(item.href); setSidebarOpen(false) }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium w-full text-left ${
              isActive
                ? 'bg-[#FF5037] text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon size={18} />
            {item.label}
          </button>
        )
      })}
    </nav>

    {/* Logout removed from sidebar (now dropdown) */}
  </div>
)

const DashboardLayout = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)

  const user = useUserStore((state) => state.user)
  const clearUser = useUserStore((state) => state.clearUser)

const handleLogout = () => {
  document.cookie = "token=; path=/; Max-Age=0"; 
  clearUser();

  toast.success("Logged out successfully", {
    autoClose: 3000,
    onClose: () => router.push("/login"),
  });
};

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-white border-r">
        <SidebarContent
          navItems={navItems}
          pathname={pathname}
          router={router}
          setSidebarOpen={setSidebarOpen}
        />
      </aside>

     

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">

     
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">

    
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>

            <h1 className="text-lg font-bold text-gray-900">
  Welcome Back!{" "}
  {user?.name?.split(" ")[0] || "User"}
</h1>
          </div>

          {/* rght side user-dropdown */}
          <div className="relative">

            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <div className="w-8 h-8 rounded-full bg-[#FF5037] flex items-center justify-center text-white font-bold text-sm">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <span className="text-sm font-medium text-gray-700">
                {user?.name || user?.email || "User"}
              </span>

              <ChevronDown size={16} />
            </button>

          
            {openMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  <LogOut size={16} />
                  Logout
                </button>

              </div>
            )}

          </div>
        </header>

    
        <main className="flex-1 overflow-y-auto p-6">
          <MantineProvider>
            {children}
          </MantineProvider>
        </main>
      </div>

      {/* Toast message*/}
      <ToastContainer position="top-right" />
    </div>
  )
}

export default DashboardLayout
