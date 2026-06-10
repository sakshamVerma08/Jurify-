'use client'

import { useAdminStore } from '@/stores/adminStore'
import { useUiStore } from '@/stores/uiStore'
import { cn } from '@/lib/utils'
import type { AdminUserRole, AdminUserStatus } from '@/types'

export function UsersPanel() {
  const users = useAdminStore((s) => s.users)
  const searchQuery = useAdminStore((s) => s.searchQuery)
  
  const roleFilter = useAdminStore((s) => s.roleFilter)
  const setRoleFilter = useAdminStore((s) => s.setRoleFilter)
  const statusFilter = useAdminStore((s) => s.statusFilter)
  const setStatusFilter = useAdminStore((s) => s.setStatusFilter)
  
  const suspendUser = useAdminStore((s) => s.suspendUser)
  const activateUser = useAdminStore((s) => s.activateUser)
  const showToast = useUiStore((s) => s.showToast)

  // Filtered Users
  const filteredUsers = users.filter((u) => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
      
    const matchesRole = 
      roleFilter === 'All Roles' || 
      u.role.toLowerCase() === roleFilter.toLowerCase()
      
    const matchesStatus = 
      statusFilter === 'All Status' || 
      u.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesRole && matchesStatus
  })

  const handleSuspend = (id: string, name: string) => {
    suspendUser(id)
    showToast(`User ${name} has been suspended`, 'err')
  }

  const handleActivate = (id: string, name: string) => {
    activateUser(id)
    showToast(`User ${name} has been activated`, 'ok')
  }

  return (
    <div className="flex-1 flex flex-col gap-6 animate-fade-up">
      <div className="mb-6 flex items-end justify-between flex-wrap gap-3.5">
        <div>
          <div className="font-serif text-3xl font-light tracking-[-0.4px] mb-1">User <em className="not-italic text-o2">Management</em></div>
          <div className="text-xs text-[var(--td)]">{users.length} registered users</div>
        </div>
        <div className="flex gap-2 items-center">
          <button className="flex items-center gap-1.75 font-sans text-xs font-semibold text-[var(--t)] bg-white/[0.05] border border-white/[0.12] rounded-[9px] px-4 py-2 cursor-pointer transition-all hover:bg-white/[0.09] hover:border-white/20 gap-2.5" onClick={() => showToast('Exported users CSV successfully', 'ok')}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1v8M3.5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2.5 mb-3.5 flex-wrap">
        <select 
          className="bg-card border border-white/[0.08] rounded-[9px] px-3.5 py-2 text-sm text-[var(--tm)] outline-none cursor-pointer hover:border-white/[0.15]" 
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option>All Roles</option>
          <option>Lawyer</option>
          <option>Client</option>
          <option>Admin</option>
        </select>
        <select 
          className="bg-card border border-white/[0.08] rounded-[9px] px-3.5 py-2 text-sm text-[var(--tm)] outline-none cursor-pointer hover:border-white/[0.15]" 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Status</option>
          <option>Active</option>
          <option>Suspended</option>
          <option>Pending</option>
        </select>
        <span className="text-xs text-[var(--td)] ml-auto">Showing {filteredUsers.length} of {users.length}</span>
      </div>

      {/* Data Table */}
      <div className="bg-card border border-white/[0.07] rounded-[14px] overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-white/3 border-b border-white/7">
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">User</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Role</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Joined</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Status</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Cases</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '20px 0', color: 'var(--td)' }}>
                  No users match the criteria.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-white/[0.04] transition-colors duration-150 cursor-default hover:bg-white/[0.025] last:border-b-0">
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">
                    <div className="flex items-center gap-2.5">
                      <div className="w-[30px] h-[30px] rounded-full bg-og/15 border border-og/25 flex items-center justify-center font-serif text-xs font-semibold text-og shrink-0">{user.initials}</div>
                      <div>
                        <div className="text-sm font-medium text-[var(--t)]">{user.name}</div>
                        <div className="text-[11px] text-[var(--td)] mt-0.5">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">
                    <span className={cn(
                      "text-[10px] font-semibold px-2 py-0.5 rounded-full border",
                      user.role === 'lawyer' && "bg-og/12 border-og/25 text-o2",
                      user.role === 'client' && "bg-info/10 border-info/22 text-blue-300",
                      user.role === 'admin' && "bg-[#f06464]/12 border-[#f06464]/25 text-[#f06464]"
                    )}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">{user.joinedDate}</td>
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">
                    <span className={cn(
                      "text-[10px] font-semibold px-2.25 py-0.5 rounded-full border",
                      user.status === 'active' && "bg-[#4ade80]/10 border-[#4ade80]/22 text-[#4ade80]",
                      user.status === 'suspended' && "bg-[#f06464]/10 border-[#f06464]/22 text-[#f06464]",
                      user.status === 'pending' && "bg-warn/10 border-warn/22 text-o2"
                    )}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">{user.casesCount}</td>
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">
                    <div className="flex gap-1.25 flex-nowrap">
                      {user.status === 'active' ? (
                        <button 
                          className="font-sans text-[11px] cursor-pointer rounded-[7px] px-2.5 py-1.25 transition-all duration-150 border text-[#f06464] bg-[#f06464]/8 border-[#f06464]/18 hover:bg-[#f06464]/15"
                          onClick={() => handleSuspend(user.id, user.name)}
                        >
                          Suspend
                        </button>
                      ) : (
                        <button 
                          className="font-sans text-[11px] cursor-pointer rounded-[7px] px-2.5 py-1.25 transition-all duration-150 border text-success bg-[#4ade80]/8 border-[#4ade80]/20 hover:bg-[#4ade80]/16"
                          onClick={() => handleActivate(user.id, user.name)}
                        >
                          Activate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        <div className="flex items-center justify-between px-4 py-3.5 border-t border-white/[0.05] text-xs text-[var(--td)]">
          <span>Showing 1–{filteredUsers.length} of {filteredUsers.length} users</span>
          <div className="flex gap-1">
            <div className="w-7 h-7 rounded-[7px] flex items-center justify-center cursor-pointer text-xs bg-og/15 border border-og/30 text-o2 font-semibold">1</div>
            <div className="w-7 h-7 rounded-[7px] flex items-center justify-center cursor-pointer text-xs text-[var(--td)] bg-white/4 border border-white/8 transition-all hover:bg-white/8 hover:text-[var(--tm)]">2</div>
            <div className="w-7 h-7 rounded-[7px] flex items-center justify-center cursor-pointer text-xs text-[var(--td)] bg-white/4 border border-white/8 transition-all hover:bg-white/8 hover:text-[var(--tm)]">→</div>
          </div>
        </div>
      </div>
    </div>
  )
}
