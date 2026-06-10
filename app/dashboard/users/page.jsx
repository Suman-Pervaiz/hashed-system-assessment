'use client'

import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import { Modal, Skeleton, Notification } from '@mantine/core'
import { Search, Plus, Pencil, Trash2, Eye, ChevronLeft, ChevronRight, X, Check } from 'lucide-react'

const fetcher = (url) => fetch(url).then(r => r.json())

// ── Toast notification ──
function Toast({ message, type, onClose }) {
  return (
    <div className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg text-white text-sm font-medium transition-all duration-300 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
      {type === 'success' ? <Check size={16} /> : <X size={16} />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X size={14} /></button>
    </div>
  )
}

// ── Form field ──
function FormField({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        className={`px-4 py-2.5 rounded-xl border text-sm text-gray-900 outline-none transition-colors ${error ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#FF5037] bg-white'}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}

// ── Add / Edit Modal ──
function UserFormModal({ opened, onClose, user, onSuccess }) {
  const isEdit = !!user
  const [form, setForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    job: user?.job || '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.first_name.trim()) e.first_name = 'First name is required'
    if (!form.last_name.trim()) e.last_name = 'Last name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.job.trim()) e.job = 'Job title is required'
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    try {
      const url = isEdit ? `https://reqres.in/api/users/${user.id}` : 'https://reqres.in/api/users'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { onSuccess(isEdit ? 'User updated successfully!' : 'User added successfully!'); onClose() }
      else throw new Error()
    } catch {
      setErrors({ submit: 'Something went wrong. Try again.' })
    } finally {
      setLoading(false)
    }
  }

  const update = (key, val) => { setForm(p => ({ ...p, [key]: val })); setErrors(p => ({ ...p, [key]: '' })) }

  return (
    <Modal
      opened={opened} onClose={onClose}
      title={<span className="font-bold text-lg text-gray-900">{isEdit ? 'Edit User' : 'Add User'}</span>}
      centered radius="xl" size="md"
      styles={{ header: { borderBottom: '1px solid #f3f4f6', pb: 12 }, body: { padding: 24 } }}
    >
      <div className="flex flex-col gap-4 mt-2">
        <div className="grid grid-cols-2 gap-3">
          <FormField label="First Name" placeholder="John" value={form.first_name} onChange={e => update('first_name', e.target.value)} error={errors.first_name} />
          <FormField label="Last Name" placeholder="Doe" value={form.last_name} onChange={e => update('last_name', e.target.value)} error={errors.last_name} />
        </div>
        <FormField label="Email" type="email" placeholder="john@example.com" value={form.email} onChange={e => update('email', e.target.value)} error={errors.email} />
        <FormField label="Job Title" placeholder="Frontend Developer" value={form.job} onChange={e => update('job', e.target.value)} error={errors.job} />
        {errors.submit && <p className="text-xs text-red-500 text-center">{errors.submit}</p>}
        <div className="flex gap-3 mt-2">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-[#FF5037] hover:bg-[#e04430] text-white text-sm font-semibold transition-colors disabled:opacity-60"
          >
            {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Add User'}
          </button>
        </div>
      </div>
    </Modal>
  )
}

// ── View User Modal ──
function ViewUserModal({ opened, onClose, user }) {
  if (!user) return null
  return (
    <Modal
      opened={opened} onClose={onClose}
      title={<span className="font-bold text-lg text-gray-900">User Details</span>}
      centered radius="xl" size="sm"
      styles={{ body: { padding: 24 } }}
    >
      <div className="flex flex-col items-center gap-4 py-2">
        <img src={user.avatar} alt={user.first_name} className="w-20 h-20 rounded-full object-cover border-4 border-[#FF5037]/20" />
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-900">{user.first_name} {user.last_name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <div className="w-full bg-gray-50 rounded-xl p-4 flex flex-col gap-2.5 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">ID</span><span className="font-medium text-gray-900">#{user.id}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">First Name</span><span className="font-medium text-gray-900">{user.first_name}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Last Name</span><span className="font-medium text-gray-900">{user.last_name}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Email</span><span className="font-medium text-gray-900">{user.email}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs font-medium">Active</span></div>
        </div>
        <button onClick={onClose} className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700 transition-colors">
          Close
        </button>
      </div>
    </Modal>
  )
}

// ── Delete Confirm Modal ──
function DeleteModal({ opened, onClose, user, onSuccess }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      await fetch(`https://reqres.in/api/users/${user.id}`, { method: 'DELETE' })
      onSuccess('User deleted successfully!')
      onClose()
    } catch {
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      opened={opened} onClose={onClose}
      title={<span className="font-bold text-lg text-gray-900">Delete User</span>}
      centered radius="xl" size="sm"
    >
      <div className="flex flex-col gap-5 p-2">
        <p className="text-sm text-gray-600 text-center">
          Are you sure you want to delete <strong>{user?.first_name} {user?.last_name}</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors disabled:opacity-60"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </Modal>
  )
}

// ── Skeleton row ──
function SkeletonRow() {
  return (
    <tr>
      {[40, 120, 180, 100, 80, 100].map((w, i) => (
        <td key={i} className="px-4 py-3.5">
          <Skeleton height={14} width={w} radius="md" />
        </td>
      ))}
    </tr>
  )
}

// ── Main Users Page ──
const UsersPage = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [viewUser, setViewUser] = useState(null)
  const [deleteUser, setDeleteUser] = useState(null)
  const [toast, setToast] = useState(null)

  const { data, isLoading, error } = useSWR(`https://reqres.in/api/users?page=${page}`, fetcher)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const users = data?.data || []
  const totalPages = data?.total_pages || 1

  const filtered = users.filter(u =>
    `${u.first_name} ${u.last_name} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-5">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 w-full sm:w-72 shadow-sm">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="text-sm text-gray-700 outline-none bg-transparent flex-1 placeholder:text-gray-400"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          )}
        </div>

        <button
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-2 bg-[#FF5037] hover:bg-[#e04430] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm shrink-0"
        >
          <Plus size={16} /> Add User
        </button>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Avatar</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-red-500">
                    Failed to load users. Please try again.
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <svg width="64" height="48" viewBox="0 0 64 48" fill="none">
                        <rect x="4" y="8" width="56" height="36" rx="4" fill="#f3f4f6" />
                        <path d="M20 24h24M20 30h16" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="48" cy="14" r="8" fill="#fee2e2" />
                        <path d="M45 11l6 6M51 11l-6 6" stroke="#FF5037" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <p className="text-sm font-medium text-gray-700">No users found</p>
                      <p className="text-xs text-gray-400">Try adjusting your search</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3.5 text-sm text-gray-500">#{user.id}</td>
                    <td className="px-4 py-3.5">
                      <img src={user.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                    </td>
                    <td className="px-4 py-3.5 text-sm font-semibold text-gray-900 whitespace-nowrap">
                      {user.first_name} {user.last_name}
                    </td>
                    <td className="px-4 py-3.5 text-sm text-gray-500">{user.email}</td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs font-medium bg-green-50 text-green-600 px-2.5 py-1 rounded-full">Active</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setViewUser(user)}
                          className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors"
                          title="View"
                        >
                          <Eye size={14} className="text-blue-600" />
                        </button>
                        <button
                          onClick={() => setEditUser(user)}
                          className="w-8 h-8 rounded-lg bg-orange-50 hover:bg-orange-100 flex items-center justify-center transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} className="text-[#FF5037]" />
                        </button>
                        <button
                          onClick={() => setDeleteUser(user)}
                          className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!isLoading && !error && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Page <strong>{page}</strong> of <strong>{totalPages}</strong> · {data?.total} total users
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={14} className="text-gray-600" />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${page === i + 1 ? 'bg-[#FF5037] text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={14} className="text-gray-600" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <UserFormModal opened={addOpen} onClose={() => setAddOpen(false)} user={null} onSuccess={showToast} />
      {editUser && <UserFormModal opened={!!editUser} onClose={() => setEditUser(null)} user={editUser} onSuccess={showToast} />}
      {viewUser && <ViewUserModal opened={!!viewUser} onClose={() => setViewUser(null)} user={viewUser} />}
      {deleteUser && <DeleteModal opened={!!deleteUser} onClose={() => setDeleteUser(null)} user={deleteUser} onSuccess={showToast} />}

      {/* Toast */}
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
export default UsersPage