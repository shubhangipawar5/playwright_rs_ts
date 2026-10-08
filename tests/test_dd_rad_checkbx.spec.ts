import { test, expect } from '@playwright/test';

test('handling static select drop down options', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
//selectoption DD
  await page.locator('select#dropdown-class-example').selectOption('Option1');
//Radio button
await page.locator('input[value="radio2"]').check();
//await page.locator('input[value="radio2"]').inputValue()  //when ever we enter or cliking on any input we can grab the text/value and assert directly using this

//checkbox

await page.locator('#checkBoxOption1').check();
await expect(page.locator('#checkBoxOption1')).toBeChecked(); // //here in expect actionis performed outside(tobechecked) so await is written outside 

// if expect to be unchecked the 
// await expect(page.locator('#checkBoxOption1')).uncheck();   //asserting on boolen result that it returns false then it should be falsy
// expect(await page.locator('#checkBoxOption1').isChecked()).toBeFalsy();      
// //here in expect actionis performed inside(ischecked) so await is written inside 
  

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
