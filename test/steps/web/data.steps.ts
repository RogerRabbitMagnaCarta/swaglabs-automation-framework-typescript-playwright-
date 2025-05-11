import { When, Then }        from '@cucumber/cucumber';
import { expect }            from '@playwright/test';
import type { CustomWorld }  from '../../support/world';

When(
  /^I login as "([^"]+)"$/,
  async function(this: CustomWorld, userKey: string) {
    await this.goto('/index.html');

    const { username, password, locked } = this.userDb.getCredentials(userKey);
    await this.page.fill('#user-name', username);
    await this.page.fill('#password',  password);
    await this.page.click('#login-button');

    if (locked) {
      await this.page.waitForSelector('.error-message-container .error-message');
    } else {
      await this.page.waitForURL(/\/inventory\.html$/);
    }

    this.saveData('lastLoginLocked', String(locked));
  }
);

Then(
  /^I see the expected result for "([^"]+)"$/,
  async function(this: CustomWorld, userKey: string) {
    const locked = this.getData('lastLoginLocked') === 'true';
    if (locked) {
      const msg = await this.page.textContent('.error-message-container .error-message');
      expect(msg?.toLowerCase()).toContain('locked out');
      await this.closeBrowser();
    } else {
      await expect(this.page).toHaveURL(/\/inventory\.html$/);
    }
  }
);