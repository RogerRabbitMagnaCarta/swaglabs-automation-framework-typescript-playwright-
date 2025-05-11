import { When, Then }       from '@cucumber/cucumber';
import { expect }           from '@playwright/test';
import type { CustomWorld } from '../../support/world';

When(
  /^I add all products from the database to the cart$/,
  async function (this: CustomWorld) {
    const allItems = this.inventoryDb.getAllItems();
    for (const item of allItems) {
      const card = this.page.locator('.inventory_item').filter({ hasText: item.name });
      await card.locator('button', { hasText: 'Add to cart' }).click();
    }
    this.saveData('cartCount', String(allItems.length));
  }
);

Then(
  /^the cart badge should show the number of inventory items$/,
  async function (this: CustomWorld) {
    const count = this.getData('cartCount')!;
    const badge = await this.page.textContent('.shopping_cart_badge');
    expect(badge).toBe(count);
  }
);