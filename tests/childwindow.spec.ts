import { test, expect } from '@playwright/test';

test('child tab1', async ({ browser }) => {
    const context = await browser.newContext();
    const parentPage = await context.newPage()

    await parentPage.goto('https://the-internet.herokuapp.com/windows');
    const [childtab] = await Promise.all(
    [context.waitForEvent('page'),
    await parentPage.locator(':text-is("Click Here")').click()
    ])

    // we have to trgger a page event first in background becaus eif we handle it after click then it the new tab is already opened under the hood and it will keep searching for new page event t o be triggered
    // so to handle both of this asynchronus/ parellel operations concurently we have to use promise.all which will manage both operations simultaneously


    await childtab.waitForLoadState();
    await expect(childtab).toHaveURL('https://the-internet.herokuapp.com/windows/new')
    await expect(childtab.locator(':text-is("New Window")')).toBeVisible()

    await parentPage.bringToFront()  //To return to the parent tab
    await parentPage.waitForLoadState()
    await expect(parentPage).toHaveURL('https://the-internet.herokuapp.com/windows')
    /*
    - context.waitForEvent('page') waits for a new page (tab) in that browser context.
    - .click() triggers the action that opens it.
    - Promise.all() runs both at the same time, so Playwright is already listening when the tab opens.
    - [childTab] takes the first result—the new Page—from the results array. The click result is also in the array but isn’t used.
    Then you can interact with the new tab through childTab.
    
    */
});