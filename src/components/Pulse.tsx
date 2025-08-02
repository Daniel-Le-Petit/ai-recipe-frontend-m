import React from 'react'

interface PulseProps {
  children: React.ReactNode
  duration?: number
  scale?: number
  className?: string
}

export const Pulse: React.FC<PulseProps> = ({
  children,
  duration = 2000,
  scale = 1.05,
  className
}) => {
  return (
    <div
      className={className}
      style={{
        animation: `pulse ${duration}ms ease-in-out infinite`,
        display: 'inline-block'
      }}
    >
      {children}
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(${scale});
          }
        }
      `}</style>
    </div>
  )
}

export default Pulse 