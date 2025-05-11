import { Given, When, Then } from '@cucumber/cucumber';
import { expect }            from '@playwright/test';
import type { CustomWorld }  from '../../support/world';

Given('I am on the inventory page', async function(this: CustomWorld) {
  await this.page.waitForSelector('select.product_sort_container');
});

When(
  'I select {string} from the sort dropdown',
  async function (this: CustomWorld, criteria: string) {
    await this.page.selectOption(
      'select.product_sort_container',
      { label: criteria }
    );
    await this.page.waitForLoadState('networkidle');
  }
);

Then(
  'the products should be ordered by {word} in {word} order',
  async function (
    this: CustomWorld,
    field: 'name' | 'price',
    order: 'ascending' | 'descending'
  ) {
    const values = await this.page.$$eval(
      field === 'name'
        ? '.inventory_item_name'
        : '.inventory_item_price',
      (nodes, field) =>
        nodes.map(n => {
          const txt = n.textContent!.trim();
          return field === 'price'
            ? parseFloat(txt.replace(/[^0-9.]/g, ''))
            : txt;
        }),
      field
    );

    const sorted = [...values].sort((a, b) => {
      if (typeof a === 'string') {
        return (a as string).localeCompare(b as string);
      }
      return (a as number) - (b as number);
    });
    if (order === 'descending') sorted.reverse();

    expect(values).toEqual(sorted);

    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');

    await this.closeBrowser();
  }
);
