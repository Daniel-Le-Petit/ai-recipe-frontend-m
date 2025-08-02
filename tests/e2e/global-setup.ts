import { chromium, FullConfig } from '@playwright/test'

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use

  // Start the browser
  const browser = await chromium.launch()
  const page = await browser.newPage()

  // Navigate to the app and perform any necessary setup
  await page.goto(baseURL!)

  // Wait for the app to be ready
  await page.waitForLoadState('networkidle')

  // Perform any authentication or setup steps here
  // For example, you might want to:
  // - Set up test data
  // - Authenticate a test user
  // - Set up localStorage or sessionStorage
  // - Configure any necessary cookies

  // Example: Set up test user preferences
  await page.evaluate(() => {
    localStorage.setItem('ai-fines-herbes-theme', 'light')
    localStorage.setItem('ai-fines-herbes-favorites', JSON.stringify([]))
  })

  // Save signed-in state
  await page.context().storageState({ path: storageState as string })
  await browser.close()
}

export default globalSetup 