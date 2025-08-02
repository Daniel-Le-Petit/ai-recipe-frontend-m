const CACHE_NAME = 'ai-fines-herbes-v1.0.0'
const STATIC_CACHE = 'static-v1.0.0'
const DYNAMIC_CACHE = 'dynamic-v1.0.0'

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/favicon.png',
  '/pwa-icon-512.png',
  '/pwa-icon-1024.png',
  '/Images/fallback-recipe.jpg',
  '/assets/flask.svg',
  '/main-image-cart.svg',
  '/Images/calendar-recipe.png',
]

// API endpoints to cache
const API_CACHE = [
  '/api/recipies',
  '/api/recipie-categories',
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('Service Worker: Static assets cached')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('Service Worker: Error caching static assets', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker: Activated')
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request))
    return
  }

  // Handle static assets
  if (isStaticAsset(url.pathname)) {
    event.respondWith(handleStaticAsset(request))
    return
  }

  // Handle navigation requests (pages)
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request))
    return
  }

  // Default: try network first, fallback to cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful responses
        if (response.status === 200) {
          const responseClone = response.clone()
          caches.open(DYNAMIC_CACHE)
            .then((cache) => {
              cache.put(request, responseClone)
            })
        }
        return response
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(request)
      })
  )
})

// Handle API requests with cache-first strategy
async function handleApiRequest(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      // Return cached response but update in background
      fetchAndCache(request)
      return cachedResponse
    }

    // If not in cache, fetch from network
    const response = await fetch(request)
    if (response.ok) {
      const responseClone = response.clone()
      caches.open(DYNAMIC_CACHE)
        .then((cache) => {
          cache.put(request, responseClone)
        })
    }
    return response
  } catch (error) {
    console.error('Service Worker: API request failed', error)
    // Return cached response if available
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    // Return offline page or error response
    return new Response(
      JSON.stringify({ error: 'Service unavailable' }),
      { 
        status: 503, 
        headers: { 'Content-Type': 'application/json' } 
      }
    )
  }
}

// Handle static assets with cache-first strategy
async function handleStaticAsset(request) {
  const cachedResponse = await caches.match(request)
  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const response = await fetch(request)
    if (response.ok) {
      const responseClone = response.clone()
      caches.open(STATIC_CACHE)
        .then((cache) => {
          cache.put(request, responseClone)
        })
    }
    return response
  } catch (error) {
    console.error('Service Worker: Static asset request failed', error)
    return new Response('Asset not found', { status: 404 })
  }
}

// Handle navigation requests with network-first strategy
async function handleNavigation(request) {
  try {
    // Try network first
    const response = await fetch(request)
    if (response.ok) {
      const responseClone = response.clone()
      caches.open(DYNAMIC_CACHE)
        .then((cache) => {
          cache.put(request, responseClone)
        })
    }
    return response
  } catch (error) {
    console.error('Service Worker: Navigation request failed', error)
    // Return cached response if available
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    // Return offline page
    return caches.match('/offline.html')
  }
}

// Background fetch and cache
async function fetchAndCache(request) {
  try {
    const response = await fetch(request)
    if (response.ok) {
      const responseClone = response.clone()
      caches.open(DYNAMIC_CACHE)
        .then((cache) => {
          cache.put(request, responseClone)
        })
    }
  } catch (error) {
    console.error('Service Worker: Background fetch failed', error)
  }
}

// Check if URL is a static asset
function isStaticAsset(pathname) {
  return STATIC_ASSETS.some(asset => pathname === asset) ||
         pathname.startsWith('/_next/static/') ||
         pathname.startsWith('/Images/') ||
         pathname.startsWith('/assets/') ||
         pathname.endsWith('.css') ||
         pathname.endsWith('.js') ||
         pathname.endsWith('.png') ||
         pathname.endsWith('.jpg') ||
         pathname.endsWith('.jpeg') ||
         pathname.endsWith('.gif') ||
         pathname.endsWith('.svg') ||
         pathname.endsWith('.ico')
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  try {
    // Sync any pending actions (favorites, ratings, etc.)
    const pendingActions = await getPendingActions()
    
    for (const action of pendingActions) {
      await syncAction(action)
    }
    
    console.log('Service Worker: Background sync completed')
  } catch (error) {
    console.error('Service Worker: Background sync failed', error)
  }
}

// Get pending actions from IndexedDB
async function getPendingActions() {
  // This would typically use IndexedDB to store pending actions
  // For now, return empty array
  return []
}

// Sync a single action
async function syncAction(action) {
  try {
    const response = await fetch(action.url, {
      method: action.method,
      headers: action.headers,
      body: action.body
    })
    
    if (response.ok) {
      // Remove from pending actions
      await removePendingAction(action.id)
    }
  } catch (error) {
    console.error('Service Worker: Action sync failed', error)
  }
}

// Remove pending action from IndexedDB
async function removePendingAction(id) {
  // Implementation would use IndexedDB
  console.log('Service Worker: Removed pending action', id)
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push received')
  
  const options = {
    body: event.data ? event.data.text() : 'Nouvelle recette disponible !',
    icon: '/pwa-icon-512.png',
    badge: '/pwa-icon-512.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Voir la recette',
        icon: '/icons/view-recipe.png'
      },
      {
        action: 'close',
        title: 'Fermer',
        icon: '/icons/close.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('AI et Fines Herbes', options)
  )
})

// Notification click
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked')
  
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/recettes')
    )
  }
})

// Message handling
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME })
  }
}) 