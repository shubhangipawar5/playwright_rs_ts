import {test, expect} from '@playwright/test';

test.skip('first playwright test', async function({browser}){      // playwrights browser fixture we are using to invoke browser
     const context = await browser.newContext();        // context is a instance for the current browser execution which may have prev. cookies,sessions etc. so to revoke that playwright creats a fresh context for every test
     // whatever browser you set in the config file for that brwoser it will create a new instance here

     const page = await context.newPage();        //cretaes a new page /tab in browser context

     await page.goto('https://rahulshettyacademy.com/AutomationPractice/');



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

test('login orange hrm',async ({page})=>{
          await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
          await expect(page).toHaveTitle('OrangeHRM')
          //assert the text contains
          await expect(page.locator('h5')).toContainText('Login')

          //grab the text of a element

          const firstelementText = await page.locator('.orangehrm-login-form p').first().textContent();         //or we can use - element.nth(0);
          console.log(firstelementText)

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

          await expect(page.locator('h6').first()).toContainText('Dashboard');

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


