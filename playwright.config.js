// @ts-check
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    timeout: 90_000, // Increase test timeout to 90 seconds
    navigationTimeout: 60_000, // Increase navigation timeout
    actionTimeout: 60_000, // Increase action timeout
    baseURL: 'https://www.magpiefi.xyz/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: false,
    slowMo: 50,
  },

  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
})
