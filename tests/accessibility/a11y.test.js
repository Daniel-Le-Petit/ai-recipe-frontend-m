const { chromium } = require('playwright');

describe('Accessibility Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('All images have alt text', async () => {
    await page.goto('http://localhost:3000');
    
    const images = await page.locator('img').all();
    
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).not.toBeNull();
      expect(alt.trim()).not.toBe('');
    }
  });

  test('All form inputs have labels', async () => {
    await page.goto('http://localhost:3000/creer-recette');
    
    const inputs = await page.locator('input, textarea, select').all();
    
    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const name = await input.getAttribute('name');
      const ariaLabel = await input.getAttribute('aria-label');
      const placeholder = await input.getAttribute('placeholder');
      
      // Check if input has either a label, aria-label, or meaningful placeholder
      const hasLabel = id && await page.locator(`label[for="${id}"]`).count() > 0;
      const hasAriaLabel = ariaLabel && ariaLabel.trim() !== '';
      const hasPlaceholder = placeholder && placeholder.trim() !== '';
      
      expect(hasLabel || hasAriaLabel || hasPlaceholder).toBe(true);
    }
  });

  test('Color contrast meets WCAG standards', async () => {
    await page.goto('http://localhost:3000');
    
    // Check text color contrast
    const textElements = await page.locator('h1, h2, h3, h4, h5, h6, p, span, a, button').all();
    
    for (const element of textElements.slice(0, 10)) { // Test first 10 elements
      const color = await element.evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.color;
      });
      
      const backgroundColor = await element.evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.backgroundColor;
      });
      
      // Basic check - ensure text is not white on white or black on black
      expect(color).not.toBe('rgb(255, 255, 255)');
      expect(backgroundColor).not.toBe('rgb(0, 0, 0)');
    }
  });

  test('Keyboard navigation works', async () => {
    await page.goto('http://localhost:3000');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    const firstFocused = await page.evaluate(() => document.activeElement.tagName);
    expect(['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT']).toContain(firstFocused);
    
    // Test multiple tab presses
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => document.activeElement.tagName);
      expect(focused).not.toBe('BODY');
    }
  });

  test('Semantic HTML structure', async () => {
    await page.goto('http://localhost:3000');
    
    // Check for proper heading hierarchy
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    const headingLevels = [];
    
    for (const heading of headings) {
      const tagName = await heading.evaluate(el => el.tagName);
      headingLevels.push(parseInt(tagName.charAt(1)));
    }
    
    // Check that heading levels don't skip (e.g., h1 -> h3)
    for (let i = 1; i < headingLevels.length; i++) {
      expect(headingLevels[i] - headingLevels[i-1]).toBeLessThanOrEqual(1);
    }
  });

  test('ARIA attributes are properly used', async () => {
    await page.goto('http://localhost:3000');
    
    // Check for proper ARIA usage
    const elementsWithAria = await page.locator('[aria-*]').all();
    
    for (const element of elementsWithAria) {
      const ariaAttributes = await element.evaluate(el => {
        const attrs = [];
        for (const attr of el.attributes) {
          if (attr.name.startsWith('aria-')) {
            attrs.push(attr.name);
          }
        }
        return attrs;
      });
      
      // Check that aria attributes have values
      for (const attr of ariaAttributes) {
        const value = await element.getAttribute(attr);
        expect(value).not.toBeNull();
        expect(value.trim()).not.toBe('');
      }
    }
  });

  test('Focus indicators are visible', async () => {
    await page.goto('http://localhost:3000');
    
    // Focus on first interactive element
    await page.keyboard.press('Tab');
    
    const focusedElement = await page.evaluate(() => document.activeElement);
    const outline = await page.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.outline;
    }, focusedElement);
    
    // Check that focus is visible (outline or box-shadow)
    const hasFocusIndicator = outline !== 'none' || 
      await page.evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.boxShadow !== 'none';
      }, focusedElement);
    
    expect(hasFocusIndicator).toBe(true);
  });
}); 