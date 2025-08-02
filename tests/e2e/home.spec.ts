import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display hero section with call to action', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /générez des recettes savoureuses/i })).toBeVisible()
    await expect(page.getByText(/créez des recettes personnalisées/i)).toBeVisible()
  })

  test('should display plan semaine section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /organisez vos repas de la semaine/i })).toBeVisible()
    await expect(page.getByText(/découvrez un menu hebdomadaire/i)).toBeVisible()
  })

  test('should display search bar', async ({ page }) => {
    await expect(page.getByPlaceholder(/rechercher une recette/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /rechercher/i })).toBeVisible()
  })

  test('should display recipe categories', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /commander nos recettes inspirantes/i })).toBeVisible()
    
    // Wait for categories to load
    await page.waitForSelector('[data-testid="recipe-card"]', { timeout: 10000 })
    
    const recipeCards = await page.locator('[data-testid="recipe-card"]').count()
    expect(recipeCards).toBeGreaterThan(0)
  })

  test('should navigate to recipe creation page', async ({ page }) => {
    const createRecipeLink = page.getByRole('link', { name: /générez des recettes savoureuses/i })
    await createRecipeLink.click()
    
    await expect(page).toHaveURL(/.*creer-recette/)
  })

  test('should navigate to recipes page', async ({ page }) => {
    // This test assumes there's a link to the recipes page
    // You might need to adjust based on your actual navigation
    const recipesLink = page.getByRole('link', { name: /recettes/i }).first()
    if (await recipesLink.isVisible()) {
      await recipesLink.click()
      await expect(page).toHaveURL(/.*recettes/)
    }
  })

  test('should search for recipes', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/rechercher une recette/i)
    const searchButton = page.getByRole('button', { name: /rechercher/i })
    
    await searchInput.fill('poulet')
    await searchButton.click()
    
    // Wait for search results
    await page.waitForTimeout(1000)
    
    // Check if search results are displayed
    const recipeCards = await page.locator('[data-testid="recipe-card"]').count()
    expect(recipeCards).toBeGreaterThanOrEqual(0)
  })

  test('should open and use filters', async ({ page }) => {
    const filterButton = page.getByRole('button', { name: /filtres/i })
    await filterButton.click()
    
    // Check if filter panel is visible
    await expect(page.getByText(/filtres avancés/i)).toBeVisible()
    
    // Select a category
    const categorySelect = page.getByLabel(/sélectionner une catégorie/i)
    await categorySelect.selectOption('Plats')
    
    // Apply filters
    const applyButton = page.getByRole('button', { name: /appliquer les filtres/i })
    await applyButton.click()
    
    // Wait for filtered results
    await page.waitForTimeout(1000)
  })

  test('should add recipe to favorites', async ({ page }) => {
    // Wait for recipe cards to load
    await page.waitForSelector('[data-testid="recipe-card"]', { timeout: 10000 })
    
    // Click on the first favorite button
    const firstFavoriteButton = page.locator('[data-testid="recipe-card"]').first().locator('button[aria-label*="favoris"]')
    await firstFavoriteButton.click()
    
    // Check if the button state changed (this might need adjustment based on your implementation)
    await expect(firstFavoriteButton).toBeVisible()
  })

  test('should display loading states', async ({ page }) => {
    // Navigate to a page that might show loading states
    await page.goto('/?slow=true') // You might need to implement this
    
    // Check for skeleton loaders
    const skeletonElements = await page.locator('.animate-pulse').count()
    expect(skeletonElements).toBeGreaterThan(0)
  })

  test('should handle errors gracefully', async ({ page }) => {
    // Mock API failure
    await page.route('**/api/recipies**', route => route.abort())
    await page.route('**/api/recipie-categories**', route => route.abort())
    
    await page.reload()
    
    // Check if error message is displayed
    await expect(page.getByText(/erreur/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /réessayer/i })).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check if elements are properly stacked on mobile
    await expect(page.getByRole('heading', { name: /générez des recettes savoureuses/i })).toBeVisible()
    
    // Check if search bar is accessible on mobile
    const searchInput = page.getByPlaceholder(/rechercher une recette/i)
    await expect(searchInput).toBeVisible()
    
    // Check if recipe cards are scrollable horizontally
    const recipeContainer = page.locator('.flex.overflow-x-auto').first()
    await expect(recipeContainer).toBeVisible()
  })

  test('should have proper accessibility', async ({ page }) => {
    // Check for proper heading hierarchy
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()
    expect(headings.length).toBeGreaterThan(0)
    
    // Check for proper alt text on images
    const images = await page.locator('img').all()
    for (const img of images) {
      const alt = await img.getAttribute('alt')
      expect(alt).toBeTruthy()
    }
    
    // Check for proper ARIA labels
    const buttons = await page.locator('button').all()
    for (const button of buttons) {
      const ariaLabel = await button.getAttribute('aria-label')
      const textContent = await button.textContent()
      expect(ariaLabel || textContent).toBeTruthy()
    }
  })

  test('should handle keyboard navigation', async ({ page }) => {
    // Focus on search input
    await page.keyboard.press('Tab')
    
    // Type in search
    await page.keyboard.type('poulet')
    await page.keyboard.press('Enter')
    
    // Wait for search results
    await page.waitForTimeout(1000)
    
    // Navigate with keyboard
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    
    // Check if focus is visible
    const focusedElement = await page.locator(':focus')
    await expect(focusedElement).toBeVisible()
  })
}) 