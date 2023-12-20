interface SkeltonProps {
  className?: string
}

export default function Skelton({ className }: SkeltonProps) {
  return <div className={`animate-pulse bg-skelton ${className}`} />
}
