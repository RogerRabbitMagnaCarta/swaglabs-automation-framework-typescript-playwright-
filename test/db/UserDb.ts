// src/test/db/UserDb.ts

import Database from 'better-sqlite3';
import path     from 'path';
import fs       from 'fs';

export interface Credentials {
  username: string;
  password: string;
  locked: boolean;
}

export class UserDb {
  private db: Database.Database;

  /**
   * @param dbPath - optional path to the SQLite file; defaults to the built-in data.db
   */
  constructor(dbPath?: string) {
    // Resolve the file: either the provided one, or the default in this folder
    const file = dbPath
      ? path.resolve(dbPath)
      : path.resolve(__dirname, 'data.db');

    // Ensure parent folder exists (for custom paths)
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Open (or create) the database
    this.db = new Database(file);

    // If the users table doesn’t exist yet, seed it
    const hasUsers = this.db.prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name='users'"
    ).pluck().get() as number;

    if (hasUsers === 0) {
      const initSql = fs.readFileSync(
        path.resolve(__dirname, 'init.sql'),
        'utf8'
      );
      this.db.exec(initSql);
    }
  }

  /**
   * Fetch credentials for the given user key.
   * Throws if the userKey is not found.
   */
  getCredentials(userKey: string): Credentials {
    const row = this.db
      .prepare("SELECT username, password, locked FROM users WHERE username = ?")
      .get(userKey) as { username: string; password: string; locked: number };

    if (!row) {
      throw new Error(`No user found for key: ${userKey}`);
    }

    return {
      username: row.username,
      password: row.password,
      locked: Boolean(row.locked),
    };
  }
}
