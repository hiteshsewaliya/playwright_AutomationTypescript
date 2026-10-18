import { test as setup, expect } from '@playwright/test';
import { Secret, TOTP } from 'otpauth';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const authFile = path.resolve('playwright/.auth/user.json');
const email = process.env.GITHUB_EMAIL;
const password = process.env.GITHUB_PASSWORD;
const mfaSecret = process.env.GITHUB_TOTP;

setup.fixme('authenticate', async ({ page }) => {
    if (!email || !password || !mfaSecret) {
        throw new Error('Set GITHUB_EMAIL, GITHUB_PASSWORD, and GITHUB_TOTP to run authenticated tests.');
    }
    // Navigate to the login page and perform login
    await page.goto('/');
  await expect(page.getByRole('navigation', { name: 'Platform' })).toBeVisible();
  await page.getByRole('link', { name: 'Sign in' }).click();
  await expect(page.getByRole('button', { name: 'Continue with Google' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Username or email address' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page).toHaveURL(/two-factor/);
  await page.getByRole('button', { name: 'Send SMS', exact: true }).click();
 
    //genrate otp code from authenticator app and fill it in
    const totp = new TOTP({
        secret: mfaSecret,
        digits: 6,
        period: 30,
    })

    const otpCode = totp.generate();

    // Fill in the OTP code and submit
    await page.locator('#sms_totp').fill(otpCode);
    await page.locator('button[type="submit"]', { hasText: 'Verify' }).click();

    await expect(page).toHaveURL(/\/dashboard(?:\/|$)/);
    await mkdir(path.dirname(authFile), { recursive: true });
    await page.context().storageState({ path: authFile });
});