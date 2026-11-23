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

//   Capture the separate window opened from the parent page.   // to click on button which opens some poup window on parent page
  const [childWindow] = await Promise.all([
  parentPage.waitForEvent('popup'),
  parentPage.locator('#openwindow').click(),
]);
await childWindow.waitForLoadState();
await expect(childWindow).toHaveURL(/https:\/\/www\.qaclickacademy\.com/);
  await expect(parentPage).toHaveURL(/AutomationPractice/);

// await childWindow.close();
// await childWindow.bringToFront();
// childtab.bringToFront() brings the child tab forward. To return to the parent tab, call:
// await parentPage.bringToFront();

  
});
