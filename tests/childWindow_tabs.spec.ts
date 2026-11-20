import { expect, test } from '@playwright/test';

test('child window/tab', async ({ browser }) => {
  const context = await browser.newContext();
  const parentPage = await context.newPage();

  await parentPage.goto('https://rahulshettyacademy.com/AutomationPractice/');

  // Capture the new tab before clicking the link that opens it.
  const [childPage] = await Promise.all([
    context.waitForEvent('page'),
    parentPage.locator('.blinkingText').first().click(),
  ]);
  await childPage.waitForLoadState();
  await expect(childPage).toHaveURL(/qa-career-accelerator-job-ready/);

//   Capture the separate window opened from the parent page.
  const [childWindow] = await Promise.all([
  parentPage.waitForEvent('popup'),
  parentPage.locator('#openwindow').click(),
]);
await childWindow.waitForLoadState();
await expect(childWindow).toHaveURL(/https:\/\/www\.qaclickacademy\.com/);
  await expect(parentPage).toHaveURL(/AutomationPractice/);

// await childWindow.close();
// await childWindow.bringToFront();

  //or we can also again go back to parent tab with below code so we can see that new window to be open in front on ui

  //   const [childWindow] = await Promise.all([
//     context.waitForEvent('page'),
//     parentPage.locator('#openwindow').click(),
//   ]);
//   await childWindow.waitForLoadState();
// await expect(childWindow).toHaveURL(/https:\/\/www\.qaclickacademy\.com/);
//   await expect(parentPage).toHaveURL(/AutomationPractice/);
//   //popup to be closed after url assertion and back to parent page
//   await childWindow.close();
// await parentPage.bringToFront();

//   await context.close();
});


/*


test('child tab', async ({browser})=>{
const context = await browser.newContext();
const parentPage = await context.newPage();

await parentPage.goto('https://rahulshettyacademy.com/AutomationPractice/');

const childpage = context.waitForEvent('page');
 parentPage.locator('.blinkingText').first().click(),

 await (await childpage).waitForLoadState();

await parentPage.locator('#autocomplete').first().fill('shubh')
await parentPage.locator('[value="radio1"]').click()

});
*/