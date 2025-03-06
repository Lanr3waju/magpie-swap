import { test, expect } from '@playwright/test'

test.describe('Wallet Connection on MagpieFi', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
        // Click on 'Swap Now' button
        await page.getByRole('link', { name: 'Swap Now' }).click()
        // Handle first-time user modal
        await page.getByRole('button', { name: 'No thanks, skip it' }).click()
    })

    test('Attempt to Connect Wallet without extension installed', async ({ page }) => {
        // Attempt to Connect Wallet
        await page.getByRole('button', { name: 'Connect Wallet' }).click()
        await page.getByRole('button', { name: 'Metamask' }).click()

        // Verify Metamask is not installed and handle modal
        const errorMessageModal = await page.getByRole('alert').locator('div').nth(4)
        expect(errorMessageModal).toBeVisible()
        // Close Wallet Connect Modal
        await page.locator('#q-portal--dialog--1').getByRole('button').filter({ hasText: /^$/ }).click()
    })

    test('Verify Wallet Connection Modal', async ({ page }) => {
        await page.getByRole('button', { name: 'Connect Wallet' }).click()

        // Check for supported wallets
        await expect(page.getByRole('button', { name: 'Metamask' })).toBeVisible()
        await expect(page.getByRole('button', { name: 'WalletConnect' })).toBeVisible()
        await expect(page.getByRole('button', { name: 'Coinbase Wallet' })).toBeVisible()
        await expect(page.getByRole('button', { name: 'Rabby' })).toBeVisible()
        await expect(page.getByRole('button', { name: 'OKX' })).toBeVisible()
        await expect(page.getByRole('button', { name: 'Binance Wallet' })).toBeVisible()
    })
})
