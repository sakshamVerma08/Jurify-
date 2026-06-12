
export default function KycStatusLoading() {
  return (
    <div className="min-h-screen relative overflow-x-hidden text-[#F5F0EA] font-sans bg-[#080808]">
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute left-[8%] top-[30%] w-[55%] h-[60%] rounded-full bg-[rgba(200,98,42,0.07)] blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute right-[8%] top-[15%] w-[40%] h-[45%] rounded-full bg-[rgba(212,133,58,0.045)] blur-[120px] translate-x-1/2 -translate-y-1/2" />
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .skeleton-shimmer {
          background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 37%, rgba(255,255,255,0.03) 63%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }
      ` }} />

      {/* NAVBAR SKELETON */}
      <nav className="sticky top-0 z-[200] flex items-center justify-between px-8 h-[68px] bg-[#080808]/96 backdrop-blur-[28px] border-b border-white/[0.07]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-white/5 rounded-[9px] skeleton-shimmer" />
          <div className="w-16 h-5 bg-white/5 rounded skeleton-shimmer" />
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-24 h-8 bg-white/5 rounded-[8px] skeleton-shimmer" />
          <div className="w-20 h-8 bg-white/5 rounded-[8px] skeleton-shimmer" />
        </div>
      </nav>

      {/* PAGE CONTAINER SKELETON */}
      <div className="relative z-10 max-w-[860px] mx-auto px-8 pt-12 pb-20">
        {/* Back link skeleton */}
        <div className="w-48 h-4 bg-white/5 rounded skeleton-shimmer mb-8" />

        {/* Header skeleton */}
        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          <div className="flex-1">
            <div className="w-32 h-3 bg-white/5 rounded skeleton-shimmer mb-2" />
            <div className="w-64 h-8 bg-white/5 rounded skeleton-shimmer mb-2.5" />
            <div className="w-48 h-3.5 bg-white/5 rounded skeleton-shimmer" />
          </div>
          <div className="w-36 h-12 bg-white/5 rounded-[14px] skeleton-shimmer" />
        </div>

        {/* ETA banner skeleton */}
        <div className="w-full h-14 bg-white/5 rounded-[14px] skeleton-shimmer mb-7" />

        {/* Progress Stepper skeleton */}
        <div className="bg-[#0e0d0b]/40 border border-white/[0.05] rounded-[18px] px-[30px] py-7 mb-5">
          <div className="w-36 h-6 bg-white/5 rounded skeleton-shimmer mb-2" />
          <div className="w-56 h-3.5 bg-white/5 rounded skeleton-shimmer mb-8" />

          <div className="flex flex-col gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white/5 skeleton-shimmer shrink-0" />
                <div className="flex-1">
                  <div className="w-48 h-4 bg-white/5 rounded skeleton-shimmer mb-2" />
                  <div className="w-full h-3 bg-white/5 rounded skeleton-shimmer" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {[1, 2].map((i) => (
            <div key={i} className="bg-[#0e0d0b]/40 border border-white/[0.05] rounded-[16px] p-5.5">
              <div className="w-28 h-4 bg-white/5 rounded skeleton-shimmer mb-4" />
              <div className="flex flex-col gap-3">
                {[1, 2, 3, 4, 5, 6].map((j) => (
                  <div key={j} className="flex justify-between py-1.5 border-b border-white/[0.02] last:border-b-0">
                    <div className="w-20 h-3 bg-white/5 rounded skeleton-shimmer" />
                    <div className="w-32 h-3 bg-white/5 rounded skeleton-shimmer" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Timeline skeleton */}
        <div className="bg-[#0e0d0b]/40 border border-white/[0.05] rounded-[16px] p-6 mb-5">
          <div className="w-32 h-4 bg-white/5 rounded skeleton-shimmer mb-4" />
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-white/5 skeleton-shimmer mt-1.5 shrink-0" />
                <div className="flex-1">
                  <div className="w-3/4 h-3.5 bg-white/5 rounded skeleton-shimmer mb-1" />
                  <div className="w-1/4 h-3 bg-white/5 rounded skeleton-shimmer" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions skeleton */}
        <div className="flex gap-2.5 flex-wrap">
          <div className="w-40 h-10 bg-white/5 rounded-[10px] skeleton-shimmer" />
          <div className="w-36 h-10 bg-white/5 rounded-[10px] skeleton-shimmer" />
          <div className="w-36 h-10 bg-white/5 rounded-[10px] skeleton-shimmer" />
        </div>
      </div>
    </div>
  )
}
