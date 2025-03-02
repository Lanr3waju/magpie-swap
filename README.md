# MagpieFi Swap App - Test Automation Demo

## Overview

This repository contains end-to-end test automation for the MagpieFi Swap App using **Playwright**.

## Setup Instructions

1. Clone the repository:

```sh
   git clone https://github.com/Lanr3waju/magpie-swap.git
   cd magpie-swap
```

### Install dependencies

```sh
npm install
```

### Install Playwright browsers

```sh
npx playwright install
```

## Running Tests

Run all tests:

```sh
npx playwright test
```

Run tests in headed mode:

```sh
npx playwright test --headed
```

Run a specific test:

```sh
npx playwright test swap.test.js
```

## Reporting & Logs

- **HTML Reports**: Generated in `test-results/`
- **Traces for Failures**: Available in `traces/`
- **Screenshots on Failure**: Enabled in `playwright.config.js`

## CI/CD Integration

To integrate with **GitHub Actions** or **Jenkins**, check [`requirements.md`](requirements.md) for more details.
