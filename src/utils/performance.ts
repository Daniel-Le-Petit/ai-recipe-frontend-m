'use client';

import React from 'react';
import { trackPerformance } from './analytics'

// Performance metrics interface
interface PerformanceMetric {
  name: string
  value: number
  unit: string
  timestamp: number
}

interface CoreWebVitals {
  CLS: number
  FID: number
  FCP: number
  LCP: number
  TTFB: number
}

// Performance monitoring class
class PerformanceMonitor {
  private metrics: PerformanceMetric[] = []
  private observers: Map<string, PerformanceObserver> = new Map()
  private isInitialized = false

  constructor() {
    this.init()
  }

  private init() {
    if (typeof window === 'undefined') return

    this.setupCoreWebVitals()
    this.setupCustomMetrics()
    this.setupResourceTiming()
    this.setupNavigationTiming()
    this.setupLongTasks()
    this.setupLayoutShifts()
    this.setupFirstInputDelay()

    this.isInitialized = true
    console.log('Performance monitoring initialized')
  }

  // Setup Core Web Vitals monitoring
  private setupCoreWebVitals() {
    if ('PerformanceObserver' in window) {
      // Cumulative Layout Shift (CLS)
      try {
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const clsEntry = entry as any
            if (clsEntry.value) {
              this.recordMetric('CLS', clsEntry.value, 'score')
              trackPerformance('CLS', clsEntry.value)
            }
          }
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
        this.observers.set('cls', clsObserver)
      } catch (error) {
        console.warn('CLS monitoring not supported:', error)
      }

      // First Input Delay (FID)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const fidEntry = entry as any
            if (fidEntry.processingStart && fidEntry.startTime) {
              const fid = fidEntry.processingStart - fidEntry.startTime
              this.recordMetric('FID', fid, 'ms')
              trackPerformance('FID', fid)
            }
          }
        })
        fidObserver.observe({ entryTypes: ['first-input'] })
        this.observers.set('fid', fidObserver)
      } catch (error) {
        console.warn('FID monitoring not supported:', error)
      }

      // Largest Contentful Paint (LCP)
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          if (lastEntry) {
            this.recordMetric('LCP', lastEntry.startTime, 'ms')
            trackPerformance('LCP', lastEntry.startTime)
          }
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
        this.observers.set('lcp', lcpObserver)
      } catch (error) {
        console.warn('LCP monitoring not supported:', error)
      }

      // First Contentful Paint (FCP)
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.recordMetric('FCP', entry.startTime, 'ms')
            trackPerformance('FCP', entry.startTime)
          }
        })
        fcpObserver.observe({ entryTypes: ['first-contentful-paint'] })
        this.observers.set('fcp', fcpObserver)
      } catch (error) {
        console.warn('FCP monitoring not supported:', error)
      }
    }
  }

  // Setup custom performance metrics
  private setupCustomMetrics() {
    // Time to Interactive (TTI) approximation
    this.measureTTI()

    // Total Blocking Time (TBT) approximation
    this.measureTBT()

    // Speed Index approximation
    this.measureSpeedIndex()
  }

  // Measure Time to Interactive
  private measureTTI() {
    if (document.readyState === 'complete') {
      this.calculateTTI()
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => this.calculateTTI(), 0)
      })
    }
  }

  private calculateTTI() {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigationEntry) {
      const tti = navigationEntry.loadEventEnd - navigationEntry.fetchStart
      this.recordMetric('TTI', tti, 'ms')
      trackPerformance('TTI', tti)
    }
  }

  // Measure Total Blocking Time
  private measureTBT() {
    if ('PerformanceObserver' in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          let totalBlockingTime = 0
          for (const entry of list.getEntries()) {
            const blockingTime = entry.duration - 50 // Tasks longer than 50ms are blocking
            if (blockingTime > 0) {
              totalBlockingTime += blockingTime
            }
          }
          this.recordMetric('TBT', totalBlockingTime, 'ms')
          trackPerformance('TBT', totalBlockingTime)
        })
        longTaskObserver.observe({ entryTypes: ['longtask'] })
        this.observers.set('tbt', longTaskObserver)
      } catch (error) {
        console.warn('TBT monitoring not supported:', error)
      }
    }
  }

  // Measure Speed Index
  private measureSpeedIndex() {
    // This is a simplified Speed Index calculation
    // In a real implementation, you'd need to capture visual completeness over time
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigationEntry) {
      const speedIndex = navigationEntry.loadEventEnd - navigationEntry.fetchStart
      this.recordMetric('SpeedIndex', speedIndex, 'ms')
      trackPerformance('SpeedIndex', speedIndex)
    }
  }

  // Setup resource timing monitoring
  private setupResourceTiming() {
    if ('PerformanceObserver' in window) {
      try {
        const resourceObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const resourceEntry = entry as PerformanceResourceTiming
            this.recordResourceTiming(resourceEntry)
          }
        })
        resourceObserver.observe({ entryTypes: ['resource'] })
        this.observers.set('resource', resourceObserver)
      } catch (error) {
        console.warn('Resource timing monitoring not supported:', error)
      }
    }
  }

  // Record resource timing metrics
  private recordResourceTiming(entry: PerformanceResourceTiming) {
    const metrics = [
      { name: 'DNS', value: entry.domainLookupEnd - entry.domainLookupStart },
      { name: 'TCP', value: entry.connectEnd - entry.connectStart },
      { name: 'TTFB', value: entry.responseStart - entry.requestStart },
      { name: 'Download', value: entry.responseEnd - entry.responseStart },
      { name: 'Total', value: entry.duration }
    ]

    metrics.forEach(metric => {
      if (metric.value > 0) {
        this.recordMetric(`${entry.name}_${metric.name}`, metric.value, 'ms')
      }
    })
  }

  // Setup navigation timing
  private setupNavigationTiming() {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigationEntry) {
      const metrics = [
        { name: 'DNS', value: navigationEntry.domainLookupEnd - navigationEntry.domainLookupStart },
        { name: 'TCP', value: navigationEntry.connectEnd - navigationEntry.connectStart },
        { name: 'TTFB', value: navigationEntry.responseStart - navigationEntry.fetchStart },
        { name: 'DOMContentLoaded', value: navigationEntry.domContentLoadedEventEnd - navigationEntry.fetchStart },
        { name: 'Load', value: navigationEntry.loadEventEnd - navigationEntry.fetchStart }
      ]

      metrics.forEach(metric => {
        if (metric.value > 0) {
          this.recordMetric(`Navigation_${metric.name}`, metric.value, 'ms')
          trackPerformance(`Navigation_${metric.name}`, metric.value)
        }
      })
    }
  }

  // Setup long tasks monitoring
  private setupLongTasks() {
    if ('PerformanceObserver' in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.recordMetric('LongTask', entry.duration, 'ms')
            trackPerformance('LongTask', entry.duration)
          }
        })
        longTaskObserver.observe({ entryTypes: ['longtask'] })
        this.observers.set('longtask', longTaskObserver)
      } catch (error) {
        console.warn('Long task monitoring not supported:', error)
      }
    }
  }

  // Setup layout shifts monitoring
  private setupLayoutShifts() {
    if ('PerformanceObserver' in window) {
      try {
        const layoutShiftObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const layoutShiftEntry = entry as any
            if (layoutShiftEntry.value) {
              this.recordMetric('LayoutShift', layoutShiftEntry.value, 'score')
              trackPerformance('LayoutShift', layoutShiftEntry.value)
            }
          }
        })
        layoutShiftObserver.observe({ entryTypes: ['layout-shift'] })
        this.observers.set('layoutShift', layoutShiftObserver)
      } catch (error) {
        console.warn('Layout shift monitoring not supported:', error)
      }
    }
  }

  // Setup first input delay monitoring
  private setupFirstInputDelay() {
    if ('PerformanceObserver' in window) {
      try {
        const firstInputObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const firstInputEntry = entry as any
            if (firstInputEntry.processingStart && firstInputEntry.startTime) {
              const fid = firstInputEntry.processingStart - firstInputEntry.startTime
              this.recordMetric('FirstInputDelay', fid, 'ms')
              trackPerformance('FirstInputDelay', fid)
            }
          }
        })
        firstInputObserver.observe({ entryTypes: ['first-input'] })
        this.observers.set('firstInput', firstInputObserver)
      } catch (error) {
        console.warn('First input delay monitoring not supported:', error)
      }
    }
  }

  // Record a performance metric
  private recordMetric(name: string, value: number, unit: string) {
    const metric: PerformanceMetric = {
      name,
      value,
      unit,
      timestamp: Date.now()
    }

    this.metrics.push(metric)

    // Keep only last 100 metrics
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100)
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance Metric: ${name} = ${value}${unit}`)
    }
  }

  // Get all recorded metrics
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics]
  }

  // Get metrics by name
  getMetricsByName(name: string): PerformanceMetric[] {
    return this.metrics.filter(metric => metric.name === name)
  }

  // Get latest metric by name
  getLatestMetric(name: string): PerformanceMetric | null {
    const metrics = this.getMetricsByName(name)
    return metrics.length > 0 ? metrics[metrics.length - 1] : null
  }

  // Get Core Web Vitals
  getCoreWebVitals(): Partial<CoreWebVitals> {
    const vitals: Partial<CoreWebVitals> = {}
    
    const cls = this.getLatestMetric('CLS')
    if (cls) vitals.CLS = cls.value

    const fid = this.getLatestMetric('FID')
    if (fid) vitals.FID = fid.value

    const fcp = this.getLatestMetric('FCP')
    if (fcp) vitals.FCP = fcp.value

    const lcp = this.getLatestMetric('LCP')
    if (lcp) vitals.LCP = lcp.value

    const ttfb = this.getLatestMetric('TTFB')
    if (ttfb) vitals.TTFB = ttfb.value

    return vitals
  }

  // Measure custom performance
  measureCustom(name: string, fn: () => any) {
    const start = performance.now()
    const result = fn()
    const end = performance.now()
    
    this.recordMetric(name, end - start, 'ms')
    return result
  }

  // Measure async performance
  async measureCustomAsync(name: string, fn: () => Promise<any>) {
    const start = performance.now()
    const result = await fn()
    const end = performance.now()
    
    this.recordMetric(name, end - start, 'ms')
    return result
  }

  // Disconnect all observers
  disconnect() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers.clear()
  }

  // Check if monitoring is initialized
  isMonitoringInitialized(): boolean {
    return this.isInitialized
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor()

// Export functions for use in components
export const getMetrics = () => performanceMonitor.getMetrics()
export const getMetricsByName = (name: string) => performanceMonitor.getMetricsByName(name)
export const getLatestMetric = (name: string) => performanceMonitor.getLatestMetric(name)
export const getCoreWebVitals = () => performanceMonitor.getCoreWebVitals()
export const measureCustom = (name: string, fn: () => any) => performanceMonitor.measureCustom(name, fn)
export const measureCustomAsync = (name: string, fn: () => Promise<any>) => performanceMonitor.measureCustomAsync(name, fn)
export const disconnectPerformanceMonitoring = () => performanceMonitor.disconnect()
export const isPerformanceMonitoringInitialized = () => performanceMonitor.isMonitoringInitialized()

// React hook for performance monitoring
export const usePerformanceMonitoring = () => {
  const [metrics, setMetrics] = React.useState<PerformanceMetric[]>([])
  const [coreWebVitals, setCoreWebVitals] = React.useState<Partial<CoreWebVitals>>({})

  React.useEffect(() => {
    const updateMetrics = () => {
      setMetrics(getMetrics())
      setCoreWebVitals(getCoreWebVitals())
    }

    // Update metrics every 5 seconds
    const interval = setInterval(updateMetrics, 5000)
    updateMetrics() // Initial update

    return () => clearInterval(interval)
  }, [])

  return {
    metrics,
    coreWebVitals,
    getMetrics,
    getMetricsByName,
    getLatestMetric,
    getCoreWebVitals,
    measureCustom,
    measureCustomAsync
  }
}

export default performanceMonitor 