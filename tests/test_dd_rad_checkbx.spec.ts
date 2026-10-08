import { test, expect } from '@playwright/test';

test('handling static select drop down options', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
//selectoption DD
  await page.locator('select#dropdown-class-example').selectOption('Option1');
//Radio button
await page.locator('input[value="radio2"]').check();

//checkbox

await page.locator('#checkBoxOption1').check();

//hover
const mouseHover = page.locator('#mousehover');
await mouseHover.scrollIntoViewIfNeeded();
await mouseHover.hover();
await expect(page.locator('.mouse-hover-content').getByRole('link', { name: 'Top' })).toBeVisible();
 
});

/*
// Single selection matching the value or label
await page.getByLabel('Choose a color').selectOption('blue');

// Single selection matching the label
await page.getByLabel('Choose a color').selectOption({ label: 'Blue' });

// Multiple selected items
await page.getByLabel('Choose multiple colors').selectOption(['red', 'green', 'blue']);
*/
//force click
//await page.getByRole('button').click({ force: true });
//focu element
//await page.getByLabel('Password').focus();
