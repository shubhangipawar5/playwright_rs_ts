import { test, expect } from '@playwright/test';
//https://playwright.dev/docs/frames
test('handling iframes', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    //  const frmaeui = page.frameLocator('#courses-iframe')
    //  await frmaeui.getByRole('link',{name:'Register'}).click()
    //Frame objects
    // One can access frame objects using the page.frame() API:

    //page.frame() takes a frame URL or name
    const frame1 = page.frame({
        url: /https:\/\/legacy\.rahulshettyacademy\.com\//,
    });

    if (!frame1) {
        throw new Error('Legacy academy frame not found');
    }

    await frame1.getByRole('link', { name: 'Register' }).click();
    await expect(frame1.locator('#sub-frame-error')).toBeAttached();
    //childframes
    // const childframes = frame1?.childFrames();

    // await childframes?.at(0)?.locator('element').click()



    page.close()
})

test('tooltip', async ({ page }) => {
    await page.goto('https://jqueryui.com/')
    await page.getByRole('link', { name: 'Tooltip' }).click()
    const frame2 = page.frameLocator('.demo-frame')
    const titleoftooltip = await frame2.getByRole('link', { name: 'Tooltips' }).getAttribute('title')
    await frame2.getByRole('link', { name: 'Tooltips' }).hover()
    console.log(titleoftooltip)
})

test('drag and drop', async ({ page }) => {
    await page.goto('https://jqueryui.com/')
    await page.getByRole('link', { name: 'Droppable' }).click()
    const frame2 = page.frameLocator('.demo-frame')
    // await frame2.locator('#draggable').dragTo(frame2.locator('#droppable'));
    //or other solution
    await frame2.locator('#draggable').hover();
    await page.mouse.down();
    await frame2.locator('#droppable').hover()
    await page.mouse.up()

})


