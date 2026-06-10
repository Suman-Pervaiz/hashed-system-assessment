// 'use client'

// import { useRouter } from 'next/navigation'
// import { useEffect } from 'react'

// const Dashboard = () => {
//   const router = useRouter()

//   useEffect(() => {
//     const token = document.cookie.split('token=')[1]

//     if (!token) {
//       router.push('/login')
//     }
//   }, [])

//   const handleLogout = () => {
//     document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC'
//     router.push('/login')
//   }

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Dashboard</h1>

//         <button
//           onClick={handleLogout}
//           className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
//         >
//           Logout
//         </button>
//       </div>

//       <div className="mt-6">
//         <p className="text-gray-300">
//           Welcome to authenticated dashboard 🎉
//         </p>
//       </div>
//     </div>
//   )
// }

// export default Dashboard
'use client'

import { Users, Building2, CalendarCheck, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Skeleton } from '@mantine/core'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(r => r.json())

const statsConfig = [
  { label: 'Total Users', icon: Users, color: 'bg-blue-50 text-blue-600', key: 'total_users', value: '3,456', change: '+12%', up: true },
  { label: 'Active Venues', icon: Building2, color: 'bg-orange-50 text-[#FF5037]', key: 'venues', value: '1,284', change: '+8%', up: true },
  { label: 'Events Hosted', icon: CalendarCheck, color: 'bg-green-50 text-green-600', key: 'events', value: '7,500+', change: '+5%', up: true },
  { label: 'Avg. Host Rating', icon: TrendingUp, color: 'bg-yellow-50 text-yellow-600', key: 'rating', value: '4.9★', change: '-0.1', up: false },
]

function StatCard({ stat, loading }) {
  const Icon = stat.icon
  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <Skeleton height={20} width={100} mb={12} radius="md" />
        <Skeleton height={32} width={80} mb={8} radius="md" />
        <Skeleton height={16} width={60} radius="md" />
      </div>
    )
  }
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">{stat.label}</span>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.color}`}>
          <Icon size={18} />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
      <div className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
        {stat.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
        {stat.change} from last month
      </div>
    </div>
  )
}

const DashboardPage = () => {
  // Fetch users to show real data count
  const { data, isLoading } = useSWR('https://reqres.in/api/users?page=1', fetcher)

  const dynamicStats = statsConfig.map(s =>
    s.key === 'total_users' && data ? { ...s, value: data.total } : s
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {dynamicStats.map(stat => (
          <StatCard key={stat.key} stat={stat} loading={isLoading} />
        ))}
      </div>

      {/* Recent users preview */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-gray-900">Recent Users</h2>
          <a href="/dashboard/users" className="text-xs font-semibold text-[#FF5037] hover:underline flex items-center gap-1">
            View all <ArrowUpRight size={13} />
          </a>
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton circle height={40} width={40} />
                <div className="flex-1">
                  <Skeleton height={14} width={120} mb={6} radius="md" />
                  <Skeleton height={12} width={160} radius="md" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-gray-50">
            {data?.data?.slice(0, 4).map(user => (
              <div key={user.id} className="flex items-center gap-3 py-3">
                <img src={user.avatar} alt={user.first_name} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{user.first_name} {user.last_name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <span className="text-xs font-medium bg-green-50 text-green-600 px-2.5 py-1 rounded-full">Active</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
export default DashboardPage