// FILE: components/auth/LoginBackground.tsx
// TYPE: Server Component

export function LoginBackground() {
  return (
    <>
      <div className="login-bg-layer fixed inset-0 z-0" aria-hidden="true" />
      <div className="login-bg-grid fixed inset-0 z-0" aria-hidden="true" />
      <div
        className="pointer-events-none fixed right-[8%] top-1/2 z-0 -translate-y-1/2 opacity-[0.035] max-lg:hidden"
        aria-hidden="true"
      >
        <svg width="420" height="420" viewBox="0 0 420 420" fill="none">
          <title>Decorative scales of justice</title>
          <line x1="210" y1="40" x2="210" y2="380" stroke="white" strokeWidth="3" />
          <path d="M80 120L210 70L340 120" stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
          <line x1="40" y1="320" x2="120" y2="180" stroke="white" strokeWidth="2" />
          <line x1="380" y1="320" x2="300" y2="180" stroke="white" strokeWidth="2" />
          <line x1="20" y1="320" x2="160" y2="320" stroke="white" strokeWidth="3.5" />
          <line x1="260" y1="320" x2="400" y2="320" stroke="white" strokeWidth="3.5" />
          <ellipse cx="90" cy="310" rx="70" ry="18" stroke="white" strokeWidth="1.5" />
          <ellipse cx="330" cy="310" rx="70" ry="18" stroke="white" strokeWidth="1.5" />
        </svg>
      </div>
    </>
  )
}
