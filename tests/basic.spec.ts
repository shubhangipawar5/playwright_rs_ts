// const {test} = require ('@playwright/test')
//or
import {test, expect} from '@playwright/test';
//element handle - https://playwright.dev/docs/api/class-elementhandle
//all methods/commands - https://playwright.dev/docs/api/class-locator

//test from @playwright/test is Playwright Test’s function for defining tests and hooks:

test.skip('first playwright test', async function({browser}){      // playwrights browser fixture we are using to invoke browser
     const context = await browser.newContext();        // context is a instance for the current browser execution which may have prev. cookies,sessions etc. so to revoke that playwright creats a fresh context for every test
     // whatever browser you set in the config file for that brwoser it will create a new instance here

     const page = await context.newPage();        //cretaes a new page /tab in browser context

     await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
     // wait mechaniasm
    // await page.waitForTimeout(20000);      //hardcoded wait will wait the execution for 20s at this step //here configs global timout can also overide this timeout so insted of this we can wait on element

    // await page.waitForSelector('locator');
    //or explicite timeout
    //await page.locator('elemnet').waitFor({state: 'visible'}); 

})

test('auto cretaes the page fixture', async({page})=>{          //default browser and frsh page no need to inject cookies , if you want to inject any cookies and all use above code in first tc

    // await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    // await page.goto("https://demoqa.com/automation-practice-form");

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    const title = await page.title();
    expect(title).toEqual('OrangeHRM');

    //or
    await expect(page).toHaveTitle('OrangeHRM')

})

test('login orange hrm',async ({page}, testInfo)=>{
         
             if(testInfo.retry){
           console.log(`retrying for ${testInfo.retry} time`) //retry count
           console.log(`retrying for ${testInfo.title} test cases`) //tets case title
         }
          

          await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
          
          await expect(page).toHaveTitle('OrangeHRM')
          //assert the text contains
          await expect(page.locator('h5')).toContainText('Login')

          //grab the text of a element

          const firstelementText = await page.locator('.orangehrm-login-form p').first().textContent();         //or we can use - element.nth(0);
          console.log(firstelementText)
          //to get all elemnet test
//           await page.locator('elementslist').allInnerTexts()
//  await page.locator('elementslist').allTextContents()

                 
          //or
          const secondel = page.locator('.orangehrm-login-form p').nth(1);
          // innerText() returns visible text; For UI testing, prefer innerText() or Playwright assertions:
          // textContent() returns all DOM text, including hidden text.
          //Use textContent() when you specifically need the raw DOM text, including hidden content.
          const secondelementText = await secondel.innerText();
          await expect(secondel).toHaveText(secondelementText);

          //locators

          await page.getByPlaceholder('Username').fill('Admin');
          //fill() clears the existing value first, then sets the complete text at once. Use it for normal form fields.
          //type() enters text one character at a time, like keyboard input. It appends to existing text and triggers keyboard events for every character.
          
          //get by label
          const passwordLabel = page.locator('label.oxd-label', { hasText: 'Password' });
          await expect(passwordLabel).toBeVisible();



          //get by role
          await page.getByRole('textbox',{name:'Password'}).type('admin123');

          await page.getByRole('button', { name: 'Login' }).click();

          await expect(page.locator('h6').first()).toContainText('Dashboard', { timeout: 10_000 });

          //or get by text
          await expect(page.getByText('Dashboard').last()).toBeVisible();

          // get by alt text

          await expect(page.getByAltText('client brand banner')).toBeVisible();

          // get by title

          await expect(page.getByTitle('Help')).toBeVisible();

          // by test id - <button data-testid="directions">Itinéraire</button>  or custom id - <button data-pw="directions">Itinéraire</button>
          // await page.getByTestId('directions').click();


          // by xpath

          await expect(page.locator('//input[@class="oxd-input oxd-input--active"]')).toBeVisible();

          //*****/ All locators in Playwright by default work with elements in Shadow DOM. 
//other locators supported by playwright - https://playwright.dev/docs/other-locators
/*
Playwright built-in locators like getByRole(), getByLabel(), and getByText() are usually more stable and readable than CSS or XPath.
await page.getByRole('button', { name: 'Login' }).click();
This describes the UI the way a user experiences it: a button named “Login.” It usually survives CSS class changes or HTML restructuring.
-CSS is useful when you have stable attributes:
await page.locator('input[name="password"]').fill('admin123');
-XPath is best kept as a fallback for complex DOM relationships where CSS and built-in locators cannot express what you need:
await page.locator('//label[text()="Password"]/following::input[1]').fill('admin123');
In short: prefer built-in locators first, CSS second, XPath last. Built-in locators also encourage accessible UI because they rely on roles, labels, and visible names.
*/
          

})
// same as cy.contains - await page.locator('article:has-text("Playwright")').click();

/*
Matching only visible elements
note
It's usually better to find a more reliable way to uniquely identify the element instead of checking the visibility.

Consider a page with two buttons, the first invisible and the second visible.

<button style='display: none'>Invisible</button>
<button>Visible</button>

This will find both buttons and throw a strictness violation error:

await page.locator('button').click();

This will only find a second button, because it is visible, and then click it.

await page.locator('button').visible().click();
*/
//*count
//await expect(page.getByRole('listitem')).toHaveCount(3);

//iterate list of elements

/*
Do something with each element in the list
Iterate elements:

for (const row of await page.getByRole('listitem').all())
  console.log(await row.textContent());

Iterate using regular for loop:

const rows = page.getByRole('listitem');
const count = await rows.count();
for (let i = 0; i < count; ++i)
  console.log(await rows.nth(i).textContent());

Evaluate in the page
The code inside locator.evaluateAll() runs in the page, you can call any DOM apis there.

const rows = page.getByRole('listitem');
const texts = await rows.evaluateAll(
    list => list.map(element => element.textContent));
    */

/* locator chaining
await page
  .locator('.product-card')
  .nth(1)
  .getByRole('button', { name: 'Add to cart' })
  .click();


  ---
  await page
  .locator('.dashboard')
  .locator('.user-section')
  .locator('.profile-card')
  .getByRole('button', { name: 'View Profile' })
  .click();


  --
  const rowLocator = page.getByRole('listitem');

await rowLocator
    .filter({ hasText: 'Mary' })
    .filter({ has: page.getByRole('button', { name: 'Say goodbye' }) })
    .screenshot({ path: 'screenshot.png' });

*/


/* elemnets iteration 
Do something with each element in the list
Iterate elements:

for (const row of await page.getByRole('listitem').all())
  console.log(await row.textContent());

Iterate using regular for loop:

const rows = page.getByRole('listitem');
const count = await rows.count();
for (let i = 0; i < count; ++i)
  console.log(await rows.nth(i).textContent());

Evaluate in the page
The code inside locator.evaluateAll() runs in the page, you can call any DOM apis there.

const rows = page.getByRole('listitem');
const texts = await rows.evaluateAll(
    list => list.map(element => element.textContent));
    */

    //npx playwright codegen.   - to open codgen recorder
    //npx playwright codegen --device "Blackberry PlayBook". - to open emulator device

    /*
    Set action and navigation timeouts in the config
playwright.config.ts


export default defineConfig({
  use: {
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
  },
});
*/

/*
In Playwright, explicit timeout usually means you set a timeout directly on a test or operation. Implicit timeout means Playwright uses a default timeout when you don’t specify one.

For example:
test.setTimeout(60_000); // explicit test timeout: 60 seconds
A locator action also has a timeout. If you omit it, Playwright uses the default action timeout (often no timeout unless configured):
await page.getByRole('button').click({ timeout: 5_000 }); // explicit: 5 seconds
You can set defaults in playwright.config.ts, such as timeout for tests and expect.timeout for assertions. Locator actions and assertions have separate timeout settings.


In Playwright, waitFor usually means waiting for a specific condition before continuing. The exact method depends on what you’re waiting for.
// Wait for an element to become visible
await page.getByText('Welcome').waitFor({ state: 'visible' });

// Wait for navigation
// await page.waitForURL('**');

// // Wait for a response
// await page.waitForResponse('**');
// For most UI checks, prefer a web-first assertion because it waits and retries automatically:
// await expect(page.getByText('Welcome')).toBeVisible();
// Avoid fixed delays like page.waitForTimeout(2000) when possible; they can make tests flaky.


*/

//timrout- 
//global, test, navigation, expect, action timouts

/*
With this setting, it uses 1 worker on CI. Locally, undefined lets Playwright choose its default worker count.

By default, Playwright uses half of the machine’s logical CPU cores as its maximum worker count. For example, on an 8-core machine, it would use up to 4 workers.
*/