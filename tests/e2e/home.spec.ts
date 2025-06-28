import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should load the home page successfully', async ({ page }) => {
    await page.goto('/')
    
    // Check that the page loads without errors
    await expect(page).toHaveTitle(/AI et Fines Herbes/)
    
    // Check for main navigation elements
    await expect(page.locator('nav')).toBeVisible()
    await expect(page.locator('a[href="/recettes"]')).toBeVisible()
    await expect(page.locator('a[href="/creer-recette"]')).toBeVisible()
  })

  test('should display recipe cards on home page', async ({ page }) => {
    await page.goto('/')
    
    // Wait for recipe cards to load
    await page.waitForSelector('[data-testid="recipe-card"]', { timeout: 10000 })
    
    // Check that at least one recipe card is visible
    const recipeCards = page.locator('[data-testid="recipe-card"]')
    await expect(recipeCards.first()).toBeVisible()
  })

  test('should navigate to recipe creation page', async ({ page }) => {
    await page.goto('/')
    
    // Click on create recipe button
    await page.click('a[href="/creer-recette"]')
    
    // Check that we're on the recipe creation page
    await expect(page).toHaveURL(/.*creer-recette/)
    await expect(page.locator('h1')).toContainText(/Créer une recette/i)
  })

  test('should navigate to recipes page', async ({ page }) => {
    await page.goto('/')
    
    // Click on recipes link
    await page.click('a[href="/recettes"]')
    
    // Check that we're on the recipes page
    await expect(page).toHaveURL(/.*recettes/)
    await expect(page.locator('h1')).toContainText(/Recettes/i)
  })

  test('should display hero section with call-to-action', async ({ page }) => {
    await page.goto('/')
    
    // Check for hero section
    await expect(page.locator('section').filter({ hasText: /Découvrez/i })).toBeVisible()
    
    // Check for CTA button
    await expect(page.locator('button').filter({ hasText: /Commencer/i })).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Check that navigation is accessible (hamburger menu might be present)
    await expect(page.locator('nav')).toBeVisible()
    
    // Check that content is readable on mobile
    await expect(page.locator('main')).toBeVisible()
  })
}) 