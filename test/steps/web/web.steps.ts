import { Given, When, Then } from '@cucumber/cucumber';
import { expect }            from '@playwright/test';
import type { CustomWorld }  from '../../support/world';

const FIELD_SELECTORS: Record<string,string> = {
  Username:     '#user-name',
  Password:     '#password',
  'First Name': '#first-name',
  'Last Name':  '#last-name',
  'Postal Code':'#postal-code',
};

const BUTTON_SELECTORS: Record<string,string> = {
  Login:     '#login-button',
  Checkout:  'button:has-text("Checkout"), a:has-text("Checkout")',
  Continue:
    'button:has-text("Continue"), input[type=submit][value="CONTINUE"], input[type=submit][value="Continue"]',
    Finish:    'a.btn_action.cart_button:has-text("FINISH"), button:has-text("Finish"), a:has-text("Finish")',

};

Given(/^I am on the login page$/, async function(this: CustomWorld) {  
  await this.goto('/index.html');
});

When(
  /^I enter "([^"]*)" into the "([^"]+)" field$/,
  async function(this: CustomWorld, value: string, field: string) {
    const sel = FIELD_SELECTORS[field];
    if (!sel) throw new Error(`No selector for field "${field}"`);
    await this.page.fill(sel, value);
  }
);

When(/^I add "([^"]+)" to the cart$/, async function(this: CustomWorld, itemName: string) {
  const card = this.page.locator('.inventory_item').filter({ hasText: itemName });
  await card.locator('button', { hasText: 'Add to cart' }).click();
});

When(
  /^I click the "([^"]+)" button$/,
  async function (this: CustomWorld, label: string) {
    const selector = BUTTON_SELECTORS[label] 
      ?? `button:has-text("${label}"), a:has-text("${label}")`;
    const btn = this.page.locator(selector).first();
    await btn.click({ timeout: Number(process.env.STEP_TIMEOUT) });
  }
);

When(/^I click the cart icon$/, async function(this: CustomWorld) {
  await this.page.click('.shopping_cart_link');
});

Then(/^I should be on the products page$/, async function(this: CustomWorld) {
  await expect(this.page).toHaveURL(/\/inventory\.html$/);
});



Then(
  /^I should see the order completion page$/,
  async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(/\/checkout-complete\.html$/);
    const heading = await this.page.textContent('.complete-header');
    expect(heading).toContain('THANK YOU FOR YOUR ORDER');
    const shot = await this.page.screenshot();
    await this.attach(shot, 'image/png');
    await this.closeBrowser();
  }
);


When('I click the "Reset App State" link', async function(this: CustomWorld) {
  await this.page.click('#reset_sidebar_link');
});

Then('the cart badge should show "0"', async function(this: CustomWorld) {
  const badge = this.page.locator('.shopping_cart_badge');
  if (await badge.count() === 0) {
    return;
  }
  await expect(badge).toHaveText('0');
});
