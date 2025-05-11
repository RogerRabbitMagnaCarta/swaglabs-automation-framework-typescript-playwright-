import { setDefaultTimeout } from '@cucumber/cucumber';
import * as dotenv from 'dotenv';
dotenv.config();

const STEP_TIMEOUT = Number(process.env.STEP_TIMEOUT ?? 60000);
setDefaultTimeout(STEP_TIMEOUT);


import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import {
  chromium,
  firefox,
  webkit,
  Browser,
  BrowserContext,
  Page,
  LaunchOptions
} from 'playwright';

import { UserDb }      from '../db/UserDb';
import { InventoryDb } from '../db/InventoryDb';

const {
  BASE_URL      = '',
  BROWSER       = 'chromium',
  HEADLESS      = 'true',
  LOGIN_TIMEOUT = '60000',
  DB_PATH       = 'test/db/data.db'
} = process.env;

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  userDb: UserDb;
  inventoryDb: InventoryDb;
  dataStore: Record<string, string>;

  public errors: Error[] = [];

  constructor(options: IWorldOptions) {
    super(options);

    this.userDb      = new UserDb(DB_PATH);
    this.inventoryDb = new InventoryDb(DB_PATH);
    this.dataStore   = {};
  }

  softAssert(fn: () => void) {
    try {
      fn();
    } catch (err: any) {
      this.errors.push(err);
    }
  }

  async launchBrowser() {
    const headless = HEADLESS.toLowerCase() !== 'false';
    const slowMo   = Number(process.env.SLOWMO) || 0;
    const opts: LaunchOptions = { headless, slowMo };

    this.browser = BROWSER === 'firefox'
      ? await firefox.launch(opts)
      : BROWSER === 'webkit'
      ? await webkit.launch(opts)
      : await chromium.launch(opts);

    this.context = await this.browser.newContext({ viewport: null });
    this.page    = await this.context.newPage();
    this.page.setDefaultTimeout(Number(STEP_TIMEOUT));
  }

  async closeBrowser() {
    if (this.page) {
      try { await this.page.close(); } catch {}
    }
    if (this.context) {
      try { await this.context.close(); } catch {}
    }
    if (this.browser) {
      try { await this.browser.close(); } catch {}
    }
  }

  async goto(path: string) {
    const base = BASE_URL.replace(/\/+$/, '');
    const url  = path.startsWith('http') ? path : `${base}${path}`;
    console.log(`[CustomWorld] navigating to: ${url}`);
    await this.page.goto(url, {
      waitUntil: 'load',
      timeout: Number(LOGIN_TIMEOUT)
    });
  }

  async click(selector: string) {
    await this.page.click(selector);
  }

  async type(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  async getText(selector: string): Promise<string> {
    const txt = await this.page.textContent(selector);
    return txt?.trim() || '';
  }

  saveData(key: string, value: string) {
    this.dataStore[key] = value;
  }

  getData(key: string): string | undefined {
    return this.dataStore[key];
  }
}

setWorldConstructor(CustomWorld);
