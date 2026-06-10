// FILE: components/auth/RegisterBackground.tsx
// TYPE: Server Component

export function RegisterBackground() {
  return (
    <>
      <div className="register-bg-layer pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
      <div className="login-bg-grid pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
      <div
        className="pointer-events-none fixed left-[5%] top-1/2 z-0 -translate-y-1/2 opacity-[0.03] max-lg:hidden"
        aria-hidden="true"
      >
        <svg width="380" height="380" viewBox="0 0 380 380" fill="none">
          <title>Decorative scales of justice</title>
          <line x1="190" y1="30" x2="190" y2="350" stroke="white" strokeWidth="2.5" />
          <path d="M70 110L190 60L310 110" stroke="white" strokeWidth="2" strokeLinejoin="round" />
          <line x1="30" y1="300" x2="105" y2="165" stroke="white" strokeWidth="1.8" />
          <line x1="350" y1="300" x2="275" y2="165" stroke="white" strokeWidth="1.8" />
          <line x1="10" y1="300" x2="148" y2="300" stroke="white" strokeWidth="3" />
          <line x1="232" y1="300" x2="370" y2="300" stroke="white" strokeWidth="3" />
          <ellipse cx="79" cy="292" rx="64" ry="16" stroke="white" strokeWidth="1.2" />
          <ellipse cx="301" cy="292" rx="64" ry="16" stroke="white" strokeWidth="1.2" />
        </svg>
      </div>
    </>
  )
}
