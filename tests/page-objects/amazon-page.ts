import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for Amazon homepage and common elements
 */
export class AmazonPage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly cartIcon: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.locator('input[name="field-keywords"]').or(page.locator('#twotabsearchtextbox'));
    this.cartIcon = page.locator('#nav-cart').or(page.locator('a[href*="cart"]'));
    this.signInButton = page.locator('#nav-link-accountList').or(page.locator('a:has-text("Sign in")'));
  }

  async goto() {
    await this.page.goto('https://www.amazon.com');
    await this.handleLocationPopup();
  }

  async handleLocationPopup() {
    try {
      await this.page.waitForLoadState('networkidle');
      const locationPopup = this.page.locator('text=Select your address').or(this.page.locator('text=Choose a location'));
      if (await locationPopup.isVisible({ timeout: 3000 })) {
        await this.page.locator('button:has-text("Continue")').or(this.page.locator('button:has-text("Done")')).click();
      }
    } catch (e) {
      // Popup might not appear, continue
    }
  }

  async search(query: string) {
    await this.searchBox.fill(query);
    await this.searchBox.press('Enter');
    await this.page.waitForSelector('[data-component-type="s-search-result"]', { timeout: 10000 });
  }

  async goToCart() {
    await this.cartIcon.click();
    await this.page.waitForLoadState('networkidle');
  }
}

/**
 * Page Object Model for Amazon Product Page
 */
export class AmazonProductPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly addToCartButton: Locator;
  readonly price: Locator;
  readonly quantitySelector: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator('#productTitle').or(page.locator('h1'));
    this.addToCartButton = page.locator('input[name="submit.add-to-cart"]')
      .or(page.locator('#add-to-cart-button'))
      .or(page.locator('button:has-text("Add to Cart")'));
    this.price = page.locator('#priceblock_ourprice').or(page.locator('.a-price-whole'));
    this.quantitySelector = page.locator('#quantity');
  }

  async addToCart() {
    await this.addToCartButton.first().click();
    await this.page.waitForSelector('text=Added to Cart', { timeout: 15000 }).catch(() => {
      return this.page.waitForSelector('text=Cart', { timeout: 5000 });
    });
  }

  async getProductTitle(): Promise<string | null> {
    return await this.productTitle.textContent();
  }

  async getPrice(): Promise<string | null> {
    return await this.price.first().textContent();
  }
}

/**
 * Page Object Model for Amazon Search Results Page
 */
export class AmazonSearchResultsPage {
  readonly page: Page;
  readonly searchResults: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchResults = page.locator('[data-component-type="s-search-result"]');
  }

  async selectFirstProduct() {
    const firstProduct = this.searchResults.first();
    await firstProduct.locator('h2 a').first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async getProductCount(): Promise<number> {
    return await this.searchResults.count();
  }

  async getFirstProductTitle(): Promise<string | null> {
    return await this.searchResults.first().locator('h2 a span').textContent();
  }
}

/**
 * Page Object Model for Amazon Cart Page
 */
export class AmazonCartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly cartSubtotal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('[data-item-count]').or(page.locator('.sc-list-item'));
    this.proceedToCheckoutButton = page.locator('input[name="proceedToRetailCheckout"]')
      .or(page.locator('button:has-text("Proceed to checkout")'))
      .or(page.locator('a:has-text("Proceed to checkout")'));
    this.cartSubtotal = page.locator('#sc-subtotal-label-buybox').or(page.locator('.sc-subtotal'));
  }

  async proceedToCheckout() {
    if (await this.proceedToCheckoutButton.first().isVisible({ timeout: 5000 })) {
      await this.proceedToCheckoutButton.first().click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }
}
