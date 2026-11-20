// const {test} = require ('@playwright/test')

//or

import { test, expect } from '@playwright/test'






test('my test', { tag: '@smoke' }, async function ({ browser }) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const username = page.locator('#username.form-control')
  await username.fill('rahulshettyacademy')
  //get by role

  await page.getByRole('textbox', { name: 'password' }).fill('Learning@830$3mK2') //this we can also use with getby label

  //get by role
  await page.getByRole('button', { name: 'Sign In' }).click();

  //get by text

  const ecomtext = page.getByText('ProtoCommerce Home').first()
  await expect(ecomtext).toBeVisible()



})

// Anotations and tags
//   https://playwright.dev/docs/test-annotations 
test('my test 3', async function ({ browser },testInfo) {
  //To read config values in a test, import them with defineConfig or access the current test’s configuration through testInfo:
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const username = page.locator('#username.form-control')
  await username.fill('rahulshettyacademy')
  //get by role

  await page.getByRole('textbox', { name: 'password' }).fill('Learning@830$3mK2') //this we can also use with getby label

  //get by role
  await page.getByRole('button', { name: 'Sign In' }).click();

  //get by text

  const ecomtext = page.getByText('ProtoCommerce Home').first()
  await expect(ecomtext).toBeVisible( { timeout: 10_000 })    //overidden the assertion
 console.log(testInfo.timeout)         //to read the test's configuration via config file //here it returns the timeout value from config
// we can also it from here -   test.setTimeout(60000);
  test.setTimeout(60000);     // config timeout is overridden here. or can be done as - testInfo.setTimeout(testInfo.timeout + 30_000);
 console.log(testInfo.timeout) 
})

/*
getByRole() uses ARIA roles. Common roles include:
- button, link
- textbox, searchbox
- checkbox, radio, switch
- combobox, option, listbox
- heading, img
- table, row, cell
- dialog, alert, tab, tabpanel
*/