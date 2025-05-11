import { Given, When, Then } from '@cucumber/cucumber';
import { expect }            from '@playwright/test';
import type { CustomWorld }  from '../../support/world';

Given('I launch the browser without logging in', async function(this: CustomWorld) {
  await this.goto('/index.html');
});

When('I navigate to {string}', async function(this: CustomWorld, path: string) {
  await this.goto(path);
});

Then('I should see the login page', async function(this: CustomWorld) {
  const url = this.page.url();
  expect(url).toMatch(/\/index\.html$|\/$/);
  await expect(this.page.locator('#login-button')).toBeVisible();
  await this.closeBrowser();
});