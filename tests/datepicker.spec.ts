import { test, expect } from '@playwright/test';
import { TIMEOUT } from 'node:dns';

test('datepicker', async ({ page }) => {
    const slowExpectTime = expect.configure({timeout: 9000});  // when we have many assertion line to increase the timeout then we can configure here for test level also
  await page.goto('https://jqueryui.com/');
  await page.getByRole('link', { name: 'Datepicker' }).click();

  const calendar = page.frameLocator('iframe.demo-frame');
  await calendar.locator('#datepicker').click();

  const targetMonth = 'March';
  const targetYear = 2028;
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const targetMonthNumber = months.indexOf(targetMonth);

  const month = calendar.locator('.ui-datepicker-month');
  const year = calendar.locator('.ui-datepicker-year');
  const prev = calendar.locator('.ui-datepicker-prev');
  const next = calendar.locator('.ui-datepicker-next');
  const targetIndex = targetYear * 12 + targetMonthNumber;

  for (let i = 0; i < 120; i++) {
    const currentMonth = (await month.textContent())?.trim();
    const currentYear = Number((await year.textContent())?.trim());
    const currentMonthNumber = months.indexOf(currentMonth ?? '');

   
    const currentIndex = currentYear * 12 + currentMonthNumber;
    if (currentIndex === targetIndex) break;

    await (targetIndex > currentIndex ? next : prev).click();
    await expect(month).not.toHaveText(currentMonth!);
  }
  //slow expect timout

  await slowExpectTime(month).toHaveText(targetMonth);   //this will take 9000 configured in test level
  await expect(year).toHaveText(String(targetYear),{timeout: 6000});
});

// await frame2.locator(':text-is("20")').click(