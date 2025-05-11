# Swag Labs Automation Framework

A full end-to-end test automation framework for the Sauce Demo application, built with:

- **Playwright** for browser automation  
- **Cucumber.js** for BDD feature files & step definitions  
- **TypeScript** for type safety  
- **better-sqlite3** for simple test data fixtures  

## Prerequisites

- Node.js ≥ 16  
- npm (comes with Node.js)  
- SQLite3 CLI (for `npm run db:init`)  

## Getting Started

1. **Clone & install dependencies**  
   ```bash
   git clone https://github.com/RogerRabbitMagnaCarta/swaglabs-automation-framework-typescript-playwright-.git
   cd swaglabs-automation-framework-typescript-playwright
   npm install
   ```

2. **Initialize the database**  
   ```bash
   npm run db:init
   ```

3. **Configure environment**  
   Copy `.env.example` → `.env` and adjust if needed:
   ```env
   BASE_URL=https://www.saucedemo.com/v1/
   BROWSER=chromium
   HEADLESS=false
   STEP_TIMEOUT=10000
   LOGIN_TIMEOUT=60000
   DB_PATH=test/db/data.db
   ```

4. **Run the tests**  
   ```bash
   npm test
   ```

5. **Generate HTML report**  
   ```bash
   npm run report
   open reports/report.html
   ```

## Project Structure

```
├── src/
│   └── features/        # Gherkin `.feature` files
├── test/
│   ├── db/              # SQLite fixtures & helpers
│   ├── steps/           # Cucumber step definitions
│   └── support/         # World, hooks, helpers
├── scripts/             # Report generator, etc.
├── reports/             # JSON + HTML reports
├── package.json
└── .env.example
```
