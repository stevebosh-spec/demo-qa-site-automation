import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('link', { name: 'Elements' }).click();
  await page.getByText('Forms').click();
  await page.getByRole('link', { name: 'Practice Form' }).click();
  await page.locator('#dateOfBirthInput').click();
  await page.getByRole('combobox').nth(1).selectOption('1983');
  await page.getByRole('gridcell', { name: 'Choose Monday, October 10th,' }).click();
});