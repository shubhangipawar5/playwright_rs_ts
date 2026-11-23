import { test as base, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

//Imports the TypeScript type for a Playwright page.
// import type is only for type checking; it doesn’t add runtime code.


type LoginFixtures ={
  loggedInPage : Page
}
//Defines the shape of our custom fixture.
// It says loggedInPage will provide a Playwright Page object.

export const test = base.extend<LoginFixtures>({
  /*
  Creates a new test object by extending Playwright’s built-in test object.
<LoginFixtures> tells TypeScript what custom fixture is being added.
Exporting this lets test files import the extended test.
*/
  loggedInPage: async({page}, use) =>{
    /*
    - Defines the loggedInPage fixture.
- Playwright provides the built-in page fixture to it.
- use is the callback through which the fixture gives its prepared value to the test.
*/
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#username.form-control').fill('rahulshettyacademy');
    await page.getByRole('textbox', { name: 'password' }).fill('Learning@830$3mK2');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await use(page)
    /*
    Passes the logged-in page to the test that requested loggedInPage.
The test runs while this fixture is active. When it finishes, Playwright continues fixture cleanup.
*/

    page.close();
  },
})

export {expect};



/*.  multi env creds pass
loggedInPage: async ({ page }, use, testInfo) => {
  const prefix = testInfo.project.name.toUpperCase();
  const username = process.env[`${prefix}_USERNAME`];
  const password = process.env[`${prefix}_PASSWORD`];

  if (!username || !password) {
    throw new Error(`Missing login credentials for ${testInfo.project.name}`);
  }

  await page.goto('/loginpagePractise/');
  await page.locator('#username').fill(username);
  await page.getByRole('textbox', { name: 'password' }).fill(password);
  await page.getByRole('button', { name: 'Sign In' }).click();

  await use(page);
},
*/