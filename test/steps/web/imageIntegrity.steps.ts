import { Given, When, Then } from '@cucumber/cucumber';
import { expect }            from '@playwright/test';
import type { CustomWorld }  from '../../support/world';

let imageUrls: string[] = [];

Given(
  /^I am viewing the inventory page$/,
  async function(this: CustomWorld) {
    await this.goto('/inventory.html');
    await expect(this.page).toHaveURL(/\/inventory\.html$/, { timeout: 10_000 });
    await this.page.waitForSelector('.inventory_item', { timeout: 10_000 });
  }
);

When(
  /^I collect all product image URLs$/,
  async function(this: CustomWorld) {
    const elements = await this.page.$$('img.inventory_item_img, .inventory_item_img img');
    const pageUrl = this.page.url();

    imageUrls = await Promise.all(
      elements.map(el =>
        el.getAttribute('src').then(src => {
          if (!src) throw new Error('Found an <img> without a src');
          return new URL(src, pageUrl).href;
        })
      )
    );

    if (imageUrls.length === 0) {
      throw new Error('No product images found on the inventory page');
    }
  }
);

Then(
  /^each image URL returns HTTP 200 and non-zero content$/,
  async function(this: CustomWorld) {
    for (const url of imageUrls) {
      const r = await this.page.request.get(url);
      expect(
        r.status(),
        `Expected 200 but got ${r.status()} for ${url}`
      ).toBe(200);

      const body = await r.body();
      expect(
        body.length,
        `Expected non-zero body length for ${url}`
      ).toBeGreaterThan(0);
    }
  }
);