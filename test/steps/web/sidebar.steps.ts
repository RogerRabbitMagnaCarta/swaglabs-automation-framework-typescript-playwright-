import { Given, When, Then } from '@cucumber/cucumber';
import { expect }            from '@playwright/test';
import type { CustomWorld }  from '../../support/world';


When(
  /^I open the sidebar menu$/,
  async function(this: CustomWorld) {
    const burger = this.page.locator('button', { hasText: 'Open Menu' });
    await burger.click();
    await this.page.waitForSelector('.bm-menu');
  }
);

Then(
  /^I should see the following menu items:$/,
  async function(
    this: CustomWorld,
    table: { raw(): string[][] }
  ) {
    const rows = table.raw().slice(1);
    const expected = rows.map(([id, text, href]) => ({
      id, text, href
    }));

    const actual = await this.page.$$eval(
      '.bm-item-list .menu-item',
      els => els.map(e => ({
        id:   e.id,
        text: e.textContent?.trim() ?? '',
        href: e.getAttribute('href') ?? ''
      }))
    );

    for (const exp of expected) {
      const found = actual.find(a =>
        a.id   === exp.id &&
        a.text === exp.text &&
        a.href === exp.href
      );
      expect(found, `Menu item ${exp.id}`).toBeDefined();
    }
  }
);