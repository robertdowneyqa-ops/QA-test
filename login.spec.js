import { test, expect } from '@playwright/test';

test('user can log in from the PozitiveHub login page', async ({ page }) => {
  const baseUrl = process.env.BASE_URL ?? 'https://pozitivehub.com';
  const email = process.env.LOGIN_EMAIL;
  const password = process.env.LOGIN_PASSWORD;

  test.skip(!email || !password, 'Set LOGIN_EMAIL and LOGIN_PASSWORD environment variables.');

  await page.goto(baseUrl);

  await page.fill('input[type="email"]', email!);
  await page.fill('input[type="password"]', password!);
  await page.click('button:has-text("Login")');

  await expect(page).not.toHaveURL(/login/i);
});
