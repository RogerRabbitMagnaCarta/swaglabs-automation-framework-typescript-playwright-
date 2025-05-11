# test/db

This directory contains the SQLite database files and helper scripts for seeding and managing test data.

## Files

- `data.db`  
  The SQLite database used by the tests. It includes two tables:
  - `users` (username, password, locked)
  - `inventory` (name, description, price)

- `init.sql`  
  SQL schema and seed data for both `users` and `inventory` tables. Run via:
  ```bash
  sqlite3 data.db < init.sql
  ```

- `UserDb.ts`  
  TypeScript helper class for loading `data.db`, creating tables if missing, and querying user credentials.

- `InventoryDb.ts`  
  TypeScript helper class for querying the `inventory` table.

## Usage

- To (re)initialize the database in CI or locally:
  ```bash
  cd test/db
  sqlite3 data.db < init.sql
  ```

- The test `CustomWorld` automatically loads and seeds the database via `new UserDb()` / `new InventoryDb()`.

