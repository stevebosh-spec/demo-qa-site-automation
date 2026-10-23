import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto('https://demoqa.com/automation-practice-form');
  await page.locator('#dateOfBirthInput').click();
  await page.getByRole('combobox').first().selectOption('5');
  await page.getByRole('combobox').nth(1).selectOption('1997');
  await page.getByRole('gridcell', { name: 'Choose Wednesday, June 25th,' }).click();
  await page.locator('.subjects-auto-complete__input-container').click();
  await page.locator('#subjectsInput').fill('My subjects are Maths and English');
  await page.locator('#subjectsInput').press('Enter');
});