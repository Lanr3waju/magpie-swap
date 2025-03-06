import { test, expect } from '@playwright/test'

test('Contact Support Form Verification on Swap Page', async ({ page }) => {
    // Navigate to MagpieFi App
    await page.goto('https://app.magpiefi.xyz/swap')
    await page.getByRole('button', { name: 'No thanks, skip it' }).click()
    await page.getByRole('contentinfo').getByRole('button').click()

    // Get the iframe containing the support form
    const supportFrame = page.frameLocator('iframe[title="Find more information here"]')

    // Check the visibility of the elements and interactivity of the form
    await supportFrame.getByRole('textbox', { name: 'Your name (optional)' }).fill('Lanre')
    await supportFrame.getByRole('textbox', { name: 'Email address' }).fill('lanre@magpie')
    await supportFrame.getByText('Wallet (optional)').fill('0xas42435363773737377bc')
    await supportFrame.getByText('Transaction Hash', { exact: true }).fill('0xas42435363773737377bc')
    await supportFrame.getByText('Proposal category').click()
    const categoryOptions = ['Marketing', 'Integration', 'Partnership', 'Investor', 'others']
    for (const option of categoryOptions) {
        await expect(supportFrame.getByRole('option', { name: option })).toBeVisible()
    }
    await supportFrame.getByRole('option', { name: 'others' }).click()
    await supportFrame.getByText('Description').fill('I am testing the form modal')
    await supportFrame.getByText('How can we help you?').fill(' ')
    await expect(supportFrame.getByText('Attachments')).toBeVisible()


    // Verify the 'OK' button is visible and click it
    await supportFrame.getByTestId('button-ok').click()
    // Verify an error message is displayed for the invalid email address
    await expect(supportFrame.getByText('Enter a valid email address')).toBeVisible()
    // Verify the error message for the required field
    await expect(supportFrame.getByText('Enter a value')).toBeVisible()
    // Minimize the Contact Support widget
    await supportFrame.getByRole('button', { name: 'Minimize widget' }).click()
})
