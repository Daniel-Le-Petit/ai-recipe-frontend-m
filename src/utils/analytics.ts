'use client';

import React from 'react';

// Types for analytics
interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
  custom_parameters?: Record<string, any>
}

interface PageView {
  url: string
  title: string
  referrer?: string
}

// Analytics configuration
interface AnalyticsConfig {
  googleAnalyticsId?: string
  plausibleDomain?: string
  enableTracking: boolean
  debug?: boolean
}

// Default configuration
const defaultConfig: AnalyticsConfig = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  enableTracking: process.env.NODE_ENV === 'production',
  debug: process.env.NODE_ENV === 'development'
}

class AnalyticsManager {
  private config: AnalyticsConfig
  private isInitialized = false

  constructor(config: Partial<AnalyticsConfig> = {}) {
    this.config = { ...defaultConfig, ...config }
    this.init()
  }

  private init() {
    if (!this.config.enableTracking) {
      if (this.config.debug) {
        console.log('Analytics disabled')
      }
      return
    }

    this.initGoogleAnalytics()
    this.initPlausible()
    this.isInitialized = true
  }

  // Initialize Google Analytics
  private initGoogleAnalytics() {
    if (!this.config.googleAnalyticsId) {
      return
    }

    // Load Google Analytics script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.googleAnalyticsId}`
    document.head.appendChild(script)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    gtag('js', new Date())
    gtag('config', this.config.googleAnalyticsId, {
      page_title: document.title,
      page_location: window.location.href
    })

    // Make gtag available globally
    ;(window as any).gtag = gtag

    if (this.config.debug) {
      console.log('Google Analytics initialized')
    }
  }

  // Initialize Plausible
  private initPlausible() {
    if (!this.config.plausibleDomain) {
      return
    }

    // Load Plausible script
    const script = document.createElement('script')
    script.async = true
    script.defer = true
    script.setAttribute('data-domain', this.config.plausibleDomain)
    script.src = 'https://plausible.io/js/script.js'
    document.head.appendChild(script)

    if (this.config.debug) {
      console.log('Plausible initialized')
    }
  }

  // Track page view
  trackPageView(pageView: PageView) {
    if (!this.isInitialized) {
      return
    }

    // Google Analytics
    if (this.config.googleAnalyticsId && (window as any).gtag) {
      (window as any).gtag('config', this.config.googleAnalyticsId, {
        page_title: pageView.title,
        page_location: pageView.url,
        page_referrer: pageView.referrer
      })
    }

    // Plausible
    if (this.config.plausibleDomain && (window as any).plausible) {
      (window as any).plausible('pageview', {
        props: {
          url: pageView.url,
          title: pageView.title,
          referrer: pageView.referrer
        }
      })
    }

    if (this.config.debug) {
      console.log('Page view tracked:', pageView)
    }
  }

  // Track custom event
  trackEvent(event: AnalyticsEvent) {
    if (!this.isInitialized) {
      return
    }

    // Google Analytics
    if (this.config.googleAnalyticsId && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.custom_parameters
      })
    }

    // Plausible
    if (this.config.plausibleDomain && (window as any).plausible) {
      (window as any).plausible(event.action, {
        props: {
          category: event.category,
          label: event.label,
          value: event.value,
          ...event.custom_parameters
        }
      })
    }

    if (this.config.debug) {
      console.log('Event tracked:', event)
    }
  }

  // Track recipe interactions
  trackRecipeInteraction(action: string, recipeId: number, recipeTitle: string, additionalData?: Record<string, any>) {
    this.trackEvent({
      action,
      category: 'Recipe',
      label: recipeTitle,
      custom_parameters: {
        recipe_id: recipeId,
        recipe_title: recipeTitle,
        ...additionalData
      }
    })
  }

  // Track search
  trackSearch(query: string, resultsCount: number, filters?: Record<string, any>) {
    this.trackEvent({
      action: 'search',
      category: 'Search',
      label: query,
      value: resultsCount,
      custom_parameters: {
        query,
        results_count: resultsCount,
        filters: JSON.stringify(filters)
      }
    })
  }

  // Track user engagement
  trackEngagement(action: string, duration?: number, scrollDepth?: number) {
    this.trackEvent({
      action,
      category: 'Engagement',
      value: duration,
      custom_parameters: {
        duration,
        scroll_depth: scrollDepth
      }
    })
  }

  // Track conversion
  trackConversion(action: string, value?: number, currency: string = 'EUR') {
    this.trackEvent({
      action,
      category: 'Conversion',
      value,
      custom_parameters: {
        currency
      }
    })
  }

  // Track error
  trackError(error: Error, context?: string) {
    this.trackEvent({
      action: 'error',
      category: 'Error',
      label: error.message,
      custom_parameters: {
        error_name: error.name,
        error_stack: error.stack,
        context
      }
    })
  }

  // Track performance
  trackPerformance(metric: string, value: number, unit: string = 'ms') {
    this.trackEvent({
      action: 'performance',
      category: 'Performance',
      label: metric,
      value,
      custom_parameters: {
        unit
      }
    })
  }

  // Track user preferences
  trackUserPreference(preference: string, value: any) {
    this.trackEvent({
      action: 'preference_change',
      category: 'User',
      label: preference,
      custom_parameters: {
        preference,
        value: JSON.stringify(value)
      }
    })
  }

  // Track feature usage
  trackFeatureUsage(feature: string, action: string, additionalData?: Record<string, any>) {
    this.trackEvent({
      action: `${feature}_${action}`,
      category: 'Feature',
      label: feature,
      custom_parameters: {
        feature,
        action,
        ...additionalData
      }
    })
  }

  // Set user properties
  setUserProperties(properties: Record<string, any>) {
    if (!this.isInitialized) {
      return
    }

    // Google Analytics
    if (this.config.googleAnalyticsId && (window as any).gtag) {
      (window as any).gtag('config', this.config.googleAnalyticsId, {
        custom_map: properties
      })
    }

    if (this.config.debug) {
      console.log('User properties set:', properties)
    }
  }

  // Enable/disable tracking
  setTrackingEnabled(enabled: boolean) {
    this.config.enableTracking = enabled
    if (this.config.debug) {
      console.log('Tracking enabled:', enabled)
    }
  }

  // Get tracking status
  isTrackingEnabled(): boolean {
    return this.config.enableTracking && this.isInitialized
  }
}

// Create singleton instance
const analyticsManager = new AnalyticsManager()

// Export functions for use in components
export const trackPageView = (pageView: PageView) => analyticsManager.trackPageView(pageView)
export const trackEvent = (event: AnalyticsEvent) => analyticsManager.trackEvent(event)
export const trackRecipeInteraction = (action: string, recipeId: number, recipeTitle: string, additionalData?: Record<string, any>) => 
  analyticsManager.trackRecipeInteraction(action, recipeId, recipeTitle, additionalData)
export const trackSearch = (query: string, resultsCount: number, filters?: Record<string, any>) => 
  analyticsManager.trackSearch(query, resultsCount, filters)
export const trackEngagement = (action: string, duration?: number, scrollDepth?: number) => 
  analyticsManager.trackEngagement(action, duration, scrollDepth)
export const trackConversion = (action: string, value?: number, currency?: string) => 
  analyticsManager.trackConversion(action, value, currency)
export const trackError = (error: Error, context?: string) => analyticsManager.trackError(error, context)
export const trackPerformance = (metric: string, value: number, unit?: string) => 
  analyticsManager.trackPerformance(metric, value, unit)
export const trackUserPreference = (preference: string, value: any) => 
  analyticsManager.trackUserPreference(preference, value)
export const trackFeatureUsage = (feature: string, action: string, additionalData?: Record<string, any>) => 
  analyticsManager.trackFeatureUsage(feature, action, additionalData)
export const setUserProperties = (properties: Record<string, any>) => analyticsManager.setUserProperties(properties)
export const setTrackingEnabled = (enabled: boolean) => analyticsManager.setTrackingEnabled(enabled)
export const isTrackingEnabled = () => analyticsManager.isTrackingEnabled()

// React hook for analytics
export const useAnalytics = () => {
  const trackPageViewWithRouter = React.useCallback((url: string, title?: string) => {
    trackPageView({
      url,
      title: title || document.title,
      referrer: document.referrer
    })
  }, [])

  const trackRecipeView = React.useCallback((recipeId: number, recipeTitle: string) => {
    trackRecipeInteraction('view', recipeId, recipeTitle)
  }, [])

  const trackRecipeFavorite = React.useCallback((recipeId: number, recipeTitle: string, isFavorited: boolean) => {
    trackRecipeInteraction('favorite', recipeId, recipeTitle, { is_favorited: isFavorited })
  }, [])

  const trackRecipeShare = React.useCallback((recipeId: number, recipeTitle: string, platform?: string) => {
    trackRecipeInteraction('share', recipeId, recipeTitle, { platform })
  }, [])

  const trackRecipeStart = React.useCallback((recipeId: number, recipeTitle: string) => {
    trackRecipeInteraction('start_cooking', recipeId, recipeTitle)
  }, [])

  return {
    trackPageView: trackPageViewWithRouter,
    trackRecipeView,
    trackRecipeFavorite,
    trackRecipeShare,
    trackRecipeStart,
    trackSearch,
    trackEngagement,
    trackConversion,
    trackError,
    trackPerformance,
    trackUserPreference,
    trackFeatureUsage,
    setUserProperties,
    setTrackingEnabled,
    isTrackingEnabled
  }
}

// Performance monitoring
export const trackCoreWebVitals = () => {
  if (typeof window !== 'undefined') {
    try {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS((metric) => trackPerformance('CLS', metric.value))
        getFID((metric) => trackPerformance('FID', metric.value))
        getFCP((metric) => trackPerformance('FCP', metric.value))
        getLCP((metric) => trackPerformance('LCP', metric.value))
        getTTFB((metric) => trackPerformance('TTFB', metric.value))
      }).catch(() => {
        console.log('web-vitals not available, skipping Core Web Vitals tracking')
      })
    } catch (error) {
      console.log('web-vitals not available, skipping Core Web Vitals tracking')
    }
  }
}

export default analyticsManager 