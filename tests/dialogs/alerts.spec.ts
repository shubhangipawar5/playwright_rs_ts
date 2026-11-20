//https://playwright.dev/docs/dialogs

import { test, expect } from '@playwright/test';
import { deserialize } from 'node:v8';


test('alerts1', async ({ page }) => {

//By default, dialogs are auto-dismissed by Playwright, However, you can register a dialog handler before the action that triggers the dialog to either dialog.accept() or dialog.dismiss() it.
await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
page.on('dialog', dialog=> {
     console.log(dialog.message)
    dialog.accept()
    //dialog.type()   //what type of laert it returns
   
})
await page.locator(':text-is("Click for JS Alert")').click()

});

test('confirmalert', async ({ page }) => {

//By default, dialogs are auto-dismissed by Playwright, However, you can register a dialog handler before the action that triggers the dialog to either dialog.accept() or dialog.dismiss() it.
await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
page.on('dialog', dialog=> {
     console.log(dialog.message)
    dialog.dismiss()
   
})
await page.locator(':text-is("Click for JS Confirm")').click()
await expect(page.locator('p',{hasText:'You clicked: Cancel'}).isVisible()).toBeTruthy()
});

test('promptalert',async ({ page }) => {
test.slow()
//By default, dialogs are auto-dismissed by Playwright, However, you can register a dialog handler before the action that triggers the dialog to either dialog.accept() or dialog.dismiss() it.
await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

page.on('dialog', dialog=> {
     console.log(dialog.message)
    dialog.accept('Anushree');
    expect(dialog.type()).toBe('prompt')
   
})
await page.locator(':text-is("Click for JS Prompt")').click()
await expect(page.locator('p',{hasText:'You clicked: Cancel'}).isVisible()).toBeTruthy()
});
