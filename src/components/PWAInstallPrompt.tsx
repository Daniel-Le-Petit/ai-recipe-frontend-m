'use client';

import React, { useState, useEffect } from 'react'
import { Download, RefreshCw, X, Bell, BellOff } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePWAInstall, installPWA, updatePWA, skipWaiting } from '@/utils/pwa'
import { trackEvent } from '@/utils/analytics'

interface PWAInstallPromptProps {
  className?: string
  showUpdatePrompt?: boolean
}

export const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({
  className = '',
  showUpdatePrompt = true
}) => {
  const { installPromptAvailable, updateAvailable, installPWA: install, updatePWA: update, skipWaiting: skip } = usePWAInstall()
  const [isInstalling, setIsInstalling] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showInstallBanner, setShowInstallBanner] = useState(false)
  const [showUpdateBanner, setShowUpdateBanner] = useState(false)
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default')

  useEffect(() => {
    // Show install banner after 5 seconds if available
    if (installPromptAvailable) {
      const timer = setTimeout(() => {
        setShowInstallBanner(true)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [installPromptAvailable])

  useEffect(() => {
    // Show update banner immediately if available
    if (updateAvailable && showUpdatePrompt) {
      setShowUpdateBanner(true)
    }
  }, [updateAvailable, showUpdatePrompt])

  useEffect(() => {
    // Check notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission)
    }
  }, [])

  const handleInstall = async () => {
    setIsInstalling(true)
    try {
      const success = await install()
      if (success) {
        setShowInstallBanner(false)
        trackEvent({
          action: 'pwa_install_success',
          category: 'PWA',
          label: 'Installation réussie'
        })
      }
    } catch (error) {
      console.error('Installation failed:', error)
      trackEvent({
        action: 'pwa_install_error',
        category: 'PWA',
        label: 'Erreur d\'installation'
      })
    } finally {
      setIsInstalling(false)
    }
  }

  const handleUpdate = async () => {
    setIsUpdating(true)
    try {
      await update()
      await skip()
      trackEvent({
        action: 'pwa_update_success',
        category: 'PWA',
        label: 'Mise à jour réussie'
      })
    } catch (error) {
      console.error('Update failed:', error)
      trackEvent({
        action: 'pwa_update_error',
        category: 'PWA',
        label: 'Erreur de mise à jour'
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleRequestNotifications = async () => {
    try {
      const permission = await Notification.requestPermission()
      setNotificationPermission(permission)
      
      trackEvent({
        action: 'notification_permission_request',
        category: 'PWA',
        label: permission === 'granted' ? 'Autorisé' : 'Refusé'
      })
    } catch (error) {
      console.error('Notification permission request failed:', error)
    }
  }

  const dismissInstallBanner = () => {
    setShowInstallBanner(false)
    trackEvent({
      action: 'pwa_install_dismiss',
      category: 'PWA',
      label: 'Bannière fermée'
    })
  }

  const dismissUpdateBanner = () => {
    setShowUpdateBanner(false)
    trackEvent({
      action: 'pwa_update_dismiss',
      category: 'PWA',
      label: 'Bannière fermée'
    })
  }

  return (
    <div className={className}>
      {/* Install Banner */}
      <AnimatePresence>
        {showInstallBanner && installPromptAvailable && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-4 right-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-herb-green rounded-lg flex items-center justify-center">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Installer l'application</h3>
                  <p className="text-sm text-gray-600">
                    Accédez rapidement à vos recettes préférées
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleInstall}
                  disabled={isInstalling}
                  className="px-4 py-2 bg-herb-green text-white rounded-md hover:bg-herb-dark transition-colors disabled:opacity-50"
                >
                  {isInstalling ? 'Installation...' : 'Installer'}
                </button>
                <button
                  onClick={dismissInstallBanner}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Fermer la bannière d'installation"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Update Banner */}
      <AnimatePresence>
        {showUpdateBanner && updateAvailable && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-4 right-4 z-50 bg-blue-50 border border-blue-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900">Nouvelle version disponible</h3>
                  <p className="text-sm text-blue-700">
                    Mettez à jour pour bénéficier des dernières améliorations
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {isUpdating ? 'Mise à jour...' : 'Mettre à jour'}
                </button>
                <button
                  onClick={dismissUpdateBanner}
                  className="p-2 text-blue-400 hover:text-blue-600 transition-colors"
                  aria-label="Fermer la bannière de mise à jour"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Permission Request */}
      {notificationPermission === 'default' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bell className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">Notifications</h3>
              <p className="text-xs text-gray-600 mb-3">
                Recevez des alertes pour de nouvelles recettes
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleRequestNotifications}
                  className="px-3 py-1 bg-herb-green text-white text-xs rounded hover:bg-herb-dark transition-colors"
                >
                  Autoriser
                </button>
                <button
                  onClick={() => setNotificationPermission('denied')}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200 transition-colors"
                >
                  Plus tard
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default PWAInstallPrompt 