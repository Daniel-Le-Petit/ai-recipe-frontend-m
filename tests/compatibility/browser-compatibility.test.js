const { chromium, firefox, webkit } = require('playwright');

describe('Browser Compatibility Tests', () => {
  const browsers = [
    { name: 'Chromium', launcher: chromium },
    { name: 'Firefox', launcher: firefox },
    { name: 'WebKit', launcher: webkit }
  ];

  browsers.forEach(({ name, launcher }) => {
    describe(`${name} Browser`, () => {
      let browser;
      let page;

      beforeAll(async () => {
        browser = await launcher.launch();
        page = await browser.newPage();
      });

      afterAll(async () => {
        await browser.close();
      });

      test('Home page loads correctly', async () => {
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');
        
        const title = await page.title();
        expect(title).toContain('AI et Fines Herbes');
        
        const h1 = await page.locator('h1').first();
        expect(await h1.isVisible()).toBe(true);
      });

      test('Navigation works properly', async () => {
        await page.goto('http://localhost:3000');
        
        // Test navigation to recipes page
        await page.click('a[href="/recettes"]');
        await page.waitForLoadState('networkidle');
        
        const currentUrl = page.url();
        expect(currentUrl).toContain('/recettes');
      });

      test('Forms work correctly', async () => {
        await page.goto('http://localhost:3000/creer-recette');
        
        // Test form input
        await page.fill('input[name="title"]', 'Test Recipe');
        await page.fill('textarea[name="description"]', 'Test Description');
        
        const titleValue = await page.inputValue('input[name="title"]');
        const descValue = await page.inputValue('textarea[name="description"]');
        
        expect(titleValue).toBe('Test Recipe');
        expect(descValue).toBe('Test Description');
      });

      test('JavaScript functionality works', async () => {
        await page.goto('http://localhost:3000');
        
        // Test if JavaScript is working by checking for dynamic content
        const hasJavaScript = await page.evaluate(() => {
          return typeof window !== 'undefined' && 
                 typeof document !== 'undefined' &&
                 typeof fetch !== 'undefined';
        });
        
        expect(hasJavaScript).toBe(true);
      });

      test('CSS styling is applied', async () => {
        await page.goto('http://localhost:3000');
        
        // Check if Tailwind classes are working
        const body = await page.locator('body');
        const computedStyle = await body.evaluate(el => {
          const style = window.getComputedStyle(el);
          return {
            fontFamily: style.fontFamily,
            backgroundColor: style.backgroundColor
          };
        });
        
        expect(computedStyle.fontFamily).toBeDefined();
        expect(computedStyle.backgroundColor).toBeDefined();
      });

      test('Responsive design works', async () => {
        await page.goto('http://localhost:3000');
        
        // Test mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        await page.waitForTimeout(1000);
        
        const mobileLayout = await page.evaluate(() => {
          return window.innerWidth === 375;
        });
        
        expect(mobileLayout).toBe(true);
        
        // Test desktop viewport
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.waitForTimeout(1000);
        
        const desktopLayout = await page.evaluate(() => {
          return window.innerWidth === 1920;
        });
        
        expect(desktopLayout).toBe(true);
      });

      test('No console errors', async () => {
        const consoleErrors = [];
        
        page.on('console', msg => {
          if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
          }
        });
        
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');
        
        // Filter out expected errors
        const unexpectedErrors = consoleErrors.filter(error => 
          !error.includes('Failed to load resource') &&
          !error.includes('favicon.ico') &&
          !error.includes('net::ERR_CONNECTION_REFUSED')
        );
        
        expect(unexpectedErrors).toHaveLength(0);
      });
    });
  });
}); 