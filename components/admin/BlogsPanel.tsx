'use client'

import { useAdminStore } from '@/stores/adminStore'
import { useUiStore } from '@/stores/uiStore'
import { cn } from '@/lib/utils'

export function BlogsPanel() {
  const blogs = useAdminStore((s) => s.blogs)
  const searchQuery = useAdminStore((s) => s.searchQuery)
  
  const categoryFilter = useAdminStore((s) => s.categoryFilter)
  const setCategoryFilter = useAdminStore((s) => s.setCategoryFilter)
  
  const statusFilter = useAdminStore((s) => s.statusFilter)
  const setStatusFilter = useAdminStore((s) => s.setStatusFilter)
  
  const publishBlog = useAdminStore((s) => s.publishBlog)
  const featureBlog = useAdminStore((s) => s.featureBlog)
  const deleteBlog = useAdminStore((s) => s.deleteBlog)
  
  const showToast = useUiStore((s) => s.showToast)

  // Filtered Blogs
  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch = 
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.authorName.toLowerCase().includes(searchQuery.toLowerCase())
      
    const matchesCategory = 
      categoryFilter === 'All Categories' || 
      b.category.toLowerCase() === categoryFilter.toLowerCase()
      
    const matchesStatus = 
      statusFilter === 'All Status' || 
      b.status.toLowerCase() === statusFilter.toLowerCase() ||
      (statusFilter === 'Published' && b.status === 'featured') // Featured is also published

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handlePublish = (id: string, title: string) => {
    publishBlog(id)
    showToast(`Blog post "${title}" has been published`, 'ok')
  }

  const handleFeature = (id: string, title: string) => {
    featureBlog(id)
    showToast(`Blog post "${title}" set as featured article`, 'ok')
  }

  const handleDelete = (id: string, title: string) => {
    deleteBlog(id)
    showToast(`Blog post "${title}" has been deleted`, 'err')
  }

  return (
    <div className="flex-1 flex flex-col gap-6 animate-fade-up">
      <div className="mb-6 flex items-end justify-between flex-wrap gap-3.5">
        <div>
          <div className="font-serif text-3xl font-light tracking-[-0.4px] mb-1">Insights &amp; <em>Blogs</em></div>
          <div className="text-xs text-[var(--td)]">{blogs.filter(b => b.status === 'published' || b.status === 'featured').length} published · {blogs.filter(b => b.status === 'draft').length} drafts · {blogs.filter(b => b.status === 'under-review').length} under review</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2.5 mb-3.5 flex-wrap">
        <select 
          className="bg-card border border-white/[0.08] rounded-[9px] px-3.5 py-2 text-sm text-[var(--tm)] outline-none cursor-pointer hover:border-white/[0.15]"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option>All Categories</option>
          <option>Family Law</option>
          <option>Criminal Law</option>
          <option>Property Law</option>
          <option>Labour Rights</option>
          <option>Civil Rights</option>
        </select>
        <select 
          className="bg-card border border-white/[0.08] rounded-[9px] px-3.5 py-2 text-sm text-[var(--tm)] outline-none cursor-pointer hover:border-white/[0.15]"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Status</option>
          <option>Published</option>
          <option>Draft</option>
          <option>Under Review</option>
        </select>
        <span className="text-xs text-[var(--td)] ml-auto">Showing {filteredBlogs.length} of {blogs.length}</span>
      </div>

      {/* Data Table */}
      <div className="bg-card border border-white/[0.07] rounded-[14px] overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-white/[0.03] border-b border-white/[0.07]">
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Article Title</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Author</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Category</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Published</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Views</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Likes</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Status</th>
              <th className="px-4 py-3 text-left text-[10.5px] uppercase tracking-[0.8px] text-[rgba(245,240,234,0.3)] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '20px 0', color: 'var(--td)' }}>
                  No articles match the criteria.
                </td>
              </tr>
            ) : (
              filteredBlogs.map((b) => (
                <tr key={b.id} className="border-b border-white/[0.04] transition-colors duration-150 cursor-default hover:bg-white/[0.025] last:border-b-0">
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">
                    <div style={{ fontWeight: 500, color: 'var(--t)', maxWidth: '280px' }}>{b.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--td)', marginTop: '2.5px' }}>ID: {b.id}</div>
                  </td>
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">
                    <div style={{ fontWeight: 500 }}>{b.authorName}</div>
                    <div style={{ fontSize: '10.5px', color: 'var(--td)' }}>{b.authorRole}</div>
                  </td>
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">{b.category}</td>
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">{b.publishedDate}</td>
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">{b.views.toLocaleString()}</td>
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">{b.likes.toLocaleString()}</td>
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">
                    <span className={cn(
                      "text-[10px] font-semibold px-2.25 py-0.5 rounded-full border",
                      b.status === 'draft' && "bg-white/[0.07] border-white/[0.12] text-[var(--tm)]",
                      b.status === 'published' && "bg-[#4ade80]/10 border-[#4ade80]/22 text-[#4ade80]",
                      b.status === 'featured' && "bg-og/15 border border-og/30 text-og",
                      b.status === 'under-review' && "bg-warn/10 border-warn/22 text-o2"
                    )}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--tm)] align-middle">
                    <div className="flex gap-1.25 flex-nowrap">
                      {(b.status === 'under-review' || b.status === 'draft') && (
                        <button 
                          className="font-sans text-[11px] cursor-pointer rounded-[7px] px-2.5 py-1.25 transition-all duration-150 border text-success bg-[#4ade80]/8 border-[#4ade80]/20 hover:bg-[#4ade80]/16"
                          onClick={() => handlePublish(b.id, b.title)}
                        >
                          Publish
                        </button>
                      )}
                      {b.status === 'published' && (
                        <button 
                          className="font-sans text-[11px] cursor-pointer rounded-[7px] px-2.5 py-1.25 transition-all duration-150 border text-o2 bg-og/8 border-og/18 hover:bg-og/15"
                          onClick={() => handleFeature(b.id, b.title)}
                        >
                          Feature
                        </button>
                      )}
                      <button 
                        className="font-sans text-[11px] cursor-pointer rounded-[7px] px-2.5 py-1.25 transition-all duration-150 border text-[#f06464] bg-[#f06464]/8 border-[#f06464]/18 hover:bg-[#f06464]/15"
                        onClick={() => handleDelete(b.id, b.title)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        <div className="flex items-center justify-between px-4 py-3.5 border-t border-white/[0.05] text-xs text-[var(--td)]">
          <span>Showing 1–{filteredBlogs.length} of {filteredBlogs.length}</span>
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
