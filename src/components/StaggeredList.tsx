import React from 'react'
import { FadeIn } from './FadeIn'

interface StaggeredListProps {
  children: React.ReactNode[]
  staggerDelay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  className?: string
}

export const StaggeredList: React.FC<StaggeredListProps> = ({
  children,
  staggerDelay = 100,
  direction = 'up',
  duration = 500,
  className
}) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <FadeIn
          key={index}
          delay={index * staggerDelay}
          duration={duration}
          direction={direction}
        >
          {child}
        </FadeIn>
      ))}
    </div>
  )
}

export default StaggeredList 