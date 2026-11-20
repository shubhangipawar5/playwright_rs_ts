//https://playwright.dev/docs/input
//page actions -https://playwright.dev/docs/api/class-page


const { test, expect } = require('@playwright/test');
test('demo', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/', { waitUntil: 'commit' });

 const nameInput = page.getByPlaceholder('Enter Your Name');
await nameInput.fill('Anushree');

const inputText = await nameInput.inputValue();
console.log(inputText);
//get all raiod values
const legend = page.locator('#radio-btn-example');
const radioOptions = legend.locator('input[type="radio"]');
const count = await radioOptions.count();

console.log(count);
//click on all radios buttons
for (let i = 0; i < count; i++) {
  console.log(await radioOptions.nth(i).getAttribute('value'));
  await radioOptions.nth(i).click();
}

//click on all check boox

const checkboxes =  page.getByRole('checkbox')
for(const options of await checkboxes.all()){
    /*Playwright’s Locator.all() is available in current versions, but it returns immediately and does not wait for elements to appear. For a reliable loop—especially if the number of elements can change—use count() with nth():
    */
    expect(await options.isChecked()).toBeFalsy()
await options.check()
await options.last().uncheck()
 //expect(await options.last()).not.tobechecked();
}

// custom drop down selection
        await page.getByRole('combobox').selectOption('Option1')
          await page.getByRole('combobox').selectOption({index:2})
    const options = await page.locator('[name="dropdown-class-example"] option')
          for(const items of await options.allTextContents()){
            console.log(items)
            const itemstext = await options.allTextContents()
            expect(await itemstext).toContain('Select')
//sect dynamic DD
        if(items === 'Option3'){
                  await page.getByRole('combobox').selectOption(items)
        }
          }
// Multiple selected items in m ultiselect DD
// await page.getByLabel('Choose multiple colors').selectOption(['red', 'green', 'blue']);



//HOVER
const hover = await page.locator('#mousehover')

hover.click()
await expect(page.getByText('Reload')).toBeVisible()
page.close()
/*
Playwright uses browser.close() to close the browser, or context.close() to close a browser context and its pages.
*/
});
