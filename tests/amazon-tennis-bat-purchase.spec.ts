import { test, expect, Page } from '@playwright/test';

/**
 * Test suite for purchasing a Tennis Bat from Amazon
 * 
 * Test Flow:
 * 1. Navigate to Amazon website
 * 2. Search for "Tennis Bat" or "Tennis Racket"
 * 3. Select a product from search results
 * 4. Add product to cart
 * 5. Proceed to checkout (Note: Actual purchase will require login and payment)
 */

test.describe('Amazon Tennis Bat Purchase Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Amazon homepage
    await page.goto('https://www.amazon.com');
    
    // Handle potential cookie consent or location selection
    try {
      // Wait for page to load
      await page.waitForLoadState('networkidle');
      
      // Handle location popup if it appears
      const locationPopup = page.locator('text=Select your address').or(page.locator('text=Choose a location'));
      if (await locationPopup.isVisible({ timeout: 3000 })) {
        await page.locator('button:has-text("Continue")').or(page.locator('button:has-text("Done")')).click();
      }
    } catch (e) {
      // Popup might not appear, continue
      console.log('No location popup detected');
    }
  });

  test('Search for Tennis Bat and view product details', async ({ page }) => {
    // Search for tennis bat
    const searchBox = page.locator('input[name="field-keywords"]').or(page.locator('#twotabsearchtextbox'));
    await searchBox.fill('Tennis Bat');
    await searchBox.press('Enter');

    // Wait for search results to load
    await page.waitForSelector('[data-component-type="s-search-result"]', { timeout: 10000 });
    
    // Verify search results are displayed
    const searchResults = page.locator('[data-component-type="s-search-result"]');
    await expect(searchResults.first()).toBeVisible();
    
    // Get the first product title for verification
    const firstProduct = searchResults.first();
    const productTitle = await firstProduct.locator('h2 a span').textContent();
    expect(productTitle).toBeTruthy();
    console.log(`Found product: ${productTitle}`);
  });

  test('Select Tennis Bat product and add to cart', async ({ page }) => {
    // Search for tennis bat
    const searchBox = page.locator('input[name="field-keywords"]').or(page.locator('#twotabsearchtextbox'));
    await searchBox.fill('Tennis Bat');
    await searchBox.press('Enter');

    // Wait for search results
    await page.waitForSelector('[data-component-type="s-search-result"]', { timeout: 10000 });
    
    // Click on the first product
    const firstProduct = page.locator('[data-component-type="s-search-result"]').first();
    const productLink = firstProduct.locator('h2 a').first();
    await productLink.click();

    // Wait for product page to load
    await page.waitForLoadState('networkidle');
    
    // Verify we're on a product page (check for product title or add to cart button)
    const addToCartButton = page.locator('input[name="submit.add-to-cart"]')
      .or(page.locator('#add-to-cart-button'))
      .or(page.locator('button:has-text("Add to Cart")'));
    
    await expect(addToCartButton.first()).toBeVisible({ timeout: 10000 });
    
    // Get product title
    const productTitle = await page.locator('#productTitle').or(page.locator('h1')).textContent();
    console.log(`Product selected: ${productTitle}`);
    
    // Add to cart
    await addToCartButton.first().click();
    
    // Wait for cart confirmation
    await page.waitForSelector('text=Added to Cart', { timeout: 10000 }).catch(() => {
      // Sometimes the text might be different
      return page.waitForSelector('text=Cart', { timeout: 5000 });
    });
    
    // Verify item was added to cart
    const cartConfirmation = page.locator('text=Added to Cart').or(page.locator('text=1 item added to Cart'));
    await expect(cartConfirmation.first()).toBeVisible({ timeout: 10000 });
  });

  test('Complete purchase flow - view cart and proceed to checkout', async ({ page }) => {
    // Search for tennis bat
    const searchBox = page.locator('input[name="field-keywords"]').or(page.locator('#twotabsearchtextbox'));
    await searchBox.fill('Tennis Bat');
    await searchBox.press('Enter');

    // Wait for search results
    await page.waitForSelector('[data-component-type="s-search-result"]', { timeout: 10000 });
    
    // Click on the first product
    const firstProduct = page.locator('[data-component-type="s-search-result"]').first();
    await firstProduct.locator('h2 a').first().click();

    // Wait for product page
    await page.waitForLoadState('networkidle');
    
    // Add to cart
    const addToCartButton = page.locator('input[name="submit.add-to-cart"]')
      .or(page.locator('#add-to-cart-button'))
      .or(page.locator('button:has-text("Add to Cart")'));
    
    await addToCartButton.first().click();
    
    // Wait for cart confirmation
    await page.waitForSelector('text=Added to Cart', { timeout: 15000 }).catch(() => {
      return page.waitForSelector('text=Cart', { timeout: 5000 });
    });
    
    // Go to cart
    const cartButton = page.locator('a:has-text("Cart")')
      .or(page.locator('#nav-cart'))
      .or(page.locator('a[href*="cart"]'));
    
    await cartButton.first().click();
    
    // Wait for cart page to load
    await page.waitForLoadState('networkidle');
    
    // Verify cart has items
    const cartItems = page.locator('[data-item-count]').or(page.locator('.sc-list-item'));
    await expect(cartItems.first()).toBeVisible({ timeout: 10000 });
    
    // Click proceed to checkout (Note: This will require login)
    const proceedToCheckout = page.locator('input[name="proceedToRetailCheckout"]')
      .or(page.locator('button:has-text("Proceed to checkout")'))
      .or(page.locator('a:has-text("Proceed to checkout")'));
    
    if (await proceedToCheckout.first().isVisible({ timeout: 5000 })) {
      await proceedToCheckout.first().click();
      
      // Wait for checkout/login page
      await page.waitForLoadState('networkidle');
      
      // Verify we're on checkout/login page
      const signInPage = page.locator('h1:has-text("Sign in")').or(page.locator('h1:has-text("Sign-In")'));
      await expect(signInPage).toBeVisible({ timeout: 10000 });
      
      console.log('Reached checkout page - Login required to complete purchase');
    } else {
      console.log('Proceed to checkout button not found - may already be logged in or cart structure is different');
    }
  });

  test('Search with alternative term "Tennis Racket"', async ({ page }) => {
    // Search using alternative term
    const searchBox = page.locator('input[name="field-keywords"]').or(page.locator('#twotabsearchtextbox'));
    await searchBox.fill('Tennis Racket');
    await searchBox.press('Enter');

    // Wait for search results
    await page.waitForSelector('[data-component-type="s-search-result"]', { timeout: 10000 });
    
    // Verify results are displayed
    const searchResults = page.locator('[data-component-type="s-search-result"]');
    const count = await searchResults.count();
    expect(count).toBeGreaterThan(0);
    
    console.log(`Found ${count} products for "Tennis Racket"`);
  });

  test('Filter search results by price range', async ({ page }) => {
    // Search for tennis bat
    const searchBox = page.locator('input[name="field-keywords"]').or(page.locator('#twotabsearchtextbox'));
    await searchBox.fill('Tennis Bat');
    await searchBox.press('Enter');

    // Wait for search results
    await page.waitForSelector('[data-component-type="s-search-result"]', { timeout: 10000 });
    
    // Try to apply price filter (if available)
    try {
      const priceFilter = page.locator('text=$25 to $50').or(page.locator('span:has-text("$25")'));
      if (await priceFilter.isVisible({ timeout: 5000 })) {
        await priceFilter.click();
        await page.waitForLoadState('networkidle');
        console.log('Price filter applied');
      }
    } catch (e) {
      console.log('Price filter not available or not found');
    }
    
    // Verify filtered results
    const filteredResults = page.locator('[data-component-type="s-search-result"]');
    await expect(filteredResults.first()).toBeVisible();
  });
});
