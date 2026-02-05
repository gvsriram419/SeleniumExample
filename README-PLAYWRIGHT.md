# Playwright TypeScript Tests for Amazon Tennis Bat Purchase

This project contains Playwright TypeScript test cases for automating the purchase flow of a Tennis Bat from Amazon.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Project Structure

```
.
├── tests/
│   ├── amazon-tennis-bat-purchase.spec.ts    # Main test file
│   ├── amazon-tennis-bat-purchase-pom.spec.ts # Tests using Page Object Model
│   └── page-objects/
│       └── amazon-page.ts                    # Page Object Model classes
├── playwright.config.ts                       # Playwright configuration
├── tsconfig.json                             # TypeScript configuration
└── package.json                              # Project dependencies
```

## Running Tests

### Run all tests:
```bash
npm test
```

### Run tests in headed mode (see browser):
```bash
npm run test:headed
```

### Run tests in debug mode:
```bash
npm run test:debug
```

### Run tests with UI mode:
```bash
npm run test:ui
```

### Run specific test file:
```bash
npx playwright test tests/amazon-tennis-bat-purchase.spec.ts
```

### Run tests in specific browser:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Cases

### 1. Search for Tennis Bat and view product details
- Navigates to Amazon
- Searches for "Tennis Bat"
- Verifies search results are displayed

### 2. Select Tennis Bat product and add to cart
- Searches for Tennis Bat
- Selects first product
- Adds product to cart
- Verifies item was added

### 3. Complete purchase flow - view cart and proceed to checkout
- Full flow from search to checkout
- Adds product to cart
- Views cart
- Proceeds to checkout (requires login)

### 4. Search with alternative term "Tennis Racket"
- Tests search with different terminology

### 5. Filter search results by price range
- Applies price filters if available

## Page Object Model

The project includes a Page Object Model implementation for better code organization and maintainability:
- `AmazonPage` - Homepage and common elements
- `AmazonProductPage` - Product detail page
- `AmazonSearchResultsPage` - Search results page
- `AmazonCartPage` - Shopping cart page

## Notes

- **Login Required**: The tests will reach the checkout/login page but won't complete actual purchase without valid Amazon credentials
- **Dynamic Elements**: Amazon's UI can change, so selectors may need updates
- **Rate Limiting**: Be mindful of Amazon's rate limiting when running tests frequently
- **Test Data**: Tests use generic search terms and don't require specific test data

## Configuration

Edit `playwright.config.ts` to customize:
- Test timeout
- Browser configurations
- Screenshot/video settings
- Retry logic

## Troubleshooting

1. **Tests fail with timeout**: Increase timeout in `playwright.config.ts`
2. **Element not found**: Amazon's UI may have changed - update selectors
3. **Location popup**: The tests handle location popups automatically
4. **Network issues**: Ensure stable internet connection

## Contributing

When adding new tests:
1. Follow the existing test structure
2. Use Page Object Model for reusable components
3. Add appropriate waits and error handling
4. Update this README with new test descriptions
