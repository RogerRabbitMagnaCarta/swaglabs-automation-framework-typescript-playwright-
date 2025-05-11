import { Then }             from '@cucumber/cucumber';
import { expect }           from '@playwright/test';
import type { CustomWorld } from '../../support/world';
import fs                   from 'fs';
import path                 from 'path';
import crypto               from 'crypto';

Then(
  /^each displayed product image exactly matches the asset$/,
  async function (this: CustomWorld) {
    const items = this.inventoryDb.getAllItems();

    for (const item of items) {
      const card = this.page.locator('.inventory_item').filter({ hasText: item.name });

      const src = await card.locator('img').getAttribute('src');
      if (!src) {
        throw new Error(`No <img> src found for product "${item.name}"`);
      }

      const expectedFile = item.image_path;

      const filenameInSrc = src.replace(/^.*[\\/]/, '');
      console.log(`VERIFY IMAGE — Product: "${item.name}"`);
      console.log(`  raw src:          ${src}`);
      console.log(`  filenameInSrc:    ${filenameInSrc}`);
      console.log(`  expectedFile:     ${expectedFile}`);
      console.log(`  endsWith?         ${filenameInSrc.endsWith(expectedFile)}`);
      expect(filenameInSrc.endsWith(expectedFile)).toBe(true);

      const fullUrl  = new URL(src, this.page.url()).href;
      const response = await this.page.request.get(fullUrl);
      const uiBuffer = await response.body();

      const assetPath = path.resolve('test/assets', expectedFile);
      if (!fs.existsSync(assetPath)) {
        throw new Error(`Missing asset file for "${item.name}": ${assetPath}`);
      }
      const assetBuffer = fs.readFileSync(assetPath);

      const hashUi    = crypto.createHash('sha256').update(uiBuffer).digest('hex');
      const hashAsset = crypto.createHash('sha256').update(assetBuffer).digest('hex');
      expect(hashUi).toBe(hashAsset);
    }
  }
);
