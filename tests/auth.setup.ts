import { test as setup, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const authFile = path.resolve('playwright/.auth/user.json');
const email = process.env.BONDARACADEMY_EMAIL;
const password = process.env.BONDARACADEMY_PASSWORD;

setup('authenticate', async ({ page }) => {
    if (!email || !password) {
        throw new Error('Set BONDARACADEMY_EMAIL and BONDARACADEMY_PASSWORD to run authenticated tests.');
    }

    await page.goto('/');
    await page.getByRole('link', { name: 'Log In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.locator('button[type="submit"]', { hasText: 'Login' }).click();
    await expect(page).toHaveURL(/\/dashboard(?:\/|$)/);

    await mkdir(path.dirname(authFile), { recursive: true });
    await page.context().storageState({ path: authFile });
});