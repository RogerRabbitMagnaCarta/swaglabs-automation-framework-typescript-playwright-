import { Then }           from '@cucumber/cucumber';
import { expect }         from '@playwright/test';
import type { CustomWorld } from '../../support/world';

Then(
  /^the item total should equal the sum of database prices$/,
  async function (this: CustomWorld) {
    const items   = this.inventoryDb.getAllItems();
    const subtotal = items.reduce((sum, it) => sum + it.price, 0);
    const label   = await this.page.textContent('.summary_subtotal_label');
    const uiValue = parseFloat((label ?? '').replace(/[^0-9.]/g, ''));
    expect(uiValue).toBeCloseTo(subtotal, 2);
    this.saveData('subtotal', subtotal.toFixed(2));
  }
);

Then(
  /^the tax should be "(\d+)%?" of that subtotal$/,
  async function (this: CustomWorld, pctStr: string) {
    const pct       = Number(pctStr) / 100;
    const subtotal  = Number(this.getData('subtotal'));
    const expected  = Number((subtotal * pct).toFixed(2));
    const label     = await this.page.textContent('.summary_tax_label');
    const uiTax     = parseFloat((label ?? '').replace(/[^0-9.]/g, ''));
    expect(uiTax).toBeCloseTo(expected, 2);
    this.saveData('tax', expected.toFixed(2));
  }
);

Then(
  /^the total should equal subtotal plus tax$/,
  async function (this: CustomWorld) {
    const subtotal = Number(this.getData('subtotal'));
    const tax      = Number(this.getData('tax'));
    const expected = Number((subtotal + tax).toFixed(2));
    const label    = await this.page.textContent('.summary_total_label');
    const uiTotal  = parseFloat((label ?? '').replace(/[^0-9.]/g, ''));
    expect(uiTotal).toBeCloseTo(expected, 2);
  }
);