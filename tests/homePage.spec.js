import { test, expect } from '@playwright/test'

test.describe('Magpie Landing Page UI & Navigation Test', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('Check if links in the dropdown menu open the correct pages', async ({ page }) => {
        // Hover over the dropdown menu to reveal options
        const dropdown = page.locator('#w-dropdown-toggle-0')
        await dropdown.hover()

        // Function to handle new tabs
        async function clickAndCheckNewTab(linkLocator, expectedUrlPattern, onboardingBypass = false) {
            const [newPage] = await Promise.all([
                context.waitForEvent('page'),  // Wait for a new tab to open
                linkLocator.click()            // Click the link
            ])
            await newPage.waitForLoadState()   // Ensure the new page loads

            // If the page has an onboarding step, bypass it
            if (onboardingBypass) {
                await newPage.getByRole('button', { name: 'No thanks, skip it' }).click()
            }

            await expect(newPage).toHaveURL(new RegExp(expectedUrlPattern))  // Convert string to RegEx
            await newPage.close()              // Close the new tab
        }

        // Test Redirections (Handle new tabs correctly)
        await clickAndCheckNewTab(page.getByRole('link', { name: 'Swap', exact: true }), 'swap', true)  // Handles onboarding step

        await clickAndCheckNewTab(page.locator('#w-dropdown-list-0').getByRole('link', { name: 'Magpie Explorer' }), 'transactions')

        await clickAndCheckNewTab(page.getByRole('link', { name: 'Developers' }), 'developers')

        await clickAndCheckNewTab(page.getByRole('link', { name: 'Blog' }), 'medium\\.com/@Magpieprotocol')

        await clickAndCheckNewTab(page.locator('#w-dropdown-list-0').getByRole('link', { name: 'Documentation' }), 'docs\\.magpiefi\\.xyz/magpie-protocol')

        await clickAndCheckNewTab(page.locator('#w-dropdown-list-0').getByRole('link', { name: 'Help Center' }), 'support')

        // Close dropdown after confirming all links are functional
        await dropdown.hover()
    })

    test.only('Verify main page headings are present', async ({ page }) => {
        const headings = [
            'Beyond bridges & between',
            'Execute optimal swaps, on or',
            'Swap in three easy steps.',
            'Want to know more? Our Bird',
            'The Magpie roadmap',
            'The latest chirps',
            'Frequently Asked Questions',
            'Get the latest news straight'
        ]
        for (const heading of headings) {
            await expect(page.getByRole('heading', { name: heading })).toBeVisible()
        }
    })

    test('Test Navigation Links in Nav-Bar', async ({ page }) => {
        await page.getByRole('link', { name: 'Features' }).first().click()
        await expect(page).toHaveURL(/features/)

        await page.goBack()
        await page.getByRole('link', { name: 'About', exact: true }).click()
        await expect(page).toHaveURL(/about/)

        // Return to Home
        await page.getByRole('link', { name: 'Home' }).click()
        await expect(page).toHaveURL('/')

    })

    test('Check Footer', async ({ page }) => {
        await expect(page.locator('.footer_component > .w-layout-hflex')).toBeVisible()
    })
})
