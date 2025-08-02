'use client';

import React, { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useAnalytics, trackPageView, trackCoreWebVitals } from '@/utils/analytics'
import { usePerformanceMonitoring } from '@/utils/performance'

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { trackPageView: trackPage } = useAnalytics()
  const { coreWebVitals } = usePerformanceMonitoring()
  const previousPathname = useRef<string>('')

  // Track page views
  useEffect(() => {
    const url = pathname + searchParams.toString()
    if (url !== previousPathname.current) {
      trackPage(url)
      previousPathname.current = url
    }
  }, [pathname, searchParams, trackPage])

  // Track Core Web Vitals
  useEffect(() => {
    trackCoreWebVitals()
  }, [])

  // Track performance metrics when they change
  useEffect(() => {
    if (coreWebVitals) {
      Object.entries(coreWebVitals).forEach(([metric, value]) => {
        if (value !== undefined) {
          // Track to analytics
          trackPageView({
            url: pathname + searchParams.toString(),
            title: document.title,
            referrer: document.referrer
          })
        }
      })
    }
  }, [coreWebVitals, pathname, searchParams])

  // Track user engagement
  useEffect(() => {
    let startTime = Date.now()
    let scrollDepth = 0
    let isEngaged = false

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const newScrollDepth = Math.round((scrollTop / docHeight) * 100)
      
      if (newScrollDepth > scrollDepth) {
        scrollDepth = newScrollDepth
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User left the page
        const timeSpent = Date.now() - startTime
        if (timeSpent > 10000) { // Only track if spent more than 10 seconds
          trackPageView({
            url: pathname + searchParams.toString(),
            title: document.title,
            referrer: document.referrer
          })
        }
      } else {
        // User returned to the page
        startTime = Date.now()
      }
    }

    const handleBeforeUnload = () => {
      const timeSpent = Date.now() - startTime
      if (timeSpent > 10000) {
        trackPageView({
          url: pathname + searchParams.toString(),
          title: document.title,
          referrer: document.referrer
        })
      }
    }

    // Set up event listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)

    // Mark as engaged after 5 seconds
    const engagementTimer = setTimeout(() => {
      isEngaged = true
    }, 5000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      clearTimeout(engagementTimer)
    }
  }, [pathname, searchParams])

  return <>{children}</>
}

export default AnalyticsProvider 