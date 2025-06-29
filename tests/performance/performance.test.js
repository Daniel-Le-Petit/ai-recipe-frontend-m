const { chromium } = require('playwright');

describe('Performance Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Home page loads within 3 seconds', async () => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000);
  });

  test('Recipe page loads within 2 seconds', async () => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:3000/recettes');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(2000);
  });

  test('API response time is under 1 second', async () => {
    const startTime = Date.now();
    
    const response = await fetch('http://localhost:1338/api/recipies?populate=*');
    const data = await response.json();
    
    const responseTime = Date.now() - startTime;
    expect(responseTime).toBeLessThan(1000);
    expect(data.data).toBeDefined();
  });

  test('Build size is reasonable', async () => {
    const fs = require('fs');
    const path = require('path');
    
    // Check if .next directory exists (after build)
    const nextDir = path.join(process.cwd(), '.next');
    if (fs.existsSync(nextDir)) {
      const stats = fs.statSync(nextDir);
      const sizeInMB = stats.size / (1024 * 1024);
      
      // Build should be under 50MB
      expect(sizeInMB).toBeLessThan(50);
    }
  });
}); 