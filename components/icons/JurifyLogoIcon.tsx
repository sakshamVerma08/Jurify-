// FILE: components/icons/JurifyLogoIcon.tsx
// TYPE: Server Component

interface Props {
  size?: number
  className?: string
}

export function JurifyLogoIcon({ size = 18, className }: Props) {
  return (
    <img
      src="/logo.svg"
      alt="Jurify logo"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    />
  )
}
