const { chromium } = require('playwright');

describe('Security Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('No sensitive data in client-side code', async () => {
    await page.goto('http://localhost:3000');
    
    // Get page source and check for sensitive patterns
    const source = await page.content();
    
    // Check for API keys, passwords, etc.
    const sensitivePatterns = [
      /api_key\s*[:=]\s*['"][^'"]+['"]/i,
      /password\s*[:=]\s*['"][^'"]+['"]/i,
      /secret\s*[:=]\s*['"][^'"]+['"]/i,
      /token\s*[:=]\s*['"][^'"]+['"]/i
    ];
    
    sensitivePatterns.forEach(pattern => {
      expect(source).not.toMatch(pattern);
    });
  });

  test('HTTPS headers are properly set', async () => {
    const response = await page.goto('http://localhost:3000');
    const headers = response.headers();
    
    // Check for security headers
    expect(headers).toHaveProperty('x-content-type-options');
    expect(headers['x-content-type-options']).toBe('nosniff');
  });

  test('No XSS vulnerabilities in form inputs', async () => {
    await page.goto('http://localhost:3000/creer-recette');
    
    // Try to inject XSS payload
    const xssPayload = '<script>alert("XSS")</script>';
    
    await page.fill('input[name="title"]', xssPayload);
    await page.fill('textarea[name="description"]', xssPayload);
    
    // Check if script tags are escaped
    const titleValue = await page.inputValue('input[name="title"]');
    const descValue = await page.inputValue('textarea[name="description"]');
    
    expect(titleValue).not.toContain('<script>');
    expect(descValue).not.toContain('<script>');
  });

  test('CSRF protection is enabled', async () => {
    await page.goto('http://localhost:3000/creer-recette');
    
    // Check for CSRF token in forms
    const csrfToken = await page.locator('input[name="_csrf"]').count();
    const hasCsrfProtection = csrfToken > 0;
    
    // Alternative: check for SameSite cookie attribute
    const cookies = await page.context().cookies();
    const hasSecureCookies = cookies.some(cookie => 
      cookie.sameSite === 'Strict' || cookie.sameSite === 'Lax'
    );
    
    expect(hasCsrfProtection || hasSecureCookies).toBe(true);
  });

  test('No console errors or warnings', async () => {
    const consoleMessages = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        consoleMessages.push({
          type: msg.type(),
          text: msg.text()
        });
      }
    });
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Filter out expected warnings (like missing images)
    const unexpectedErrors = consoleMessages.filter(msg => 
      !msg.text.includes('Failed to load resource') &&
      !msg.text.includes('favicon.ico')
    );
    
    expect(unexpectedErrors).toHaveLength(0);
  });
}); 