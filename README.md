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
   cd swaglabs-automation-framework-typescript-playwright-
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

# Why We Lean on Generic Steps & Gherkin — Not Page Objects

In a mature automation effort, the highest leverage comes from **expressing business intent** in your scenarios, not from low-level code abstractions. Once your team has a solid grasp of the **business domain**—the flows, rules, and data you care about—you can:

1. **Write feature files in plain language**  
   ```gherkin
   Given I am on the login page
   When I login as "standard_user"
   Then I see the expected result for "standard_user"
   ```
   These steps read like user stories, and every step is backed by a **reusable, generic implementation**.

2. **Reuse a small library of “click / fill / assert” steps**  
   ```ts
   When('I click the {string} button', async function(label) {
     await this.click(`button:has-text("${label}")`);
   });

   When('I enter {string} into the {string} field', async function(value, field) {
     await this.type(`input[placeholder*="${field}"]`, value);
   });

   Then('I should see {string}', async function(text) {
     await expect(this.page.locator('body')).toContainText(text);
   });
   ```
   No new page-object class required for each page—just a handful of generic step definitions.

3. **Maintain a single source of truth for locators**  
   All selectors live in step-definition files. When the UI changes, you update one line; every scenario that “clicks the Checkout button” continues to work.

4. **Keep scenarios stable yet expressive**  
   Because steps are generic (“When I click the …”), your feature files don’t break when you rename a CSS class or tweak markup; only the underlying step needs adjustment.

---

## When Page Objects Make Sense

Page-object classes shine when:

- Your application is vast (hundreds of pages or complex widgets).  
- You need rich page-level methods (e.g. `ProductList.filterByCategory('Sauce Labs')`).  
- You want compile-time type safety around domain models.  

But for a **focused demo** or **small-to-medium** app with well-understood flows, the generic-step approach:

- **Accelerates** writing new tests (no boilerplate).  
- **Aligns** directly with Gherkin’s domain-language style.  
- **Minimizes** maintenance overhead.  

