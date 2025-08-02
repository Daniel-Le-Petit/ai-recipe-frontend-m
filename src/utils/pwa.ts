'use client';

import React from 'react';

// Types for PWA functionality
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

// PWA state management
class PWAManager {
  private deferredPrompt: BeforeInstallPromptEvent | null = null
  private isInstalled = false
  private updateAvailable = false
  private registration: ServiceWorkerRegistration | null = null

  constructor() {
    this.init()
  }

  private init() {
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      this.deferredPrompt = e as BeforeInstallPromptEvent
      this.showInstallPrompt()
    })

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      this.isInstalled = true
      this.deferredPrompt = null
      this.hideInstallPrompt()
      console.log('PWA was installed')
    })

    // Register service worker
    this.registerServiceWorker()
  }

  // Register service worker
  private async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.register('/sw.js')
        console.log('Service Worker registered successfully')

        // Listen for updates
        if (this.registration) {
          this.registration.addEventListener('updatefound', () => {
            const newWorker = this.registration!.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  this.updateAvailable = true
                  this.showUpdatePrompt()
                }
              })
            }
          })

          // Listen for controller change
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('Service Worker controller changed')
          })
        }

      } catch (error) {
        console.error('Service Worker registration failed:', error)
      }
    }
  }

  // Show install prompt
  private showInstallPrompt() {
    // Dispatch custom event to notify components
    window.dispatchEvent(new CustomEvent('pwa-install-available', {
      detail: { available: true }
    }))
  }

  // Hide install prompt
  private hideInstallPrompt() {
    window.dispatchEvent(new CustomEvent('pwa-install-available', {
      detail: { available: false }
    }))
  }

  // Show update prompt
  private showUpdatePrompt() {
    window.dispatchEvent(new CustomEvent('pwa-update-available', {
      detail: { available: true }
    }))
  }

  // Install PWA
  async installPWA(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false
    }

    try {
      this.deferredPrompt.prompt()
      const { outcome } = await this.deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt')
        return true
      } else {
        console.log('User dismissed the install prompt')
        return false
      }
    } catch (error) {
      console.error('Error installing PWA:', error)
      return false
    } finally {
      this.deferredPrompt = null
    }
  }

  // Update PWA
  async updatePWA(): Promise<void> {
    if (this.registration && this.updateAvailable) {
      try {
        await this.registration.update()
        console.log('PWA update initiated')
      } catch (error) {
        console.error('Error updating PWA:', error)
      }
    }
  }

  // Skip waiting and reload
  async skipWaiting(): Promise<void> {
    if (this.registration && this.registration.waiting) {
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      
      // Reload the page when the new service worker takes control
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload()
      })
    }
  }

  // Check if PWA is installed
  isPWAInstalled(): boolean {
    return this.isInstalled || window.matchMedia('(display-mode: standalone)').matches
  }

  // Check if install prompt is available
  isInstallPromptAvailable(): boolean {
    return this.deferredPrompt !== null
  }

  // Check if update is available
  isUpdateAvailable(): boolean {
    return this.updateAvailable
  }

  // Request notification permission
  async requestNotificationPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications')
      return false
    }

    if (Notification.permission === 'granted') {
      return true
    }

    if (Notification.permission === 'denied') {
      console.log('Notification permission denied')
      return false
    }

    try {
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    } catch (error) {
      console.error('Error requesting notification permission:', error)
      return false
    }
  }

  // Subscribe to push notifications
  async subscribeToPushNotifications(): Promise<PushSubscription | null> {
    if (!this.registration) {
      console.error('Service Worker not registered')
      return null
    }

    try {
      const permission = await this.requestNotificationPermission()
      if (!permission) {
        return null
      }

      const subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '')
      })

      console.log('Push notification subscription:', subscription)
      return subscription
    } catch (error) {
      console.error('Error subscribing to push notifications:', error)
      return null
    }
  }

  // Unsubscribe from push notifications
  async unsubscribeFromPushNotifications(): Promise<boolean> {
    if (!this.registration) {
      return false
    }

    try {
      const subscription = await this.registration.pushManager.getSubscription()
      if (subscription) {
        await subscription.unsubscribe()
        console.log('Unsubscribed from push notifications')
        return true
      }
      return false
    } catch (error) {
      console.error('Error unsubscribing from push notifications:', error)
      return false
    }
  }

  // Convert VAPID key
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  // Get app version
  async getAppVersion(): Promise<string> {
    if (this.registration && this.registration.active) {
      return new Promise((resolve) => {
        const channel = new MessageChannel()
        channel.port1.onmessage = (event) => {
          resolve(event.data.version)
        }
        this.registration!.active!.postMessage(
          { type: 'GET_VERSION' },
          [channel.port2]
        )
      })
    }
    return 'unknown'
  }

  // Check if app is running in standalone mode
  isStandalone(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true
  }

  // Get network status
  getNetworkStatus(): 'online' | 'offline' {
    return navigator.onLine ? 'online' : 'offline'
  }

  // Add network status listener
  onNetworkStatusChange(callback: (status: 'online' | 'offline') => void): void {
    window.addEventListener('online', () => callback('online'))
    window.addEventListener('offline', () => callback('offline'))
  }
}

// Create singleton instance
const pwaManager = new PWAManager()

// Export functions for use in components
export const installPWA = () => pwaManager.installPWA()
export const updatePWA = () => pwaManager.updatePWA()
export const skipWaiting = () => pwaManager.skipWaiting()
export const isPWAInstalled = () => pwaManager.isPWAInstalled()
export const isInstallPromptAvailable = () => pwaManager.isInstallPromptAvailable()
export const isUpdateAvailable = () => pwaManager.isUpdateAvailable()
export const requestNotificationPermission = () => pwaManager.requestNotificationPermission()
export const subscribeToPushNotifications = () => pwaManager.subscribeToPushNotifications()
export const unsubscribeFromPushNotifications = () => pwaManager.unsubscribeFromPushNotifications()
export const getAppVersion = () => pwaManager.getAppVersion()
export const isStandalone = () => pwaManager.isStandalone()
export const getNetworkStatus = () => pwaManager.getNetworkStatus()
export const onNetworkStatusChange = (callback: (status: 'online' | 'offline') => void) => 
  pwaManager.onNetworkStatusChange(callback)

// React hook for PWA install prompt
export const usePWAInstall = () => {
  const [installPromptAvailable, setInstallPromptAvailable] = React.useState(false)
  const [updateAvailable, setUpdateAvailable] = React.useState(false)

  React.useEffect(() => {
    const handleInstallAvailable = (event: CustomEvent) => {
      setInstallPromptAvailable(event.detail.available)
    }

    const handleUpdateAvailable = (event: CustomEvent) => {
      setUpdateAvailable(event.detail.available)
    }

    window.addEventListener('pwa-install-available', handleInstallAvailable as EventListener)
    window.addEventListener('pwa-update-available', handleUpdateAvailable as EventListener)

    return () => {
      window.removeEventListener('pwa-install-available', handleInstallAvailable as EventListener)
      window.removeEventListener('pwa-update-available', handleUpdateAvailable as EventListener)
    }
  }, [])

  return {
    installPromptAvailable,
    updateAvailable,
    installPWA,
    updatePWA,
    skipWaiting
  }
}

export default pwaManager 