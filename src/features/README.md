# Cucumber Features

This directory (`src/features`) contains all of the Cucumber `.feature` files that drive our end-to-end and component-level scenarios. Each file is organized to reflect a specific area of functionality or flow in the application.

## Directory Structure

- **test_cases/** – high‑level, multi‑step workflows and end‑to‑end journeys:
  - `01 - end-to-end.feature` – Complete user journey from login through checkout.
  - `02- sort-products.feature` – Verifies product sorting by name and price.
  - `03 - side-bar.feature` – Ensures the sidebar menu contains all expected links.
  - `04 - personal-info.feature` – Validates personal info form rejects invalid inputs.
  - `05 - accessibility.feature` – Confirms unauthenticated users are redirected to login.

- **login/** – focused scenarios around authentication behaviors.
- **checkout/** – tests for checkout totals and flows.

## Naming & Prefixes

Feature files are prefixed with numbers to establish execution order and grouping.

## Tags & Filtering

Common tags for selective execution:

- `@e2e`, `@smoke` – Run critical end‑to‑end smoke tests.
- `@regression` – Run Regression tests.
- `@sorting`, `@sidebar`, `@personal`, `@accessibility` – Run targeted feature sets.

## Running the Features

```bash
npm run test:cucumber -- --format progress --format json:reports/report.json
```

You can also filter by tags:

```bash
npm run test:cucumber -- --tags "@e2e and @smoke"
```
