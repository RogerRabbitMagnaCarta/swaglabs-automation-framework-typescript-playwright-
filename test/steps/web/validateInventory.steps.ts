import { Then }             from '@cucumber/cucumber';
import { expect }           from '@playwright/test';
import type { CustomWorld } from '../../support/world';

function normalizeText(s: string): string {
  return s.replace(/[‘’]/g, '\'').replace(/\s+/g, ' ').trim();
}

Then(
  /^the products displayed should match the database$/,
  async function (this: CustomWorld) {
    const dbItems = this.inventoryDb.getAllItems();

    const pageItems = await this.page.$$eval('.inventory_item', nodes =>
      nodes.map(node => {
        const nameNode  = node.querySelector('.inventory_item_name');
        const descNode  = node.querySelector('.inventory_item_desc');
        const priceNode = node.querySelector('.inventory_item_price');
        const imgSrc    = node.querySelector('img')?.getAttribute('src') || '';

        return {
          name:        nameNode?.textContent?.trim()      ?? '',
          description: descNode?.textContent?.trim()      ?? '',
          price:       parseFloat((priceNode?.textContent ?? '').replace(/[^0-9.]/g, '')),
          srcFilename: imgSrc.split('/').pop()            ?? ''
        };
      })
    );

    dbItems.sort((a, b)   => a.name.localeCompare(b.name));
    pageItems.sort((a, b) => a.name.localeCompare(b.name));

    expect(pageItems.length).toBe(dbItems.length);

    let html = `
      <table border="1" cellpadding="4" cellspacing="0" style="border-collapse: collapse; width:100%; margin-top:10px;">
        <thead style="background:#eee;">
          <tr>
            <th>Product</th>
            <th>DB&nbsp;Description</th>
            <th>UI&nbsp;Description</th>
            <th>DB&nbsp;Price</th>
            <th>UI&nbsp;Price</th>
            <th>DB&nbsp;Image</th>
            <th>UI&nbsp;Image</th>
          </tr>
        </thead>
        <tbody>
    `;

    for (let i = 0; i < dbItems.length; i++) {
      const db = dbItems[i];
      const pg = pageItems[i];

      expect(pg.name).toBe(db.name);
      expect(pg.price).toBeCloseTo(db.price, 2);

      const dbDesc = normalizeText(db.description);
      const pgDesc = normalizeText(pg.description);
      expect(pgDesc).toContain(dbDesc);

      expect(pg.srcFilename).toBe(db.image_path);

      html += `
        <tr>
          <td>${db.name}</td>
          <td style="max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
            ${dbDesc}
          </td>
          <td style="max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
            ${pgDesc}
          </td>
          <td style="text-align:right;">${db.price.toFixed(2)}</td>
          <td style="text-align:right;">${pg.price.toFixed(2)}</td>
          <td>${db.image_path}</td>
          <td>${pg.srcFilename}</td>
        </tr>
      `;
    }

    html += `
        </tbody>
      </table>
    `;

    await this.attach(html, 'text/html');
  }
);
