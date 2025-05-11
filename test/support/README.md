# support

This directory contains Cucumber “world” and hook definitions, plus any test-wide helpers and fixtures.

## Files

- **world.ts**  
  Sets up the `CustomWorld`, which:
  - Loads environment variables (via `.env`).
  - Initializes database helpers (`UserDb`, `InventoryDb`).
  - Manages Playwright browser, context, and page lifecycles.
  - Exposes convenience methods: `goto()`, `click()`, `type()`, `getText()`, `saveData()`, `getData()`, and screenshot helpers.

- **hooks.ts**  
  Cucumber hooks for:
  - Launching and closing the browser before/after each scenario.
  - Capturing screenshots on failure.
  - Soft‐assert error aggregation.

- **db/**  
  Database helper classes for seeding and querying test data:
  - `UserDb.ts`—manages `users` table.
  - `InventoryDb.ts`—manages `inventory` table.

## Environment

The support code reads these environment variables (with defaults):

| Name          | Purpose                                          | Default                 |
| ------------- | ------------------------------------------------ | ----------------------- |
| `BASE_URL`    | Root URL for the app under test                  | _(must be set)_         |
| `BROWSER`     | Playwright browser to use (`chromium`, `firefox`, `webkit`) | `chromium` |
| `HEADLESS`    | Run in headless mode? (`true` / `false`)         | `true`                  |
| `STEP_TIMEOUT`| Default timeout (ms) for individual actions       | `10000`                 |
| `LOGIN_TIMEOUT`| Timeout (ms) for navigation to the login/inventory pages | `60000` |
| `DB_PATH`     | Path to SQLite database file                     | `test/db/data.db`       |

Set these in the project root `.env` file.

## Extending

- **Adding a new helper**: drop your module in this folder and import it in `world.ts`.
- **Adjusting timeouts**: update `STEP_TIMEOUT` or override per‐step via Cucumber’s `--timeout` flags.
- **Additional hooks**: add new `Before` or `After` blocks to `hooks.ts`.

# support

This directory contains Cucumber “world” and hook definitions, plus any test-wide helpers and fixtures.

## Files

- **world.ts**  
  Sets up the `CustomWorld`, which:
  - Loads environment variables (via `.env`).
  - Initializes database helpers (`UserDb`, `InventoryDb`).
  - Manages Playwright browser, context, and page lifecycles.
  - Exposes convenience methods: `goto()`, `click()`, `type()`, `getText()`, `saveData()`, `getData()`, and screenshot helpers.

- **hooks.ts**  
  Cucumber hooks for:
  - Launching and closing the browser before/after each scenario.
  - Capturing screenshots on failure.
  - Soft‐assert error aggregation.

- **db/**  
  Database helper classes for seeding and querying test data:
  - `UserDb.ts`—manages `users` table.
  - `InventoryDb.ts`—manages `inventory` table.

## Environment

The support code reads these environment variables (with defaults):

| Name          | Purpose                                          | Default                 |
| ------------- | ------------------------------------------------ | ----------------------- |
| `BASE_URL`    | Root URL for the app under test                  | _(must be set)_         |
| `BROWSER`     | Playwright browser to use (`chromium`, `firefox`, `webkit`) | `chromium` |
| `HEADLESS`    | Run in headless mode? (`true` / `false`)         | `true`                  |
| `STEP_TIMEOUT`| Default timeout (ms) for individual actions       | `10000`                 |
| `LOGIN_TIMEOUT`| Timeout (ms) for navigation to the login/inventory pages | `60000` |
| `DB_PATH`     | Path to SQLite database file                     | `test/db/data.db`       |

Set these in the project root `.env` file.

## Extending

- **Adding a new helper**: drop your module in this folder and import it in `world.ts`.
- **Adjusting timeouts**: update `STEP_TIMEOUT` or override per‐step via Cucumber’s `--timeout` flags.
- **Additional hooks**: add new `Before` or `After` blocks to `hooks.ts`.

