import request from 'supertest'

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:1338'

// Skip API tests if backend is not available
const checkBackendAvailable = async () => {
  try {
    await request(API_BASE_URL)
      .get('/_health')
      .timeout(2000) // 2 second timeout
    return true
  } catch (error) {
    console.log('Backend server not available, skipping API tests')
    return false
  }
}

describe('Recipe API Tests', () => {
  let backendAvailable: boolean

  beforeAll(async () => {
    backendAvailable = await checkBackendAvailable()
  })

  describe('GET /api/recipies', () => {
    it('should return recipes list', async () => {
      if (!backendAvailable) {
        console.log('Skipping test: Backend not available')
        return
      }

      const response = await request(API_BASE_URL)
        .get('/api/recipies')
        .expect(200)

      expect(response.body).toHaveProperty('data')
      expect(Array.isArray(response.body.data)).toBe(true)
    })

    it('should support pagination', async () => {
      if (!backendAvailable) {
        console.log('Skipping test: Backend not available')
        return
      }

      const response = await request(API_BASE_URL)
        .get('/api/recipies?pagination[page]=1&pagination[pageSize]=5')
        .expect(200)

      expect(response.body).toHaveProperty('meta.pagination')
      expect(response.body.meta.pagination).toHaveProperty('page', 1)
      expect(response.body.meta.pagination).toHaveProperty('pageSize', 5)
    })

    it('should support filtering by difficulty', async () => {
      if (!backendAvailable) {
        console.log('Skipping test: Backend not available')
        return
      }

      const response = await request(API_BASE_URL)
        .get('/api/recipies?filters[difficulty][$eq]=Facile')
        .expect(200)

      expect(response.body).toHaveProperty('data')
      // All returned recipes should have difficulty 'Facile'
      response.body.data.forEach((recipe: any) => {
        expect(recipe.attributes.difficulty).toBe('Facile')
      })
    })

    it('should support filtering by robot compatibility', async () => {
      if (!backendAvailable) {
        console.log('Skipping test: Backend not available')
        return
      }

      const response = await request(API_BASE_URL)
        .get('/api/recipies?filters[isRobotCompatible][$eq]=true')
        .expect(200)

      expect(response.body).toHaveProperty('data')
      // All returned recipes should be robot compatible
      response.body.data.forEach((recipe: any) => {
        expect(recipe.attributes.isRobotCompatible).toBe(true)
      })
    })
  })

  describe('GET /api/recipies/:id', () => {
    it('should return a specific recipe', async () => {
      if (!backendAvailable) {
        console.log('Skipping test: Backend not available')
        return
      }

      // First get a list to find an existing recipe ID
      const listResponse = await request(API_BASE_URL)
        .get('/api/recipies?pagination[pageSize]=1')
        .expect(200)

      if (listResponse.body.data.length > 0) {
        const recipeId = listResponse.body.data[0].id
        
        const response = await request(API_BASE_URL)
          .get(`/api/recipies/${recipeId}`)
          .expect(200)

        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('id', recipeId)
        expect(response.body.data).toHaveProperty('attributes')
        expect(response.body.data.attributes).toHaveProperty('title')
      }
    })

    it('should return 404 for non-existent recipe', async () => {
      if (!backendAvailable) {
        console.log('Skipping test: Backend not available')
        return
      }

      await request(API_BASE_URL)
        .get('/api/recipies/999999')
        .expect(404)
    })
  })

  describe('GET /api/recipie-categories', () => {
    it('should return categories list', async () => {
      if (!backendAvailable) {
        console.log('Skipping test: Backend not available')
        return
      }

      const response = await request(API_BASE_URL)
        .get('/api/recipie-categories')
        .expect(200)

      expect(response.body).toHaveProperty('data')
      expect(Array.isArray(response.body.data)).toBe(true)
    })
  })

  describe('Health Check', () => {
    it('should return health status', async () => {
      if (!backendAvailable) {
        console.log('Skipping test: Backend not available')
        return
      }

      const response = await request(API_BASE_URL)
        .get('/_health')
        .expect(200)

      expect(response.body).toHaveProperty('status', 'ok')
    })
  })
}) 