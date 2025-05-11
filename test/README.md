# Test Directory

This directory contains support files, fixtures, and database initialization scripts used by the test suite.

## Structure

- `db/`
  - `data.db` — SQLite database file containing user and inventory tables.
  - `init.sql` — SQL script to initialize and seed the database.
- `support/`
  - `world.ts` — Custom Cucumber World with browser, database helpers, and shared utilities.
  - `hooks.ts` — Cucumber hooks for setup and teardown.
- `steps/`
  - `web/` — Step definitions for web interactions (login, cart, checkout, sorting, sidebar, personal-info).
  - `checkout/` — Steps specifically for checkout totals.
  - `login/` — Steps for login scenarios.
- `assets/`
  - `report-style.css` — Custom CSS for HTML report branding.
  - `swag-log.png` — Logo to include in test reports.

## Usage

1. **Initialize the database**:
   ```bash
   npm run db:init
   ```
2. **Run tests**:
   ```bash
   npm test
   ```
3. **Generate report**:
   ```bash
   npm run report
   ```
4. **View HTML report**:
   Open `reports/report.html` in your browser.

## Environment Variables

Set in `.env`:

```dotenv
BASE_URL=https://www.saucedemo.com/v1
DB_PATH=test/db/data.db
BROWSER=chromium
HEADLESS=false
TIMEOUT=60000
STEP_TIMEOUT=10000
LOGIN_TIMEOUT=60000
```
