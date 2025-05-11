import { defineConfig, devices } from 'playwright/test';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  testDir: 'tests',
  timeout: Number(process.env.TIMEOUT) || 60000,
  expect: {
    timeout: Number(process.env.TIMEOUT) || 60000,
  },
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    browserName: (process.env.BROWSER as any) || 'chromium',
    headless: false,
    actionTimeout: Number(process.env.TIMEOUT) || 60000,
    ignoreHTTPSErrors: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  outputDir: 'test-results/',
});