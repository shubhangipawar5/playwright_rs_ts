//https://playwright.dev/docs/input
//page actions -https://playwright.dev/docs/api/class-page

//https://playwright.dev/docs/api/class-locato

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

    const checkboxes = page.getByRole('checkbox')
    for (const options of await checkboxes.all()) {
        /*Playwright’s Locator.all() is available in current versions, but it returns immediately and does not wait for elements to appear. For a reliable loop—especially if the number of elements can change—use count() with nth():
        */
        expect(await options.isChecked()).toBeFalsy()
        await options.check()
        await options.last().uncheck()
        //expect(await options.last()).not.tobechecked();
    }

    // custom drop down selection
    await page.getByRole('combobox').selectOption('Option1')
    await page.getByRole('combobox').selectOption({ index: 2 })
    const options = await page.locator('[name="dropdown-class-example"] option')
    for (const items of await options.allTextContents()) {
        console.log(items)
        const itemstext = await options.allTextContents()
        expect(await itemstext).toContain('Select')
        //sect dynamic DD
        if (items === 'Option3') {
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


test('auto suggestions', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await page.locator('#autocomplete').pressSequentially('bah'), { delay: 100 };
    const suggestions = page.locator('.ui-menu-item-wrapper');

    await expect(suggestions.first()).toBeVisible();

    const texts = await suggestions.allTextContents();   //also/all gives list of elements
    console.log(texts.map(text => text.trim()).filter(Boolean));  //.filter(Boolean) removes empty strings from the array.
//     const bahamas = page
//     .locator('.ui-menu-item-wrapper')
//     .filter({ hasText: 'Bahamas' });

//   await expect(bahamas).toBeVisible();
//   await bahamas.click();

//   console.log(await page.locator('#autocomplete').inputValue());
    for (const item of texts) {
        //click on dynamic ele
        const count = await suggestions.count();

        for (let i = 0; i < count; i++) {
            
     
           if ((await item).trim() === 'Bahamas') {
            console.log(item)
                 const suggestion = suggestions.nth(i);
                 console.log(i)
                await suggestion.click();
                console.log( await page.locator('#autocomplete').inputValue())
                break;
            }
        }
    }

    page.close()
})

/*
evaluate() and evaluateAll() run JavaScript in the browser page:
- evaluate() runs on one element matched by a locator.
- evaluateAll() runs on all elements matched by a locator and passes them as an array. (Playwright locator docs, evaluateAll)
const headingText = await page.locator('h1').evaluate(
  element => element.textContent,
);

const listTexts = await page.locator('li').evaluateAll(
  elements => elements.map(element => element.textContent?.trim()),
);
*/