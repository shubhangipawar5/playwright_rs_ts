import { test, expect } from '@playwright/test';

test('datepicker', async ({ page }) => {
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

  await expect(month).toHaveText(targetMonth);
  await expect(year).toHaveText(String(targetYear));
});

// await frame2.locator(':text-is("20")').click()