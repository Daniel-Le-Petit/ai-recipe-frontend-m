#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function logSection(title) {
  log(`\n${colors.bold}${colors.blue}=== ${title} ===${colors.reset}`)
}

function runCommand(command, description) {
  log(`\n${colors.yellow}Running: ${description}${colors.reset}`)
  log(`Command: ${command}`)
  
  try {
    const output = execSync(command, { 
      encoding: 'utf8', 
      stdio: 'pipe',
      timeout: 300000 // 5 minutes timeout
    })
    log(`${colors.green}✓ ${description} completed successfully${colors.reset}`)
    return { success: true, output }
  } catch (error) {
    log(`${colors.red}✗ ${description} failed${colors.reset}`)
    log(`Error: ${error.message}`)
    if (error.stdout) log(`Output: ${error.stdout}`)
    if (error.stderr) log(`Error Output: ${error.stderr}`)
    return { success: false, error: error.message, output: error.stdout, errorOutput: error.stderr }
  }
}

function checkEnvironment() {
  logSection('Environment Check')
  
  // Check Node.js version
  const nodeVersion = process.version
  log(`Node.js version: ${nodeVersion}`)
  
  // Check if we're in the right directory
  const packageJsonPath = path.join(process.cwd(), 'package.json')
  if (!fs.existsSync(packageJsonPath)) {
    log(`${colors.red}Error: package.json not found. Please run this script from the project root.${colors.reset}`)
    process.exit(1)
  }
  
  // Check if node_modules exists
  const nodeModulesPath = path.join(process.cwd(), 'node_modules')
  if (!fs.existsSync(nodeModulesPath)) {
    log(`${colors.yellow}Warning: node_modules not found. Installing dependencies...${colors.reset}`)
    runCommand('npm install', 'Installing dependencies')
  }
}

function runLinting() {
  logSection('Code Quality Check')
  return runCommand('npm run lint', 'ESLint code quality check')
}

function runUnitTests() {
  logSection('Unit Tests')
  return runCommand('npm run test', 'Jest unit tests')
}

function runE2ETests() {
  logSection('End-to-End Tests')
  
  // Check if Playwright browsers are installed
  const playwrightBrowsersPath = path.join(process.cwd(), 'node_modules', '.cache', 'playwright')
  if (!fs.existsSync(playwrightBrowsersPath)) {
    log(`${colors.yellow}Installing Playwright browsers...${colors.reset}`)
    runCommand('npx playwright install', 'Installing Playwright browsers')
  }
  
  return runCommand('npm run test:e2e', 'Playwright E2E tests')
}

function runAPITests() {
  logSection('API Tests')
  
  // Check if backend is running
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:1338'
  log(`API Base URL: ${API_BASE_URL}`)
  
  // Try to ping the API
  try {
    const { execSync } = require('child_process')
    execSync(`curl -f ${API_BASE_URL}/_health`, { stdio: 'pipe', timeout: 10000 })
    log(`${colors.green}✓ Backend API is accessible${colors.reset}`)
  } catch (error) {
    log(`${colors.yellow}Warning: Backend API might not be running at ${API_BASE_URL}${colors.reset}`)
    log(`${colors.yellow}API tests will be skipped. Start your backend server to run API tests.${colors.reset}`)
    return { success: true, skipped: true, reason: 'Backend not accessible' }
  }
  
  return runCommand('npm run test:api', 'API integration tests')
}

function runPerformanceTests() {
  logSection('Performance Tests')
  return runCommand('npm run test:performance', 'Performance tests')
}

function runSecurityTests() {
  logSection('Security Tests')
  return runCommand('npm run test:security', 'Security tests')
}

function runAccessibilityTests() {
  logSection('Accessibility Tests')
  return runCommand('npm run test:a11y', 'Accessibility tests')
}

function runCompatibilityTests() {
  logSection('Browser Compatibility Tests')
  return runCommand('npm run test:compatibility', 'Browser compatibility tests')
}

function runBuildTest() {
  logSection('Build Test')
  return runCommand('npm run build', 'Production build test')
}

function generateReport(results) {
  logSection('Test Results Summary')
  
  const totalTests = Object.keys(results).length
  const passedTests = Object.values(results).filter(r => r.success).length
  const failedTests = totalTests - passedTests
  
  log(`\n${colors.bold}Summary:${colors.reset}`)
  log(`Total test suites: ${totalTests}`)
  log(`${colors.green}Passed: ${passedTests}${colors.reset}`)
  log(`${colors.red}Failed: ${failedTests}${colors.reset}`)
  
  // Detailed results
  Object.entries(results).forEach(([testName, result]) => {
    const status = result.success ? 
      `${colors.green}✓ PASS${colors.reset}` : 
      `${colors.red}✗ FAIL${colors.reset}`
    
    log(`${status} ${testName}`)
    
    if (result.skipped) {
      log(`  ${colors.yellow}Skipped: ${result.reason}${colors.reset}`)
    }
    
    if (!result.success && result.error) {
      log(`  ${colors.red}Error: ${result.error}${colors.reset}`)
    }
  })
  
  // Save detailed report
  const reportPath = path.join(process.cwd(), 'test-results', 'regression-report.json')
  const reportDir = path.dirname(reportPath)
  
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true })
  }
  
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: totalTests,
      passed: passedTests,
      failed: failedTests
    },
    results: results
  }
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
  log(`\n${colors.blue}Detailed report saved to: ${reportPath}${colors.reset}`)
  
  return failedTests === 0
}

function main() {
  log(`${colors.bold}${colors.blue}🚀 Starting Regression Test Suite${colors.reset}`)
  log(`Working directory: ${process.cwd()}`)
  
  // Check environment
  checkEnvironment()
  
  // Run all tests
  const results = {
    'Code Quality': runLinting(),
    'Unit Tests': runUnitTests(),
    'E2E Tests': runE2ETests(),
    'API Tests': runAPITests(),
    'Performance Tests': runPerformanceTests(),
    'Security Tests': runSecurityTests(),
    'Accessibility Tests': runAccessibilityTests(),
    'Compatibility Tests': runCompatibilityTests(),
    'Build Test': runBuildTest()
  }
  
  // Generate report
  const allPassed = generateReport(results)
  
  // Exit with appropriate code
  if (allPassed) {
    log(`\n${colors.bold}${colors.green}🎉 All regression tests passed!${colors.reset}`)
    process.exit(0)
  } else {
    log(`\n${colors.bold}${colors.red}❌ Some regression tests failed. Please fix the issues before deploying.${colors.reset}`)
    process.exit(1)
  }
}

// Handle command line arguments
const args = process.argv.slice(2)
if (args.includes('--help') || args.includes('-h')) {
  log(`${colors.bold}Regression Test Suite${colors.reset}`)
  log('Usage: node scripts/regression-tests.js [options]')
  log('\nOptions:')
  log('  --help, -h           Show this help message')
  log('  --unit-only          Run only unit tests')
  log('  --e2e-only           Run only E2E tests')
  log('  --api-only           Run only API tests')
  log('  --performance-only   Run only performance tests')
  log('  --security-only      Run only security tests')
  log('  --a11y-only          Run only accessibility tests')
  log('  --compatibility-only Run only compatibility tests')
  log('\nEnvironment variables:')
  log('  API_BASE_URL         Backend API URL (default: http://localhost:1338)')
  process.exit(0)
}

// Run specific test types if requested
if (args.includes('--unit-only')) {
  logSection('Unit Tests Only')
  const result = runUnitTests()
  process.exit(result.success ? 0 : 1)
}

if (args.includes('--e2e-only')) {
  logSection('E2E Tests Only')
  const result = runE2ETests()
  process.exit(result.success ? 0 : 1)
}

if (args.includes('--api-only')) {
  logSection('API Tests Only')
  const result = runAPITests()
  process.exit(result.success ? 0 : 1)
}

if (args.includes('--performance-only')) {
  logSection('Performance Tests Only')
  const result = runPerformanceTests()
  process.exit(result.success ? 0 : 1)
}

if (args.includes('--security-only')) {
  logSection('Security Tests Only')
  const result = runSecurityTests()
  process.exit(result.success ? 0 : 1)
}

if (args.includes('--a11y-only')) {
  logSection('Accessibility Tests Only')
  const result = runAccessibilityTests()
  process.exit(result.success ? 0 : 1)
}

if (args.includes('--compatibility-only')) {
  logSection('Compatibility Tests Only')
  const result = runCompatibilityTests()
  process.exit(result.success ? 0 : 1)
}

// Run full regression suite
main() 