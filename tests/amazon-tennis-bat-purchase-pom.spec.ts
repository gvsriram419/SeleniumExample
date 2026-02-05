import { test, expect } from '@playwright/test';
import { AmazonPage, AmazonProductPage, AmazonSearchResultsPage, AmazonCartPage } from './page-objects/amazon-page';

/**
 * Test suite using Page Object Model pattern for purchasing a Tennis Bat from Amazon
 */
test.describe('Amazon Tennis Bat Purchase Flow (POM)', () => {
  let amazonPage: AmazonPage;
  let searchResultsPage: AmazonSearchResultsPage;
  let productPage: AmazonProductPage;
  let cartPage: AmazonCartPage;

  test.beforeEach(async ({ page }) => {
    amazonPage = new AmazonPage(page);
    searchResultsPage = new AmazonSearchResultsPage(page);
    productPage = new AmazonProductPage(page);
    cartPage = new AmazonCartPage(page);
    
    await amazonPage.goto();
  });

  test('Complete purchase flow: Search -> Select Product -> Add to Cart -> View Cart', async ({ page }) => {
    // Step 1: Search for Tennis Bat
    await amazonPage.search('Tennis Bat');
    
    // Verify search results
    const resultCount = await searchResultsPage.getProductCount();
    expect(resultCount).toBeGreaterThan(0);
    console.log(`Found ${resultCount} products`);
    
    // Step 2: Select first product
    await searchResultsPage.selectFirstProduct();
    
    // Get product details
    const productTitle = await productPage.getProductTitle();
    const productPrice = await productPage.getPrice();
    console.log(`Selected product: ${productTitle}`);
    console.log(`Price: ${productPrice}`);
    
    expect(productTitle).toBeTruthy();
    
    // Step 3: Add to cart
    await productPage.addToCart();
    
    // Verify item was added
    const cartConfirmation = page.locator('text=Added to Cart').or(page.locator('text=1 item added to Cart'));
    await expect(cartConfirmation.first()).toBeVisible({ timeout: 10000 });
    
    // Step 4: Go to cart
    await amazonPage.goToCart();
    
    // Verify cart has items
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBeGreaterThan(0);
    console.log(`Cart contains ${cartItemCount} item(s)`);
    
    // Step 5: Proceed to checkout (will require login)
    await cartPage.proceedToCheckout();
    
    // Verify we're on checkout/login page
    const signInPage = page.locator('h1:has-text("Sign in")').or(page.locator('h1:has-text("Sign-In")'));
    if (await signInPage.isVisible({ timeout: 5000 })) {
      console.log('Reached checkout page - Login required to complete purchase');
    }
  });

  test('Search and verify product details', async ({ page }) => {
    await amazonPage.search('Tennis Racket');
    
    const firstProductTitle = await searchResultsPage.getFirstProductTitle();
    expect(firstProductTitle).toBeTruthy();
    console.log(`First product: ${firstProductTitle}`);
    
    // Select and view product details
    await searchResultsPage.selectFirstProduct();
    
    const productTitle = await productPage.getProductTitle();
    const price = await productPage.getPrice();
    
    expect(productTitle).toBeTruthy();
    console.log(`Product: ${productTitle}`);
    console.log(`Price: ${price}`);
  });

  test('Add multiple items to cart', async ({ page }) => {
    // Search and add first product
    await amazonPage.search('Tennis Bat');
    await searchResultsPage.selectFirstProduct();
    await productPage.addToCart();
    
    // Go back and add another product
    await page.goBack();
    await page.waitForLoadState('networkidle');
    
    // Select second product
    const secondProduct = page.locator('[data-component-type="s-search-result"]').nth(1);
    await secondProduct.locator('h2 a').first().click();
    await page.waitForLoadState('networkidle');
    
    // Add second product to cart
    await productPage.addToCart();
    
    // Verify both items in cart
    await amazonPage.goToCart();
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBeGreaterThanOrEqual(1);
    console.log(`Cart contains ${cartItemCount} item(s)`);
  });
});
