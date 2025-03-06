import { test, expect } from '@playwright/test'

test('Contact Support Form Verification on Swap Page', async ({ page }) => {

    // Navigate to MagpieFi App
    await page.goto('https://app.magpiefi.xyz/swap')
    await page.getByRole('link', { name: 'Swap Now' }).click()
    await page.getByRole('button', { name: 'No thanks, skip it' }).click()
    await page.getByRole('contentinfo').getByRole('button').click()

    // Get the iframe containing the support form
    const supportFrame = page.frameLocator('iframe[title="Find more information here"]')

    await supportFrame.getByRole('textbox', { name: 'Your name (optional)' }).fill('Lanre')


    await supportFrame.getByRole('textbox', { name: 'Email address' }).fill('lanre@magpie.com')

    await supportFrame.getByText('Wallet (optional)').fill('0xas42435363773737377bc')

    await supportFrame.getByText('Transaction Hash', { exact: true }).fill('0xas42435363773737377bc')

    await supportFrame.getByText('Proposal category').click()
    const categoryOptions = ['Marketing', 'Integration', 'Partnership', 'Investor', 'others']
    for (const option of categoryOptions) {
        await supportFrame.getByRole('option', { name: option }).click()
    }

    await supportFrame.getByText('Description').fill('I am having issues with my transaction')

    await supportFrame.getByText('How can we help you?').fill(' ')

    await supportFrame.getByText('Attachments').click()


    // Verify the 'OK' button is visible and click it
    await supportFrame.getByTestId('button-ok').click()

    // Verify the form did not submit as the How can we help you? field is empty
    await expect(supportFrame.getByText('Enter a value')).toBeVisible()

    // Minimize the Contact Support widget
    await supportFrame.getByRole('button', { name: 'Minimize widget' }).click()
})
