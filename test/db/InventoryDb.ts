import Database from 'better-sqlite3';
import path     from 'path';
import fs       from 'fs';

export interface InventoryItem {
  name:        string;
  description: string;
  price:       number;
  image_path:  string;
}

export class InventoryDb {
  private db: Database.Database;

  constructor(dbPath: string = 'test/db/data.db') {
    const file = path.resolve(dbPath);
    const dir  = path.dirname(file);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    this.db = new Database(file);
  }

  getAllItems(): InventoryItem[] {
    return this.db
      .prepare(`
        SELECT name, description, price, image_path
          FROM inventory
        ORDER BY name
      `)
      .all() as InventoryItem[];
  }
}
