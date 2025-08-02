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

interface ServiceWorkerRegistration {
  installing?: ServiceWorker
  waiting?: ServiceWorker
  active?: ServiceWorker
  scope: string
  updateViaCache: 'all' | 'imports' | 'none'
  onupdatefound: ((this: ServiceWorkerRegistration, ev: Event) => any) | null
  oncontrollerchange: ((this: ServiceWorkerRegistration, ev: Event) => any) | null
  onstatechange: ((this: ServiceWorkerRegistration, ev: Event) => any) | null
  update(): Promise<void>
  unregister(): Promise<boolean>
  getNotifications(filter?: GetNotificationOptions): Promise<Notification[]>
  showNotification(title: string, options?: NotificationOptions): Promise<void>
  getPushSubscription(): Promise<PushSubscription | null>
  pushManager: PushManager
}

// PWA state management
export class PWAManager {
  private deferredPrompt: BeforeInstallPromptEvent | null = null
  private isInstalled = false
  private updateAvailable = false
  private registration: ServiceWorkerRegistration | null = null

  constructor() {
    // Ne pas initialiser dans le constructeur
  }

  init() {
    if (typeof window === 'undefined') return;
    
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
    if (typeof window === 'undefined') return;
    
    if ('serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.register('/sw.js')
        console.log('Service Worker registered successfully')

        // Listen for updates
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

      } catch (error) {
        console.error('Service Worker registration failed:', error)
      }
    }
  }

  // Show install prompt
  private showInstallPrompt() {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent('pwa-install-available', {
      detail: { available: true }
    }))
  }

  // Hide install prompt
  private hideInstallPrompt() {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent('pwa-install-available', {
      detail: { available: false }
    }))
  }

  // Show update prompt
  private showUpdatePrompt() {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent('pwa-update-available', {
      detail: { available: true }
    }))
  }

  // Install PWA
  async installPWA(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    
    if (!this.deferredPrompt) {
      return false
    }

    try {
      this.deferredPrompt.prompt()
      const { outcome } = await this.deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        this.deferredPrompt = null
        return true
      }
      
      return false
    } catch (error) {
      console.error('PWA installation failed:', error)
      return false
    }
  }

  // Update PWA
  async updatePWA(): Promise<void> {
    if (typeof window === 'undefined') return;
    
    if (this.registration && this.registration.waiting) {
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
  }

  // Skip waiting
  async skipWaiting(): Promise<void> {
    if (typeof window === 'undefined') return;
    
    if (this.registration && this.registration.waiting) {
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
  }

  // Check if PWA is installed
  isPWAInstalled(): boolean {
    if (typeof window === 'undefined') return false;
    return this.isInstalled || window.matchMedia('(display-mode: standalone)').matches
  }

  // Check if install prompt is available
  isInstallPromptAvailable(): boolean {
    if (typeof window === 'undefined') return false;
    return !!this.deferredPrompt
  }

  // Check if update is available
  isUpdateAvailable(): boolean {
    if (typeof window === 'undefined') return false;
    return this.updateAvailable
  }

  // Request notification permission
  async requestNotificationPermission(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    
    if (!('Notification' in window)) {
      return false
    }

    if (Notification.permission === 'granted') {
      return true
    }

    if (Notification.permission === 'denied') {
      return false
    }

    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  // Subscribe to push notifications
  async subscribeToPushNotifications(): Promise<PushSubscription | null> {
    if (typeof window === 'undefined') return null;
    
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      return null
    }

    try {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '')
      })

      return subscription
    } catch (error) {
      console.error('Push notification subscription failed:', error)
      return null
    }
  }

  // Unsubscribe from push notifications
  async unsubscribeFromPushNotifications(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      return false
    }

    try {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.getSubscription()
      
      if (subscription) {
        await subscription.unsubscribe()
        return true
      }
      
      return false
    } catch (error) {
      console.error('Push notification unsubscription failed:', error)
      return false
    }
  }

  // Convert VAPID key
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    if (typeof window === 'undefined') return new Uint8Array();
    
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
    if (typeof window === 'undefined') return 'unknown';
    
    if (this.registration) {
      return new Promise((resolve) => {
        const channel = new MessageChannel()
        channel.port1.onmessage = (event) => {
          resolve(event.data.version)
        }
        this.registration!.active?.postMessage(
          { type: 'GET_VERSION' },
          [channel.port2]
        )
      })
    }
    return 'unknown'
  }

  // Check if app is running in standalone mode
  isStandalone(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true
  }

  // Get network status
  getNetworkStatus(): 'online' | 'offline' {
    if (typeof window === 'undefined') return 'online';
    return navigator.onLine ? 'online' : 'offline'
  }

  // Add network status listener
  onNetworkStatusChange(callback: (status: 'online' | 'offline') => void): void {
    if (typeof window === 'undefined') return;
    window.addEventListener('online', () => callback('online'))
    window.addEventListener('offline', () => callback('offline'))
  }
}

// Singleton côté client uniquement
let pwaManagerInstance: PWAManager | null = null;

function getPWAManager(): PWAManager {
  if (typeof window === 'undefined') {
    throw new Error('PWAManager ne peut être utilisé que côté client');
  }
  if (!pwaManagerInstance) {
    pwaManagerInstance = new PWAManager();
    pwaManagerInstance.init();
  }
  return pwaManagerInstance;
}

// Export functions for use in components
export const installPWA = () => typeof window !== 'undefined' ? getPWAManager().installPWA() : Promise.resolve(false);
export const updatePWA = () => typeof window !== 'undefined' ? getPWAManager().updatePWA() : Promise.resolve();
export const skipWaiting = () => typeof window !== 'undefined' ? getPWAManager().skipWaiting() : Promise.resolve();
export const isPWAInstalled = () => typeof window !== 'undefined' ? getPWAManager().isPWAInstalled() : false;
export const isInstallPromptAvailable = () => typeof window !== 'undefined' ? getPWAManager().isInstallPromptAvailable() : false;
export const isUpdateAvailable = () => typeof window !== 'undefined' ? getPWAManager().isUpdateAvailable() : false;
export const requestNotificationPermission = () => typeof window !== 'undefined' ? getPWAManager().requestNotificationPermission() : Promise.resolve(false);
export const subscribeToPushNotifications = () => typeof window !== 'undefined' ? getPWAManager().subscribeToPushNotifications() : Promise.resolve(null);
export const unsubscribeFromPushNotifications = () => typeof window !== 'undefined' ? getPWAManager().unsubscribeFromPushNotifications() : Promise.resolve(false);
export const getAppVersion = () => typeof window !== 'undefined' ? getPWAManager().getAppVersion() : Promise.resolve('unknown');
export const isStandalone = () => typeof window !== 'undefined' ? getPWAManager().isStandalone() : false;
export const getNetworkStatus = () => typeof window !== 'undefined' ? getPWAManager().getNetworkStatus() : 'online';
export const onNetworkStatusChange = (callback: (status: 'online' | 'offline') => void) => {
  if (typeof window !== 'undefined') {
    getPWAManager().onNetworkStatusChange(callback);
  }
};

// React hook for PWA install prompt
export const usePWAInstall = () => {
  const [installPromptAvailable, setInstallPromptAvailable] = React.useState(false)
  const [updateAvailable, setUpdateAvailable] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
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

export default PWAManager 