import { test, expect } from '@playwright/test';

test('single file upload', async({page})=>{
await page.goto('https://the-internet.herokuapp.com/upload')
await page.locator('#file-upload').setInputFiles('tests/fileupload-data/sc1.png')
await page.locator('#file-submit').click()
await expect(page.locator('h3',{hasText:'File Uploaded!'})).toBeVisible()

})

test('screenshot', async ({page})=>{
    await page.goto('https://the-internet.herokuapp.com')
    await page.screenshot({path: 'screenshot_' + Date.now()+ '.png'})

})

test('fullpage screenshot', async ({page})=>{
    await page.goto('https://the-internet.herokuapp.com')
    await page.screenshot({ path: `tests/screens/screenshot_${Date.now()}.png`,fullPage: true});

})

test('element screenshot',async ({page})=>{
    await page.goto('https://the-internet.herokuapp.com')
    await page.locator(':text-is("Available Examples")').screenshot({ path: `tests/screens/screenshot-element_${Date.now()}.png`});
//for video we have to enable from configs
})