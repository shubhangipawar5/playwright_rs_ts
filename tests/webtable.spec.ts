import { test, expect } from '@playwright/test';
import { compileFunction } from 'node:vm';

test('webtables1', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  const rows = page.locator('#product tbody').first().locator('tr');
  const rowCount = await rows.count();

  // Start at 1 to skip the header row.
  for (let i = 1; i < rowCount; i++) {
    const instructor = await rows.nth(i).locator('td').nth(0).textContent();
    console.log(instructor?.trim());

    const Price = await rows.nth(i).locator('td').nth(2).textContent();
    console.log(Price?.trim());
  }
});