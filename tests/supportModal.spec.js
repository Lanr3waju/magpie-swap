import { test, expect } from '@playwright/test'

test('Contact Support Modal Verification on Swap Page', async ({ page }) => {
    // Navigate to MagpieFi website
    await page.goto('/')

    await page.getByRole('link', { name: 'Swap Now' }).click()

    await page.getByRole('button', { name: 'No thanks, skip it' }).click()

    await page.getByRole('contentinfo').getByRole('button').click()

    // Get the iframe containing the support form
    const supportFrame = page.frameLocator('iframe[title="Find more information here"]')

    // Verify required fields are visible
    await expect(supportFrame.getByText('Your name')).toBeVisible()
    await expect(supportFrame.getByText('Email address')).toBeVisible()
    await expect(supportFrame.getByText('Wallet (optional)')).toBeVisible()
    await expect(supportFrame.getByText('Transaction Hash', { exact: true })).toBeVisible()
    await expect(supportFrame.getByText('Proposal category')).toBeVisible()
    await expect(supportFrame.getByText('Description')).toBeVisible()
    await expect(supportFrame.getByText('How can we help you?')).toBeVisible()
    await expect(supportFrame.getByText('Attachments')).toBeVisible()

    // Fill in the 'Your name' field
    await supportFrame.getByRole('textbox', { name: 'Your name (optional)' }).fill('Lanre')

    // Fill in the 'Email address' field
    await supportFrame.getByRole('textbox', { name: 'Email address' }).fill('lanre@magpie.com')

    // Open and verify Proposal category dropdown options
    await supportFrame.getByText('Proposal category').click()
    const categoryOptions = ['Marketing', 'Integration', 'Partnership', 'Investor', 'others']
    for (const option of categoryOptions) {
        await expect(supportFrame.getByRole('option', { name: option })).toBeVisible()
    }

    // Verify the 'OK' button is visible and click it
    await expect(supportFrame.getByTestId('button-ok')).toBeVisible()
    await supportFrame.getByTestId('button-ok').click()

    // Verify the form did not submit as the How can we help you? field is empty
    await expect(supportFrame.getByText('Enter a value')).toBeVisible()

    // Minimize the Contact Support widget
    await supportFrame.getByRole('button', { name: 'Minimize widget' }).click()
})
