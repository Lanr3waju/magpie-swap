import { test, expect } from '@playwright/test'

test.describe('MagpieFi Swap Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Handle first-time user modal
    await page.getByRole('button', { name: 'No thanks, skip it' }).click()

  })

  test('Navigate to Swap Page and Interact', async ({ page }) => {
    // Open Settings
    await page.getByRole('button', { name: 'Settings' }).click()

    // Verify Settings page
    await expect(page.getByText('Slippage tolerance')).toBeVisible()
    await expect(page.getByText('Liquidity sources')).toBeVisible()
    await expect(page.getByText('Bridges')).toBeVisible()

    // Leave Settings page
    await page.locator('div').filter({ hasText: /^Settings$/ }).getByRole('img').click()

    // Select token for swapping
    await page.getByRole('button', { name: 'scUSD Sonic 0xd3dc...97ae' }).click()
    await page.getByText('S', { exact: true }).click()
    await page.getByRole('button', { name: 'USDT Sonic 0x6047...eaf9' }).click()
    await page.getByText('wS').nth(0).click()

    // Enter amount
    await page.getByPlaceholder('0.00').first().fill('5')

    // Verify exchange rate and gas fee
    await page.getByRole('button', { name: '1 =' }).isVisible()
    await page.locator('#gas-fee-value').getByText('$').isVisible()
  })
})
