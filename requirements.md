# Test Automation Requirements for MagpieFi Swap App

## 1. Introduction

This document outlines the requirements for the end-to-end test automation of MagpieFi using Playwright.

## 2. Test Environment Requirements

### 2.1. System Requirements

- **Operating System:** Windows, macOS, or Linux
- **Node.js Version:** `>=16.0.0`
- **Browser Support:** Chromium

### 2.2. Dependencies

Ensure the following dependencies are installed:

#### Playwright Framework

```sh
npm install @playwright/test
```

```sh
npx playwright install
```

## 3. Functional Requirements

The test suite should cover the following functionalities:

### 3.1. Swap Feature

- ✅ Navigate to the **Swap** page
- ✅ Dismiss the **first-time modal** (onboarding screen)
- ✅ Check **token selection** (e.g., scUSD, USDT, GOGLZ)
- ✅ Verify the **exchange rate & gas fee**
- ✅ Ensure proper **form input & validation**
- ✅ Handle **redirection in a new tab**

### 3.2. Wallet Connection

- ✅ Open the **Connect Wallet** modal
- ✅ Verify available wallets (**MetaMask, WalletConnect, Coinbase Wallet**)
- ✅ Handle missing **MetaMask installation** scenario

### 3.3. Boost Feature

- ✅ Navigate to the **Boost** page
- ✅ Verify UI elements (**Deposit, Withdraw buttons**)
- ✅ Ensure deposit functionality requires **wallet connection**

### 3.4. Navigation & UI Tests

- ✅ Verify **dropdown menu** visibility
- ✅ Ensure correct **redirections for links that open in a new tab**
- ✅ Validate **main page headings**
- ✅ Check **footer links for visibility**
- ✅ Ensure navigation between **Home, Features, and About** pages

### 3.5. Help & Documentation

- ✅ Navigate to **Documentation** and **Help Center** pages
- ✅ Ensure external links open **in a new tab**
- ✅ Validate correct URL patterns for documentation & support pages

### 3.6. Contact Support

- ✅ Open the **Contact Support** modal on the **Swap** page
- ✅ Switch to the **support modal iframe**
- ✅ Fill in the **support request form** (Name, Email, Category, Description)
- ✅ Submit the **support request**
- ✅ Minimize the **support widget**

## 4. Test Execution Requirements

### 4.1. Running Tests

To execute the test suite, run:

```sh
npx playwright test
```

For headed mode (to observe browser interactions), run:

```sh
npx playwright test --headed
```

For specific tests, use:

```sh
npx playwright test swap.test.js
```

### 4.2. Debugging

To enable Playwright debug mode, run:

```sh
npx playwright test --debug
```

## 5. Reporting & Logs

- **HTML Reports:** Generated automatically in `test-results/`
- **Traces for Failures:** Available in `traces/`
- **Screenshots on Failure:** Enabled in `playwright.config.js`

## 6. CI/CD Integration

For continuous testing in a **CI/CD pipeline**, integrate with **GitHub Actions** or **Jenkins**.
Example GitHub Actions workflow can be found in the [`README.md`](README.md).
