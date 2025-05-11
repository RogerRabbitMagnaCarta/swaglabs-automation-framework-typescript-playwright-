import { After,Before , ITestCaseHookParameter } from '@cucumber/cucumber';
import type { CustomWorld } from './world';


Before(async function(this: CustomWorld) {
  await this.launchBrowser();
});


After(async function(this: CustomWorld, { result }: ITestCaseHookParameter) {
  if (this.errors.length > 0) {
    const msg = this.errors.map((e, i) => `(${i+1}) ${e.message}`).join('\n');
    this.errors = [];
    throw new Error(`Soft assert failures:\n${msg}`);

  }
  await this.closeBrowser();
});
