interface NotificationDotProps {
  active: boolean
}

export const NotificationDot: React.FC<NotificationDotProps> = ({ active }) => {
  if (!active) return null

  return (
    <div className="relative">
      <div className="absolute z-50 w-3 h-3 rounded-full bg-themeColorMain bottom-8 right-1 animate-pulse"></div>
    </div>
  )
}
