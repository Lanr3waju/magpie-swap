import { test, expect } from '@playwright/test'

test.describe('MagpieFi Boost Feature', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
        await page.getByRole('link', { name: 'Swap Now' }).click()
        await page.getByRole('button', { name: 'No thanks, skip it' }).click()
        await page.getByRole('link', { name: 'Boost' }).click()
    })

    test('Verify Boost Page Navigation', async ({ page }) => {
        await expect(page).toHaveURL(/.*boost/)
    })

    test('Verify Boost UI Elements', async ({ page }) => {
        // Check for essential UI elements
        await expect(page.getByText('boost').nth(1)).toBeVisible()
        await expect(page.getByText('rings protocol')).toBeVisible()
        await expect(page.getByText('Select a booster')).toBeVisible()
    })

    test('Check Boost Page with Wallet Not Connected', async ({ page }) => {
        // Validate that a wallet connection prompt appears
        await expect(page.getByRole('button', { name: 'connect wallet', exact: true })).toBeVisible()
    })
})
