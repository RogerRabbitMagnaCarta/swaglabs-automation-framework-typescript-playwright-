import { Given, When, Then } from '@cucumber/cucumber';
import { expect }            from '@playwright/test';
import type { CustomWorld }  from '../../support/world';

const FIELD_SELECTORS: Record<string,string> = {
  'First Name':  '#first-name',
  'Last Name':   '#last-name',
  'Postal Code': '#postal-code',
};

function errorSelectorFor(sel: string) {
  return `${sel} + .error-message`;
}

Given('I am logged in as {string}', async function(this: CustomWorld, userKey: string) {
  await this.goto('/index.html');
  const { username, password, locked } = this.userDb.getCredentials(userKey);
  await this.page.fill('#user-name', username);
  await this.page.fill('#password', password);
  await this.page.click('#login-button');
  await this.page.waitForURL(/\/inventory\.html$/);
});

Given('I go to the personal information page', async function(this: CustomWorld) {
  await this.goto('/personal-info.html');
});

When('I submit the empty form', async function(this: CustomWorld) {
  await this.page.click('button:has-text("Continue")');
});

When('I fill the following invalid values:', async function(
  this: CustomWorld,
  table: { rawTable: string[][] }
) {
  for (const [field, value] of table.rawTable.slice(1)) {
    const sel = FIELD_SELECTORS[field];
    if (!sel) throw new Error(`No selector for field "${field}"`);
    await this.page.fill(sel, value);
  }
});

When('I submit the form', async function(this: CustomWorld) {
  await this.page.click('button:has-text("Continue")');
});

Then('I should see required-field errors for:', async function(
  this: CustomWorld,
  table: { rawTable: string[][] }
) {
  for (const [field] of table.rawTable.slice(1)) {
    const sel = FIELD_SELECTORS[field];
    const err = await this.page.textContent(errorSelectorFor(sel));
    expect(err?.toLowerCase()).toContain('required');
  }
});

Then('I should see pattern-mismatch errors for:', async function(
  this: CustomWorld,
  table: { rawTable: string[][] }
) {
  for (const [field] of table.rawTable.slice(1)) {
    const sel = FIELD_SELECTORS[field];
    const err = await this.page.textContent(errorSelectorFor(sel));
    expect(err?.toLowerCase()).toContain('invalid');
  }
  await this.closeBrowser();
});


Then(
    /^I should not see the checkout overview page$/,
    async function (this: CustomWorld) {
      const overviewCount = await this.page
        .locator('.subheader')
        .filter({ hasText: 'Checkout: Overview' })
        .count();
  
      expect(
        overviewCount,
        'Expected NOT to see the checkout overview page, but it was present'
      ).toBe(0);
  
      await this.closeBrowser();
    }
  );