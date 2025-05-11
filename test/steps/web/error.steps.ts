import { Then }             from '@cucumber/cucumber';
import { expect }           from '@playwright/test';
import type { CustomWorld } from '../../support/world';
import * as dotenv          from 'dotenv';

dotenv.config();
const LOGIN_TIMEOUT = Number(process.env.LOGIN_TIMEOUT) || 60000;

Then(
  /^I should see an error saying "([^"]+)"$/,
  async function(this: CustomWorld, expected: string) {
    const locator = this.page.locator('.error-message-container .error-message');
    await locator.waitFor({ timeout: LOGIN_TIMEOUT });
    await expect(locator).toHaveText(expected, { timeout: 5000 });
  }
);